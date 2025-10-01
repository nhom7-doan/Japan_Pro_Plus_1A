import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';

const auth = new Hono();

const supabaseUrl = process.env.SUPABASE_URL || 'https://ydpwtlbeasihziydbmpx.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcHd0bGJlYXNpaHppeWRibXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NTI3NzksImV4cCI6MjA3MzMyODc3OX0.qGNvItXv8jlt5lHYN4vVGtZWvo4uVERUz64eqiPXM5s';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

auth.post('/signup', async (c) => {
  try {
    const { email, password, fullName, phone } = await c.req.json();

    if (!email || !password || !fullName) {
      return c.json({ error: 'Email, password, and full name are required' }, 400);
    }

    if (supabaseServiceKey) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          full_name: fullName,
          phone: phone || ''
        },
        email_confirm: true
      });

      if (error) {
        console.error('Sign up error:', error);
        return c.json({ error: error.message }, 400);
      }

      const { error: profileError } = await supabaseAdmin
        .from('kv_store_68e7fa3d')
        .upsert({
          key: `user-profile-${data.user.id}`,
          value: {
            userId: data.user.id,
            email: data.user.email,
            fullName,
            phone: phone || '',
            createdAt: new Date().toISOString()
          }
        });

      if (profileError) {
        console.error('Profile save error:', profileError);
      }

      return c.json({
        message: 'User created successfully',
        userId: data.user.id
      }, 201);
    } else {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || ''
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return c.json({ error: error.message }, 400);
      }

      return c.json({
        message: 'User created successfully. Please check your email to verify.',
        userId: data.user?.id
      }, 201);
    }
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

auth.post('/signin', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Sign in error:', error);
      return c.json({ error: error.message }, 401);
    }

    return c.json({
      message: 'Signed in successfully',
      session: data.session,
      user: data.user
    });
  } catch (error) {
    console.error('Signin error:', error);
    return c.json({ error: 'Failed to sign in' }, 500);
  }
});

auth.post('/signout', async (c) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Signout error:', error);
    return c.json({ error: 'Failed to sign out' }, 500);
  }
});

export default auth;
