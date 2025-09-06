import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck, FiStar, FiShield, FiHeart, FiTrendingUp, FiUsers, FiShoppingCart, FiMapPin } from 'react-icons/fi'
import { useUserData } from '../context/UserDataContext'
import { toast } from 'react-hot-toast'

const Feature = ({ title, desc, icon: Icon, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
  >
    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-green-600 text-xl" />
    </div>
    <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
)

const Review = ({ name, comment, rating = 5, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center mb-3">
      {[...Array(rating)].map((_, i) => (
        <FiStar key={i} className="text-yellow-400 fill-current text-sm" />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{comment}"</p>
    <p className="text-sm font-semibold text-gray-900">— {name}</p>
  </motion.div>
)

const StatCard = ({ number, label, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="text-center"
  >
    <div className="text-3xl font-bold text-white mb-1">{number}</div>
    <div className="text-green-100 text-sm">{label}</div>
  </motion.div>
)

const Home = () => {
  const { addPurchasedProduct, calculateEcoImpact } = useUserData()

  const demoProducts = [
    {
      id: 1,
      title: "iPhone 12 Pro - Excellent Condition",
      price: "45000",
      category: "Electronics",
      condition: "Like New",
      location: "Mumbai, Maharashtra",
      description: "Barely used iPhone 12 Pro with all accessories. Perfect for sustainable tech lovers!",
      seller: "TechSaver"
    },
    {
      id: 2,
      title: "Vintage Leather Jacket",
      price: "3500",
      category: "Clothing",
      condition: "Good",
      location: "Delhi, Delhi",
      description: "Classic brown leather jacket from the 90s. Timeless style, sustainable choice!",
      seller: "VintageVibe"
    },
    {
      id: 3,
      title: "Gaming Chair - Herman Miller",
      price: "25000",
      category: "Furniture",
      condition: "Like New", 
      location: "Bangalore, Karnataka",
      description: "Premium ergonomic gaming chair. Originally ₹50k, selling at 50% off!",
      seller: "GamerGuru"
    }
  ]

  const handleDemoPurchase = (product) => {
    // Add to purchased products
    addPurchasedProduct(product)
    
    // Calculate eco impact
    const impact = calculateEcoImpact(product)
    
    // Show success message
    toast.success(
      `🎉 Demo Purchase Successful!\nYou saved ${impact.co2Saved}kg CO₂ and ${impact.waterSaved}L water!`,
      { duration: 4000 }
    )
    
    // Navigate to eco dashboard after a short delay
    setTimeout(() => {
      window.location.href = '/eco-dashboard'
    }, 2000)
  }
  return (
    <div className="w-full max-w-none overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
              >
                Eco<span className="text-green-300">Finds</span>
                <br />
                <span className="text-3xl lg:text-4xl text-green-100">Sustainable Marketplace</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-green-100 mb-8 leading-relaxed max-w-2xl"
              >
                Transform the way you shop and sell. Join thousands of eco-warriors reducing waste, 
                saving money, and building a sustainable future—one transaction at a time.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
              >
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-white text-green-700 rounded-full font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Your Eco Journey
                </Link>
                <Link 
                  to="/signin" 
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-green-700 transition-all duration-300"
                >
                  Sign In
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
              >
                <StatCard number="10K+" label="Active Users" delay={0.9} />
                <StatCard number="50K+" label="Items Sold" delay={1.0} />
                <StatCard number="2.5M kg" label="CO₂ Saved" delay={1.1} />
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 max-w-md"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="font-bold text-2xl mb-6 text-center">Platform Highlights</h3>
                <div className="space-y-4">
                  {[
                    "JWT Authentication & Secure Profiles",
                    "AI-Powered Price Estimation",
                    "Real-time Chat & Negotiations", 
                    "Eco-Impact Tracking Dashboard",
                    "Gamification & Reward System",
                    "Direct NGO Donation Integration"
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <FiCheck className="text-green-300 text-lg" />
                      <span className="text-green-50">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gray-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Features Section */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Sustainable Living</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to buy, sell, and track your environmental impact in one beautiful platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature 
              title="Smart User Profiles" 
              desc="Complete onboarding with JWT authentication, profile management, and seller verification badges for trusted transactions."
              icon={FiUsers}
              delay={0.1}
            />
            <Feature 
              title="Advanced Product Listings" 
              desc="Upload products with multiple images, detailed descriptions, categories, condition ratings, and location-based visibility."
              icon={FiShield}
              delay={0.2}
            />
            <Feature 
              title="Intelligent Search & Filters" 
              desc="Find exactly what you need with smart filters by category, price range, condition, location, and relevance sorting."
              icon={FiTrendingUp}
              delay={0.3}
            />
          </div>
        </section>

        {/* Eco Impact Section */}
        <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Track Your Environmental Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the real difference you're making with our comprehensive sustainability dashboard
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-8 shadow-md"
            >
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">CO₂ Tracking</h3>
              <p className="text-gray-600">Monitor carbon footprint reduction with every purchase and sale</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-8 shadow-md"
            >
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Water & Energy</h3>
              <p className="text-gray-600">Track water and energy savings from choosing second-hand items</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl p-8 shadow-md"
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Gamification</h3>
              <p className="text-gray-600">Earn eco-points, climb leaderboards, and unlock achievements</p>
            </motion.div>
          </div>
        </section>

        {/* Demo Products Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Try Demo Shopping! 🛍️</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience our platform by making a demo purchase. See how your eco-impact grows in real-time!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {demoProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-4xl">
                      {product.category === 'Electronics' && '📱'}
                      {product.category === 'Clothing' && '🧥'}
                      {product.category === 'Furniture' && '🪑'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {product.condition}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin />
                      <span>{product.location}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Seller: <span className="font-medium">{product.seller}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>

                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-green-800 mb-1">Eco Impact Preview</h4>
                    <div className="text-sm text-green-700">
                      🌱 Save ~{calculateEcoImpact(product).co2Saved}kg CO₂<br/>
                      💧 Save ~{calculateEcoImpact(product).waterSaved}L water
                    </div>
                  </div>

                  <button
                    onClick={() => handleDemoPurchase(product)}
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart />
                    Demo Purchase
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-4">
                💡 <strong>Demo Mode:</strong> These purchases will be added to your eco-dashboard for demonstration purposes.
              </p>
              <Link 
                to="/signup" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign Up for Real Shopping →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied users making a difference</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Review 
              name="Sarah Martinez" 
              comment="EcoFinds transformed how I shop! I've saved hundreds of dollars and feel great about helping the environment. The eco-dashboard is incredibly motivating!"
              rating={5}
              delay={0.1}
            />
            <Review 
              name="Alex Chen" 
              comment="As a seller, I love how easy it is to list items and connect with buyers. The verification system gives me confidence in every transaction."
              rating={5}
              delay={0.2}
            />
            <Review 
              name="Priya Patel" 
              comment="The gamification features are addictive in the best way! I'm constantly motivated to make more sustainable choices to climb the eco-leaderboard."
              rating={5}
              delay={0.3}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join our community of eco-warriors. Start buying and selling sustainably today and track your positive environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-white text-green-700 rounded-full font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Create Your Account
              </Link>
              <Link 
                to="/signin" 
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-green-700 transition-all duration-300"
              >
                Sign In Now
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

export default Home
