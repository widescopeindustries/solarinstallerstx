-- Direct Sales Representative Directory Schema
-- This schema defines all tables needed for the rep directory platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- COMPANIES TABLE
-- Stores all network marketing companies
-- =====================================================
CREATE TABLE IF NOT EXISTS companies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  category TEXT,
  slug TEXT UNIQUE NOT NULL
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS companies_slug_idx ON companies(slug);

-- =====================================================
-- PROFILES TABLE
-- Public profiles for each representative
-- Links to auth.users via id
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT,
  last_name TEXT,
  profile_picture_url TEXT,
  bio TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  personal_website_url TEXT,
  is_pro_subscriber BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Indexes for faster searches
CREATE INDEX IF NOT EXISTS profiles_state_idx ON profiles(state);
CREATE INDEX IF NOT EXISTS profiles_zip_code_idx ON profiles(zip_code);
CREATE INDEX IF NOT EXISTS profiles_city_idx ON profiles(city);
CREATE INDEX IF NOT EXISTS profiles_is_pro_subscriber_idx ON profiles(is_pro_subscriber);

-- =====================================================
-- REP_COMPANIES JOIN TABLE
-- Links representatives to companies (many-to-many)
-- =====================================================
CREATE TABLE IF NOT EXISTS rep_companies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rep_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  company_id BIGINT REFERENCES companies(id) ON DELETE CASCADE,
  UNIQUE(rep_id, company_id)
);

-- Enable Row Level Security
ALTER TABLE rep_companies ENABLE ROW LEVEL SECURITY;

-- Policies for rep_companies
CREATE POLICY "Rep companies are viewable by everyone"
  ON rep_companies FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own rep companies"
  ON rep_companies FOR INSERT
  WITH CHECK (auth.uid() = rep_id);

CREATE POLICY "Users can delete their own rep companies"
  ON rep_companies FOR DELETE
  USING (auth.uid() = rep_id);

-- Indexes for faster joins
CREATE INDEX IF NOT EXISTS rep_companies_rep_id_idx ON rep_companies(rep_id);
CREATE INDEX IF NOT EXISTS rep_companies_company_id_idx ON rep_companies(company_id);

-- =====================================================
-- REVIEWS TABLE
-- Customer reviews for representatives
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  rep_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for reviews
CREATE POLICY "Approved reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Anyone can submit a review"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS reviews_rep_id_idx ON reviews(rep_id);
CREATE INDEX IF NOT EXISTS reviews_is_approved_idx ON reviews(is_approved);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to handle new user signups
-- Automatically creates a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SEED DATA (Sample Companies)
-- =====================================================

INSERT INTO companies (name, logo_url, description, category, slug) VALUES
  ('Mary Kay', 'https://placehold.co/200x100/pink/white?text=Mary+Kay', 'Leading cosmetics and skin care direct sales company', 'Cosmetics', 'mary-kay'),
  ('Pampered Chef', 'https://placehold.co/200x100/red/white?text=Pampered+Chef', 'Kitchen tools, food products and cookware', 'Kitchenware', 'pampered-chef'),
  ('Avon', 'https://placehold.co/200x100/purple/white?text=Avon', 'Beauty, household, and personal care products', 'Cosmetics', 'avon'),
  ('Tupperware', 'https://placehold.co/200x100/blue/white?text=Tupperware', 'Food storage and serving products', 'Kitchenware', 'tupperware'),
  ('Scentsy', 'https://placehold.co/200x100/orange/white?text=Scentsy', 'Fragrance products and home decor', 'Home & Wellness', 'scentsy'),
  ('Young Living', 'https://placehold.co/200x100/green/white?text=Young+Living', 'Essential oils and wellness products', 'Wellness', 'young-living'),
  ('doTERRA', 'https://placehold.co/200x100/teal/white?text=doTERRA', 'Essential oils and natural solutions', 'Wellness', 'doterra'),
  ('Norwex', 'https://placehold.co/200x100/blue/white?text=Norwex', 'Eco-friendly cleaning and personal care', 'Home & Wellness', 'norwex'),
  ('Thirty-One', 'https://placehold.co/200x100/navy/white?text=Thirty+One', 'Personalized bags, totes and organization', 'Fashion & Accessories', 'thirty-one'),
  ('Color Street', 'https://placehold.co/200x100/rainbow/white?text=Color+Street', '100% nail polish strips', 'Cosmetics', 'color-street')
ON CONFLICT (slug) DO NOTHING;
