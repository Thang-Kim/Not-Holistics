import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  delay?: number;
}

export const MetricCard = ({ label, value, change, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className="stat-change positive">
          <span>↑</span>
          <span>{change}</span>
        </div>
      )}
    </motion.div>
  );
};
