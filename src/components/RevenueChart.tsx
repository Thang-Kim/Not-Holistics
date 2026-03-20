import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AppMetric } from '../types';

interface RevenueChartProps {
  data: AppMetric[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: Number(item.revenue),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid #FF1493',
          borderRadius: '8px',
          padding: '8px 12px',
        }}>
          <p style={{ color: '#FF1493', fontSize: '0.875rem', fontWeight: 600 }}>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="chart-header">
        <h3 className="chart-title">Revenue Trend</h3>
        <p className="chart-subtitle">Last 30 days</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="date"
            stroke="rgba(255, 255, 255, 0.3)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.3)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FF1493"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#FF1493' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
