'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { cartApi } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface CartItem {
  id: number
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    imageUrl: string | null
    category: {
      name: string
    }
  }
}

export default function CartPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [total, setTotal] = useState(0)

  const fetchCart = async () => {
    try {
      const token = await getToken()
      if (!token) return

      const data = await cartApi.get(token) as { CartItem: CartItem[], total: number }
      setCartItems(data.CartItem)
      setTotal(data.total)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchCart()
    } else if (isLoaded && !isSignedIn) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn])

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdating(itemId)
    try {
      const token = await getToken()
      if (!token) return

      await cartApi.updateItem(itemId, newQuantity, token)

      // Optimistic update or refetch
      fetchCart()
    } catch (error) {
      console.error('Failed to update quantity:', error)
      toast.error('Failed to update quantity')
    } finally {
      setUpdating(null)
    }
  }

  const removeItem = async (itemId: number) => {
    try {
      const token = await getToken()
      if (!token) return

      await cartApi.removeItem(itemId, token)
      toast.success('Item removed')
      fetchCart()
    } catch (error) {
      console.error('Failed to remove item:', error)
      toast.error('Failed to remove item')
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Please sign in</h1>
          <p className="mb-8 text-muted-foreground">You need to be signed in to view your cart</p>
          <Link
            href="/sign-in"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = total
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.1
  const finalTotal = subtotal + shipping + tax // If total is 0, we might want to hide shipping/tax logic or handle it. checks below.

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex rounded-full bg-muted p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 sm:gap-6 sm:p-6"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-32">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="mb-2 flex items-start justify-between">
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="font-semibold transition-colors hover:text-primary">
                            {item.product.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg p-2 text-destructive transition-colors hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-lg font-bold">${item.product.price.toFixed(2)}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating === item.id}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {updating === item.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mx-auto"></div>
                        ) : item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between border-b border-border py-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${finalTotal.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <div className="my-4 rounded-lg bg-primary/10 p-3 text-sm text-primary">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <Link
                href="/checkout"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/products"
                className="mt-3 block text-center text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
