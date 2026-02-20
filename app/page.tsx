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
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-white dark:bg-background overflow-hidden"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,hsl(var(--primary)/0.08),transparent)]"></div>

          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 2px, transparent 2px), linear-gradient(to bottom, hsl(var(--primary)) 2px, transparent 2px)`,
              backgroundSize: '200px 200px',
            }}
          ></div>
        </div>

        {/* Floating SVG Frames */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-10 top-2/5 -translate-y-1/3 w-[200px] h-[200px] rotate-20 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-6 top-3/5 -translate-y-1/2 w-[200px] h-[200px] rotate-0 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 top-1/2 -translate-y-1/2 w-[200px] h-[200px] -rotate-4 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [12, -12, 12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 top-4/6 -translate-y-1/2 w-[200px] h-[200px] rotate-30 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

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

              <div className="inline-block relative mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -left-32 -top-8 hidden lg:block"
                >
                  <img src="/LeftArrow.png" width={60} height={60} alt="" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -right-32 -top-8 hidden lg:block"
                >
                  <img src="/RightArrow.png" width={60} height={60} alt="" />
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
                  variants={itemVariants}
                >
                  <span className="block mb-2">Shop Smarter,</span>
                  <span className="text-primary block text-glow">Live Better</span>
                </motion.h1>
              </div>

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

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bottom-10 top-160 blur-[80px] bg-primary/40 h-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
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
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-white dark:bg-background">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,hsl(var(--primary)/0.08),transparent)]"></div>

          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 2px, transparent 2px), linear-gradient(to bottom, hsl(var(--primary)) 2px, transparent 2px)`,
              backgroundSize: '200px 200px',
            }}
          ></div>
        </div>

        {/* Floating SVG Frames */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-10 top-1/3 w-[200px] h-[200px] rotate-20 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-6 top-2/3 w-[200px] h-[200px] rotate-0 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 top-1/2 -translate-y-1/2 w-[200px] h-[200px] -rotate-4 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [12, -12, 12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 top-2/3 w-[200px] h-[200px] rotate-30 z-0 hidden lg:block opacity-5 dark:opacity-10"
        >
          <img src="/Rectangle-Frame.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-2xl">
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  <Sparkles className="h-4 w-4" />
                  Welcome Back to ShelfWise
                </span>
              </motion.div>

              <div className="inline-block relative mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -left-28 -top-6 hidden lg:block"
                >
                  <img src="/LeftArrow.png" width={50} height={50} alt="" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -right-28 -top-6 hidden lg:block"
                >
                  <img src="/RightArrow.png" width={50} height={50} alt="" />
                </motion.div>

                <motion.h1
                  className="text-5xl font-bold sm:text-6xl lg:text-7xl leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Discover Your Next{' '}
                  <span className="text-primary text-glow block mt-2">Favorite Product</span>
                </motion.h1>
              </div>
              <motion.p
                className="mb-8 text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Explore our curated collection of premium products across all categories. Quality
                meets affordability.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/products" className="cosmic-button inline-flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Browse All Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/categories"
                  className="px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 font-medium inline-flex items-center gap-2"
                >
                  <Package className="h-5 w-5" />
                  View Categories
                </Link>
              </motion.div>

              {/* Quick Action Cards */}
              <motion.div
                className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/cart"
                  className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingBag className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium">My Cart</div>
                </Link>
                <Link
                  href="/wishlist"
                  className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <Heart className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium">Wishlist</div>
                </Link>
                <Link
                  href="/orders"
                  className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <Package className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium">Orders</div>
                </Link>
                <Link
                  href="/profile"
                  className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <Users className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium">Profile</div>
                </Link>
              </motion.div>
            </div>

            {/* Hero Image Grid */}
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="relative h-56 rounded-2xl overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
                    alt="Electronics"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-bold">Electronics</div>
                    <div className="text-sm opacity-90">Latest Tech</div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative h-56 rounded-2xl overflow-hidden shadow-xl mt-8"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop"
                    alt="Fashion"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-bold">Fashion</div>
                    <div className="text-sm opacity-90">Trending Styles</div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative h-56 rounded-2xl overflow-hidden shadow-xl -mt-8"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop"
                    alt="Home"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-bold">Home</div>
                    <div className="text-sm opacity-90">Cozy Living</div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative h-56 rounded-2xl overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop"
                    alt="Sports"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-bold">Sports</div>
                    <div className="text-sm opacity-90">Stay Active</div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/50 flex flex-col items-center justify-center border-4 border-background"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <TrendingUp className="w-10 h-10 text-white mb-1" />
                <span className="text-xs font-bold text-white">HOT</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bottom-10 top-160 blur-[80px] bg-primary/40 h-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-purple-50/20 dark:from-primary/5 dark:to-purple-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <motion.div
              className="group text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-primary/10 p-4 text-primary group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6" />
              </div>
              <div className="mb-1 text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground font-medium">Products Available</div>
            </motion.div>

            <motion.div
              className="group text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-primary/10 p-4 text-primary group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <div className="mb-1 text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground font-medium">Happy Customers</div>
            </motion.div>

            <motion.div
              className="group text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-primary/10 p-4 text-primary group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6" />
              </div>
              <div className="mb-1 text-3xl font-bold text-primary">4.9</div>
              <div className="text-sm text-muted-foreground font-medium">Average Rating</div>
            </motion.div>

            <motion.div
              className="group text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-primary/10 p-4 text-primary group-hover:scale-110 transition-transform">
                <Headphones className="h-6 w-6" />
              </div>
              <div className="mb-1 text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground font-medium">Customer Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl md:text-5xl font-bold">
              Shop by <span className="text-primary">Category</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our carefully curated categories and find exactly what you're looking for
            </p>
          </motion.div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-muted/50 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category: any, index: number) => (
                <EnhancedCategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-primary/5 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl md:text-5xl font-bold">
              Why Shop <span className="text-primary">With Us?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the best online shopping with our premium features
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureBox
              icon={<Shield className="h-8 w-8" />}
              title="Secure Payments"
              description="Shop safely with encrypted transactions"
              delay={0}
            />
            <FeatureBox
              icon={<Truck className="h-8 w-8" />}
              title="Fast Delivery"
              description="Quick shipping with real-time tracking"
              delay={0.1}
            />
            <FeatureBox
              icon={<Gift className="h-8 w-8" />}
              title="Special Offers"
              description="Exclusive deals and discounts daily"
              delay={0.2}
            />
            <FeatureBox
              icon={<Award className="h-8 w-8" />}
              title="Quality Guaranteed"
              description="Premium products from trusted brands"
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function EnhancedCategoryCard({ category, index }: { category: any; index: number }) {
  const categoryImages: Record<string, string> = {
    Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
    Fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
    'Home & Living': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=400&fit=crop',
    Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop',
    Books: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=400&fit=crop',
    Toys: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop',
    Beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    Groceries: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    Furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
    Garden: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    Automotive: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    Music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    Pet: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop',
    Office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    Kitchen: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop',
  }

  const image = categoryImages[category.name] || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/products?category=${category.name}`}
        className="group block relative overflow-hidden rounded-2xl bg-card border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl"
      >
        <motion.div
          className="relative h-64 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <motion.div
              className="transform transition-transform duration-300 group-hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                {category.name}
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/90 mb-3">{category.description || 'Explore amazing products'}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium group-hover:bg-white/30 transition-all duration-300">
                <Package className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Browse Now</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/20 to-transparent" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

function FeatureBox({
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
      className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <motion.div
        className="mb-4 inline-flex rounded-xl bg-primary/10 p-4 text-primary transition-all duration-300"
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
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
      className="group relative overflow-hidden rounded-2xl border-2 border-border/50 bg-card hover:border-primary/50 transition-all hover:shadow-2xl"
    >
      <motion.div
        className="relative h-64 overflow-hidden"
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
          <h3 className="mb-2 text-2xl font-bold flex items-center gap-2">
            {name}
            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-sm text-white/80">{count}</p>
        </div>
      </motion.div>
    </Link>
  )
}
