'use client'

import Link from 'next/link'
import { Laptop, Shirt, Home, Dumbbell, Book, Utensils, Gamepad2, Camera } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: Laptop,
    count: 2500,
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 2,
    name: 'Fashion',
    icon: Shirt,
    count: 5000,
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 3,
    name: 'Home & Living',
    icon: Home,
    count: 3200,
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    icon: Dumbbell,
    count: 1800,
    color: 'from-orange-500/20 to-amber-500/20',
  },
  {
    id: 5,
    name: 'Books & Media',
    icon: Book,
    count: 4200,
    color: 'from-purple-500/20 to-violet-500/20',
  },
  {
    id: 6,
    name: 'Food & Beverage',
    icon: Utensils,
    count: 1500,
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    id: 7,
    name: 'Gaming',
    icon: Gamepad2,
    count: 2100,
    color: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    id: 8,
    name: 'Photography',
    icon: Camera,
    count: 900,
    color: 'from-teal-500/20 to-cyan-500/20',
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Shop by Category</h1>
          <p className="text-lg text-muted-foreground">
            Explore our wide range of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count.toLocaleString()}+ products
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Featured Banner */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Can't find what you're looking for?</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Use our search feature to find exactly what you need from our extensive catalog
            </p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
