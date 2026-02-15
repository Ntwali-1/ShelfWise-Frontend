'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { usersApi } from '@/lib/api';
import type { User } from '@/lib/types';

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
          // User already has a role, redirect appropriately
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
        // If user doesn't exist yet, that's fine - they'll be created when selecting role
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
      
      // Redirect based on role
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to ShelfWise!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Hi {user?.firstName || 'there'}! Please select your role to continue
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {/* Customer Role */}
          <button
            onClick={() => setSelectedRole('client')}
            disabled={loading}
            className={`w-full p-6 rounded-xl border-2 transition-all ${
              selectedRole === 'client'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Customer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Browse products, add to cart, place orders, and manage your wishlist
                </p>
              </div>
              {selectedRole === 'client' && (
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>

          {/* Admin Role */}
          <button
            onClick={() => setSelectedRole('admin')}
            disabled={loading}
            className={`w-full p-6 rounded-xl border-2 transition-all ${
              selectedRole === 'admin'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Admin
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage products, categories, orders, and view analytics
                </p>
              </div>
              {selectedRole === 'admin' && (
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        </div>

        <button
          onClick={handleRoleSelection}
          disabled={!selectedRole || loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Setting up...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
