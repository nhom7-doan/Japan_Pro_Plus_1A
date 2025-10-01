import { Button } from "./ui/button";
import { Menu, X, User, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthService } from "../utils/auth";
import { AuthModal } from "./AuthModal";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [user, setUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'register'>('login');

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update current path when hash changes and check auth
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    
    const checkAuth = async () => {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener('hashchange', handleHashChange);
    checkAuth();

    // Re-check auth periodically
    const interval = setInterval(checkAuth, 5000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(interval);
    };
  }, []);

  const isActive = (path: string) => {
    return currentPath === path ? 'text-red-600' : '';
  };

  const handleAuthClick = (type: 'login' | 'register') => {
    setAuthDefaultTab(type);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await AuthService.signOut();
    setUser(null);
    window.location.hash = '#/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('#/')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white">日</span>
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">TIẾNG NHẬT</div>
              <div className="text-xs text-muted-foreground leading-tight">QUANG DŨNG ONLINE</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('#/about')} className={`hover:text-red-600 transition-colors ${isActive('#/about')}`}>
              Giới thiệu
            </button>
            <button onClick={() => navigate('#/courses')} className={`hover:text-red-600 transition-colors ${isActive('#/courses')}`}>
              Khóa học
            </button>
            <button onClick={() => navigate('#/teachers')} className={`hover:text-red-600 transition-colors ${isActive('#/teachers')}`}>
              Giáo viên
            </button>
            <button onClick={() => navigate('#/faq')} className={`hover:text-red-600 transition-colors ${isActive('#/faq')}`}>
              Hỏi đáp
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Button onClick={() => navigate('#/dashboard')} variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleAuthClick('login')} className="bg-red-600 hover:bg-red-700">
                <LogIn className="w-4 h-4 mr-2" />
                Tài khoản
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t">
            <button 
              onClick={() => navigate('#/about')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/about')}`}
            >
              Giới thiệu
            </button>
            <button 
              onClick={() => navigate('#/courses')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/courses')}`}
            >
              Khóa học
            </button>
            <button 
              onClick={() => navigate('#/teachers')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/teachers')}`}
            >
              Giáo viên
            </button>
            <button 
              onClick={() => navigate('#/faq')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/faq')}`}
            >
              Hỏi đáp
            </button>
            <div className="px-4 space-y-2">
              {user ? (
                <>
                  <Button onClick={() => navigate('#/dashboard')} variant="outline" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700">
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Button onClick={() => handleAuthClick('login')} className="w-full bg-red-600 hover:bg-red-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  Tài khoản
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={authDefaultTab}
      />
    </header>
  );
}
