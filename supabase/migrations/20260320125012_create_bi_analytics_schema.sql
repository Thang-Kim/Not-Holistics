/*
  # Create BI Analytics Schema for Mobile App

  ## Overview
  Creates a comprehensive analytics database for a mobile-first BI tool designed for Gen Z users.
  
  ## New Tables
  
  ### 1. `app_metrics`
  Stores daily app usage and performance metrics
  - `id` (uuid, primary key) - Unique identifier
  - `date` (date, not null) - Metric date
  - `active_users` (integer, default 0) - Daily active users count
  - `sessions` (integer, default 0) - Total sessions
  - `avg_session_duration` (integer, default 0) - Average session in seconds
  - `revenue` (numeric, default 0) - Daily revenue
  - `created_at` (timestamptz) - Record creation time
  
  ### 2. `user_engagement`
  Tracks user engagement metrics over time
  - `id` (uuid, primary key) - Unique identifier
  - `date` (date, not null) - Engagement date
  - `new_users` (integer, default 0) - New user signups
  - `returning_users` (integer, default 0) - Returning users
  - `churn_rate` (numeric, default 0) - User churn percentage
  - `engagement_score` (numeric, default 0) - Overall engagement score (0-100)
  - `created_at` (timestamptz) - Record creation time
  
  ### 3. `feature_usage`
  Tracks which features are being used
  - `id` (uuid, primary key) - Unique identifier
  - `feature_name` (text, not null) - Name of the feature
  - `usage_count` (integer, default 0) - Times feature was used
  - `unique_users` (integer, default 0) - Unique users using feature
  - `date` (date, not null) - Usage date
  - `created_at` (timestamptz) - Record creation time
  
  ## Security
  - Enable RLS on all tables
  - Add policies for public read access (for demo purposes)
  - In production, these should be restricted to authenticated users
  
  ## Sample Data
  Includes sample data for demonstration purposes with realistic metrics
*/

-- Create app_metrics table
CREATE TABLE IF NOT EXISTS app_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  active_users integer DEFAULT 0,
  sessions integer DEFAULT 0,
  avg_session_duration integer DEFAULT 0,
  revenue numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_engagement table
CREATE TABLE IF NOT EXISTS user_engagement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  new_users integer DEFAULT 0,
  returning_users integer DEFAULT 0,
  churn_rate numeric DEFAULT 0,
  engagement_score numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create feature_usage table
CREATE TABLE IF NOT EXISTS feature_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_name text NOT NULL,
  usage_count integer DEFAULT 0,
  unique_users integer DEFAULT 0,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(feature_name, date)
);

-- Enable RLS
ALTER TABLE app_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (demo purposes)
CREATE POLICY "Allow public read access to app_metrics"
  ON app_metrics
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to user_engagement"
  ON user_engagement
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to feature_usage"
  ON feature_usage
  FOR SELECT
  TO anon
  USING (true);

-- Insert sample data for app_metrics (last 30 days)
INSERT INTO app_metrics (date, active_users, sessions, avg_session_duration, revenue)
SELECT 
  date::date,
  (2000 + (random() * 1000))::integer,
  (5000 + (random() * 2000))::integer,
  (180 + (random() * 240))::integer,
  (1000 + (random() * 2000))::numeric(10,2)
FROM generate_series(
  CURRENT_DATE - INTERVAL '29 days',
  CURRENT_DATE,
  INTERVAL '1 day'
) date
ON CONFLICT (date) DO NOTHING;

-- Insert sample data for user_engagement
INSERT INTO user_engagement (date, new_users, returning_users, churn_rate, engagement_score)
SELECT 
  date::date,
  (100 + (random() * 150))::integer,
  (1800 + (random() * 800))::integer,
  (2 + (random() * 3))::numeric(4,2),
  (65 + (random() * 25))::numeric(5,2)
FROM generate_series(
  CURRENT_DATE - INTERVAL '29 days',
  CURRENT_DATE,
  INTERVAL '1 day'
) date
ON CONFLICT (date) DO NOTHING;

-- Insert sample data for feature_usage
INSERT INTO feature_usage (feature_name, usage_count, unique_users, date)
SELECT 
  feature,
  (500 + (random() * 1000))::integer,
  (300 + (random() * 500))::integer,
  date::date
FROM generate_series(
  CURRENT_DATE - INTERVAL '29 days',
  CURRENT_DATE,
  INTERVAL '1 day'
) date
CROSS JOIN (
  VALUES 
    ('Dashboard'),
    ('Analytics'),
    ('Reports'),
    ('Export'),
    ('Settings')
) features(feature)
ON CONFLICT (feature_name, date) DO NOTHING;
