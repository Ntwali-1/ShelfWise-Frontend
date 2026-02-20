'use client'

import { useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { profileApi } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, MapPin, Calendar, ArrowRight, ArrowLeft, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CompleteProfilePage() {
  const { getToken } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: '',
    birthday: '',
    address: '',
    bio: '',
  })

  const steps = [
    {
      title: 'Basic Information',
      description: 'Tell us your name',
      fields: ['firstName', 'lastName'],
    },
    {
      title: 'Contact Details',
      description: 'How can we reach you?',
      fields: ['phoneNumber'],
    },
    {
      title: 'Personal Info',
      description: 'A bit more about you',
      fields: ['birthday', 'address'],
    },
    {
      title: 'About You',
      description: 'Share something about yourself',
      fields: ['bio'],
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = async () => {
    try {
      const token = await getToken()
      if (!token) return

      // Create minimal profile
      await profileApi.create({
        firstName: profile.firstName || user?.firstName || '',
        lastName: profile.lastName || user?.lastName || '',
      }, token)

      toast.success('Profile created!')
      router.push('/products')
    } catch (error) {
      console.error('Failed to skip profile:', error)
      toast.error('Failed to create profile')
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      const token = await getToken()
      if (!token) return

      await profileApi.create(profile, token)
      toast.success('Profile completed!')
      router.push('/products')
    } catch (error) {
      console.error('Failed to complete profile:', error)
      toast.error('Failed to save profile')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-indigo-50/30 to-purple-50/20 dark:from-background dark:via-indigo-900/10 dark:to-purple-900/10">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full mx-1 transition-all duration-300 ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Card */}
        <motion.div
          className="bg-card rounded-2xl border border-border p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-2">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground mb-8">{steps[currentStep].description}</p>

              <div className="space-y-6">
                {/* Step 0: Basic Information */}
                {currentStep === 0 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          className="h-12 w-full rounded-lg border border-border bg-background pl-10 pr-4 outline-none transition-colors focus:border-primary"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          className="h-12 w-full rounded-lg border border-border bg-background pl-10 pr-4 outline-none transition-colors focus:border-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 1: Contact Details */}
                {currentStep === 1 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        value={profile.phoneNumber}
                        onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                        className="h-12 w-full rounded-lg border border-border bg-background pl-10 pr-4 outline-none transition-colors focus:border-primary"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Info */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Birthday (Optional)</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="date"
                          value={profile.birthday}
                          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                          className="h-12 w-full rounded-lg border border-border bg-background pl-10 pr-4 outline-none transition-colors focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address (Optional)</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <textarea
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          rows={3}
                          className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 outline-none transition-colors focus:border-primary resize-none"
                          placeholder="123 Main St, City, State, ZIP"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: About You */}
                {currentStep === 3 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio (Optional)</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={5}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary resize-none"
                      placeholder="Tell us a bit about yourself..."
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                Skip
              </button>
            </div>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Complete
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
