'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'
import { wishlistApi, cartApi } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface WishlistItem {
  id: number
  productId: string
  product: {
    id: string
    name: string
    price: number
    imageUrl: string | null
    quantity: number
    Review?: { rating: number }[]
  }
}

export default function WishlistPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = async () => {
    try {
      const token = await getToken()
      if (!token) return

      const data = await wishlistApi.getAll(token) as WishlistItem[]
      setWishlistItems(data)
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
      toast.error('Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchWishlist()
    } else if (isLoaded && !isSignedIn) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn])

  const removeItem = async (productId: string) => {
    try {
      const token = await getToken()
      if (!token) return

      await wishlistApi.remove(productId, token)
      toast.success('Removed from wishlist')
      setWishlistItems((items) => items.filter((item) => item.productId !== productId))
    } catch (error) {
      console.error('Failed to remove item:', error)
      toast.error('Failed to remove item')
    }
  }

  const addToCart = async (productId: string) => {
    try {
      const token = await getToken()
      if (!token) {
        toast.error('Please sign in')
        return
      }

      await cartApi.addItem(productId, 1, token)
      toast.success('Added to cart')
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast.error('Failed to add to cart')
    }
  }

  // Calculate rating helper
  const getRating = (reviews: { rating: number }[] | undefined) => {
    if (!reviews || reviews.length === 0) return { rating: 0, count: 0 }
    const total = reviews.reduce((acc, r) => acc + r.rating, 0)
    return { rating: (total / reviews.length).toFixed(1), count: reviews.length }
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
          <p className="mb-8 text-muted-foreground">You need to be signed in to view your wishlist</p>
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

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex rounded-full bg-muted p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Your wishlist is empty</h1>
            <p className="mb-8 text-muted-foreground">
              Save your favorite items here to purchase them later
            </p>
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
          </div>
          {/* Clear All - Optional, need API for it or loop delete */}
          {/* <button className="...">Clear All</button> */}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => {
            const { rating, count } = getRating(item.product.Review)
            const inStock = item.product.quantity > 0

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <Link href={`/products/${item.productId}`}>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {item.product.imageUrl ? (
                      <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                    )}

                    {!inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <span className="rounded-lg bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute right-2 top-2 rounded-lg bg-background/80 p-2 text-destructive backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="p-4">
                  <Link href={`/products/${item.productId}`}>
                    <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary line-clamp-1">
                      {item.product.name}
                    </h3>
                  </Link>

                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className={`h-3 w-3 ${count > 0 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      <span className="text-sm font-medium">{rating || 'New'}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({count})</span>
                  </div>

                  <div className="mb-4 text-xl font-bold">${item.product.price.toFixed(2)}</div>

                  <button
                    onClick={() => addToCart(item.productId)}
                    disabled={!inStock}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
