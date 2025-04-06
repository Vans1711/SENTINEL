# Supabase Setup Guide for Sentinel Project

## Table Creation

Below are the SQL commands you need to run in the Supabase SQL Editor to create all necessary tables for the Sentinel project:

### 1. Users Table (Using Built-in Auth)

Supabase already provides a built-in `auth.users` table, but you'll need to create user profiles table:

```sql
-- Create user_profiles table to store additional user information
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('volunteer', 'family')),
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);
```

### 2. Families Table

```sql
-- Create families table
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  martyr_name TEXT NOT NULL,
  martyr_rank TEXT NOT NULL,
  martyr_unit TEXT,
  force_type TEXT NOT NULL CHECK (force_type IN ('Army', 'Navy', 'Air Force', 'CRPF', 'BSF', 'Other')),
  date_of_martyrdom DATE,
  relationship_with_martyr TEXT,
  address JSONB DEFAULT '{"street": "", "city": "", "state": "", "pincode": ""}',
  contact_details JSONB DEFAULT '{"primaryPhone": "", "alternatePhone": "", "email": ""}',
  support_status JSONB DEFAULT '{"pensionStatus": "Pending", "housingStatus": "NA", "educationSupport": false, "medicalSupport": false}',
  last_visited_date DATE,
  region TEXT,
  total_children INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on families
ALTER TABLE families ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view families
CREATE POLICY "Families are viewable by all authenticated users" 
  ON families FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy: Families can update their own record
CREATE POLICY "Families can update own record" 
  ON families FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy: Admins can update any family record
CREATE POLICY "Admins can update any family" 
  ON families FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));
```

### 3. Family Members Table

```sql
-- Create family_members table
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  relation TEXT NOT NULL,
  education TEXT,
  occupation TEXT,
  education_level TEXT,
  marital_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on family_members
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view family members
CREATE POLICY "Family members are viewable by authenticated users" 
  ON family_members FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy: Family members can be updated by associated family or admin
CREATE POLICY "Family members can be updated by family or admin" 
  ON family_members FOR UPDATE 
  USING (
    auth.uid() IN (
      SELECT user_id FROM families WHERE id = family_id
    ) OR
    auth.uid() IN (
      SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );
```

### 4. Volunteers Table

```sql
-- Create volunteers table
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  organization TEXT,
  role TEXT,
  skills TEXT[] DEFAULT '{}',
  availability JSONB DEFAULT '{"weekdays": false, "weekends": false, "evenings": false}',
  joined_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Active',
  total_hours INTEGER DEFAULT 0,
  regions TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on volunteers
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view volunteers
CREATE POLICY "Volunteers are viewable by authenticated users" 
  ON volunteers FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Policy: Volunteers can update their own record
CREATE POLICY "Volunteers can update own record" 
  ON volunteers FOR UPDATE 
  USING (auth.uid() = user_id);
```

### 5. Volunteer Assignments

```sql
-- Create volunteer_assignments table
CREATE TABLE volunteer_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE CASCADE,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (volunteer_id, family_id)
);

-- Enable RLS on volunteer_assignments
ALTER TABLE volunteer_assignments ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view assignments
CREATE POLICY "Assignments are viewable by authenticated users" 
  ON volunteer_assignments FOR SELECT 
  USING (auth.role() = 'authenticated');
```

### 6. Support Tasks and History

```sql
-- Create support_tasks table
CREATE TABLE support_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE SET NULL,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Cancelled')),
  priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  due_date DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on support_tasks
ALTER TABLE support_tasks ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view tasks
CREATE POLICY "Tasks are viewable by authenticated users" 
  ON support_tasks FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create support_history table
CREATE TABLE support_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE SET NULL,
  support_type TEXT NOT NULL,
  description TEXT,
  date DATE DEFAULT CURRENT_DATE,
  hours_spent NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on support_history
ALTER TABLE support_history ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view support history
CREATE POLICY "Support history is viewable by authenticated users" 
  ON support_history FOR SELECT 
  USING (auth.role() = 'authenticated');
```

### 7. Scholarships Table

```sql
-- Create scholarships table
CREATE TABLE scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  description TEXT,
  eligibility JSONB,
  benefits JSONB,
  application_link TEXT,
  application_process TEXT,
  deadline DATE,
  region TEXT,
  course_levels TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on scholarships
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view scholarships
CREATE POLICY "Scholarships are viewable by all authenticated users" 
  ON scholarships FOR SELECT 
  USING (auth.role() = 'authenticated');
```

## Sample Data Insertion

Now let's insert some sample data to get your application working:

### 1. Insert Volunteer Data

```sql
-- Insert sample volunteers
INSERT INTO volunteers (name, email, phone, organization, role, skills, regions, availability)
VALUES
  ('Raj Kumar', 'raj.kumar@example.com', '9876543210', 'Veterans Association', 'Coordinator', ARRAY['counseling', 'paperwork', 'legal-aid'], ARRAY['Delhi', 'Haryana'], '{"weekdays": true, "weekends": true, "evenings": false}'),
  ('Priya Singh', 'priya.singh@example.com', '8765432109', 'Medical Corps Assoc.', 'Medical Volunteer', ARRAY['medical', 'first-aid', 'counseling'], ARRAY['Mumbai', 'Pune'], '{"weekdays": false, "weekends": true, "evenings": true}'),
  ('Vikram Mehta', 'vikram.mehta@example.com', '7654321098', 'Indian Ex-Servicemen League', 'Legal Advisor', ARRAY['legal-aid', 'paperwork', 'pension-assistance'], ARRAY['Bangalore', 'Chennai'], '{"weekdays": true, "weekends": false, "evenings": true}'),
  ('Ananya Desai', 'ananya.desai@example.com', '6543210987', 'Education Support Network', 'Education Mentor', ARRAY['education', 'tutoring', 'career-guidance'], ARRAY['Kolkata', 'Bhubaneswar'], '{"weekdays": true, "weekends": true, "evenings": true}'),
  ('Sanjay Verma', 'sanjay.verma@example.com', '5432109876', 'Sainik Welfare Board', 'Financial Advisor', ARRAY['financial-planning', 'pension-assistance', 'housing-support'], ARRAY['Jaipur', 'Ahmedabad'], '{"weekdays": true, "weekends": false, "evenings": false}');
```

### 2. Insert Family Data

```sql
-- Insert sample families
INSERT INTO families (
  martyr_name, martyr_rank, martyr_unit, force_type, 
  date_of_martyrdom, relationship_with_martyr, region, 
  address, contact_details, total_children, status, last_visited_date
) VALUES
  (
    'Capt. Anuj Nayyar', 'Captain', '17 Jat Regiment', 'Army', 
    '1999-07-06', 'Wife', 'Delhi', 
    '{"street": "15, Defense Colony", "city": "New Delhi", "state": "Delhi", "pincode": "110024"}',
    '{"primaryPhone": "9876543210", "alternatePhone": "8765432109", "email": "family.nayyar@example.com"}',
    2, 'Active', '2023-10-15'
  ),
  (
    'Maj. Sandeep Unnikrishnan', 'Major', 'NSG Commando', 'Army', 
    '2008-11-28', 'Father', 'Karnataka', 
    '{"street": "123, 9th Cross", "city": "Bangalore", "state": "Karnataka", "pincode": "560034"}',
    '{"primaryPhone": "7654321098", "alternatePhone": "6543210987", "email": "family.unnikrishnan@example.com"}',
    0, 'Active', '2023-11-05'
  ),
  (
    'CRPF HC Narayan Gurung', 'Head Constable', '92 Battalion', 'CRPF', 
    '2019-02-14', 'Wife', 'Uttarakhand', 
    '{"street": "Village Chamoli", "city": "Dehradun", "state": "Uttarakhand", "pincode": "248001"}',
    '{"primaryPhone": "6543210987", "alternatePhone": "", "email": "family.gurung@example.com"}',
    3, 'Active', '2023-09-20'
  ),
  (
    'Lt. Manoj Kumar Pandey', 'Lieutenant', '1/11 Gorkha Rifles', 'Army', 
    '1999-07-03', 'Brother', 'Uttar Pradesh', 
    '{"street": "45, Civil Lines", "city": "Lucknow", "state": "Uttar Pradesh", "pincode": "226001"}',
    '{"primaryPhone": "5432109876", "alternatePhone": "4321098765", "email": "family.pandey@example.com"}',
    1, 'Active', '2023-08-15'
  ),
  (
    'Nb Sub. Chuni Lal', 'Naib Subedar', '8 JAK LI', 'Army', 
    '2007-06-24', 'Wife', 'Jammu & Kashmir', 
    '{"street": "Village Beri", "city": "Jammu", "state": "Jammu & Kashmir", "pincode": "180001"}',
    '{"primaryPhone": "4321098765", "alternatePhone": "", "email": "family.lal@example.com"}',
    2, 'Active', '2023-07-26'
  ),
  (
    'Hav. Hangpan Dada', 'Havildar', '35 Rashtriya Rifles', 'Army', 
    '2016-05-27', 'Wife', 'Arunachal Pradesh', 
    '{"street": "Village Borduria", "city": "Tirap", "state": "Arunachal Pradesh", "pincode": "792001"}',
    '{"primaryPhone": "3210987654", "alternatePhone": "2109876543", "email": "family.dada@example.com"}',
    2, 'Active', '2023-06-18'
  ),
  (
    'Col. MN Rai', 'Colonel', '9 Gorkha Rifles', 'Army', 
    '2015-01-27', 'Wife', 'Delhi', 
    '{"street": "Army Officers Colony", "city": "New Delhi", "state": "Delhi", "pincode": "110010"}',
    '{"primaryPhone": "2109876543", "alternatePhone": "", "email": "family.rai@example.com"}',
    2, 'Active', '2023-05-12'
  );
```

