'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { usersApi } from '@/lib/api';
import type { User } from '@/lib/types';
import { ShoppingBag, Settings, Check, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SelectRolePage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'client' | 'admin' | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  // Check if user already has a role
  useEffect(() => {
    const checkExistingRole = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setChecking(false);
          return;
        }

        const userData = await usersApi.getCurrentUser(token) as User;
        
        if (userData?.role) {
          if (userData.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/products');
          }
        } else {
          setChecking(false);
        }
      } catch (err: any) {
        console.error('Error checking role:', err);
        setChecking(false);
      }
    };

    if (user) {
      checkExistingRole();
    }
  }, [user, getToken, router]);

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      await usersApi.selectRole(selectedRole, token);
      
      if (selectedRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/products');
      }
    } catch (err: any) {
      console.error('Role selection error:', err);
      setError(err.message || 'Failed to select role');
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const roles = [
    {
      id: 'client' as const,
      title: 'Customer',
      description: 'Browse our curated collection, add items to your cart, place orders, and build your wishlist. Perfect for shoppers who want a seamless buying experience.',
      icon: ShoppingBag,
      features: ['Browse & discover products', 'Add to cart & wishlist', 'Track orders', 'Manage your profile'],
      gradient: 'from-primary/20 via-purple-500/10 to-background',
      iconBg: 'bg-primary/10 text-primary',
      borderColor: 'border-primary/50',
    },
    {
      id: 'admin' as const,
      title: 'Admin',
      description: 'Manage your store with full control. Add products, organize categories, process orders, and view analytics to grow your business.',
      icon: Settings,
      features: ['Manage products & categories', 'Process orders', 'View analytics', 'Full store control'],
      gradient: 'from-violet-500/20 via-purple-500/10 to-background',
      iconBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
      borderColor: 'border-violet-500/50',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Package className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">
                <span className="text-foreground">Shelf</span>
                <span className="text-primary">Wise</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome, {user?.firstName || 'there'}!
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose how you&apos;d like to use ShelfWise
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl"
            >
              <p className="text-destructive text-sm text-center">{error}</p>
            </motion.div>
          )}

          {/* Role Cards - Two Columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <motion.button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  disabled={loading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: role.id === 'client' ? 0.1 : 0.2 }}
                  className={`relative w-full text-left p-8 rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
                    isSelected
                      ? `${role.borderColor} bg-card shadow-xl shadow-primary/5`
                      : 'border-border bg-card/50 hover:border-primary/30 hover:bg-card'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {/* Subtle gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`inline-flex rounded-xl p-3 mb-6 ${role.iconBg} transition-colors`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">{role.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {role.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {role.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/90">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div className="rounded-full bg-primary p-1.5">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Continue Button */}
          <motion.button
            onClick={handleRoleSelection}
            disabled={!selectedRole || loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Setting up...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
