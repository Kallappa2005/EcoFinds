import { createContext, useContext, useState, useEffect } from 'react'

const UserDataContext = createContext()

export const useUserData = () => {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    soldProducts: [],
    purchasedProducts: [],
    ecoStats: {
      totalCO2Saved: 0,
      totalWaterSaved: 0,
      totalItemsSold: 0,
      totalItemsBought: 0,
      ecoPoints: 850
    }
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ecofinds_user_data')
    if (savedData) {
      setUserData(JSON.parse(savedData))
    }
  }, [])

  // Save data to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('ecofinds_user_data', JSON.stringify(userData))
  }, [userData])

  const addSoldProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      dateListed: new Date().toISOString(),
      status: 'listed',
      views: 0,
      ecoImpact: calculateEcoImpact(product)
    }
    
    setUserData(prev => ({
      ...prev,
      soldProducts: [...prev.soldProducts, newProduct],
      ecoStats: {
        ...prev.ecoStats,
        totalItemsSold: prev.ecoStats.totalItemsSold + 1,
        totalCO2Saved: prev.ecoStats.totalCO2Saved + newProduct.ecoImpact.co2Saved,
        totalWaterSaved: prev.ecoStats.totalWaterSaved + newProduct.ecoImpact.waterSaved,
        ecoPoints: prev.ecoStats.ecoPoints + 50 // Award points for listing
      }
    }))
    
    return newProduct
  }

  const addPurchasedProduct = (product) => {
    const newPurchase = {
      ...product,
      id: Date.now(),
      datePurchased: new Date().toISOString(),
      status: 'purchased',
      ecoImpact: calculateEcoImpact(product)
    }
    
    setUserData(prev => ({
      ...prev,
      purchasedProducts: [...prev.purchasedProducts, newPurchase],
      ecoStats: {
        ...prev.ecoStats,
        totalItemsBought: prev.ecoStats.totalItemsBought + 1,
        totalCO2Saved: prev.ecoStats.totalCO2Saved + newPurchase.ecoImpact.co2Saved,
        totalWaterSaved: prev.ecoStats.totalWaterSaved + newPurchase.ecoImpact.waterSaved,
        ecoPoints: prev.ecoStats.ecoPoints + 30 // Award points for purchasing
      }
    }))
    
    return newPurchase
  }

  const updateProductStatus = (productId, newStatus, type = 'sold') => {
    if (type === 'sold') {
      setUserData(prev => ({
        ...prev,
        soldProducts: prev.soldProducts.map(product =>
          product.id === productId ? { ...product, status: newStatus } : product
        )
      }))
    }
  }

  const calculateEcoImpact = (product) => {
    // Simple calculation based on category and price
    const categoryMultipliers = {
      'Electronics': { co2: 15, water: 100 },
      'Clothing': { co2: 8, water: 2500 },
      'Furniture': { co2: 25, water: 150 },
      'Books': { co2: 2, water: 10 },
      'Sports': { co2: 5, water: 50 },
      'Home & Garden': { co2: 10, water: 200 },
      'Toys': { co2: 3, water: 75 },
      'Other': { co2: 5, water: 100 }
    }
    
    const multiplier = categoryMultipliers[product.category] || categoryMultipliers['Other']
    const priceMultiplier = Math.max(1, parseInt(product.price) / 1000)
    
    return {
      co2Saved: Math.round(multiplier.co2 * priceMultiplier),
      waterSaved: Math.round(multiplier.water * priceMultiplier)
    }
  }

  const value = {
    userData,
    addSoldProduct,
    addPurchasedProduct,
    updateProductStatus,
    calculateEcoImpact
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataContext
