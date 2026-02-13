'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Grid3x3, List, Heart, ShoppingCart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - will be replaced with API calls
const mockProducts = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    price: 299.99,
    rating: 4.5,
    reviews: 128,
    image: '/placeholder-product.jpg',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    price: 399.99,
    rating: 4.8,
    reviews: 256,
    image: '/placeholder-product.jpg',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Premium Leather Bag',
    price: 159.99,
    rating: 4.6,
    reviews: 89,
    image: '/placeholder-product.jpg',
    category: 'Fashion',
    inStock: true,
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    rating: 4.7,
    reviews: 167,
    image: '/placeholder-product.jpg',
    category: 'Home & Living',
    inStock: false,
  },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'Electronics', 'Fashion', 'Home & Living']

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground">Discover our complete collection</p>
        </div>

        {/* Filters & Search */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-lg p-2 transition-colors',
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
              )}
            >
              <Grid3x3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'rounded-lg p-2 transition-colors',
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={cn(
            'grid gap-6',
            viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
          )}
        >
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  viewMode,
}: {
  product: (typeof mockProducts)[0]
  viewMode: 'grid' | 'list'
}) {
  if (viewMode === 'list') {
    return (
      <div className="group flex gap-6 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-2 flex items-start justify-between">
              <div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <button className="rounded-lg p-2 transition-colors hover:bg-accent">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${product.price}</div>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <span className="rounded-lg bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold transition-colors group-hover:text-primary">{product.name}</h3>
          </Link>
          <button className="rounded-lg p-1 transition-colors hover:bg-accent">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-2 text-sm text-muted-foreground">{product.category}</p>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">${product.price}</div>
          <button
            disabled={!product.inStock}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
