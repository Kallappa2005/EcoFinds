import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path
  const isHomePage = location.pathname === '/'

  return (
    <header className="bg-white shadow-lg border-b-2 border-green-100">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌱</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Eco<span className="text-green-600">Finds</span>
            </span>
          </Link>

          {/* Search Bar - Desktop (Hidden on Home Page) */}
          {!isHomePage && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sustainable products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {isHomePage ? (
              /* Home Page - Contact, About Us, and Auth */
              <>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  Contact
                </Link>
                <Link 
                  to="/features" 
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  Features
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  How It Works
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <Link 
                  to="/signin" 
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              /* Other Pages - Full Navigation */
              <>
                <Link 
                  to="/products" 
                  className={`transition-colors ${
                    isActive('/products') ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Products
                </Link>
                <Link 
                  to="/sell" 
                  className={`transition-colors ${
                    isActive('/sell') ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Sell
                </Link>
                <Link 
                  to="/eco-dashboard" 
                  className={`transition-colors ${
                    isActive('/eco-dashboard') ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Eco Impact
                </Link>
                
                {/* Notifications */}
                <button className="relative p-2 text-gray-700 hover:text-green-600">
                  <FiBell className="text-xl" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile */}
                <Link 
                  to="/profile" 
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    isActive('/profile') ? 'text-green-600' : 'text-gray-700'
                  }`}
                >
                  <FiUser className="text-xl" />
                  <span>Profile</span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              {isHomePage ? (
                /* Mobile Home Page - About, Contact, Features, and Auth */
                <>
                  <Link 
                    to="/about" 
                    className="py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/contact" 
                    className="py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link 
                    to="/features" 
                    className="py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link 
                    to="/signin" 
                    className="py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                /* Mobile Other Pages - Full Navigation */
                <>
                  {/* Mobile Search */}
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  {/* Mobile Navigation */}
                  <Link 
                    to="/products" 
                    className={`py-2 transition-colors ${
                      isActive('/products') ? 'text-green-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link 
                    to="/sell" 
                    className={`py-2 transition-colors ${
                      isActive('/sell') ? 'text-green-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sell
                  </Link>
                  <Link 
                    to="/eco-dashboard" 
                    className={`py-2 transition-colors ${
                      isActive('/eco-dashboard') ? 'text-green-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Eco Impact
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`py-2 transition-colors ${
                      isActive('/profile') ? 'text-green-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header