import { motion } from 'framer-motion'
import { FiHeart, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi'

const About = () => {
  const stats = [
    { icon: FiUsers, label: "Active Users", value: "10K+" },
    { icon: FiTrendingUp, label: "Items Sold", value: "50K+" },
    { icon: FiHeart, label: "CO₂ Saved", value: "2.5M kg" },
    { icon: FiAward, label: "Partner Stores", value: "500+" }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "👩‍💼",
      bio: "Environmental scientist turned entrepreneur, passionate about sustainable commerce."
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "👨‍💻",
      bio: "Tech innovator building scalable solutions for a greener future."
    },
    {
      name: "Emma Davis",
      role: "Head of Sustainability",
      image: "👩‍🌾",
      bio: "Climate expert ensuring our platform makes real environmental impact."
    }
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
            About EcoFinds
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed"
          >
            We're on a mission to revolutionize second-hand commerce by making sustainable 
            shopping accessible, rewarding, and impactful for everyone.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At EcoFinds, we believe that every purchase should contribute to a healthier planet. 
                Our platform transforms the way people buy and sell second-hand items by gamifying 
                sustainability and providing transparent environmental impact tracking.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're building a community where eco-conscious consumers can make informed decisions, 
                earn rewards for sustainable behavior, and see the real-world impact of their choices.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl text-center"
            >
              🌍
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Our Impact So Far
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-2xl text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability First</h3>
              <p className="text-gray-600">Every decision we make is guided by its environmental impact.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">We believe in the power of collective action for positive change.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">We leverage technology to make sustainable living easier and more rewarding.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
