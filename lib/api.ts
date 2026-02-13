// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.category) queryParams.append('category', params.category)
    if (params?.search) queryParams.append('search', params.search)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    
    return apiRequest(`/products?${queryParams.toString()}`)
  },
  
  getById: (id: string) => apiRequest(`/products/${id}`),
  
  create: (data: any) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: any) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: string) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
}

// Cart API
export const cartApi = {
  get: () => apiRequest('/cart'),
  
  addItem: (productId: string, quantity: number) => apiRequest('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),
  
  updateItem: (itemId: number, quantity: number) => apiRequest(`/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  
  removeItem: (itemId: number) => apiRequest(`/cart/items/${itemId}`, {
    method: 'DELETE',
  }),
  
  clear: () => apiRequest('/cart', {
    method: 'DELETE',
  }),
}

// Orders API
export const ordersApi = {
  getAll: () => apiRequest('/orders'),
  
  getById: (id: string) => apiRequest(`/orders/${id}`),
  
  create: (data: { address: string; items: Array<{ productId: string; quantity: number }> }) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  updateStatus: (id: string, status: string) => apiRequest(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
}

// Wishlist API
export const wishlistApi = {
  getAll: () => apiRequest('/wishlist'),
  
  add: (productId: string) => apiRequest('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  }),
  
  remove: (productId: string) => apiRequest(`/wishlist/${productId}`, {
    method: 'DELETE',
  }),
}

// Reviews API
export const reviewsApi = {
  getByProduct: (productId: string) => apiRequest(`/products/${productId}/reviews`),
  
  create: (productId: string, data: { rating: number; comment?: string }) =>
    apiRequest(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (reviewId: number, data: { rating: number; comment?: string }) =>
    apiRequest(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (reviewId: number) => apiRequest(`/reviews/${reviewId}`, {
    method: 'DELETE',
  }),
}

// Categories API
export const categoriesApi = {
  getAll: () => apiRequest('/categories'),
  
  create: (name: string) => apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  }),
  
  delete: (id: number) => apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  }),
}

// Profile API
export const profileApi = {
  get: () => apiRequest('/profile'),
  
  update: (data: any) => apiRequest('/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
}
