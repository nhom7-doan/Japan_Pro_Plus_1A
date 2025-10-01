import { Contact } from "../components/Contact";
import { Card } from "../components/ui/card";
import { MapPin, Clock, Globe } from "lucide-react";

export function ContactPage() {
  const workingHours = [
    { day: "Thứ 2 - Thứ 6", time: "8:00 - 20:00" },
    { day: "Thứ 7 - Chủ nhật", time: "9:00 - 18:00" }
  ];

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-white/90">
              Sẵn sàng đồng hành cùng bạn trên hành trình chinh phục tiếng Nhật
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="mb-2">Địa chỉ</h3>
                <p className="text-sm text-muted-foreground">
                  2B Hoàng Ngọc Phách<br />
                  P. Phú Thọ Hòa, Q. Tân Phú<br />
                  TP. Hồ Chí Minh
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="mb-2">Giờ làm việc</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  {workingHours.map((item, index) => (
                    <div key={index}>
                      <div>{item.day}</div>
                      <div>{item.time}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="mb-2">Học Online</h3>
                <p className="text-sm text-muted-foreground">
                  100% trực tuyến<br />
                  Học mọi lúc, mọi nơi<br />
                  Phù hợp mọi đối tượng
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact */}
      <Contact />

      {/* Map & Additional Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Map Placeholder */}
              <Card className="p-6">
                <h3 className="mb-4">Vị Trí</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">
                      2B Hoàng Ngọc Phách<br />
                      P. Phú Thọ Hòa, Q. Tân Phú<br />
                      TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Hiện tại TNQDO hoạt động 100% trực tuyến. Chúng tôi dự định sẽ mở trung tâm 
                  học offline trong tương lai gần khi có đủ nhu cầu từ học viên.
                </p>
              </Card>

              {/* Social & Additional */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="mb-4">Thông Tin Thêm</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <p>
                        <strong>Thời gian phản hồi:</strong> Chúng tôi cam kết phản hồi 
                        mọi yêu cầu trong vòng 24 giờ làm việc.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <p>
                        <strong>Tư vấn miễn phí:</strong> Đăng ký để nhận tư vấn chi tiết 
                        về lộ trình học phù hợp với bạn.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <p>
                        <strong>Kiểm tra đầu vào:</strong> Miễn phí kiểm tra trình độ 
                        để xác định lộ trình học phù hợp.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <p>
                        <strong>Học thử:</strong> Có thể tham gia học thử 1 buổi để 
                        trải nghiệm phương pháp giảng dạy.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100">
                  <h3 className="mb-3">Ưu Đãi Đặc Biệt</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎁</span>
                      <span>Giảm 10% khi đóng học phí toàn khóa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📚</span>
                      <span>Tặng tài liệu học tập độc quyền</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      <span>Miễn phí kiểm tra trình độ đầu vào</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💝</span>
                      <span>Quà tặng khi giới thiệu bạn bè</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Snippet */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4">
              Có Câu Hỏi?
            </h2>
            <p className="text-muted-foreground mb-8">
              Xem thêm các câu hỏi thường gặp hoặc liên hệ trực tiếp với chúng tôi
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.location.hash = '#/faq'}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Xem câu hỏi thường gặp
              </button>
              <a
                href="tel:+84901189399"
                className="px-6 py-3 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Gọi ngay: (+84) 901 189 399
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
