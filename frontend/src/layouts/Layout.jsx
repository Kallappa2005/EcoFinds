import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="w-full px-6 py-8 max-w-none">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout