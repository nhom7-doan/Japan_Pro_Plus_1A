import { Context } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Helper: Get user from access token
async function getUserFromToken(accessToken: string | undefined) {
  if (!accessToken) {
    return { user: null, error: 'No access token provided' };
  }
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
  return { user, error };
}

// Sign up endpoint
export async function signup(c: Context) {
  try {
    const { email, password, fullName, phone } = await c.req.json();

    if (!email || !password || !fullName) {
      return c.json({ error: 'Email, password, and full name are required' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        full_name: fullName,
        phone: phone || ''
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Sign up error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Save user profile to KV store
    await kv.set(`user-profile-${data.user.id}`, {
      userId: data.user.id,
      email: data.user.email,
      fullName,
      phone: phone || '',
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      message: 'User created successfully',
      userId: data.user.id 
    }, 201);
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
}

// Get student profile
export async function getProfile(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(accessToken);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user-profile-${user.id}`);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json({ profile });
  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ error: 'Failed to get profile' }, 500);
  }
}

// Enroll in a course
export async function enrollCourse(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(accessToken);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { courseId, courseName } = await c.req.json();

    if (!courseId || !courseName) {
      return c.json({ error: 'Course ID and name are required' }, 400);
    }

    const enrollmentKey = `${user.id}-enrollment-${courseId}`;
    const enrollment = {
      userId: user.id,
      courseId,
      courseName,
      enrolledAt: new Date().toISOString(),
      status: 'active'
    };

    await kv.set(enrollmentKey, enrollment);

    return c.json({ 
      message: 'Enrolled successfully',
      enrollment 
    }, 201);
  } catch (error) {
    console.log('Enroll course error:', error);
    return c.json({ error: 'Failed to enroll in course' }, 500);
  }
}

// Get student enrollments
export async function getEnrollments(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(accessToken);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const enrollmentPrefix = `${user.id}-enrollment-`;
    const enrollments = await kv.getByPrefix(enrollmentPrefix);

    return c.json({ enrollments });
  } catch (error) {
    console.log('Get enrollments error:', error);
    return c.json({ error: 'Failed to get enrollments' }, 500);
  }
}

// Add or update grade
export async function addGrade(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(accessToken);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { courseId, courseName, score, maxScore, examType, examDate } = await c.req.json();

    if (!courseId || score === undefined) {
      return c.json({ error: 'Course ID and score are required' }, 400);
    }

    const gradeKey = `${user.id}-grade-${courseId}`;
    const grade = {
      userId: user.id,
      courseId,
      courseName,
      score,
      maxScore: maxScore || 100,
      examType: examType || 'Final',
      examDate: examDate || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(gradeKey, grade);

    return c.json({ 
      message: 'Grade saved successfully',
      grade 
    }, 201);
  } catch (error) {
    console.log('Add grade error:', error);
    return c.json({ error: 'Failed to save grade' }, 500);
  }
}

// Get student grades
export async function getGrades(c: Context) {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(accessToken);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const gradePrefix = `${user.id}-grade-`;
    const grades = await kv.getByPrefix(gradePrefix);

    return c.json({ grades });
  } catch (error) {
    console.log('Get grades error:', error);
    return c.json({ error: 'Failed to get grades' }, 500);
  }
}