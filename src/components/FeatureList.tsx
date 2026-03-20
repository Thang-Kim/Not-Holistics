import { motion } from 'framer-motion';
import { FeatureUsage } from '../types';

interface FeatureListProps {
  data: FeatureUsage[];
}

export const FeatureList = ({ data }: FeatureListProps) => {
  const aggregatedData = data.reduce((acc, item) => {
    const existing = acc.find(f => f.feature_name === item.feature_name);
    if (existing) {
      existing.usage_count += item.usage_count;
      existing.unique_users = Math.max(existing.unique_users, item.unique_users);
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, [] as FeatureUsage[]);

  const sortedData = aggregatedData
    .sort((a, b) => b.usage_count - a.usage_count)
    .slice(0, 5);

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="chart-header">
        <h3 className="chart-title">Top Features</h3>
        <p className="chart-subtitle">Most used features</p>
      </div>
      <div className="feature-list">
        {sortedData.map((feature, index) => (
          <motion.div
            key={feature.feature_name}
            className="feature-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="feature-name">{feature.feature_name}</div>
            <div className="feature-stats">
              <div className="feature-stat">
                <div className="feature-stat-label">Uses</div>
                <div className="feature-stat-value">
                  {feature.usage_count.toLocaleString()}
                </div>
              </div>
              <div className="feature-stat">
                <div className="feature-stat-label">Users</div>
                <div className="feature-stat-value">
                  {feature.unique_users.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
