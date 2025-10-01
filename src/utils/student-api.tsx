import { AuthService } from "./auth";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Enrollment {
  userId: string;
  courseId: string;
  courseName: string;
  enrolledAt: string;
  status: string;
}

export interface Grade {
  userId: string;
  courseId: string;
  courseName: string;
  score: number;
  maxScore: number;
  examType: string;
  examDate: string;
  updatedAt: string;
}

export class StudentAPI {
  // Get user profile
  static async getProfile() {
    try {
      const accessToken = await AuthService.getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_BASE}/api/student/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get profile');
      }

      return { data: data.profile, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get profile' };
    }
  }

  // Enroll in a course
  static async enrollCourse(courseId: string, courseName: string) {
    try {
      const accessToken = await AuthService.getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_BASE}/api/student/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ courseId, courseName })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to enroll in course');
      }

      return { data: data.enrollment, error: null };
    } catch (error) {
      console.error('Enroll course error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to enroll in course' };
    }
  }

  // Get student enrollments
  static async getEnrollments(): Promise<{ data: Enrollment[] | null; error: string | null }> {
    try {
      const accessToken = await AuthService.getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_BASE}/api/student/enrollments`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get enrollments');
      }

      return { data: data.enrollments || [], error: null };
    } catch (error) {
      console.error('Get enrollments error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get enrollments' };
    }
  }

  // Get student grades
  static async getGrades(): Promise<{ data: Grade[] | null; error: string | null }> {
    try {
      const accessToken = await AuthService.getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_BASE}/api/student/grades`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get grades');
      }

      return { data: data.grades || [], error: null };
    } catch (error) {
      console.error('Get grades error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get grades' };
    }
  }
}