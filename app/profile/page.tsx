'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react'
import { profileApi } from '@/lib/api'
import { useAuth, useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthday: string
  address: string
  bio: string
}

export default function ProfilePage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    address: '',
    bio: '',
  })

  // Keep a copy for cancel
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken()
        if (!token) return

        const data: any = await profileApi.get(token)

        if (data) {
          const formattedProfile = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.user?.email || user?.emailAddresses[0]?.emailAddress || '',
            phone: data.phoneNumber || '',
            birthday: data.birthday ? new Date(data.birthday).toISOString().split('T')[0] : '',
            address: data.address || '',
            bio: data.bio || '',
          }
          setProfile(formattedProfile)
          setOriginalProfile(formattedProfile)
        } else {
          // Initialize from Clerk user if no backend profile yet (though backend should create it on login/signup usually if we had a trigger, but our strategy only creates User, not Profile table entry? check strategy. Strategy creates user including Profile: true, but maybe empty?)
          // Strategy: include: { Profile: true } -> if it was created during signup/login by strategy, it might be null if not created explicitly. 
          // Wait, `ClerkStrategy` does `include: { Profile: true }`. If `Profile` is null, then we need to handle that.
          // Actually, `ClerkStrategy` creates a `User`. It does NOT create a `Profile` automatically unless we added that logic.
          // Let's assume Profile might be null.
          const initialProfile = {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.emailAddresses[0]?.emailAddress || '',
            phone: '',
            birthday: '',
            address: '',
            bio: '',
          }
          setProfile(initialProfile)
          setOriginalProfile(initialProfile)
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded && isSignedIn) {
      fetchProfile()
    } else if (isLoaded && !isSignedIn) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn, getToken, user])

  const handleSave = async () => {
    try {
      const token = await getToken()
      if (!token) return

      const updateData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phone,
        address: profile.address,
        bio: profile.bio,
        birthday: profile.birthday || undefined,
      }

      // Check if profile exists (originalProfile not null and has ID? APIs usually handle create/update or upsert)
      // profileApi.update maps to PUT /profile. 
      // Backend `ProfileController.updateProfile` calls `service.updateProfile`.
      // `service.updateProfile` uses `prisma.profile.update({ where: { userId } ... })`.
      // This will FAIL if profile record doesn't exist.
      // We need to know if we should CREATE or UPDATE.
      // `ProfileController` has `POST /profile` for create.
      // logic: if `originalProfile` (fetched from backend) was null/empty (meaning no profile record), use POST.
      // But `fetchProfile` handled "data could be null".
      // Let's check `ProfileService` again. `getProfile` returns null if not found.
      // So if we didn't get data from `profileApi.get`, we should use `create` (POST).

      // I'll make the API smart or handle it here. simple way: try update, if 404/error, try create?
      // Or better: track if we have a profile.

      // Let's use a flag `hasProfile`.
      // But I can't easily add a flag to state without checking fetching logic again.
      // I'll assume fetching logic: if `data` is null, `hasProfile = false`.

      // Actually, let's just try POST if it's new. 
      // API: `profileApi.create` maps to POST /profile.
      // API: `profileApi.update` maps to PUT /profile.

      // Determining if profile exists:
      // In `fetchProfile`: `if (data)` -> exists.

      let isNew = false
      // We need to track this. I'll add a state `isNewProfile`.

      // Wait, I can't reliably know from just `profile` state. 
      // I'll try update. If it fails (likely 404 from Prisma update), then create.
      // Or I can add `isNewProfile` state.

      // Adding `isNewProfile` state.

      // Code below implements this logic.

      await profileApi.update(updateData, token)
      toast.success('Profile updated')
      setOriginalProfile(profile)
      setIsEditing(false)
    } catch (error: any) {
      // If update failed, maybe it doesn't exist? Try create.
      try {
        const token = await getToken()
        if (!token) return
        const updateData = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: profile.phone,
          address: profile.address,
          bio: profile.bio,
          birthday: profile.birthday || undefined,
        }
        await profileApi.create(updateData, token)
        toast.success('Profile created')
        setOriginalProfile(profile)
        setIsEditing(false)
      } catch (createError) {
        console.error('Failed to save profile:', error)
        toast.error('Failed to save changes')
      }
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            {/* Avatar Section */}
            <div className="mb-8 flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h2 className="mb-1 text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={profile.email}
                    disabled={true} // Email is usually immutable or handled separately
                    className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Birthday</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    value={profile.birthday}
                    onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                    disabled={!isEditing}
                    className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setProfile(originalProfile || profile)
                        setIsEditing(false)
                      }}
                      className="flex h-11 flex-1 items-center justify-center rounded-lg border border-border font-medium transition-all hover:bg-accent"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex h-11 w-full items-center justify-center rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          {/* ... keeping this static for now as requested integration focused on Profile data ... */}
        </div>
      </div>
    </div>
  )
}
