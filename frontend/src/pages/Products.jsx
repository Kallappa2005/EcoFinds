import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter, FiGrid, FiList, FiMapPin, FiUser, FiCalendar, FiHeart, FiShoppingCart, FiEye, FiStar, FiX } from 'react-icons/fi'
import { useUserData } from '../context/UserDataContext'
import { toast } from 'react-hot-toast'

const Products = () => {
  const { addPurchasedProduct, calculateEcoImpact } = useUserData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [purchaseData, setPurchaseData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    pickupPreference: 'delivery'
  })

  // Mock products data - in real app, this would come from API
  const [allProducts] = useState([
    {
      id: 1,
      title: "MacBook Air M2 - 2022",
      description: "Excellent condition MacBook Air with M2 chip. Barely used, perfect for students or professionals.",
      price: 85000,
      originalPrice: 120000,
      category: "Electronics",
      condition: "Like New",
      location: "Mumbai, Maharashtra",
      seller: {
        name: "TechGuru",
        rating: 4.8,
        verified: true
      },
      images: ["📱"],
      datePosted: "2024-09-01",
      views: 125,
      likes: 23,
      ecoImpact: { co2Saved: 180, waterSaved: 1500 }
    },
    {
      id: 2,
      title: "Designer Leather Handbag - Prada",
      description: "Authentic Prada leather handbag in excellent condition. Classic design that never goes out of style.",
      price: 15000,
      originalPrice: 35000,
      category: "Fashion",
      condition: "Good",
      location: "Delhi, Delhi",
      seller: {
        name: "FashionQueen",
        rating: 4.9,
        verified: true
      },
      images: ["👜"],
      datePosted: "2024-09-02",
      views: 89,
      likes: 15,
      ecoImpact: { co2Saved: 25, waterSaved: 2000 }
    },
    {
      id: 3,
      title: "Mountain Bike - Trek 2021",
      description: "Well-maintained Trek mountain bike. Perfect for weekend adventures and daily commutes.",
      price: 25000,
      originalPrice: 45000,
      category: "Sports",
      condition: "Good",
      location: "Bangalore, Karnataka",
      seller: {
        name: "BikeRider",
        rating: 4.7,
        verified: false
      },
      images: ["🚴"],
      datePosted: "2024-09-03",
      views: 67,
      likes: 12,
      ecoImpact: { co2Saved: 45, waterSaved: 300 }
    },
    {
      id: 4,
      title: "Gaming Setup - RTX 3080 PC",
      description: "Complete gaming setup with RTX 3080, i7 processor, 32GB RAM. Includes monitor and peripherals.",
      price: 120000,
      originalPrice: 200000,
      category: "Electronics",
      condition: "Like New",
      location: "Pune, Maharashtra",
      seller: {
        name: "GamerPro",
        rating: 4.6,
        verified: true
      },
      images: ["🖥️"],
      datePosted: "2024-09-04",
      views: 234,
      likes: 45,
      ecoImpact: { co2Saved: 300, waterSaved: 2500 }
    },
    {
      id: 5,
      title: "Vintage Wooden Dining Table",
      description: "Beautiful vintage wooden dining table that seats 6. Solid wood construction with minor wear.",
      price: 18000,
      originalPrice: 35000,
      category: "Furniture",
      condition: "Fair",
      location: "Chennai, Tamil Nadu",
      seller: {
        name: "VintageCollector",
        rating: 4.5,
        verified: true
      },
      images: ["🪑"],
      datePosted: "2024-09-05",
      views: 78,
      likes: 9,
      ecoImpact: { co2Saved: 60, waterSaved: 400 }
    },
    {
      id: 6,
      title: "Canon DSLR Camera Kit",
      description: "Canon EOS 80D with 18-55mm lens, battery grip, and camera bag. Great for photography enthusiasts.",
      price: 45000,
      originalPrice: 80000,
      category: "Electronics",
      condition: "Good",
      location: "Hyderabad, Telangana",
      seller: {
        name: "PhotoPro",
        rating: 4.8,
        verified: true
      },
      images: ["📷"],
      datePosted: "2024-09-06",
      views: 156,
      likes: 28,
      ecoImpact: { co2Saved: 120, waterSaved: 800 }
    }
  ])

  const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Furniture', 'Books', 'Home & Garden', 'Toys', 'Other']
  const conditions = ['All', 'Brand New', 'Like New', 'Good', 'Fair', 'Needs Repair']
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'eco-impact', label: 'Highest Eco Impact' }
  ]

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesCondition = selectedCondition === 'All' || product.condition === selectedCondition
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.datePosted) - new Date(a.datePosted)
        case 'oldest':
          return new Date(a.datePosted) - new Date(b.datePosted)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'popular':
          return (b.views + b.likes) - (a.views + a.likes)
        case 'eco-impact':
          return (b.ecoImpact.co2Saved + b.ecoImpact.waterSaved) - (a.ecoImpact.co2Saved + a.ecoImpact.waterSaved)
        default:
          return 0
      }
    })

  const handlePurchase = (product) => {
    setSelectedProduct(product)
    setShowPurchaseModal(true)
  }

  const handlePurchaseSubmit = (e) => {
    e.preventDefault()
    
    // Add to purchased products
    addPurchasedProduct(selectedProduct)
    
    // Show success message
    toast.success(
      `🎉 Purchase Successful!\nYou saved ${selectedProduct.ecoImpact.co2Saved}kg CO₂ and ${selectedProduct.ecoImpact.waterSaved}L water!`,
      { duration: 4000 }
    )
    
    // Close modal and reset
    setShowPurchaseModal(false)
    setSelectedProduct(null)
    setPurchaseData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      paymentMethod: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      pickupPreference: 'delivery'
    })
    
    // Navigate to eco dashboard after delay
    setTimeout(() => {
      window.location.href = '/eco-dashboard'
    }, 2000)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateSavings = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sustainable Products</h1>
              <p className="text-gray-600 mt-1">
                Discover amazing second-hand items and make a positive environmental impact
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Filters & Controls */}
          <div className="mt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <FiFilter />
                Filters
              </button>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-gray-50 rounded-xl border"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedCategory('All')
                      setSelectedCondition('All')
                      setPriceRange([0, 100000])
                      setSearchTerm('')
                    }}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center ${
                  viewMode === 'list' ? 'w-32 h-32' : 'h-40 w-full'
                }`}>
                  <span className="text-3xl">{product.images[0]}</span>
                </div>

                {/* Product Details */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2 flex-1">
                      {product.title}
                    </h3>
                    <button className="ml-2 text-gray-400 hover:text-red-500 transition-colors">
                      <FiHeart className="text-sm" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {calculateSavings(product.price, product.originalPrice)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                        product.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.condition}
                      </span>
                      <span>•</span>
                      <span>{product.category}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <FiMapPin className="text-xs" />
                      <span>{product.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiUser className="text-xs" />
                        <span>{product.seller.name}</span>
                        {product.seller.verified && <span className="text-green-600">✓</span>}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 text-xs" />
                        <span>{product.seller.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-2 mb-3">
                    <div className="text-xs text-green-700">
                      🌱 {product.ecoImpact.co2Saved}kg CO₂ • 💧 {product.ecoImpact.waterSaved}L water
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePurchase(product)}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1 text-sm"
                    >
                      <FiShoppingCart className="text-sm" />
                      Buy
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:border-green-500 hover:text-green-600 transition-colors text-sm"
                    >
                      <FiEye className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && !showPurchaseModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h2>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl h-64 flex items-center justify-center mb-4">
                        <span className="text-6xl">{selectedProduct.images[0]}</span>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Eco Impact</h4>
                        <div className="text-sm text-green-700">
                          🌱 Save {selectedProduct.ecoImpact.co2Saved}kg CO₂<br/>
                          💧 Save {selectedProduct.ecoImpact.waterSaved}L water<br/>
                          ♻️ Reduce waste by buying second-hand
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-bold text-green-600">₹{selectedProduct.price.toLocaleString()}</span>
                        {selectedProduct.originalPrice && (
                          <>
                            <span className="text-lg text-gray-500 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              {calculateSavings(selectedProduct.price, selectedProduct.originalPrice)}% OFF
                            </span>
                          </>
                        )}
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedProduct.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                            selectedProduct.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedProduct.condition}
                          </span>
                          <span className="text-gray-600">{selectedProduct.category}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMapPin />
                          <span>{selectedProduct.location}</span>
                        </div>

                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <FiUser />
                            <span>{selectedProduct.seller.name}</span>
                            {selectedProduct.seller.verified && <span className="text-green-600">✓</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            <FiStar className="text-yellow-400" />
                            <span>{selectedProduct.seller.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FiEye />
                            <span>{selectedProduct.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiHeart />
                            <span>{selectedProduct.likes} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiCalendar />
                            <span>Posted {formatDate(selectedProduct.datePosted)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setShowPurchaseModal(true)
                          }}
                          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiShoppingCart />
                          Buy Now
                        </button>
                        <button className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors">
                          <FiHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Purchase Modal */}
        <AnimatePresence>
          {showPurchaseModal && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowPurchaseModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Complete Purchase</h2>
                    <button
                      onClick={() => setShowPurchaseModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>

                  {/* Product Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl">{selectedProduct.images[0]}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{selectedProduct.title}</h3>
                        <p className="text-sm text-gray-600">{selectedProduct.seller.name}</p>
                        <p className="text-lg font-bold text-green-600">₹{selectedProduct.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Buyer Details Form */}
                  <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={purchaseData.buyerName}
                        onChange={(e) => setPurchaseData({...purchaseData, buyerName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={purchaseData.buyerPhone}
                        onChange={(e) => setPurchaseData({...purchaseData, buyerPhone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={purchaseData.buyerEmail}
                        onChange={(e) => setPurchaseData({...purchaseData, buyerEmail: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <textarea
                        required
                        value={purchaseData.deliveryAddress}
                        onChange={(e) => setPurchaseData({...purchaseData, deliveryAddress: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your delivery address"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Option</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="delivery"
                            name="deliveryOption"
                            value="delivery"
                            checked={purchaseData.deliveryOption === 'delivery'}
                            onChange={(e) => setPurchaseData({...purchaseData, deliveryOption: e.target.value})}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor="delivery" className="ml-2 text-sm text-gray-700">
                            Home Delivery (+₹50)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="pickup"
                            name="deliveryOption"
                            value="pickup"
                            checked={purchaseData.deliveryOption === 'pickup'}
                            onChange={(e) => setPurchaseData({...purchaseData, deliveryOption: e.target.value})}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor="pickup" className="ml-2 text-sm text-gray-700">
                            Self Pickup from {selectedProduct.location} (Free)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
                      
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">Product Price:</span>
                          <span className="font-semibold">₹{selectedProduct.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">Delivery Fee:</span>
                          <span className="font-semibold">₹{purchaseData.deliveryOption === 'delivery' ? '50' : '0'}</span>
                        </div>
                        <div className="border-t border-green-200 pt-2 flex justify-between items-center">
                          <span className="font-bold text-gray-900">Total Amount:</span>
                          <span className="font-bold text-green-600 text-lg">
                            ₹{(selectedProduct.price + (purchaseData.deliveryOption === 'delivery' ? 50 : 0)).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            required
                            value={purchaseData.cardNumber}
                            onChange={(e) => setPurchaseData({...purchaseData, cardNumber: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              required
                              value={purchaseData.expiryDate}
                              onChange={(e) => setPurchaseData({...purchaseData, expiryDate: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              required
                              value={purchaseData.cvv}
                              onChange={(e) => setPurchaseData({...purchaseData, cvv: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="123"
                              maxLength="3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6">
                      <button
                        type="button"
                        onClick={() => setShowPurchaseModal(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Pay Now
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Products
