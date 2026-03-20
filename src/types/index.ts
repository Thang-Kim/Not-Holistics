export interface AppMetric {
  id: string;
  date: string;
  active_users: number;
  sessions: number;
  avg_session_duration: number;
  revenue: number;
  created_at: string;
}

export interface UserEngagement {
  id: string;
  date: string;
  new_users: number;
  returning_users: number;
  churn_rate: number;
  engagement_score: number;
  created_at: string;
}

export interface FeatureUsage {
  id: string;
  feature_name: string;
  usage_count: number;
  unique_users: number;
  date: string;
  created_at: string;
}
