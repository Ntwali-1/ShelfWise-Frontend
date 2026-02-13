'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data
const mockProduct = {
  id: '1',
  name: 'Wireless Headphones Pro',
  price: 299.99,
  rating: 4.5,
  reviews: 128,
  description:
    'Experience premium sound quality with our Wireless Headphones Pro. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.',
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Premium comfort padding',
    'Bluetooth 5.0 connectivity',
    'Built-in microphone',
    'Foldable design',
  ],
  category: 'Electronics',
  inStock: true,
  quantity: 50,
  sku: 'WHP-001',
}

const mockReviews = [
  {
    id: 1,
    user: 'John D.',
    rating: 5,
    comment: 'Amazing sound quality! Best headphones I\'ve ever owned.',
    date: '2 days ago',
  },
  {
    id: 2,
    user: 'Sarah M.',
    rating: 4,
    comment: 'Great product, very comfortable for long listening sessions.',
    date: '1 week ago',
  },
  {
    id: 3,
    user: 'Mike R.',
    rating: 5,
    comment: 'The noise cancellation is incredible. Worth every penny!',
    date: '2 weeks ago',
  },
]

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, mockProduct.quantity))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="transition-colors hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{mockProduct.name}</span>
        </div>

        {/* Back Button */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="mb-4 aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'aspect-square overflow-hidden rounded-lg border-2 transition-all',
                    selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {mockProduct.category}
            </div>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{mockProduct.name}</h1>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(mockProduct.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{mockProduct.rating}</span>
              </div>
              <span className="text-muted-foreground">({mockProduct.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6 text-4xl font-bold">${mockProduct.price}</div>

            {/* Description */}
            <p className="mb-6 text-muted-foreground">{mockProduct.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="mb-3 font-semibold">Key Features:</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <span className="text-sm text-muted-foreground">
                  ({mockProduct.quantity} available)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-8 flex gap-3">
              <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">2 Year Warranty</div>
                  <div className="text-xs text-muted-foreground">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">30-Day Returns</div>
                  <div className="text-xs text-muted-foreground">Money back guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Customer Reviews</h2>
          <div className="grid gap-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="mb-1 font-semibold">{review.user}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
