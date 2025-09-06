import { useState, useEffect } from 'react';
import { authAPI, userAPI, productAPI, transactionAPI } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { UserDataContext } from './userDataUtils';

export const UserDataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    soldProducts: [],
    purchasedProducts: [],
    ecoStats: {
      totalCO2Saved: 0,
      totalWaterSaved: 0,
      totalItemsSold: 0,
      totalItemsBought: 0,
      ecoPoints: 0
    }
  });

  // Check token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Check if token is expired
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsLoading(false);
          return;
        }

        // Get user data
        const response = await authAPI.getMe();
        setUser(response.data.data);
        setIsAuthenticated(true);
        
        // Load user data
        await loadUserData();
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Load user data from API
  const loadUserData = async () => {
    try {
      // Get user profile and eco stats
      const [statsRes, purchasesRes, salesRes] = await Promise.all([
        userAPI.getEcoStats(),
        transactionAPI.getPurchases(),
        transactionAPI.getSales()
      ]);

      setUserData({
        soldProducts: salesRes.data.data.map(sale => ({
          ...sale.product,
          id: sale.product._id,
          dateListed: sale.createdAt,
          status: sale.status,
          buyer: sale.buyer
        })),
        purchasedProducts: purchasesRes.data.data.map(purchase => ({
          ...purchase.product,
          id: purchase.product._id,
          datePurchased: purchase.createdAt,
          status: purchase.status,
          seller: purchase.seller
        })),
        ecoStats: statsRes.data.data
      });
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  // Authentication functions
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify({ id: decoded.id }));
      
      setIsAuthenticated(true);
      
      // Get user data
      const userResponse = await authAPI.getMe();
      setUser(userResponse.data.data);
      
      // Load user data
      await loadUserData();
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      await authAPI.register({ name, email, password });
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      setUserData({
        soldProducts: [],
        purchasedProducts: [],
        ecoStats: {
          totalCO2Saved: 0,
          totalWaterSaved: 0,
          totalItemsSold: 0,
          totalItemsBought: 0,
          ecoPoints: 0
        }
      });
    }
  };

  // Product functions
  const addSoldProduct = async (product) => {
    try {
      const response = await productAPI.createProduct(product);
      const newProduct = response.data.data;
      
      // Refresh user data
      await loadUserData();
      
      toast.success('Product listed successfully!');
      return newProduct;
    } catch (error) {
      toast.error('Failed to list product');
      console.error('Failed to add product:', error);
      throw error;
    }
  };

  const addPurchasedProduct = async (productId, deliveryOption, deliveryAddress) => {
    try {
      const response = await transactionAPI.createTransaction({
        product: productId,
        deliveryOption,
        deliveryAddress
      });
      
      const newPurchase = response.data.data;
      
      // Refresh user data
      await loadUserData();
      
      toast.success('Product purchased successfully!');
      return newPurchase;
    } catch (error) {
      toast.error('Failed to purchase product');
      console.error('Failed to purchase product:', error);
      throw error;
    }
  };

  const updateProductStatus = async (productId, newStatus) => {
    try {
      await productAPI.updateProduct(productId, { status: newStatus });
      
      // Refresh user data
      await loadUserData();
      
      toast.success('Product status updated successfully!');
    } catch (error) {
      toast.error('Failed to update product status');
      console.error('Failed to update product status:', error);
      throw error;
    }
  };

  const updateTransactionStatus = async (transactionId, newStatus) => {
    try {
      await transactionAPI.updateStatus(transactionId, newStatus);
      
      // Refresh user data
      await loadUserData();
      
      toast.success('Transaction status updated successfully!');
    } catch (error) {
      toast.error('Failed to update transaction status');
      console.error('Failed to update transaction status:', error);
      throw error;
    }
  };

  // Calculate eco impact (this will be handled by the backend now, but kept for compatibility)
  const calculateEcoImpact = (product) => {
    const categoryMultipliers = {
      'Electronics': { co2: 15, water: 100 },
      'Clothing': { co2: 8, water: 2500 },
      'Furniture': { co2: 25, water: 150 },
      'Books': { co2: 2, water: 10 },
      'Sports': { co2: 5, water: 50 },
      'Home & Garden': { co2: 10, water: 200 },
      'Toys': { co2: 3, water: 75 },
      'Other': { co2: 5, water: 100 }
    };
    
    const multiplier = categoryMultipliers[product.category] || categoryMultipliers['Other'];
    const priceMultiplier = Math.max(1, parseInt(product.price) / 1000);
    
    return {
      co2Saved: Math.round(multiplier.co2 * priceMultiplier),
      waterSaved: Math.round(multiplier.water * priceMultiplier)
    };
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      const response = await userAPI.updateProfile(profileData);
      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    userData,
    login,
    register,
    logout,
    addSoldProduct,
    addPurchasedProduct,
    updateProductStatus,
    updateTransactionStatus,
    calculateEcoImpact,
    updateUserProfile
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
