import { FiTrendingUp, FiDollarSign, FiPackage, FiStar } from 'react-icons/fi'
import { motion } from 'framer-motion'

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '₹12,450',
      change: '+12%',
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Items Sold',
      value: '23',
      change: '+8%',
      icon: FiPackage,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Eco Score',
      value: '850',
      change: '+15%',
      icon: FiTrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Rating',
      value: '4.8',
      change: '+0.2',
      icon: FiStar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-green-600 text-sm font-medium mt-1">
                {stat.change} from last month
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`text-xl ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsCards
