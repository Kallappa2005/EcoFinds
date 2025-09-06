import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    // Here you would typically send the form data to your backend
  }

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      content: "support@ecofinds.com",
      subContent: "We'll respond within 24 hours"
    },
    {
      icon: FiPhone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      subContent: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      content: "123 Green Street, Eco City",
      subContent: "San Francisco, CA 94105"
    },
    {
      icon: FiClock,
      title: "Business Hours",
      content: "Monday - Friday",
      subContent: "9:00 AM - 6:00 PM EST"
    }
  ]

  const faqs = [
    {
      question: "How does the eco-impact tracking work?",
      answer: "We calculate CO₂ savings based on product lifecycle data and manufacturing emissions avoided through second-hand purchases."
    },
    {
      question: "How do I earn eco-points?",
      answer: "You earn points by buying and selling items, referring friends, and completing eco-challenges on our platform."
    },
    {
      question: "Is shipping carbon neutral?",
      answer: "Yes! We partner with carbon-neutral shipping providers and offset all delivery emissions automatically."
    },
    {
      question: "How do you verify product authenticity?",
      answer: "We use AI-powered image recognition and community verification to ensure all items meet our quality standards."
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
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about EcoFinds? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{info.content}</p>
                <p className="text-gray-600 text-sm">{info.subContent}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Send Message
                  <FiSend className="text-lg" />
                </motion.button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white rounded-xl p-6 shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Ready to Start Your Eco Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-600 mb-8"
          >
            Join thousands of eco-conscious users making a positive impact through sustainable shopping.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/signup"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/features"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
