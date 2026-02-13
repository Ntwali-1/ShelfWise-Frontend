'use client'

import { useAuth } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Heart,
  Zap,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Package,
  TrendingUp,
  Users,
  ArrowDown,
  CheckCircle,
  CreditCard,
  Headphones,
  Gift,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import LandingNavbar from '@/components/LandingNavbar'
import ClientOnly from '@/components/ClientOnly'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      type: 'spring' as const,
      stiffness: 100,
    },
  },
}

export default function Home() {
  const { isSignedIn } = useAuth()

  return isSignedIn ? <HomePage /> : <LandingPage />
}

function LandingPage() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Electronics', 'Fashion', 'Home Decor', 'Sports Gear', 'Books & More'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen">
      <ClientOnly>
        <LandingNavbar />
      </ClientOnly>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-gradient-to-br from-background via-indigo-50/30 to-purple-50/20 dark:from-background dark:via-indigo-900/10 dark:to-purple-900/10"
      >
        <motion.div
          className="container max-w-7xl mx-auto z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div className="mb-6" variants={itemVariants}>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  <Zap className="inline h-4 w-4 mr-2" />
                  Welcome to ShelfWise
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
                variants={itemVariants}
              >
                <span className="block mb-2">Shop Smarter,</span>
                <span className="text-primary block text-glow">Live Better</span>
              </motion.h1>

              <motion.div
                className="flex items-center justify-center lg:justify-start gap-3 mb-8 text-xl md:text-2xl font-semibold min-h-[40px]"
                variants={itemVariants}
              >
                <span className="text-foreground/80">Discover</span>
                <span ref={typedRef} className="text-primary"></span>
              </motion.div>

              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Experience the future of online shopping with curated products, exclusive deals, and
                seamless checkout. Join thousands of happy customers who trust ShelfWise for their
                shopping needs.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                variants={itemVariants}
              >
                <SignInButton mode="modal">
                  <button className="cosmic-button group">
                    <ShoppingBag className="inline-block mr-2 h-5 w-5" />
                    Start Shopping
                    <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
                <a
                  href="#features"
                  className="px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 font-medium"
                >
                  Learn More
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </motion.div>
            </div>

            {/* Image Collage */}
            <motion.div className="flex-1 flex items-center justify-center" variants={itemVariants}>
              <div className="relative w-full max-w-lg">
                {/* Main Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Top Left */}
                  <motion.div
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
                      alt="Headphones"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white font-semibold">
                      Electronics
                    </div>
                  </motion.div>

                  {/* Top Right */}
                  <motion.div
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop"
                      alt="Fashion"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white font-semibold">Fashion</div>
                  </motion.div>

                  {/* Bottom Left */}
                  <motion.div
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop"
                      alt="Home Decor"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white font-semibold">
                      Home & Living
                    </div>
                  </motion.div>

                  {/* Bottom Right */}
                  <motion.div
                    className="relative h-48 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop"
                      alt="Sports"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white font-semibold">Sports</div>
                  </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary shadow-lg shadow-primary/50 flex flex-col items-center justify-center border-4 border-background"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                >
                  <Sparkles className="w-8 h-8 text-white mb-1" />
                  <span className="text-xs font-bold text-white">NEW</span>
                </motion.div>

                {/* Decorative Blurs */}
                <motion.div
                  className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <motion.div
                  className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"
                  animate={{ scale: [1.2, 1, 1.2] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-4 bg-gradient-to-b from-indigo-50/30 to-background dark:from-indigo-900/10 dark:to-background"
      >
        <motion.div
          className="container mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-primary">ShelfWise?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a perfect shopping experience, all in one place
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure Payments"
              description="Shop with confidence using our encrypted payment system with SSL protection"
              delay={0}
            />
            <FeatureCard
              icon={<Truck className="h-8 w-8" />}
              title="Fast Delivery"
              description="Get your orders delivered quickly with real-time tracking"
              delay={0.1}
            />
            <FeatureCard
              icon={<Star className="h-8 w-8" />}
              title="Quality Products"
              description="Curated selection of high-quality items from trusted brands"
              delay={0.2}
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8" />}
              title="Wishlist & Save"
              description="Save your favorites and get notified about exclusive deals"
              delay={0.3}
            />
            <FeatureCard
              icon={<CreditCard className="h-8 w-8" />}
              title="Easy Checkout"
              description="Seamless checkout process with multiple payment options"
              delay={0.4}
            />
            <FeatureCard
              icon={<Headphones className="h-8 w-8" />}
              title="24/7 Support"
              description="Our customer support team is always here to help you"
              delay={0.5}
            />
            <FeatureCard
              icon={<Gift className="h-8 w-8" />}
              title="Rewards Program"
              description="Earn points with every purchase and get exclusive rewards"
              delay={0.6}
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Easy Returns"
              description="30-day hassle-free returns on all products"
              delay={0.7}
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4">
        <motion.div
          className="container mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How <span className="text-primary">It Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Shopping made simple in just three easy steps
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-3">
            <StepCard
              number="01"
              title="Browse & Discover"
              description="Explore thousands of products across multiple categories. Use our smart filters to find exactly what you need."
              icon={<Package className="h-12 w-12" />}
              delay={0}
            />
            <StepCard
              number="02"
              title="Add to Cart"
              description="Found something you love? Add it to your cart and continue shopping or proceed to checkout."
              icon={<ShoppingBag className="h-12 w-12" />}
              delay={0.2}
            />
            <StepCard
              number="03"
              title="Fast Delivery"
              description="Complete your purchase securely and get your items delivered right to your doorstep."
              icon={<Truck className="h-12 w-12" />}
              delay={0.4}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-purple-50/20 to-background dark:from-primary/10 dark:via-purple-900/10 dark:to-background">
        <motion.div
          className="container mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Package />} number="10K+" label="Products" delay={0} />
            <StatCard icon={<Users />} number="50K+" label="Happy Customers" delay={0.1} />
            <StatCard icon={<Star />} number="4.9" label="Average Rating" delay={0.2} />
            <StatCard icon={<Award />} number="99%" label="Satisfaction Rate" delay={0.3} />
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4">
        <motion.div
          className="container mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Our <span className="text-primary">Customers Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              name="Sarah Johnson"
              role="Fashion Enthusiast"
              content="ShelfWise has completely transformed my shopping experience. The quality of products and fast delivery is unmatched!"
              rating={5}
              delay={0}
            />
            <TestimonialCard
              name="Michael Chen"
              role="Tech Lover"
              content="I love the variety of electronics available. The prices are competitive and the customer service is excellent."
              rating={5}
              delay={0.2}
            />
            <TestimonialCard
              name="Emma Davis"
              role="Home Decorator"
              content="Found amazing home decor items at great prices. The wishlist feature helps me keep track of items I want to buy later."
              rating={5}
              delay={0.4}
            />
          </div>
        </motion.div>
      </section>

      {/* Pricing/Benefits Section */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-indigo-50/30 to-background dark:from-indigo-900/10 dark:to-background">
        <motion.div
          className="container mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Free</span> to Join
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No subscription fees, no hidden charges. Just great products at great prices.
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-2xl border border-border/30 p-8 md:p-12 shadow-2xl"
            variants={itemVariants}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <BenefitItem text="Free account creation" />
              <BenefitItem text="No monthly fees" />
              <BenefitItem text="Free shipping on orders over $50" />
              <BenefitItem text="Exclusive member discounts" />
              <BenefitItem text="Early access to sales" />
              <BenefitItem text="Rewards points on purchases" />
              <BenefitItem text="Priority customer support" />
              <BenefitItem text="Easy returns & refunds" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          className="container mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-3xl md:text-5xl font-bold mb-4" variants={itemVariants}>
            Ready to Start Shopping?
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" variants={itemVariants}>
            Join our community of happy shoppers and discover amazing products today. Sign up now and get 10% off your first order!
          </motion.p>
          <motion.div variants={itemVariants}>
            <SignInButton mode="modal">
              <button className="cosmic-button text-lg">
                Get Started Now
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
            </SignInButton>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-purple-50/20 to-primary/10 dark:from-primary/10 dark:via-purple-900/10 dark:to-primary/10">
        <motion.div
          className="container mx-auto px-4 py-16 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-xl">
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
                Discover Your Next <span className="text-primary text-glow">Favorite Product</span>
              </h1>
              <p className="mb-6 text-lg text-muted-foreground">
                Explore our curated collection of premium products at unbeatable prices
              </p>
              <Link href="/products" className="cosmic-button inline-flex items-center gap-2">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <motion.div
              className="relative h-64 w-full max-w-md lg:h-80"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="h-full w-full rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                  alt="Shopping"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="border-b border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-1 text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-1 text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-1 text-3xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-1 text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CategoryCard
              name="Electronics"
              count="2,500+ items"
              image="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop"
            />
            <CategoryCard
              name="Fashion"
              count="5,000+ items"
              image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop"
            />
            <CategoryCard
              name="Home & Living"
              count="3,200+ items"
              image="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=400&fit=crop"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      className="group relative bg-card rounded-xl overflow-hidden shadow-lg border border-border/30 p-6 hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: 'spring' as const, stiffness: 100 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

function StepCard({
  number,
  title,
  description,
  icon,
  delay,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      className="relative text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: 'spring' as const, stiffness: 100 }}
    >
      <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="mb-4 text-5xl font-bold text-primary/20">{number}</div>
      <h3 className="mb-3 text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

function StatCard({
  icon,
  number,
  label,
  delay,
}: {
  icon: React.ReactNode
  number: string
  label: string
  delay: number
}) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: 'spring' as const, stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="mb-3 inline-flex rounded-full bg-primary/10 p-4 text-primary">{icon}</div>
      <div className="mb-1 text-3xl font-bold text-primary">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

function TestimonialCard({
  name,
  role,
  content,
  rating,
  delay,
}: {
  name: string
  role: string
  content: string
  rating: number
  delay: number
}) {
  return (
    <motion.div
      className="bg-card rounded-xl border border-border/30 p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: 'spring' as const, stiffness: 100 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 flex items-center gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="mb-4 text-muted-foreground italic">"{content}"</p>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </motion.div>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 rounded-full bg-primary/10 p-1">
        <CheckCircle className="h-5 w-5 text-primary" />
      </div>
      <span className="text-foreground">{text}</span>
    </div>
  )
}

function CategoryCard({ name, count, image }: { name: string; count: string; image: string }) {
  return (
    <Link
      href={`/products?category=${name.toLowerCase()}`}
      className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-2xl"
    >
      <motion.div
        className="relative h-48 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="mb-2 text-2xl font-bold">{name}</h3>
          <p className="text-sm text-white/80">{count}</p>
        </div>
      </motion.div>
    </Link>
  )
}
