// Cấu hình API cho backend
// Sử dụng domain của Replit cho backend API
const REPLIT_DOMAIN = typeof window !== 'undefined' 
  ? window.location.hostname 
  : 'localhost';

export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 
  (REPLIT_DOMAIN.includes('replit') 
    ? `https://${REPLIT_DOMAIN.replace('-5000', '-3000')}` 
    : 'http://localhost:3000');

// Helper function để tạo headers cho request
export const createHeaders = (accessToken?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
};

// Helper function để xử lý response
export const handleResponse = async <T>(response: Response): Promise<{ data: T | null; error: string | null }> => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      return { data: null, error: data.error || 'Có lỗi xảy ra' };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Response error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Có lỗi xảy ra' };
  }
};
