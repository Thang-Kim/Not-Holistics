import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AppMetric, UserEngagement, FeatureUsage } from '../types';

export const useAnalytics = () => {
  const [appMetrics, setAppMetrics] = useState<AppMetric[]>([]);
  const [userEngagement, setUserEngagement] = useState<UserEngagement[]>([]);
  const [featureUsage, setFeatureUsage] = useState<FeatureUsage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [metricsRes, engagementRes, featuresRes] = await Promise.all([
        supabase
          .from('app_metrics')
          .select('*')
          .order('date', { ascending: true })
          .limit(30),
        supabase
          .from('user_engagement')
          .select('*')
          .order('date', { ascending: true })
          .limit(30),
        supabase
          .from('feature_usage')
          .select('*')
          .order('date', { ascending: false })
          .limit(100),
      ]);

      if (metricsRes.data) setAppMetrics(metricsRes.data);
      if (engagementRes.data) setUserEngagement(engagementRes.data);
      if (featuresRes.data) setFeatureUsage(featuresRes.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return { appMetrics, userEngagement, featureUsage, loading, refetch: fetchData };
};
