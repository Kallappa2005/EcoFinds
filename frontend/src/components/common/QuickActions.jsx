import { FiPlus, FiSearch, FiMessageCircle, FiBarChart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const QuickActions = () => {
  const actions = [
    {
      title: 'Sell Item',
      description: 'List a new product',
      icon: FiPlus,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:bg-green-200',
      link: '/sell'
    },
    {
      title: 'Browse Items',
      description: 'Find eco-friendly products',
      icon: FiSearch,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
      link: '/'
    },
    {
      title: 'Eco Impact',
      description: 'View your sustainability score',
      icon: FiBarChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200',
      link: '/eco-dashboard'
    },
    {
      title: 'Profile',
      description: 'Manage your account',
      icon: FiMessageCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200',
      link: '/profile'
    }
  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={action.link}
            className={`block p-6 rounded-xl ${action.bgColor} ${action.hoverColor} transition-all text-left`}
          >
            <action.icon className={`text-2xl ${action.color} mb-2`} />
            <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{action.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default QuickActions