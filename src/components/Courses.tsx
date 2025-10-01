import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookOpen, Clock, User, Plus, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthService } from "../utils/auth";
import { StudentAPI } from "../utils/student-api";

export function Courses() {
  const [user, setUser] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const currentUser = await AuthService.getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      const { data } = await StudentAPI.getEnrollments();
      if (data) {
        setEnrolledCourses(data.map((e: any) => e.courseId));
      }
    }
  };

  const handleEnroll = async (courseId: string, courseName: string) => {
    if (!user) {
      window.location.hash = '#/login';
      return;
    }

    setEnrolling(courseId);
    const { error } = await StudentAPI.enrollCourse(courseId, courseName);
    
    if (!error) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
    
    setEnrolling(null);
  };

  const n5n4Courses = [
    {
      id: "pre-n5-intro",
      title: "Nhập môn ngôn ngữ Nhật",
      level: "Pre N5",
      teacher: "Quang Triệu",
      assistant: "Tường Vy",
      description: "Kiến thức vỡ lòng: Hiragana, Katakana, biến âm, phương pháp học tập, ngoại lai ngữ.",
      condition: "Không có",
      materials: ["Minna no Nihongo Sơ cấp 1", "Video về văn hóa, lịch sử Nhật Bản"]
    },
    {
      id: "n5-n4-kanji",
      title: "Hán tự & Từ vựng Sơ cấp",
      level: "N5 - N4",
      teacher: "Quang Triệu",
      assistant: "Tường Vy",
      description: "214 bộ thủ cần thiết để học 276 chữ Hán trình độ N4-N5. Từ vựng 25 bài Minna no Nihongo.",
      condition: "Nhập môn ngôn ngữ Nhật",
      materials: ["15 phút học Kanji", "Minna no Nihongo sơ cấp 1"]
    },
    {
      id: "n5-grammar",
      title: "Ngữ pháp Sơ cấp 1",
      level: "N5",
      teacher: "Đình Tân",
      assistant: "Tường Vy",
      description: "Kiến thức vỡ lòng về ngữ pháp: các từ loại, vai trò của các loại câu, cấu trúc cơ bản.",
      condition: "Nhập môn ngôn ngữ Nhật",
      songhanh: "Hán tự và từ vựng Sơ cấp",
      materials: ["Minna no Nihongo sơ cấp 1"]
    },
    {
      id: "n4-grammar",
      title: "Ngữ pháp Sơ cấp 2",
      level: "N4",
      teacher: "Quang Triệu",
      assistant: "Tường Vy",
      description: "12 bài ngữ pháp từ Shinkanzen N4. Chiến lược làm bài thi JLPT N4 để tối ưu điểm số.",
      condition: "Hán tự và từ vựng Sơ cấp, Ngữ pháp Sơ cấp 1",
      materials: ["Shinkanzen ngữ pháp N4", "Mimikara Oboeru N4"]
    }
  ];

  const n3Courses = [
    {
      id: "n3-kanji",
      title: "Hán tự & Từ vựng Trung Cấp",
      level: "N3",
      teacher: "Quang Triệu",
      description: "35 bài Hán tự N3 từ Chinh phục Chữ Hán, cùng 835 từ vựng từ Mimikara Oboeru.",
      condition: "Tất cả môn học trình độ N5-N4",
      materials: ["Chinh phục Chữ Hán", "Mimikara Oboeru N3"]
    },
    {
      id: "n3-grammar",
      title: "Ngữ pháp Trung cấp",
      level: "N3",
      teacher: "Quang Triệu",
      description: "Kiến thức nâng cao về trợ từ, phó từ, câu Bị động, Sai khiến, Bị động Sai khiến.",
      condition: "Tất cả môn học trình độ N5-N4",
      materials: ["Shinkanzen ngữ pháp N3"]
    },
    {
      id: "n3-reading-listening",
      title: "Đọc hiểu - Nghe hi���u trong JLPT",
      level: "N3",
      teacher: "Quang Triệu",
      description: "Chiến lược làm bài đọc hiểu, nghe hiểu. Phương pháp Chunking, Shadowing.",
      condition: "Tất cả môn học trình độ N5-N4, Hán tự Trung cấp, Ngữ pháp Trung cấp",
      materials: ["Bộ đề thi JLPT từ 2010", "Bài giảng độc quyền"]
    }
  ];

  const vocationalCourses = [
    {
      id: "translation-vocational",
      title: "Nghiệp vụ Biên dịch Nhật - Việt",
      level: "N3-N2",
      teacher: "Quang Triệu",
      description: "Kĩ năng chuyển ngữ, sử dụng Adobe Photoshop cho manga, Aegisub cho anime.",
      condition: "Tất cả môn học trình độ N3, hoặc trình độ N2",
      focus: "Lĩnh vực Nghe - Nhìn (Anime & Manga)"
    },
    {
      id: "teaching-vocational",
      title: "Nghiệp vụ dạy tiếng Nhật",
      level: "N3-N2",
      teacher: "Quang Triệu",
      assistant: "Tường Vy",
      description: "Kĩ thuật nghiên cứu và tạo lập giáo án, kĩ năng giao tiếp với học viên, dự giờ thực tế.",
      condition: "Tất cả môn học trình độ N3, hoặc trình độ N2",
      materials: ["The Elements of Teaching", "Giao tiếp Sư phạm"]
    }
  ];

  const CourseCard = ({ course }: { course: any }) => {
    const isEnrolled = enrolledCourses.includes(course.id);
    const isEnrolling = enrolling === course.id;

    return (
      <Card className="p-6 hover:shadow-xl transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="mb-2">{course.title}</h3>
            <Badge className="bg-red-600">{course.level}</Badge>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-red-600" />
            <span>GV: {course.teacher}</span>
          </div>
          {course.assistant && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-red-600" />
              <span>Trợ giảng: {course.assistant}</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-muted-foreground">
              Điều kiện: {course.condition}
            </span>
          </div>
          {course.songhanh && (
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">
                Song hành: {course.songhanh}
              </span>
            </div>
          )}
          {course.focus && (
            <div className="mt-2 p-2 bg-red-50 rounded-lg">
              <span className="text-xs text-red-700">{course.focus}</span>
            </div>
          )}
        </div>

        {/* Enrollment Button */}
        {isEnrolled ? (
          <Button 
            className="w-full bg-green-600 hover:bg-green-700" 
            disabled
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Đã đăng ký
          </Button>
        ) : (
          <Button 
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => handleEnroll(course.id, course.title)}
            disabled={isEnrolling}
          >
            {isEnrolling ? (
              'Đang đăng ký...'
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Đăng ký ngay
              </>
            )}
          </Button>
        )}
      </Card>
    );
  };

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full mb-4">
            Khóa học
          </div>
          <h2 className="text-3xl md:text-4xl mb-6">
            Chương Trình Đào Tạo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Từ N5 tới N3 chỉ trong 7 môn học! Chỉ từ 8 tháng bạn có thể làm chủ N5 và N4.
          </p>
        </div>

        <Tabs defaultValue="n5n4" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="n5n4">N5 - N4</TabsTrigger>
            <TabsTrigger value="n3">N3</TabsTrigger>
            <TabsTrigger value="vocational">Nghiệp vụ</TabsTrigger>
          </TabsList>

          <TabsContent value="n5n4">
            <div className="grid md:grid-cols-2 gap-6">
              {n5n4Courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl text-center">
              <p className="text-sm text-blue-900">
                <strong>Chỉ từ 8 tháng trở lên</strong> bạn sẽ làm chủ kiến thức N5 và N4 cùng lúc!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="n3">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {n3Courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl text-center">
              <p className="text-sm text-blue-900">
                <strong>Cấp độ N3 chỉ cần 5-6 tháng!</strong> Phù hợp cho sinh viên và người đi làm bận rộn.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="vocational">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {vocationalCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
            <div className="mt-8 p-6 bg-purple-50 rounded-2xl text-center max-w-4xl mx-auto">
              <p className="text-sm text-purple-900">
                Các khóa học nghiệp vụ ngắn hạn giúp bạn định hướng nghề nghiệp rõ ràng sau khi hoàn thành!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
