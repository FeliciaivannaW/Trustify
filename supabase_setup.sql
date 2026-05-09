-- Copy and paste this SQL into the Supabase SQL Editor to create the necessary tables.

CREATE TABLE public.scans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id TEXT NOT NULL,
    type TEXT NOT NULL,
    snippet TEXT NOT NULL,
    score INTEGER NOT NULL,
    risk_level TEXT NOT NULL,
    red_flags JSONB DEFAULT '[]'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (users can save scans)
CREATE POLICY "Allow anonymous inserts" ON public.scans
FOR INSERT WITH CHECK (true);

-- Allow users to read all public community scans (if you want dashboard to show everyone's scans)
CREATE POLICY "Allow public read access" ON public.scans
FOR SELECT USING (true);
