'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Plus,
} from 'lucide-react'

// Mock data
const stats = [
  {
    label: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    label: 'Total Products',
    value: '567',
    change: '+3.1%',
    trend: 'up',
    icon: Package,
  },
  {
    label: 'Total Customers',
    value: '8,945',
    change: '-2.4%',
    trend: 'down',
    icon: Users,
  },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 299.99, status: 'delivered', date: '2026-02-10' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 159.99, status: 'shipped', date: '2026-02-11' },
  { id: 'ORD-003', customer: 'Bob Johnson', total: 449.99, status: 'processing', date: '2026-02-12' },
  { id: 'ORD-004', customer: 'Alice Brown', total: 89.99, status: 'pending', date: '2026-02-13' },
]

const topProducts = [
  { name: 'Wireless Headphones Pro', sales: 234, revenue: '$70,166' },
  { name: 'Smart Watch Series 5', sales: 189, revenue: '$75,561' },
  { name: 'Premium Leather Bag', sales: 156, revenue: '$24,958' },
  { name: 'Ergonomic Office Chair', sales: 98, revenue: '$44,099' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your store and monitor performance</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-border">
          {(['overview', 'products', 'orders', 'customers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
            return (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    <TrendIcon className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Orders */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link href="/admin/orders" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="mb-1 font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 font-semibold">${order.total}</div>
                    <div
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === 'delivered'
                          ? 'bg-green-500/10 text-green-500'
                          : order.status === 'shipped'
                            ? 'bg-purple-500/10 text-purple-500'
                            : order.status === 'processing'
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-yellow-500/10 text-yellow-500'
                      }`}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Top Products</h2>
              <Link href="/admin/products" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="mb-1 font-semibold">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.sales} sales</div>
                  </div>
                  <div className="text-right font-semibold">{product.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
