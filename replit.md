# Japanese Language Center - TNQDO

## Về Dự Án
Website cho **Tiếng Nhật Quang Dũng Online (TNQDO)** - thành viên của Otaku Online Group.

### Thông tin thương hiệu
- **Tên**: Tiếng Nhật Quang Dũng Online (TNQDO)
- **Tập đoàn mẹ**: Otaku Online Group
- **Slogan**: Nơi kiến thức giao thoa, nơi cơ hội thăng tiến
- **Ra đời**: 2021 (thời kì Covid-19)
- **Chuyên môn**: Các khóa học tiếng Nhật luyện thi JLPT từ N5 đến N3

### Sứ mệnh & Tầm nhìn
- Mang niềm đam mê và phát triển sự nghiệp cho học viên
- Học tập trực tuyến tiện lợi cho Gen Y, Gen Z
- "Học là phải vui!" - học bằng niềm đam mê
- Trở thành nền tảng học tiếng Nhật Online hàng đầu cho thế hệ trẻ Việt Nam

### Giá trị cốt lõi
1. Đồng hành & Hỗ trợ
2. Đổi mới & Hiệu quả (AI, phương pháp Chunking, Mnemonics, huyền lục thư)
3. Đam mê & Truyền cảm hứng
4. Chất lượng & Chuyên nghiệp
5. Cộng đồng & Phát triển bền vững

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS v4 + Radix UI components
- **Styling**: Tailwind CSS (pre-compiled)
- **Backend**: Node.js + Hono framework (local server)
- **Database**: Supabase (PostgreSQL) với KV store
- **Auth**: Supabase Auth

## Project Structure
```
├── server/           # Backend API (Node.js + Hono)
│   ├── routes/      # API routes
│   │   ├── auth.js  # Authentication routes
│   │   └── student.js # Student routes
│   ├── index.js     # Main server file
│   └── package.json
├── src/
│   ├── api/         # 🆕 API functions (dễ sửa và mở rộng)
│   │   ├── config.ts   # API configuration & helpers
│   │   ├── auth.ts     # Authentication API functions
│   │   ├── student.ts  # Student API functions
│   │   └── index.ts    # Export tất cả API
│   ├── components/   # React components
│   │   ├── ui/      # Reusable UI components (Radix UI)
│   │   ├── figma/   # Figma-exported components
│   │   └── *.tsx    # Page components (Hero, Header, Footer, etc.)
│   ├── pages/       # Main pages
│   │   ├── Home.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ...
│   ├── utils/       # Utilities (re-export từ src/api/)
│   │   ├── auth.tsx      # Re-export auth API
│   │   ├── student-api.tsx # Re-export student API
│   │   └── supabase/     # Supabase config
│   └── styles/      # Global styles
```

## Đội Ngũ Giáo Viên

### Thầy Nguyễn Quang Triệu
- **Vai trò**: Giám đốc chương trình, Giáo viên
- **Trình độ**: JLPT N2
- **Kinh nghiệm**: 6 năm giảng dạy
- **Học vấn**: Cử nhân ĐH Hoa Sen, chuyên ngành PR
- **Thành tựu**: Nhà sáng lập TNQDO, Thực tập biên tập viên Báo Tuổi Trẻ TP.HCM
- **Dự án biên dịch**: Neon Genesis Evangelion, La Tiểu Hắc Chiến Kí 2

### Thầy Lê Đình Tân
- **Vai trò**: Giáo viên
- **Trình độ**: JLPT N2
- **Kinh nghiệm**: 2 năm giảng dạy
- **Đào tạo**: Nghiệp vụ dạy tiếng Nhật chuyên nghiệp
- **Công việc**: Công ty TNHH Hyogo Shoes, Hoshi Sushi & Bar

### Cô Phạm Thùy Tường Vy
- **Vai trò**: Trợ giảng
- **Trình độ**: JLPT N5
- **Kinh nghiệm**: 1 năm giảng dạy
- **Đào tạo**: Nghiệp vụ dạy tiếng Nhật chuyên nghiệp
- **Công việc**: White palace, Capella palace, Ramana Saigon

## Thông Tin Liên Hệ
- **Email**: otori.agimi@gmail.com
- **Địa chỉ**: 2B Hoàng Ngọc Phách - P. Phú Thọ Hòa - Q. Tân Phú - TP.HCM
- **Hotline**:
  - Mr. Triệu - Giám đốc: (+84) 901 189 399
  - Mr. Hưng - Thư ký & CSKH: (+84) 939 734 210

## Các Khóa Học

### N5-N4 (8 tháng+)

#### 1. Nhập môn ngôn ngữ Nhật ✅ (HOÀN THÀNH)
- **Cấp độ**: Pre N5
- **Giáo viên**: Quang Triệu
- **Trợ giảng**: Tường Vy
- **Nội dung**: Hiragana, Katakana, biến âm, phương pháp học tập
- **Tài liệu**: Minna no Nihongo Sơ cấp 1, các bài nghiên cứu về Nhật ngữ

#### 2. Hán tự & Từ vựng Sơ cấp ✅ (HOÀN THÀNH)
- **Cấp độ**: N5-N4
- **Giáo viên**: Quang Triệu
- **Trợ giảng**: Tường Vy
- **Nội dung**: 214 bộ thủ, 276 chữ Hán N4-N5, 25 bài Minna
- **Điều kiện**: Nhập môn ngôn ngữ Nhật
- **Tài liệu**: 15 phút học Kanji, Minna no Nihongo sơ cấp 1

