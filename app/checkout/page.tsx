'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Truck, MapPin, ChevronLeft, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')

  // Mock cart data
  const cartItems = [
    { id: '1', name: 'Wireless Headphones Pro', price: 299.99, quantity: 1 },
    { id: '2', name: 'Smart Watch Series 5', price: 399.99, quantity: 2 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-between">
              {(['shipping', 'payment', 'review'] as const).map((s, index) => (
                <div key={s} className="flex flex-1 items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-medium ${
                        step === s
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="hidden text-sm font-medium sm:block">
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </span>
                  </div>
                  {index < 2 && <div className="mx-4 h-px flex-1 bg-border" />}
                </div>
              ))}
            </div>

            {/* Shipping Form */}
            {step === 'shipping' && (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Truck className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Address</label>
                    <input
                      type="text"
                      className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium">City</label>
                      <input
                        type="text"
                        className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">State</label>
                      <input
                        type="text"
                        className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">ZIP Code</label>
                      <input
                        type="text"
                        className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Card Number</label>
                    <input
                      type="text"
                      className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Cardholder Name</label>
                    <input
                      type="text"
                      className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Expiry Date</label>
                      <input
                        type="text"
                        className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">CVV</label>
                      <input
                        type="text"
                        className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex h-12 flex-1 items-center justify-center rounded-lg border border-border font-medium transition-all hover:bg-accent"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    className="flex h-12 flex-1 items-center justify-center rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Review */}
            {step === 'review' && (
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-xl font-bold">Review Your Order</h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between border-b border-border pb-4 last:border-0">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('payment')}
                    className="flex h-12 flex-1 items-center justify-center rounded-lg border border-border font-medium transition-all hover:bg-accent"
                  >
                    Back
                  </button>
                  <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90">
                    <Lock className="h-4 w-4" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

              <div className="mb-4 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-border pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
