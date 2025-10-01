// File này re-export từ src/api/ để tương thích với code cũ  
// Để thêm hoặc sửa API, vui lòng chỉnh sửa trong thư mục src/api/

import * as StudentAPI_Module from '../api/student';

// Re-export types
export type { Enrollment, Grade, Profile } from '../api/student';

// Tạo StudentAPI class để tương thích với code cũ
export class StudentAPI {
  // Get user profile
  static async getProfile() {
    return StudentAPI_Module.getProfile();
  }

  // Enroll in a course
  static async enrollCourse(courseId: string, courseName: string) {
    return StudentAPI_Module.enrollCourse(courseId, courseName);
  }

  // Get student enrollments
  static async getEnrollments() {
    return StudentAPI_Module.getEnrollments();
  }

  // Get student grades
  static async getGrades() {
    return StudentAPI_Module.getGrades();
  }

  // Add grade
  static async addGrade(
    courseId: string,
    courseName: string,
    score: number,
    maxScore?: number,
    examType?: string,
    examDate?: string
  ) {
    return StudentAPI_Module.addGrade(courseId, courseName, score, maxScore, examType, examDate);
  }
}
