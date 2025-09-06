import { FiShoppingBag, FiPackage, FiMessageCircle, FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

const RecentActivity = () => {
  const activities = [
    {
      type: 'purchase',
      title: 'Vintage Leather Jacket',
      description: 'Purchased from EcoStore',
      time: '2 hours ago',
      icon: FiShoppingBag,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      type: 'sale',
      title: 'iPhone 12 Pro',
      description: 'Sold to john_doe',
      time: '5 hours ago',
      icon: FiPackage,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      type: 'message',
      title: 'New Message',
      description: 'From buyer about MacBook',
      time: '1 day ago',
      icon: FiMessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      type: 'wishlist',
      title: 'Added to Wishlist',
      description: 'Gaming Chair - ErgoMax',
      time: '2 days ago',
      icon: FiHeart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              <activity.icon className={`text-lg ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 text-center text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
        View All Activity
      </button>
    </div>
  )
}

export default RecentActivity