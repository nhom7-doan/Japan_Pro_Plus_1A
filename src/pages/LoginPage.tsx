import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AuthService } from "../utils/auth";
import { AlertCircle } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await AuthService.signin(email, password);
      
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      // Redirect to dashboard
      window.location.hash = '#/dashboard';
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">日</span>
              </div>
              <h1 className="text-3xl mb-2">Đăng Nhập</h1>
              <p className="text-muted-foreground">
                Chào mừng bạn trở lại với TNQDO
              </p>
            </div>

            {/* Login Form */}
            <Card className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-800">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Chưa có tài khoản? </span>
                <button
                  onClick={() => window.location.hash = '#/register'}
                  className="text-red-600 hover:underline"
                >
                  Đăng ký ngay
                </button>
              </div>
            </Card>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <button
                onClick={() => window.location.hash = '#/'}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Quay lại trang chủ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}