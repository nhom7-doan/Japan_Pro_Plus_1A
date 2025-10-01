import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { CoursesPage } from "./pages/CoursesPage";
import { TeachersPage } from "./pages/TeachersPage";
import { FAQPage } from "./pages/FAQPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case '#/about':
        return <AboutPage />;
      case '#/courses':
        return <CoursesPage />;
      case '#/teachers':
        return <TeachersPage />;
      case '#/faq':
        return <FAQPage />;
      case '#/contact':
        return <ContactPage />;
      case '#/login':
        return <LoginPage />;
      case '#/register':
        return <RegisterPage />;
      case '#/dashboard':
        return <DashboardPage />;
      default:
        return <Home />;
    }
  };

  const showFooter = !['#/login', '#/register', '#/dashboard'].includes(currentPage);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {renderPage()}
      </main>
      {showFooter && <Footer />}
      <Toaster />
    </div>
  );
}
