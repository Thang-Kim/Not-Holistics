import { motion } from 'framer-motion';
import { useAnalytics } from './hooks/useAnalytics';
import { MetricCard } from './components/MetricCard';
import { RevenueChart } from './components/RevenueChart';
import { UserEngagementChart } from './components/UserEngagementChart';
import { FeatureList } from './components/FeatureList';
import './App.css';

function App() {
  const { appMetrics, userEngagement, featureUsage, loading, refetch } = useAnalytics();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <div className="loading-text">Loading Analytics...</div>
      </div>
    );
  }

  const latestMetric = appMetrics[appMetrics.length - 1];
  const latestEngagement = userEngagement[userEngagement.length - 1];

  const totalRevenue = appMetrics.reduce((sum, m) => sum + Number(m.revenue), 0);
  const avgUsers = Math.round(
    appMetrics.reduce((sum, m) => sum + m.active_users, 0) / appMetrics.length
  );

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <motion.h1
              className="logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Analytics
            </motion.h1>
            <motion.button
              className="refresh-btn"
              onClick={refetch}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.95 }}
            >
              Refresh
            </motion.button>
          </div>
        </header>

        <main>
          <div className="stats-grid">
            <MetricCard
              label="Active Users"
              value={latestMetric?.active_users.toLocaleString() || '0'}
              change="+12.5%"
              delay={0}
            />
            <MetricCard
              label="Sessions"
              value={latestMetric?.sessions.toLocaleString() || '0'}
              change="+8.3%"
              delay={0.1}
            />
            <MetricCard
              label="Avg Session"
              value={`${Math.floor((latestMetric?.avg_session_duration || 0) / 60)}m`}
              change="+5.2%"
              delay={0.2}
            />
            <MetricCard
              label="Engagement"
              value={`${latestEngagement?.engagement_score.toFixed(0) || '0'}%`}
              change="+3.7%"
              delay={0.3}
            />
          </div>

          <RevenueChart data={appMetrics} />
          <UserEngagementChart data={userEngagement} />
          <FeatureList data={featureUsage} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="section-title">Key Insights</h2>
            <div className="stats-grid">
              <MetricCard
                label="Total Revenue"
                value={`$${(totalRevenue / 1000).toFixed(1)}k`}
                delay={0.8}
              />
              <MetricCard
                label="Avg Daily Users"
                value={avgUsers.toLocaleString()}
                delay={0.9}
              />
              <MetricCard
                label="New Users"
                value={latestEngagement?.new_users.toLocaleString() || '0'}
                delay={1.0}
              />
              <MetricCard
                label="Churn Rate"
                value={`${latestEngagement?.churn_rate.toFixed(1) || '0'}%`}
                delay={1.1}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
