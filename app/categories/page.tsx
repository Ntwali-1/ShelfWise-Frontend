'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Laptop, Shirt, Home, Dumbbell, Book, Utensils, Gamepad2, Camera, Package, ShoppingCart, Heart } from 'lucide-react'
import { categoriesApi, productsApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface Category {
  id: number
  name: string
  _count?: {
    Product: number
  }
}

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

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  electronics: Laptop,
  fashion: Shirt,
  'home & living': Home,
  'home and living': Home,
  'sports & fitness': Dumbbell,
  'sports and fitness': Dumbbell,
  'books & media': Book,
  'books and media': Book,
  'food & beverage': Utensils,
  'food and beverage': Utensils,
  gaming: Gamepad2,
  photography: Camera,
}

const categoryColors: Record<string, string> = {
  electronics: 'from-blue-500/20 to-cyan-500/20',
  fashion: 'from-pink-500/20 to-rose-500/20',
  'home & living': 'from-green-500/20 to-emerald-500/20',
  'home and living': 'from-green-500/20 to-emerald-500/20',
  'sports & fitness': 'from-orange-500/20 to-amber-500/20',
  'sports and fitness': 'from-orange-500/20 to-amber-500/20',
  'books & media': 'from-purple-500/20 to-violet-500/20',
  'books and media': 'from-purple-500/20 to-violet-500/20',
  'food & beverage': 'from-red-500/20 to-orange-500/20',
  'food and beverage': 'from-red-500/20 to-orange-500/20',
  gaming: 'from-indigo-500/20 to-blue-500/20',
  photography: 'from-teal-500/20 to-cyan-500/20',
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory)
    } else {
      setProducts([])
    }
  }, [selectedCategory])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (error: any) {
      console.error('Failed to fetch categories:', error)
      toast.error(error.message || 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const fetchProductsByCategory = async (categoryName: string) => {
    try {
      setProductsLoading(true)
      const response = await productsApi.getAll({ category: categoryName, limit: 12 })
      const productList = response.data ?? response.products ?? (Array.isArray(response) ? response : [])
      setProducts(productList)
    } catch (error: any) {
      console.error('Failed to fetch products:', error)
      toast.error(error.message || 'Failed to load products')
    } finally {
      setProductsLoading(false)
    }
  }

  const getCategoryIcon = (categoryName: string) => {
    const normalizedName = categoryName.toLowerCase()
    return categoryIcons[normalizedName] || Package
  }

  const getCategoryColor = (categoryName: string) => {
    const normalizedName = categoryName.toLowerCase()
    return categoryColors[normalizedName] || 'from-primary/20 to-accent/20'
  }

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name)
              const color = getCategoryColor(category.name)
              const isSelected = selectedCategory === category.name
              const productCount = category._count?.Product || 0

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                  className={`group relative overflow-hidden rounded-xl border-2 p-8 transition-all text-left ${
                    isSelected
                      ? 'border-primary bg-card shadow-lg'
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity ${
                      isSelected ? 'opacity-100' : 'group-hover:opacity-100'
                    }`}
                  />
                  <div className="relative">
                    <div className={`mb-4 inline-flex rounded-lg p-4 transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {productCount.toLocaleString()} {productCount === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Products Section */}
        {selectedCategory && (
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Products in <span className="text-primary">{selectedCategory}</span>
              </h2>
              <Link
                href={`/products?category=${selectedCategory.toLowerCase()}`}
                className="text-sm text-primary hover:underline"
              >
                View All →
              </Link>
            </div>

            {productsLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 rounded-xl border border-border bg-card">
                <p className="text-muted-foreground">No products found in this category</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                        )}
                        {product.quantity === 0 && (
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
                          <h3 className="font-semibold transition-colors group-hover:text-primary line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <button className="rounded-lg p-1 transition-colors hover:bg-accent">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mb-2 text-sm text-muted-foreground">{product.category.name}</p>
                      <p className="mb-3 text-xs text-muted-foreground">
                        {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                        <button
                          disabled={product.quantity === 0}
                          className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Featured Banner */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Can&apos;t find what you&apos;re looking for?</h2>
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
