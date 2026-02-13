'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'

// Mock wishlist data
const mockWishlistItems = [
  {
    id: '1',
    productId: '3',
    name: 'Premium Leather Bag',
    price: 159.99,
    rating: 4.6,
    reviews: 89,
    image: '/placeholder-product.jpg',
    inStock: true,
  },
  {
    id: '2',
    productId: '4',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    rating: 4.7,
    reviews: 167,
    image: '/placeholder-product.jpg',
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const removeItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex rounded-full bg-muted p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Your wishlist is empty</h1>
            <p className="mb-8 text-muted-foreground">
              Save your favorite items here to purchase them later
            </p>
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
          </div>
          <button
            onClick={() => setWishlistItems([])}
            className="text-sm text-destructive transition-colors hover:text-destructive/80"
          >
            Clear All
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <Link href={`/products/${item.productId}`}>
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  {!item.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <span className="rounded-lg bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <button
                onClick={() => removeItem(item.id)}
                className="absolute right-2 top-2 rounded-lg bg-background/80 p-2 text-destructive backdrop-blur-sm transition-colors hover:bg-background"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="p-4">
                <Link href={`/products/${item.productId}`}>
                  <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">
                    {item.name}
                  </h3>
                </Link>

                <div className="mb-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({item.reviews})</span>
                </div>

                <div className="mb-4 text-xl font-bold">${item.price}</div>

                <button
                  disabled={!item.inStock}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
