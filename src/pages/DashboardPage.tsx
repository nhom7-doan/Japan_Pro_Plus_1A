import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AuthService } from "../utils/auth";
import { StudentAPI, Enrollment, Grade } from "../utils/student-api";
import { BookOpen, Award, TrendingUp, LogOut, User } from "lucide-react";

export function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    // Check if user is logged in
    const currentUser = await AuthService.getCurrentUser();
    if (!currentUser) {
      window.location.hash = '#/login';
      return;
    }
    setUser(currentUser);

    // Load profile, enrollments, and grades
    const [profileRes, enrollmentsRes, gradesRes] = await Promise.all([
      StudentAPI.getProfile(),
      StudentAPI.getEnrollments(),
      StudentAPI.getGrades()
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (enrollmentsRes.data) setEnrollments(enrollmentsRes.data);
    if (gradesRes.data) setGrades(gradesRes.data);

    setLoading(false);
  };

  const handleLogout = async () => {
    await AuthService.signout();
    window.location.hash = '#/';
  };

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => {
      return sum + (grade.score / grade.maxScore * 100);
    }, 0);
    return (total / grades.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl text-white">
                      Xin chào, {profile?.fullName || user?.fullName || 'Học viên'}!
                    </h1>
                    <p className="text-white/80">{user?.email}</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 -mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Khóa học đã đăng ký</p>
                    <p className="text-2xl">{enrollments.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Điểm đã có</p>
                    <p className="text-2xl">{grades.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Điểm trung bình</p>
                    <p className="text-2xl">{calculateAverage()}%</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Enrollments */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2>Khóa Học Của Tôi</h2>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => window.location.hash = '#/courses'}
                  >
                    Đăng ký thêm
                  </Button>
                </div>

                {enrollments.length === 0 ? (
                  <Card className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Bạn chưa đăng ký khóa học nào
                    </p>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => window.location.hash = '#/courses'}
                    >
                      Xem khóa học
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {enrollments.map((enrollment, index) => (
                      <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="mb-1">{enrollment.courseName}</h3>
                            <p className="text-sm text-muted-foreground">
                              Đăng ký: {new Date(enrollment.enrolledAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {enrollment.status === 'active' ? 'Đang học' : enrollment.status}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Grades */}
              <div>
                <h2 className="mb-6">Điểm Số</h2>

                {grades.length === 0 ? (
                  <Card className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-muted-foreground">
                      Chưa có điểm số nào
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {grades.map((grade, index) => {
                      const percentage = (grade.score / grade.maxScore * 100).toFixed(1);
                      const isPassing = parseFloat(percentage) >= 60;
                      
                      return (
                        <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="mb-1">{grade.courseName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {grade.examType} - {new Date(grade.examDate).toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl">
                                {grade.score}/{grade.maxScore}
                              </div>
                              <div className={`text-sm ${isPassing ? 'text-green-600' : 'text-red-600'}`}>
                                {percentage}%
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                            <div 
                              className={`h-2 rounded-full ${isPassing ? 'bg-green-600' : 'bg-red-600'}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-6">Hành Động Nhanh</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.hash = '#/courses'}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="mb-2">Xem khóa học</h3>
                  <p className="text-sm text-muted-foreground">
                    Khám phá các khóa học mới
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.hash = '#/teachers'}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2">Giáo viên</h3>
                  <p className="text-sm text-muted-foreground">
                    Xem đội ngũ giảng viên
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.hash = '#/contact'}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="mb-2">Liên hệ</h3>
                  <p className="text-sm text-muted-foreground">
                    Hỗ trợ và tư vấn
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}