### 3. Insert Family Members Data

```sql
-- Insert sample family members
INSERT INTO family_members (family_id, name, age, relation, education, occupation, education_level, marital_status)
VALUES
  ((SELECT id FROM families WHERE martyr_name = 'Capt. Anuj Nayyar'), 'Meena Nayyar', 45, 'Wife', 'MBA', 'Business Owner', 'Post Graduate', 'Widow'),
  ((SELECT id FROM families WHERE martyr_name = 'Capt. Anuj Nayyar'), 'Arjun Nayyar', 19, 'Son', 'Engineering Student', 'Student', 'Under Graduate', 'Single'),
  ((SELECT id FROM families WHERE martyr_name = 'Capt. Anuj Nayyar'), 'Aaradhya Nayyar', 15, 'Daughter', 'School', 'Student', 'High School', 'Single'),
  
  ((SELECT id FROM families WHERE martyr_name = 'Maj. Sandeep Unnikrishnan'), 'K. Unnikrishnan', 72, 'Father', 'Retired ISRO Officer', 'Retired', 'Graduate', 'Married'),
  ((SELECT id FROM families WHERE martyr_name = 'Maj. Sandeep Unnikrishnan'), 'Dhanalakshmi Unnikrishnan', 68, 'Mother', 'Homemaker', 'Homemaker', 'Graduate', 'Married'),
  
  ((SELECT id FROM families WHERE martyr_name = 'CRPF HC Narayan Gurung'), 'Laxmi Gurung', 38, 'Wife', 'B.A.', 'Government Job', 'Graduate', 'Widow'),
  ((SELECT id FROM families WHERE martyr_name = 'CRPF HC Narayan Gurung'), 'Prakash Gurung', 17, 'Son', 'School', 'Student', 'High School', 'Single'),
  ((SELECT id FROM families WHERE martyr_name = 'CRPF HC Narayan Gurung'), 'Vani Gurung', 12, 'Daughter', 'School', 'Student', 'Middle School', 'Single'),
  ((SELECT id FROM families WHERE martyr_name = 'CRPF HC Narayan Gurung'), 'Ravi Gurung', 9, 'Son', 'School', 'Student', 'Primary School', 'Single');
```

### 4. Insert Support History

