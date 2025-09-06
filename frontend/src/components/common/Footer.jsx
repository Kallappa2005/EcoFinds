import { FiTwitter, FiFacebook, FiInstagram, FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🌱</span>
              </div>
              <span className="text-xl font-bold">
                Eco<span className="text-green-500">Finds</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Building a sustainable future through circular economy and eco-friendly marketplace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-green-500 transition-colors">Marketplace</a></li>
              <li><a href="/sell" className="hover:text-green-500 transition-colors">Sell Items</a></li>
              <li><a href="/categories" className="hover:text-green-500 transition-colors">Categories</a></li>
              <li><a href="/eco-impact" className="hover:text-green-500 transition-colors">Eco Impact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/help" className="hover:text-green-500 transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-green-500 transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <FiMail className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 EcoFinds. All rights reserved. Built with 💚 for a sustainable future.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer