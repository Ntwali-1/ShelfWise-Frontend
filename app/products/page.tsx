'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Grid3x3, List, Heart, ShoppingCart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { productsApi, categoriesApi } from '@/lib/api'
import { useAuth } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  price: number
  quantity: number
  description?: string
  imageUrl?: string
  category: {
    id: number
    name: string
  }
}

interface Category {
  id: number
  name: string
  _count?: {
    Product: number
  }
}

export default function ProductsPage() {
  const { getToken } = useAuth()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params: any = {
          page,
          limit: 12,
        }
        
        if (searchQuery) {
          params.search = searchQuery
        }
        
        if (selectedCategory !== 'all') {
          params.category = selectedCategory
        }

        const data = await productsApi.getAll(params)
        setProducts(data.products || data)
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchProducts()
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchQuery, selectedCategory, page])

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
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  selectedCategory === category.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {category.name}
                {category._count && ` (${category._count.Product})`}
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div
            className={cn(
              'grid gap-6',
              viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
            )}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({
  product,
  viewMode,
}: {
  product: Product
  viewMode: 'grid' | 'list'
}) {
  const inStock = product.quantity > 0

  if (viewMode === 'list') {
    return (
      <div className="group flex gap-6 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
          )}
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
                <p className="text-sm text-muted-foreground">{product.category.name}</p>
              </div>
              <button className="rounded-lg p-2 transition-colors hover:bg-accent">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{inStock ? `${product.quantity} in stock` : 'Out of stock'}</p>
            </div>
            <button 
              disabled={!inStock}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
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
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold transition-colors group-hover:text-primary line-clamp-1">{product.name}</h3>
          </Link>
          <button className="rounded-lg p-1 transition-colors hover:bg-accent">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-2 text-sm text-muted-foreground">{product.category.name}</p>
        <p className="mb-3 text-xs text-muted-foreground">{inStock ? `${product.quantity} in stock` : 'Out of stock'}</p>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
          <button
            disabled={!inStock}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
