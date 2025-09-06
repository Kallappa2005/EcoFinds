import { useState } from 'react'
import EcoImpact from '../components/eco-dashboard/EcoImpact'
import { FiTrendingUp, FiUsers, FiTarget, FiShoppingBag, FiDollarSign, FiEye, FiCalendar, FiMapPin } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useUserData } from '../context/UserDataContext'

const EcoDashboardPage = () => {
  const { userData } = useUserData()
  const [activeTab, setActiveTab] = useState('overview')

  const achievements = [
    {
      title: 'Eco Warrior',
      description: 'Saved 100kg CO₂',
      icon: () => <span className="text-xl">🏆</span>,
      earned: userData.ecoStats.totalCO2Saved >= 100
    },
    {
      title: 'Water Saver',
      description: 'Saved 5000L water',
      icon: FiTrendingUp,
      earned: userData.ecoStats.totalWaterSaved >= 5000
    },
    {
      title: 'Marketplace Star',
      description: 'Listed 10+ items',
      icon: FiUsers,
      earned: userData.ecoStats.totalItemsSold >= 10
    },
    {
      title: 'Sustainability Master',
      description: 'Complete all challenges',
      icon: FiTarget,
      earned: false
    }
  ]

  const leaderboard = [
    { name: 'EcoChampion', points: 1250, rank: 1 },
    { name: 'GreenGuru', points: 1100, rank: 2 },
    { name: `You (${userData.ecoStats.ecoPoints} pts)`, points: userData.ecoStats.ecoPoints, rank: 3 },
    { name: 'SustainableSam', points: 720, rank: 4 },
    { name: 'EcoFriend', points: 680, rank: 5 }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'listed': return 'bg-blue-100 text-blue-800'
      case 'sold': return 'bg-green-100 text-green-800'
      case 'purchased': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 rounded-xl p-8 text-white"
      >
        <h1 className="text-4xl font-bold mb-4">Your Eco Impact Dashboard 🌍</h1>
        <p className="text-xl text-green-100 mb-6">
          Track your positive environmental impact and see how you're helping build a sustainable future!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold">Total Impact Score</h3>
            <p className="text-3xl font-bold">{userData.ecoStats.ecoPoints}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold">Items Sold</h3>
            <p className="text-3xl font-bold">{userData.ecoStats.totalItemsSold}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold">Items Bought</h3>
            <p className="text-3xl font-bold">{userData.ecoStats.totalItemsBought}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold">CO₂ Saved</h3>
            <p className="text-3xl font-bold">{userData.ecoStats.totalCO2Saved}kg</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: FiTrendingUp },
              { id: 'sold', label: `My Listings (${userData.soldProducts.length})`, icon: FiDollarSign },
              { id: 'purchased', label: `My Purchases (${userData.purchasedProducts.length})`, icon: FiShoppingBag }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="text-lg" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Main Eco Impact */}
              <EcoImpact />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Eco Achievements 🏆</h2>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={achievement.title}
                        className={`flex items-center p-4 rounded-lg border-2 ${
                          achievement.earned 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className={`p-3 rounded-full ${
                          achievement.earned ? 'bg-green-200' : 'bg-gray-200'
                        }`}>
                          {typeof achievement.icon === 'function' ? (
                            <achievement.icon />
                          ) : (
                            <achievement.icon className={`text-xl ${
                              achievement.earned ? 'text-green-600' : 'text-gray-400'
                            }`} />
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className={`font-semibold ${
                            achievement.earned ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <div className="ml-auto">
                            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                              Earned
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Leaderboard */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Eco Leaderboard 📊</h2>
                  <div className="space-y-3">
                    {leaderboard.map((user, index) => (
                      <div
                        key={user.name}
                        className={`flex items-center p-3 rounded-lg ${
                          user.name.includes('You') 
                            ? 'bg-green-100 border-2 border-green-300' 
                            : 'bg-white'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          user.rank === 1 ? 'bg-yellow-500' :
                          user.rank === 2 ? 'bg-gray-400' :
                          user.rank === 3 ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}>
                          {user.rank}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.points} eco points</p>
                        </div>
                        {user.name.includes('You') && (
                          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                            You
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Monthly Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Eco Challenge 🎯</h2>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    September Challenge: Save 100kg CO₂
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Buy or sell 10 second-hand items this month to reduce carbon footprint
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-green-600 font-medium">
                      {userData.ecoStats.totalCO2Saved}kg / 100kg
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all duration-500" 
                      style={{width: `${Math.min(100, (userData.ecoStats.totalCO2Saved / 100) * 100)}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    {userData.ecoStats.totalCO2Saved >= 100 
                      ? "🎉 Challenge completed! You're amazing!" 
                      : `${100 - userData.ecoStats.totalCO2Saved}kg more to go! You're doing great! 🌱`
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* Sold Products Tab */}
          {activeTab === 'sold' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Product Listings</h2>
                <button 
                  onClick={() => window.location.href = '/sell'}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  + List New Item
                </button>
              </div>
              
              {userData.soldProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No items listed yet</h3>
                  <p className="text-gray-600 mb-6">Start your sustainable selling journey by listing your first item!</p>
                  <button 
                    onClick={() => window.location.href = '/sell'}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    List Your First Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.soldProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-6 shadow-lg border"
                    >
                      {/* Product Image */}
                      {product.images && product.images.length > 0 ? (
                        <div className="mb-4">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {product.images.length > 1 && (
                            <div className="flex gap-1 mt-2">
                              {product.images.slice(1, 4).map((img, index) => (
                                <img
                                  key={index}
                                  src={img}
                                  alt={`${product.title} ${index + 2}`}
                                  className="w-12 h-12 object-cover rounded border"
                                />
                              ))}
                              {product.images.length > 4 && (
                                <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-600">
                                  +{product.images.length - 4}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                          <span className="text-4xl">
                            {product.category === 'Electronics' && '📱'}
                            {product.category === 'Clothing' && '👕'}
                            {product.category === 'Furniture' && '🪑'}
                            {product.category === 'Books' && '📚'}
                            {product.category === 'Sports' && '⚽'}
                            {product.category === 'Home & Garden' && '🏡'}
                            {product.category === 'Toys' && '🧸'}
                            {!['Electronics', 'Clothing', 'Furniture', 'Books', 'Sports', 'Home & Garden', 'Toys'].includes(product.category) && '📦'}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{product.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiDollarSign className="text-green-600" />
                          <span className="font-semibold text-green-600">₹{product.price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiMapPin />
                          <span>{product.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar />
                          <span>Listed {formatDate(product.dateListed)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiEye />
                          <span>{product.views || 0} views</span>
                        </div>
                      </div>

                      {product.ecoImpact && (
                        <div className="bg-green-50 rounded-lg p-3 mb-4">
                          <h4 className="font-medium text-green-800 mb-1">Eco Impact</h4>
                          <div className="text-sm text-green-700">
                            🌱 {product.ecoImpact.co2Saved}kg CO₂ saved<br/>
                            💧 {product.ecoImpact.waterSaved}L water saved
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Purchased Products Tab */}
          {activeTab === 'purchased' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Purchases</h2>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse More Items
                </button>
              </div>
              
              {userData.purchasedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No purchases yet</h3>
                  <p className="text-gray-600 mb-6">Start shopping sustainably and track your positive environmental impact!</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.purchasedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-6 shadow-lg border"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{product.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiDollarSign className="text-blue-600" />
                          <span className="font-semibold text-blue-600">₹{product.price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar />
                          <span>Purchased {formatDate(product.datePurchased)}</span>
                        </div>
                      </div>

                      {product.ecoImpact && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <h4 className="font-medium text-blue-800 mb-1">Your Eco Impact</h4>
                          <div className="text-sm text-blue-700">
                            🌱 {product.ecoImpact.co2Saved}kg CO₂ saved<br/>
                            💧 {product.ecoImpact.waterSaved}L water saved
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EcoDashboardPage
