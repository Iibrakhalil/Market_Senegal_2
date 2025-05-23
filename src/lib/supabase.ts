import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://qlwrbditbshcvaclomqw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd3JiZGl0YnNoY3ZhY2xvbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzMxMjYsImV4cCI6MjA2MzUwOTEyNn0.UyNyJyzUtJoNVy9sFxoBvl4UX1Q1i79o3vNpFpjKIiQ'
);