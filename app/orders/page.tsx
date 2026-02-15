'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, ChevronRight, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ordersApi } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface Order {
  id: string
  status: string
  totalPrice: number
  createdAt: string
  OrderItem: {
    id: number
    quantity: number
    price: number
    product: {
      name: string
    }
  }[]
}

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  processing: {
    label: 'Processing',
    icon: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
}

export default function OrdersPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken()
        if (!token) return

        const data = await ordersApi.getAll(token) as Order[]
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
        toast.error('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded && isSignedIn) {
      fetchOrders()
    } else if (isLoaded && !isSignedIn) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn, getToken])

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
          <p className="mb-8 text-muted-foreground">You need to be signed in to view your orders</p>
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

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex rounded-full bg-muted p-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">No orders yet</h1>
            <p className="mb-8 text-muted-foreground">
              Start shopping to see your orders here
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
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const statusKey = order.status as keyof typeof statusConfig
            const status = statusConfig[statusKey] || statusConfig.pending // Fallback
            const StatusIcon = status.icon
            const itemCount = order.OrderItem.reduce((acc, item) => acc + item.quantity, 0)

            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold">{order.id}</h3>
                      <div
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
                          status.bg,
                          status.color
                        )}
                      >
                        <StatusIcon className="h-4 w-4" />
                        {status.label}
                      </div>
                    </div>

                    <div className="mb-2 text-sm text-muted-foreground">
                      Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'} • ${order.totalPrice.toFixed(2)}
                    </div>

                    <div className="mt-2 text-sm">
                      {order.OrderItem.map((item, index) => (
                        <span key={index}>
                          {item.product.name}
                          {/* Add quantity if > 1? */}
                          {item.quantity > 1 ? ` (x${item.quantity})` : ''}
                          {index < order.OrderItem.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
