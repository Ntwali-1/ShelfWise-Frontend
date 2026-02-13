'use client'

import Link from 'next/link'
import { Package, ChevronRight, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2026-02-10',
    status: 'delivered',
    total: 699.98,
    items: 2,
    products: [
      { name: 'Wireless Headphones Pro', quantity: 1 },
      { name: 'Smart Watch Series 5', quantity: 1 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2026-02-12',
    status: 'shipped',
    total: 159.99,
    items: 1,
    products: [{ name: 'Premium Leather Bag', quantity: 1 }],
  },
  {
    id: 'ORD-003',
    date: '2026-02-13',
    status: 'processing',
    total: 449.99,
    items: 1,
    products: [{ name: 'Ergonomic Office Chair', quantity: 1 }],
  },
]

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
  if (mockOrders.length === 0) {
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
          {mockOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig]
            const StatusIcon = status.icon

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
                      Ordered on {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {order.items} {order.items === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                    </div>

                    <div className="mt-2 text-sm">
                      {order.products.map((product, index) => (
                        <span key={index}>
                          {product.name}
                          {index < order.products.length - 1 && ', '}
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
