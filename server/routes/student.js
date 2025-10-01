import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';

const student = new Hono();

const supabaseUrl = process.env.SUPABASE_URL || 'https://ydpwtlbeasihziydbmpx.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcHd0bGJlYXNpaHppeWRibXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NTI3NzksImV4cCI6MjA3MzMyODc3OX0.qGNvItXv8jlt5lHYN4vVGtZWvo4uVERUz64eqiPXM5s';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function getUserFromToken(token) {
  if (!token) {
    return { user: null, error: 'No access token provided' };
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  return { user, error };
}

student.get('/profile', async (c) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(token);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data, error } = await supabaseAdmin
      .from('kv_store_68e7fa3d')
      .select('value')
      .eq('key', `user-profile-${user.id}`)
      .maybeSingle();

    if (error) {
      console.error('Get profile error:', error);
      return c.json({ error: 'Failed to get profile' }, 500);
    }

    if (!data) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json({ profile: data.value });
  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Failed to get profile' }, 500);
  }
});

student.post('/enrollments', async (c) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(token);

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

    const { error } = await supabaseAdmin
      .from('kv_store_68e7fa3d')
      .upsert({
        key: enrollmentKey,
        value: enrollment
      });

    if (error) {
      console.error('Enroll course error:', error);
      return c.json({ error: 'Failed to enroll in course' }, 500);
    }

    return c.json({
      message: 'Enrolled successfully',
      enrollment
    }, 201);
  } catch (error) {
    console.error('Enroll course error:', error);
    return c.json({ error: 'Failed to enroll in course' }, 500);
  }
});

student.get('/enrollments', async (c) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(token);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const enrollmentPrefix = `${user.id}-enrollment-`;
    const { data, error } = await supabaseAdmin
      .from('kv_store_68e7fa3d')
      .select('value')
      .like('key', `${enrollmentPrefix}%`);

    if (error) {
      console.error('Get enrollments error:', error);
      return c.json({ error: 'Failed to get enrollments' }, 500);
    }

    const enrollments = data?.map(d => d.value) || [];
    return c.json({ enrollments });
  } catch (error) {
    console.error('Get enrollments error:', error);
    return c.json({ error: 'Failed to get enrollments' }, 500);
  }
});

student.post('/grades', async (c) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(token);

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

    const { error } = await supabaseAdmin
      .from('kv_store_68e7fa3d')
      .upsert({
        key: gradeKey,
        value: grade
      });

    if (error) {
      console.error('Add grade error:', error);
      return c.json({ error: 'Failed to save grade' }, 500);
    }

    return c.json({
      message: 'Grade saved successfully',
      grade
    }, 201);
  } catch (error) {
    console.error('Add grade error:', error);
    return c.json({ error: 'Failed to save grade' }, 500);
  }
});

student.get('/grades', async (c) => {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await getUserFromToken(token);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const gradePrefix = `${user.id}-grade-`;
    const { data, error } = await supabaseAdmin
      .from('kv_store_68e7fa3d')
      .select('value')
      .like('key', `${gradePrefix}%`);

    if (error) {
      console.error('Get grades error:', error);
      return c.json({ error: 'Failed to get grades' }, 500);
    }

    const grades = data?.map(d => d.value) || [];
    return c.json({ grades });
  } catch (error) {
    console.error('Get grades error:', error);
    return c.json({ error: 'Failed to get grades' }, 500);
  }
});

export default student;
