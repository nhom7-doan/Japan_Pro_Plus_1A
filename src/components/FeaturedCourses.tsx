import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Users, Star, ArrowRight, BookOpen, Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";

const featuredCourses = [
  {
    title: "Tiếng Nhật N5 - Nền Tảng",
    description: "Khóa học cơ bản cho người mới bắt đầu, nắm vững nền tảng tiếng Nhật từ A-Z",
    level: "N5",
    duration: "3 tháng",
    students: "1200+",
    rating: 4.8,
    price: "1.290.000đ",
    originalPrice: "1.590.000đ",
    features: ["50+ bài giảng", "Luyện thi JLPT", "Hỗ trợ 1:1", "Chứng chỉ hoàn thành"],
    color: "from-green-500 to-green-600",
    icon: BookOpen
  },
  {
    title: "Tiếng Nhật N4 - Phát Triển", 
    description: "Nâng cao kỹ năng giao tiếp, ngữ pháp phức tạp và từ vựng chuyên sâu",
    level: "N4",
    duration: "4 tháng",
    students: "800+",
    rating: 4.9,
    price: "1.690.000đ",
    originalPrice: "1.990.000đ",
    features: ["80+ bài giảng", "Luyện nói thực tế", "Kanji chuyên sâu", "Mock test"],
    color: "from-blue-500 to-blue-600",
    icon: Trophy
  },
  {
    title: "Tiếng Nhật N3 - Thành Thạo",
    description: "Đạt trình độ trung cấp, tự tin giao tiếp trong môi trường làm việc",
    level: "N3", 
    duration: "6 tháng",
    students: "600+",
    rating: 4.9,
    price: "2.290.000đ",
    originalPrice: "2.690.000đ",
    features: ["120+ bài giảng", "Business Japanese", "Mentor 1:1", "Job support"],
    color: "from-red-500 to-red-600",
    icon: Zap
  }
];

export function FeaturedCourses() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-red-100 text-red-600 border-red-200">
              Khóa học nổi bật
            </Badge>
            <h2 className="text-3xl md:text-4xl mb-4">
              Lộ Trình Học <span className="text-red-600">Hoàn Hảo</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Từ người mới bắt đầu đến trình độ trung cấp, chúng tôi có lộ trình phù hợp cho mọi học viên
            </p>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                    {/* Course Header */}
                    <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-gray-100">
                          {course.level}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-red-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {course.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-4 py-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                          <div className="text-sm text-gray-600">{course.duration}</div>
                        </div>
                        <div className="text-center">
                          <Users className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                          <div className="text-sm text-gray-600">{course.students}</div>
                        </div>
                        <div className="text-center">
                          <Star className="w-4 h-4 mx-auto mb-1 text-yellow-500 fill-current" />
                          <div className="text-sm text-gray-600">{course.rating}</div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {course.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing */}
                      <div className="pt-4 border-t">
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl text-red-600">{course.price}</span>
                          <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                          <Badge className="bg-red-100 text-red-600 border-red-200">
                            Tiết kiệm {((parseInt(course.originalPrice.replace(/\D/g, '')) - parseInt(course.price.replace(/\D/g, ''))) / 1000).toFixed(0)}k
                          </Badge>
                        </div>

                        <Button 
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 group"
                          onClick={() => window.location.hash = '#/courses'}
                        >
                          Tìm hiểu thêm
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.hash = '#/courses'}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Xem tất cả khóa học
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}