#### 3. Ngữ pháp Sơ cấp 1 ✅ (HOÀN THÀNH)
- **Cấp độ**: N5
- **Giáo viên**: Đình Tân
- **Trợ giảng**: Tường Vy
- **Nội dung**: Kết từ, chỉ thị từ, đại từ, nghi vấn từ, mệnh đề định ngữ
- **Điều kiện**: Nhập môn ngôn ngữ Nhật
- **Song hành**: Hán tự và từ vựng Sơ cấp
- **Tài liệu**: Minna no Nihongo sơ cấp 1

#### 4. Ngữ pháp Sơ cấp 2 (Placeholder)
- **Cấp độ**: N4
- **Giáo viên**: Quang Triệu
- **Trợ giảng**: Tường Vy
- **Nội dung**: 12 bài ngữ pháp từ Shinkanzen N4, chiến lược thi JLPT N4
- **Điều kiện**: Hán tự từ vựng Sơ cấp, Ngữ pháp Sơ cấp 1
- **Tài liệu**: Mimikara Oboeru N4, Shinkanzen ngữ pháp N4

### N3 (5-6 tháng)

#### 5. Hán tự & Từ vựng Trung Cấp (Placeholder)
- **Cấp độ**: N3
- **Giáo viên**: Quang Triệu
- **Nội dung**: 35 bài Hán tự N3, 835 từ vựng
- **Điều kiện**: Tất cả môn N5-N4
- **Tài liệu**: Chinh phục Chữ Hán, Mimi kara Oboeru

#### 6. Ngữ pháp Trung cấp (Placeholder)
- **Cấp độ**: N3
- **Giáo viên**: Quang Triệu
- **Nội dung**: Trợ từ, phó từ, câu Bị động, Sai khiến, chiến lược thi N3
- **Điều kiện**: Tất cả môn N5-N4

#### 7. Đọc hiểu - Nghe hiểu trong JLPT (Placeholder)
- **Cấp độ**: N3
- **Giáo viên**: Quang Triệu
- **Nội dung**: Chiến lược làm bài đọc hiểu, nghe hiểu, tối ưu điểm số
- **Điều kiện**: Tất cả môn N5-N4, Hán tự Trung cấp, Ngữ pháp Trung cấp
- **Tài liệu**: Đề thi JLPT 2010-nay, Bài giảng độc quyền

### Nghiệp vụ ngắn hạn
#### 8. Nghiệp vụ Biên dịch Nhật - Việt trong lĩnh vực Nghe - Nhìn (Placeholder)

## Tính Năng Website

### Đã triển khai ✅
1. **Trang chủ**: Hero section, Featured Courses, USP, Testimonials
2. **Giới thiệu**: Về TNQDO, sứ mệnh, tầm nhìn
3. **Khóa học**: Danh sách các khóa học với mô tả
4. **Giáo viên**: Profile đội ngũ giáo viên
5. **FAQ**: Câu hỏi thường gặp
6. **Liên hệ**: Form liên hệ, thông tin liên lạc

### Hệ thống học viên ✅
1. **Đăng ký tài khoản**: Email, mật khẩu, họ tên, SĐT
2. **Đăng nhập**: Xác thực qua Supabase Auth
3. **Dashboard học viên**:
   - Xem profile cá nhân
   - Xem khóa học đã đăng ký
   - Xem điểm số các môn học
   - Thống kê điểm trung bình
   - Đăng ký khóa học mới

### API Endpoints
Backend API chạy trên port 3000:
- `POST /api/auth/signup` - Tạo tài khoản
- `POST /api/auth/signin` - Đăng nhập (Supabase Auth)
- `POST /api/auth/signout` - Đăng xuất
- `GET /api/student/profile` - Lấy thông tin profile
- `POST /api/student/enrollments` - Đăng ký khóa học
- `GET /api/student/enrollments` - Xem khóa học đã đăng ký
- `POST /api/student/grades` - Thêm điểm (admin)
- `GET /api/student/grades` - Xem điểm số
- `GET /health` - Health check endpoint

## Development

### Setup
```bash
npm install
npm run dev
```

### Environment
- Frontend dev server: http://0.0.0.0:5000
- Backend API server: http://localhost:3000
- Vite config: Port 5000, HMR enabled
- Supabase: ydpwtlbeasihziydbmpx.supabase.co
- Environment variables: `.env` file (VITE_API_URL)

### Deployment
- Platform: Replit Autoscale
- Build: `vite build`
- Run: Production server

## Notes
- Tailwind CSS đã được compile sẵn trong `src/index.css`
- Không cần thêm tailwind.config.js
- Sử dụng Supabase cho authentication và database
- Frontend chạy trên port 5000 (required by Replit)
- Backend API chạy trên port 3000 (Node.js + Hono)
- Backend sử dụng Supabase KV store (table: kv_store_68e7fa3d) để lưu trữ data

## Recent Changes (Oct 2025)
- Chuyển backend từ Supabase Edge Functions (Deno) sang Node.js + Hono
- Xây dựng lại API với local Node.js server
- Cấu hình workflows: Backend (port 3000) + Frontend (port 5000)
- Thêm environment configuration với .env file
- **Tổ chức lại API** (01/10/2025): Tạo thư mục `src/api/` chứa tất cả API functions:
  - `src/api/config.ts` - Cấu hình API base URL và helper functions
  - `src/api/auth.ts` - Các function xác thực (signup, signin, signout, getSession, getCurrentUser, getAccessToken)
  - `src/api/student.ts` - Các function cho sinh viên (getProfile, enrollCourse, getEnrollments, addGrade, getGrades)
  - `src/api/index.ts` - Export tất cả để dễ import: `import { signup, signin, ... } from '@/api'`
  - Files trong `src/utils/` giờ re-export từ `src/api/` để tương thích ngược
