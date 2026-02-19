'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { productsApi, categoriesApi, usersApi } from '@/lib/api'
import { ArrowLeft, Upload, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: number
  name: string
}

interface ProductFormData {
  name: string
  description: string
  price: string
  categoryId: string
  quantity: string
  sku: string
  imageUrl: string
}

export default function AddProductPage() {
  const router = useRouter()
  const { getToken } = useAuth()
  const { user: clerkUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    quantity: '',
    sku: '',
    imageUrl: '',
  })

  useEffect(() => {
    checkAdminRole()
    fetchCategories()
  }, [])

  const checkAdminRole = async () => {
    try {
      const token = await getToken()
      if (!token) {
        toast.error('Please sign in')
        router.push('/sign-in')
        return
      }

      const userData = await usersApi.getCurrentUser(token) as any
      if (userData.role !== 'admin') {
        toast.error('Access denied. Admin role required.')
        router.push('/admin')
        return
      }
      setIsAdmin(true)
    } catch (error) {
      console.error('Failed to check admin role:', error)
      toast.error('Failed to verify permissions')
      router.push('/admin')
    } finally {
      setCheckingAuth(false)
    }
  }

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const data = await categoriesApi.getAll()
      console.log('Categories fetched:', data)
      
      if (Array.isArray(data)) {
        setCategories(data)
        if (data.length === 0) {
          toast.error('No categories found. Please create categories first.')
        }
      } else {
        console.error('Invalid categories data:', data)
        toast.error('Failed to load categories')
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to load categories')
    } finally {
      setLoadingCategories(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Product name is required')
      return false
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Valid price is required')
      return false
    }
    if (!formData.categoryId) {
      toast.error('Category is required')
      return false
    }
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      toast.error('Valid quantity is required')
      return false
    }
    if (!formData.sku.trim()) {
      toast.error('SKU is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const token = await getToken()
      if (!token) {
        toast.error('Please sign in')
        return
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        quantity: parseInt(formData.quantity),
        sku: formData.sku.trim(),
        imageUrl: formData.imageUrl.trim() || undefined,
      }

      await productsApi.create(productData, token)
      toast.success('Product added successfully!')
      router.push('/admin')
    } catch (error: any) {
      console.error('Failed to add product:', error)
      toast.error(error.message || 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Blur Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 backdrop-blur-3xl" />
      
      <div className="relative container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-3xl">
        {checkingAuth ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !isAdmin ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <p className="text-lg font-medium">Access Denied</p>
            <p className="text-muted-foreground">You need admin privileges to access this page</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Add New Product</h1>
              <p className="text-muted-foreground mt-2">Fill in the details to add a new product to your store</p>
            </div>

            {/* Form Card */}
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Wireless Headphones Pro"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  disabled={loadingCategories}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                  required
                >
                  <option value="">
                    {loadingCategories ? 'Loading categories...' : 'Select a category'}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {!loadingCategories && categories.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">No categories available. Please create one first.</p>
                )}
              </div>
            </div>

            {/* Quantity and SKU Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              {/* SKU */}
              <div>
                <label htmlFor="sku" className="block text-sm font-medium mb-2">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g., WHP-001"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2.5 pl-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {formData.imageUrl && (
                <div className="mt-3 rounded-lg border border-border p-2 bg-background">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none sm:px-8 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
              <Link
                href="/admin"
                className="flex-1 sm:flex-none sm:px-8 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-all text-center font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
          </>
        )}
      </div>
    </div>
  )
}
