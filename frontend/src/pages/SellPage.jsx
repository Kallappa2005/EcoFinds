import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUpload, FiDollarSign, FiTag, FiMapPin, FiX, FiCamera } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useUserData } from '../context/userDataUtils'

const SellPage = () => {
  const navigate = useNavigate()
  const { addSoldProduct, calculateEcoImpact } = useUserData()
  const fileInputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: ''
  })

  const categories = [
    'Electronics', 'Clothing', 'Fashion', 'Furniture', 'Books', 
    'Sports', 'Home & Garden', 'Toys', 'Other'
  ]

  const conditions = [
    'New', 'Like New', 'Good', 'Fair', 'Poor'
  ]

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Image handling functions
  const handleImageSelect = (files) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/')
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB
      
      if (!isValidType) {
        toast.error(`${file.name} is not a valid image file`)
        return false
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Max size is 5MB`)
        return false
      }
      return true
    })

    if (selectedImages.length + validFiles.length > 5) {
      toast.error('Maximum 5 images allowed')
      return
    }

    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, {
          file,
          url: e.target.result,
          id: Date.now() + Math.random()
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const files = e.dataTransfer.files
    handleImageSelect(files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    handleImageSelect(files)
  }

  const removeImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId))
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (selectedImages.length === 0) {
      toast.error('Please add at least one image')
      return
    }
    
    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Calculate eco impact preview
      const ecoImpact = calculateEcoImpact(formData)
      
      // Add product with images to user's sold items
      const productWithImages = {
        ...formData,
        images: selectedImages.map(img => img.url) // Store base64 URLs for demo
      }
      const newProduct = addSoldProduct(productWithImages)
      
      // Show success message with eco impact
      toast.success(
        `Product listed successfully! 🎉\nEco Impact: ${ecoImpact.co2Saved}kg CO₂ and ${ecoImpact.waterSaved}L water saved!`,
        { duration: 4000 }
      )
      
      // Navigate to eco dashboard to see the new listing
      setTimeout(() => {
        navigate('/eco-dashboard')
      }, 2000)
      
    } catch (error) {
      toast.error('Failed to list product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Item</h1>
          <p className="text-gray-600">List your sustainable product and make a positive impact! 🌱</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images *
            </label>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            {/* Drop zone */}
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                dragActive 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
            >
              <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                {dragActive ? 'Drop images here' : 'Drag & drop images here, or click to browse'}
              </p>
              <p className="text-sm text-gray-500">PNG, JPG up to 5MB each (Max 5 images)</p>
            </div>

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Selected Images ({selectedImages.length}/5)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {selectedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt="Product preview"
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage(image.id)
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX className="text-sm" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Add more button */}
                  {selectedImages.length < 5 && (
                    <div 
                      onClick={openFileDialog}
                      className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
                    >
                      <div className="text-center">
                        <FiCamera className="mx-auto text-2xl text-gray-400 mb-1" />
                        <p className="text-xs text-gray-500">Add More</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
                placeholder="e.g., iPhone 13 Pro Max"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiDollarSign className="inline mr-1" />
                Price (₹) *
              </label>
              <input
                type="number"
                required
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
                placeholder="2500"
              />
            </div>
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiTag className="inline mr-1" />
                Category *
              </label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 bg-white"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                required
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 bg-white"
              >
                <option value="">Select Condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMapPin className="inline mr-1" />
              Location *
            </label>
            <input
              type="text"
              required
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
              placeholder="City, State"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
              placeholder="Describe your item, its condition, and why it's great for a sustainable lifestyle..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Save Draft
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {isSubmitting ? 'Listing Product...' : 'List Item'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default SellPage
