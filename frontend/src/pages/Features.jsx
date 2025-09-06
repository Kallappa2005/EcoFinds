import { motion } from 'framer-motion'
import { FiBarChart, FiTrendingUp, FiShield, FiZap, FiUsers, FiHeart, FiAward, FiMessageCircle } from 'react-icons/fi'

const Features = () => {
  const mainFeatures = [
    {
      icon: FiBarChart,
      title: "Real-time Eco Impact Tracking",
      description: "See exactly how much CO₂, water, and waste you're saving with every purchase. Our advanced algorithms calculate your environmental impact in real-time.",
      benefits: ["Live CO₂ savings calculator", "Water usage reduction tracking", "Waste diversion metrics", "Monthly impact reports"]
    },
    {
      icon: FiAward,
      title: "Gamified Rewards System",
      description: "Earn eco-points for sustainable actions and climb the leaderboard. Redeem points for discounts, badges, and exclusive eco-friendly products.",
      benefits: ["Eco-points for every action", "Achievement badges", "Monthly challenges", "Exclusive rewards catalog"]
    },
    {
      icon: FiShield,
      title: "AI-Powered Quality Verification",
      description: "Our smart verification system ensures product authenticity and quality using computer vision and community feedback.",
      benefits: ["Automated quality checks", "Community verification", "Fraud protection", "Quality guarantee"]
    },
    {
      icon: FiZap,
      title: "Smart Price Recommendations",
      description: "Get AI-powered pricing suggestions based on market data, condition, and demand to maximize your sales and savings.",
      benefits: ["Dynamic pricing algorithms", "Market trend analysis", "Profit optimization", "Fair pricing insights"]
    }
  ]

  const additionalFeatures = [
    { icon: FiUsers, title: "Community Reviews", description: "Trusted buyer and seller ratings" },
    { icon: FiMessageCircle, title: "Secure Messaging", description: "Safe in-app communication system" },
    { icon: FiHeart, title: "Wishlist & Alerts", description: "Get notified when items you want are listed" },
    { icon: FiTrendingUp, title: "Market Analytics", description: "Track trends and popular categories" }
  ]

  const stats = [
    { number: "2.5M kg", label: "CO₂ Saved", color: "green" },
    { number: "50K+", label: "Happy Users", color: "blue" },
    { number: "98%", label: "Satisfaction Rate", color: "purple" },
    { number: "24/7", label: "Support Available", color: "orange" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6">Powerful Features for Sustainable Shopping</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Discover how EcoFinds combines cutting-edge technology with environmental consciousness 
              to create the most rewarding second-hand marketplace experience.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to buy, sell, and track your environmental impact in one powerful platform.
            </p>
          </motion.div>

          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="text-3xl text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`text-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-12">
                    <div className="text-8xl mb-4">
                      {index === 0 && '📊'}
                      {index === 1 && '🏆'}
                      {index === 2 && '🛡️'}
                      {index === 3 && '💡'}
                    </div>
                    <p className="text-gray-600">Interactive {feature.title.split(' ')[0]} Dashboard</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Additional Features</h2>
            <p className="text-xl text-gray-600">
              Even more ways to enhance your sustainable shopping experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">
              Get started in just a few simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Sign Up & Explore", description: "Create your account and browse thousands of sustainable products." },
              { step: "2", title: "Buy or Sell", description: "List your items or find great deals while earning eco-points." },
              { step: "3", title: "Track Impact", description: "Watch your environmental impact grow with detailed analytics." }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="border-t-2 border-dashed border-green-300"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Experience These Features?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl mb-8"
          >
            Join thousands of users already making a positive impact with EcoFinds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/signup"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Schedule Demo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Features
