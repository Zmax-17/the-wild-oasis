
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://xxtxxemciaxghxslnxnr.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dHh4ZW1jaWF4Z2h4c2xueG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQzNTMyODksImV4cCI6MjAwOTkyOTI4OX0.bSa4v7tEgQGpJH-JNjYkQxgKXgzm-fjzeYv5Ox8Z8P0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;