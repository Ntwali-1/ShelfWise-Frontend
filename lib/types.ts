// User & Profile Types
export interface User {
  id: number
  email: string
  role: 'client' | 'admin'
}

export interface Profile {
  id: number
  userId: number
  firstName: string
  lastName: string
  birthday?: string
  bio?: string
  address?: string
  phoneNumber?: string
  avatarUrl?: string
}

// Product Types
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  quantity: number
  sku: string
  categoryId: number
  category?: Category
  imageUrl?: string
  createdAt: string
  rating?: number
  reviews?: Review[]
}

export interface Category {
  id: number
  name: string
  createdAt: string
}

// Cart Types
export interface Cart {
  id: number
  userId: number
  items: CartItem[]
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: number
  cartId: number
  productId: string
  product: Product
  quantity: number
  createdAt: string
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  userId: number
  address: string
  status: OrderStatus
  totalPrice: number
  createdAt: string
  updatedAt: string
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: string
  productId: string
  product: Product
  quantity: number
  price: number
}

// Wishlist Types
export interface WishlistItem {
  id: number
  userId: number
  productId: string
  product: Product
  createdAt: string
}

// Review Types
export interface Review {
  id: number
  userId: number
  user?: User
  productId: string
  rating: number
  comment?: string
  createdAt: string
  updatedAt: string
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
