import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const inStock = product.quantity > 0

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg">
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
            <h3 className="font-semibold transition-colors group-hover:text-primary line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={() => onAddToWishlist?.(product.id)}
            className="rounded-lg p-1 transition-colors hover:bg-accent"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        {product.category && (
          <p className="mb-2 text-sm text-muted-foreground">{product.category.name}</p>
        )}
        {product.rating && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            {product.reviews && (
              <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
          <button
            onClick={() => onAddToCart?.(product.id)}
            disabled={!inStock}
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-all',
              inStock
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
