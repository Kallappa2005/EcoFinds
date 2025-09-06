import { FiDroplet, FiZap } from 'react-icons/fi'
import { motion } from 'framer-motion'

const EcoImpact = () => {
  const impacts = [
    {
      title: 'CO₂ Saved',
      value: '45.2',
      unit: 'kg',
      icon: () => <span className="text-2xl">🌱</span>,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Equivalent to planting 2 trees'
    },
    {
      title: 'Water Saved',
      value: '1,250',
      unit: 'liters',
      icon: FiDroplet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: '25 days of drinking water'
    },
    {
      title: 'Energy Saved',
      value: '85',
      unit: 'kWh',
      icon: FiZap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: '3 days of home electricity'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Your Eco Impact This Month 🌍</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impacts.map((impact, index) => (
          <motion.div
            key={impact.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`inline-flex p-4 rounded-full ${impact.bgColor} mb-4`}>
              {typeof impact.icon === 'function' ? (
                <impact.icon />
              ) : (
                <impact.icon className={`text-2xl ${impact.color}`} />
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{impact.title}</h3>
            <p className="text-3xl font-bold text-gray-900">
              {impact.value}
              <span className="text-lg text-gray-600 ml-1">{impact.unit}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">{impact.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Monthly Eco Goal</span>
          <span className="text-sm text-green-600 font-medium">75% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-green-600 h-2 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

export default EcoImpact