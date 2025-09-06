import StatsCards from '../components/profile/StatsCards'
import EcoImpact from '../components/eco-dashboard/EcoImpact'
import RecentActivity from '../components/profile/RecentActivity'
import QuickActions from '../components/common/QuickActions'

const Dashboard = () => {
  return (
    <div className="w-full max-w-none space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">Welcome back, Alex! 🌱</h1>
        <p className="text-xl text-green-100">
          You've saved 45kg CO₂ this month by choosing sustainable products!
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Eco Impact - Takes 2 columns */}
        <div className="xl:col-span-2">
          <EcoImpact />
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}

export default Dashboard