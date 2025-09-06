import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiStar, FiShield, FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import StatsCards from '../components/profile/StatsCards'
import RecentActivity from '../components/profile/RecentActivity'
import { useUserData } from '../context/userDataUtils'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user, isAuthenticated, updateUserProfile } = useUserData()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    joinDate: '',
    rating: 0,
    totalReviews: 0,
    verified: false
  })

  // Load user profile data
  useEffect(() => {
    if (user && isAuthenticated) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || 'Welcome to EcoFinds! Update your bio to tell others about your sustainability journey.',
        joinDate: new Date(user.joinDate || user.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }),
        rating: user.rating || 0,
        totalReviews: user.totalReviews || 0,
        verified: user.verified || false
      })
    }
  }, [user, isAuthenticated])

  const badges = [
    { name: 'Eco Warrior', icon: '🌱', earned: true },
    { name: 'Trusted Seller', icon: '⭐', earned: true },
    { name: 'Quick Responder', icon: '⚡', earned: true },
    { name: 'Community Helper', icon: '🤝', earned: false },
    { name: 'Sustainability Expert', icon: '🏆', earned: false }
  ]

  const reviews = [
    {
      id: 1,
      reviewer: 'Sarah M.',
      rating: 5,
      comment: 'Great seller! Item exactly as described and fast shipping.',
      date: '2 days ago'
    },
    {
      id: 2,
      reviewer: 'Mike R.',
      rating: 5,
      comment: 'Excellent communication and product quality. Highly recommended!',
      date: '1 week ago'
    },
    {
      id: 3,
      reviewer: 'Priya K.',
      rating: 4,
      comment: 'Good product, minor wear but as expected. Fair pricing.',
      date: '2 weeks ago'
    }
  ]

  const handleSave = async () => {
    try {
      setIsLoading(true)
      const updatedUser = await updateUserProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio
      })
      
      // Update local profile state with the response
      setProfile(prev => ({
        ...prev,
        ...updatedUser
      }))
      
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </div>
            {profile.verified && (
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                <FiShield className="text-sm" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="text-3xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1 bg-white"
                    placeholder="Enter your name"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                )}
                <p className="text-gray-600">Member since {profile.joinDate}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiEdit />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < Math.floor(profile.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold">{profile.rating}</span>
                <span className="text-gray-600">({profile.totalReviews} reviews)</span>
              </div>
              {profile.verified && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Verified Seller
                </span>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FiMail />
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="border border-gray-300 rounded px-2 py-1 flex-1 text-gray-800"
                    placeholder="Enter your email"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="border border-gray-300 rounded px-2 py-1 flex-1 text-gray-800"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <FiMapPin />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="border border-gray-300 rounded px-2 py-1 flex-1 text-gray-800"
                    placeholder="Enter your location"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">About</h3>
          {isEditing ? (
            <div>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-gray-800"
                rows={3}
                placeholder="Tell us about yourself and your sustainability journey..."
              />
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <p className="text-gray-600">{profile.bio}</p>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges & Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Badges & Achievements</h2>
          <div className="space-y-3">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`flex items-center p-3 rounded-lg ${
                  badge.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-2xl mr-3">{badge.icon}</span>
                <div>
                  <p className={`font-medium ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {badge.earned ? 'Earned' : 'Not earned yet'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.reviewer}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`text-sm ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-center text-green-600 font-medium hover:text-green-700 transition-colors">
            View All Reviews
          </button>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}

export default ProfilePage
