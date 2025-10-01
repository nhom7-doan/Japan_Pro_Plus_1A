import { getAccessToken } from "./auth";
import { API_BASE_URL, createHeaders, handleResponse } from "./config";

// ==================== Interfaces ====================
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

export interface Profile {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: string;
}

// ==================== API Lấy hồ sơ sinh viên ====================
export const getProfile = async (): Promise<{ data: Profile | null; error: string | null }> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { data: null, error: 'Chưa đăng nhập' };
    }

    const response = await fetch(`${API_BASE_URL}/api/student/profile`, {
      headers: createHeaders(accessToken)
    });

    const result = await handleResponse<{ profile: Profile }>(response);
    
    if (result.error) {
      return { data: null, error: result.error };
    }

    return { data: result.data?.profile || null, error: null };
  } catch (error) {
    console.error('Get profile error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Lỗi lấy hồ sơ' };
  }
};

// ==================== API Đăng ký khóa học ====================
export const enrollCourse = async (
  courseId: string, 
  courseName: string
): Promise<{ data: Enrollment | null; error: string | null }> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { data: null, error: 'Chưa đăng nhập' };
    }

    const response = await fetch(`${API_BASE_URL}/api/student/enrollments`, {
      method: 'POST',
      headers: createHeaders(accessToken),
      body: JSON.stringify({ courseId, courseName })
    });

    const result = await handleResponse<{ enrollment: Enrollment }>(response);
    
    if (result.error) {
      return { data: null, error: result.error };
    }

    return { data: result.data?.enrollment || null, error: null };
  } catch (error) {
    console.error('Enroll course error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Lỗi đăng ký khóa học' };
  }
};

// ==================== API Lấy danh sách khóa học đã đăng ký ====================
export const getEnrollments = async (): Promise<{ data: Enrollment[] | null; error: string | null }> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { data: null, error: 'Chưa đăng nhập' };
    }

    const response = await fetch(`${API_BASE_URL}/api/student/enrollments`, {
      headers: createHeaders(accessToken)
    });

    const result = await handleResponse<{ enrollments: Enrollment[] }>(response);
    
    if (result.error) {
      return { data: null, error: result.error };
    }

    return { data: result.data?.enrollments || [], error: null };
  } catch (error) {
    console.error('Get enrollments error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Lỗi lấy danh sách khóa học' };
  }
};

// ==================== API Thêm điểm số ====================
export const addGrade = async (
  courseId: string,
  courseName: string,
  score: number,
  maxScore?: number,
  examType?: string,
  examDate?: string
): Promise<{ data: Grade | null; error: string | null }> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { data: null, error: 'Chưa đăng nhập' };
    }

    const response = await fetch(`${API_BASE_URL}/api/student/grades`, {
      method: 'POST',
      headers: createHeaders(accessToken),
      body: JSON.stringify({ 
        courseId, 
        courseName, 
        score, 
        maxScore: maxScore || 100,
        examType: examType || 'Final',
        examDate: examDate || new Date().toISOString()
      })
    });

    const result = await handleResponse<{ grade: Grade }>(response);
    
    if (result.error) {
      return { data: null, error: result.error };
    }

    return { data: result.data?.grade || null, error: null };
  } catch (error) {
    console.error('Add grade error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Lỗi thêm điểm số' };
  }
};

// ==================== API Lấy danh sách điểm số ====================
export const getGrades = async (): Promise<{ data: Grade[] | null; error: string | null }> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { data: null, error: 'Chưa đăng nhập' };
    }

    const response = await fetch(`${API_BASE_URL}/api/student/grades`, {
      headers: createHeaders(accessToken)
    });

    const result = await handleResponse<{ grades: Grade[] }>(response);
    
    if (result.error) {
      return { data: null, error: result.error };
    }

    return { data: result.data?.grades || [], error: null };
  } catch (error) {
    console.error('Get grades error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Lỗi lấy danh sách điểm' };
  }
};
