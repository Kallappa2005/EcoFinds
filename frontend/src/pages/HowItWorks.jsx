import { motion } from 'framer-motion'
import { FiUserPlus, FiSearch, FiShoppingCart, FiDollarSign, FiTrendingUp, FiAward } from 'react-icons/fi'

const HowItWorks = () => {
  const steps = [
    {
      icon: FiUserPlus,
      title: "Create Your Account",
      description: "Sign up for free and complete your profile. Tell us about your sustainability goals and preferences.",
      details: [
        "Quick 2-minute registration",
        "Set your eco-impact goals",
        "Choose your interests and categories",
        "Get personalized recommendations"
      ],
      emoji: "👤"
    },
    {
      icon: FiSearch,
      title: "Discover Products",
      description: "Browse thousands of verified second-hand items. Use our smart filters to find exactly what you need.",
      details: [
        "AI-powered search and recommendations",
        "Filter by condition, price, and eco-impact",
        "Save items to your wishlist",
        "Get alerts for new listings"
      ],
      emoji: "🔍"
    },
    {
      icon: FiShoppingCart,
      title: "Buy Sustainably",
      description: "Purchase items with confidence using our secure payment system and quality guarantee.",
      details: [
        "Secure payment processing",
        "Quality guarantee on all items",
        "Carbon-neutral shipping options",
        "Easy returns and refunds"
      ],
      emoji: "🛒"
    },
    {
      icon: FiDollarSign,
      title: "Sell Your Items",
      description: "List your unused items easily with our smart pricing suggestions and automated quality checks.",
      details: [
        "AI-powered price recommendations",
        "Automated photo enhancement",
        "Quality verification system",
        "Multi-platform listing syndication"
      ],
      emoji: "💰"
    },
    {
      icon: FiTrendingUp,
      title: "Track Your Impact",
      description: "See real-time data on your environmental impact including CO₂ saved, water conserved, and waste diverted.",
      details: [
        "Live eco-impact dashboard",
        "Monthly sustainability reports",
        "Compare with community averages",
        "Export impact certificates"
      ],
      emoji: "📊"
    },
    {
      icon: FiAward,
      title: "Earn Rewards",
      description: "Get eco-points for every sustainable action and redeem them for discounts and exclusive items.",
      details: [
        "Points for buying and selling",
        "Bonus points for reviews and referrals",
        "Exclusive rewards catalog",
        "Seasonal challenges and competitions"
      ],
      emoji: "🏆"
    }
  ]

  const sellingProcess = [
    { step: "1", title: "Take Photos", description: "Snap clear photos of your item using our guided photo assistant." },
    { step: "2", title: "Add Details", description: "Our AI helps you create compelling descriptions and suggests optimal pricing." },
    { step: "3", title: "Get Verified", description: "Our quality verification system checks your listing for authenticity." },
    { step: "4", title: "Start Selling", description: "Your item goes live and we help promote it to interested buyers." }
  ]

  const buyingProcess = [
    { step: "1", title: "Search & Filter", description: "Find exactly what you need with our smart search and eco-filters." },
    { step: "2", title: "Check Impact", description: "See the environmental impact of your potential purchase." },
    { step: "3", title: "Secure Purchase", description: "Buy with confidence using our protected payment system." },
    { step: "4", title: "Track Progress", description: "Watch your eco-impact grow in your personal dashboard." }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6"
          >
            How EcoFinds Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Discover how easy it is to buy, sell, and track your environmental impact 
            with our innovative sustainable marketplace platform.
          </motion.p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Journey to Sustainable Shopping</h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to start making a positive environmental impact today.
            </p>
          </motion.div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                      <step.icon className="text-3xl text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-green-600 font-semibold">STEP {index + 1}</div>
                      <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`text-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-12">
                    <div className="text-8xl mb-4">{step.emoji}</div>
                    <p className="text-gray-600 font-medium">{step.title} Interface</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Processes */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Selling Process */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Selling Process</h2>
              <div className="space-y-6">
                {sellingProcess.map((process, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Buying Process */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Buying Process</h2>
              <div className="space-y-6">
                {buyingProcess.map((process, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Tracking */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">See Your Impact in Real-Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your environmental contribution with detailed analytics and beautiful visualizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🌱", metric: "CO₂ Saved", value: "1,245 kg", description: "Equivalent to planting 15 trees" },
              { icon: "💧", metric: "Water Conserved", value: "5,890 L", description: "Enough for 39 showers" },
              { icon: "♻️", metric: "Waste Diverted", value: "145 items", description: "Kept out of landfills" }
            ].map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
              >
                <div className="text-4xl mb-4">{impact.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{impact.metric}</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">{impact.value}</div>
                <p className="text-gray-600">{impact.description}</p>
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
            Ready to Start Your Eco Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl mb-8"
          >
            Join thousands of users making a positive environmental impact through sustainable shopping.
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
              Get Started Free
            </a>
            <a
              href="/features"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Explore Features
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