```sql
-- Insert sample support history
INSERT INTO support_history (
  family_id, volunteer_id, support_type, description, date, hours_spent
)
VALUES
  (
    (SELECT id FROM families WHERE martyr_name = 'Capt. Anuj Nayyar'),
    (SELECT id FROM volunteers WHERE name = 'Raj Kumar'),
    'Documentation', 'Assisted with pension paperwork and verification', '2023-10-15', 3.5
  ),
  (
    (SELECT id FROM families WHERE martyr_name = 'Maj. Sandeep Unnikrishnan'),
    (SELECT id FROM volunteers WHERE name = 'Priya Singh'),
    'Medical Support', 'Health checkup for elderly parents and medications guidance', '2023-11-05', 2.0
  ),
  (
    (SELECT id FROM families WHERE martyr_name = 'CRPF HC Narayan Gurung'),
    (SELECT id FROM volunteers WHERE name = 'Ananya Desai'),
    'Educational Support', 'School admission assistance for younger son', '2023-09-20', 4.0
  ),
  (
    (SELECT id FROM families WHERE martyr_name = 'Lt. Manoj Kumar Pandey'),
    (SELECT id FROM volunteers WHERE name = 'Vikram Mehta'),
    'Legal Aid', 'Property title transfer assistance', '2023-08-15', 5.5
  ),
  (
    (SELECT id FROM families WHERE martyr_name = 'Nb Sub. Chuni Lal'),
    (SELECT id FROM volunteers WHERE name = 'Sanjay Verma'),
    'Financial Planning', 'Investment advice for children's education fund', '2023-07-26', 2.0
  );
```

### 5. Insert Support Tasks

```sql
-- Insert sample support tasks
INSERT INTO support_tasks (
  title, description, volunteer_id, family_id, status, priority, due_date
)
VALUES
  (
    'School Admission Process', 
    'Help with completing school admission forms for Aaradhya Nayyar and coordinate with Army school authorities',
    (SELECT id FROM volunteers WHERE name = 'Ananya Desai'),
    (SELECT id FROM families WHERE martyr_name = 'Capt. Anuj Nayyar'),
    'In Progress', 'High', '2023-12-30'
  ),
  (
    'Medical Checkup Arrangement', 
    'Schedule and coordinate medical checkup for K. Unnikrishnan and Dhanalakshmi Unnikrishnan. Arrange transport.',
    (SELECT id FROM volunteers WHERE name = 'Priya Singh'),
    (SELECT id FROM families WHERE martyr_name = 'Maj. Sandeep Unnikrishnan'),
    'Pending', 'Medium', '2023-12-15'
  ),
  (
    'Scholarship Application', 
    'Complete PM Scholarship application for Prakash Gurung before deadline',
    (SELECT id FROM volunteers WHERE name = 'Raj Kumar'),
    (SELECT id FROM families WHERE martyr_name = 'CRPF HC Narayan Gurung'),
    'Pending', 'Urgent', '2023-12-10'
  ),
  (
    'Housing Repair Coordination', 
    'Coordinate with contractors for essential repairs at family residence',
    (SELECT id FROM volunteers WHERE name = 'Sanjay Verma'),
    (SELECT id FROM families WHERE martyr_name = 'Hav. Hangpan Dada'),
    'Pending', 'Medium', '2024-01-15'
  ),
  (
    'Computer Training Sessions', 
    'Arrange basic computer training for family members to help with digital literacy',
    (SELECT id FROM volunteers WHERE name = 'Vikram Mehta'),
    (SELECT id FROM families WHERE martyr_name = 'Col. MN Rai'),
    'Pending', 'Low', '2024-01-30'
  );
```

### 6. Insert Scholarships

