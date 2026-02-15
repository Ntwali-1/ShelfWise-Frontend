// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4500'

// Helper to get auth token
async function getAuthToken() {
  // This will be replaced with Clerk's getToken in components
  return null;
}

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
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

// Users API
export const usersApi = {
  selectRole: (role: 'client' | 'admin', token: string) =>
    apiRequest('/users/select-role', {
      method: 'PUT',
      body: JSON.stringify({ role }),
    }, token),

  getCurrentUser: (token: string) =>
    apiRequest('/users/me', {}, token),
}

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.category) queryParams.append('category', params.category)
    if (params?.search) queryParams.append('search', params.search)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return apiRequest(`/products${query ? `?${query}` : ''}`)
  },

  getById: (id: string) => apiRequest(`/products/${id}`),

  search: (query: string) => apiRequest(`/products/search?q=${encodeURIComponent(query)}`),

  create: (data: any, token: string) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token),

  update: (id: string, data: any, token: string) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token),

  delete: (id: string, token: string) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }, token),
}

// Cart API
export const cartApi = {
  get: (token: string) => apiRequest('/cart', {}, token),

  addItem: (productId: string, quantity: number, token: string) => apiRequest('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }, token),

  removeItem: (itemId: number, token: string) => apiRequest(`/cart/items/${itemId}`, {
    method: 'DELETE',
  }, token),

  clear: (token: string) => apiRequest('/cart', {
    method: 'DELETE',
  }, token),

  updateItem: (itemId: number, quantity: number, token: string) => apiRequest(`/cart/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  }, token),
}

// Orders API
export const ordersApi = {
  getAll: (token: string) => apiRequest('/orders', {}, token),

  getById: (id: string, token: string) => apiRequest(`/orders/${id}`, {}, token),

  create: (data: { address: string; items: Array<{ productId: string; quantity: number }> }, token: string) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),

  // Admin endpoints
  getAllAdmin: (status?: string, token?: string) => {
    const query = status ? `?status=${status}` : ''
    return apiRequest(`/orders/admin/all${query}`, {}, token)
  },

  updateStatus: (id: string, status: string, token: string) => apiRequest(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }, token),

  getStatistics: (token: string) => apiRequest('/orders/admin/statistics', {}, token),
}

// Wishlist API
export const wishlistApi = {
  getAll: (token: string) => apiRequest('/wishlist', {}, token),

  add: (productId: string, token: string) => apiRequest('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  }, token),

  remove: (productId: string, token: string) => apiRequest(`/wishlist/${productId}`, {
    method: 'DELETE',
  }, token),
}

// Reviews API
export const reviewsApi = {
  getByProduct: (productId: string) => apiRequest(`/reviews/products/${productId}`),

  create: (productId: string, data: { rating: number; comment?: string }, token: string) =>
    apiRequest(`/reviews/products/${productId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),

  update: (reviewId: number, data: { rating: number; comment?: string }, token: string) =>
    apiRequest(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token),

  delete: (reviewId: number, token: string) => apiRequest(`/reviews/${reviewId}`, {
    method: 'DELETE',
  }, token),
}

// Categories API
export const categoriesApi = {
  getAll: () => apiRequest('/categories'),

  getProducts: (name: string) => apiRequest(`/categories/${name}/products`),

  create: (name: string, token: string) => apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  }, token),

  delete: (id: number, token: string) => apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  }, token),
}

// Profile API
export const profileApi = {
  get: (token: string) => apiRequest('/profile', {}, token),

  create: (data: any, token: string) => apiRequest('/profile', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token),

  update: (data: any, token: string) => apiRequest('/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token),

  updateAvatar: (avatarUrl: string, token: string) => apiRequest('/profile/avatar', {
    method: 'POST',
    body: JSON.stringify({ avatarUrl }),
  }, token),
}
