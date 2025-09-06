import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserDataProvider } from './context/UserDataContext'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import SellPage from './pages/SellPage'
import EcoDashboardPage from './pages/EcoDashboardPage'
import ProfilePage from './pages/ProfilePage'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import About from './pages/About'
import Contact from './pages/Contact'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import ProtectedRoute from './components/auth/ProtectedRoute'
import './App.css'

function App() {
  return (
    <UserDataProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/features" element={<Features />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/sell" element={
                <ProtectedRoute>
                  <SellPage />
                </ProtectedRoute>
              } />
              <Route path="/eco-dashboard" element={
                <ProtectedRoute>
                  <EcoDashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </div>
      </Router>
    </UserDataProvider>
  )
}

export default App