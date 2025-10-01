// Export tất cả API functions và types để dễ import
// Sử dụng: import { signup, signin, getProfile, ... } from '@/api'

// ==================== Config ====================
export { API_BASE_URL } from './config';

// ==================== Auth API ====================
export {
  supabase,
  signup,
  signin,
  signout,
  getSession,
  getCurrentUser,
  getAccessToken,
  type User,
  type SignUpResponse,
  type SignInResponse
} from './auth';

// ==================== Student API ====================
export {
  getProfile,
  enrollCourse,
  getEnrollments,
  addGrade,
  getGrades,
  type Profile,
  type Enrollment,
  type Grade
} from './student';
