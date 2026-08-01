import DashboardHeader from '../components/DashboardHeader';
import StatCard from '../components/StatCard';
import ActivityTimeline from '../components/ActivityTimeline';
import QuickActions from '../components/QuickActions';
import AIInsightsPanel from '../components/AIInsightsPanel';
import ReferralSummary from '../components/ReferralSummary';
import DownloadSection from '../components/DownloadSection';
import ProfileCard from '../components/ProfileCard';

function Dashboard() {
  return (
    <main className="page dashboard-page">
      <div className="container">
        <DashboardHeader />

        <div className="dashboard-grid">
          <section className="dashboard-main">
            <div className="dashboard-stats">
              <StatCard title="Business Health Score" value="92/100" change="↑ 8% from last month" accent="linear-gradient(135deg, #5eead4, #3b82f6)" />
              <StatCard title="AI Reports Generated" value="128" change="14 this week" accent="linear-gradient(135deg, #a78bfa, #60a5fa)" />
              <StatCard title="Competitor Analyses" value="24" change="3 new this week" accent="linear-gradient(135deg, #f59e0b, #fb923c)" />
              <StatCard title="Referral Earnings" value="₹2.4L" change="+$18.2K this month" accent="linear-gradient(135deg, #34d399, #10b981)" />
            </div>

            <ActivityTimeline />
            <QuickActions />
            <AIInsightsPanel />
          </section>

          <aside className="dashboard-sidebar">
            <ProfileCard />
            <ReferralSummary />
            <DownloadSection />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