```sql
-- Insert sample scholarships
INSERT INTO scholarships (
  name, provider, description, eligibility, benefits, 
  application_link, application_process, deadline, 
  region, course_levels, tags
)
VALUES
  (
    'Prime Minister''s Scholarship Scheme', 
    'Ministry of Defence', 
    'Scholarship for dependent children of ex-servicemen and their widows including those killed/disabled during conflicts',
    '{"items": ["Children of ex-servicemen and their widows", "Children of personnel killed/disabled during conflicts", "Students pursuing professional degrees"], "note": "Income criteria may apply"}',
    '{"items": ["Rs. 36,000 per annum for boys", "Rs. 37,000 per annum for girls", "Duration of the course"], "note": "Amount may be revised periodically"}',
    'https://desw.gov.in', 
    'Apply through Kendriya Sainik Board/respective Zila/Rajya Sainik Boards with required documents',
    '2023-10-31',
    NULL, 
    ARRAY['Under Graduate', 'Professional Degree'], 
    ARRAY['national', 'government', 'professional courses']
  ),
  (
    'CRPF Education Scholarship', 
    'Central Reserve Police Force', 
    'For the wards of serving CRPF personnel and wards of martyrs of CRPF',
    '{"items": ["Wards of CRPF martyrs", "Pursuing education from Class 1 to PhD", "Must be enrolled in a recognized institution"], "note": "No income bar for wards of martyrs"}',
    '{"items": ["Tuition fee reimbursement", "Hostel charges", "Book grant"], "note": "Different slabs based on course and level"}',
    'https://crpf.gov.in', 
    'Submit application to Welfare Directorate, CRPF with necessary documents including education certificates',
    '2023-12-15',
    NULL, 
    ARRAY['Primary', 'Secondary', 'Under Graduate', 'Post Graduate', 'Doctoral'], 
    ARRAY['national', 'government', 'all levels']
  ),
  (
    'National Defence Fund Scholarship', 
    'Government of India', 
    'Financial assistance for education of dependent children of Armed Forces personnel killed or disabled during wars/conflicts',
    '{"items": ["Children of Armed Forces personnel killed/disabled in wars/conflicts", "Technical/professional courses after 12th standard"], "note": "Must be first two children in order of birth"}',
    '{"items": ["Rs. 30,000 per annum for boys", "Rs. 36,000 per annum for girls", "For entire duration of course"], "note": "Paid directly to student/institute"}',
    'https://pmnrf.gov.in', 
    'Applications are automatically processed based on records from Service HQs. Families should ensure their details are updated with respective Service HQs',
    NULL,
    NULL, 
    ARRAY['Professional Degree', 'Technical Courses'], 
    ARRAY['national', 'government', 'technical courses']
  ),
  (
    'Karnataka Sainik Welfare Board Scholarship', 
    'Karnataka State Government', 
    'Educational assistance to the children of Ex-Servicemen domiciled in Karnataka',
    '{"items": ["Children of Ex-Servicemen domiciled in Karnataka", "Children of war widows and war disabled"], "note": "Priority to children of martyrs"}',
    '{"items": ["Financial assistance from primary to higher education", "Merit-based additional benefits"], "note": "Amount varies based on course"}',
    'https://sainik.kar.nic.in', 
    'Apply through District Sainik Welfare Office with marks card, ex-servicemen certificate and other required documents',
    '2023-11-30',
    'Karnataka', 
    ARRAY['Primary', 'Secondary', 'Under Graduate', 'Post Graduate'], 
    ARRAY['state', 'government', 'all levels']
  ),
  (
    'BSF Education Scholarship', 
    'Border Security Force', 
    'Scholarship for wards of BSF martyrs and serving/retired BSF personnel',
    '{"items": ["Wards of BSF martyrs get 100% scholarship", "Wards of serving/retired BSF personnel based on merit"], "note": "Special consideration for disabilities"}',
    '{"items": ["Full tuition fee reimbursement for martyrs' wards", "Merit-based slabs for others", "Additional benefits for technical courses"], "note": "Direct transfer to student account"}',
    'https://bsf.gov.in', 
    'Apply through respective BSF unit/formation with required certificates and proof of admission',
    '2023-09-30',
    NULL, 
    ARRAY['School', 'Under Graduate', 'Post Graduate'], 
    ARRAY['national', 'government', 'paramilitary']
  );
```

## Configuring Supabase Settings

After creating tables and inserting data, you need to set up a few more things:

### Enable Authentication

1. Go to Authentication > Settings
2. Enable Email auth provider
3. Optionally enable "Confirm email" if you want to verify emails

### Set Up Storage Buckets

```sql
-- Create public bucket for profile pictures
INSERT INTO storage.buckets (id, name, public) VALUES ('profiles', 'Profiles', true);

-- Create secure bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'Documents', false);

-- RLS policy for profile pictures
CREATE POLICY "Profile pictures are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profiles');

-- RLS policy for documents
CREATE POLICY "Documents are accessible by authenticated users only"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
```

### Create API Keys (if needed)

1. Go to Project Settings > API
2. Note the URL and anon key for your frontend application
3. Add these to your environment variables:

```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Now your Supabase backend should be fully set up and ready to connect with your frontend application! 