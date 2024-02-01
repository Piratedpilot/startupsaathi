-- Create validations table for storing startup idea validations
CREATE TABLE IF NOT EXISTS validations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_title TEXT NOT NULL,
  idea_description TEXT NOT NULL,
  form_data JSONB,
  validation_result JSONB,
  overall_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_validations_user_id ON validations(user_id);
CREATE INDEX IF NOT EXISTS idx_validations_created_at ON validations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE validations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own validations
CREATE POLICY "Users can view their own validations" ON validations
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own validations
CREATE POLICY "Users can insert their own validations" ON validations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own validations
CREATE POLICY "Users can update their own validations" ON validations
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own validations
CREATE POLICY "Users can delete their own validations" ON validations
  FOR DELETE USING (auth.uid() = user_id);
