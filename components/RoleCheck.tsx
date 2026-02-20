'use client';

import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { usersApi } from '@/lib/api';
import type { User } from '@/lib/types';

export default function RoleCheck({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { isSignedIn, isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  // Public routes that don't need role check
  const isSelectRolePage = pathname === '/select-role';
  const isCompleteProfilePage = pathname === '/complete-profile';

  useEffect(() => {
    const checkUserRole = async () => {
      // Wait for Clerk to load
      if (!authLoaded || !userLoaded) {
        return;
      }

      // If not signed in or on public route, allow through
      // If not signed in, allow through. Middleware handles protected routes.
      // If on select-role or complete-profile, stop checking to avoid loops.
      if (!isSignedIn || isSelectRolePage || isCompleteProfilePage) {
        setChecking(false);
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          setChecking(false);
          return;
        }

        // Check if user exists and has role
        const user = await usersApi.getCurrentUser(token) as User;

        if (!user?.role) {
          // User doesn't have role, redirect to select-role
          router.push('/select-role');
        } else {
          // Check if profile is complete
          try {
            const profileData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
              headers: { Authorization: `Bearer ${token}` }
            }).then(res => res.json());

            if (!profileData || !profileData.firstName) {
              // Profile not complete, redirect to complete-profile
              router.push('/complete-profile');
            } else {
              setChecking(false);
            }
          } catch (profileError) {
            // Profile doesn't exist, redirect to complete-profile
            router.push('/complete-profile');
          }
        }
      } catch (error: any) {
        console.error('Error checking user role:', error);

        // If user doesn't exist in backend (404), redirect to select-role
        if (error.message.includes('404') || error.message.includes('not found')) {
          router.push('/select-role');
        } else {
          setChecking(false);
        }
      }
    };

    checkUserRole();
  }, [authLoaded, userLoaded, isSignedIn, pathname, getToken, router, isSelectRolePage]);

  // Show loading state while checking
  // If we are checking, we want to block rendering even on public routes to avoid flash of content before redirect
  if (checking && !isSelectRolePage && !isCompleteProfilePage && isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
