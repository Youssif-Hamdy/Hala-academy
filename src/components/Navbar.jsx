import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const {
    openBookingModal,
    openAuthModal,
    currentUser,
    logout,
    openLmsModal,
    openAdminModal,
    currentView,
    navigateToAbout,
    navigateToHome
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (currentView !== 'home') return;

      const sections = ['top', 'about', 'course', 'free', 'stories', 'faq'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentView]);

  const handleHomeSectionNav = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutPageNav = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigateToAbout();
  };

  return (
    <>
      <header className={`site-header ${scrolled || currentView === 'about' ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <div className="header-start">
            <button
              type="button"
              className="nav-profile-btn"
              onClick={() => (currentUser ? openLmsModal() : openAuthModal('login'))}
              aria-label={currentUser ? 'حسابي' : 'تسجيل الدخول'}
              title={currentUser ? 'حسابي' : 'تسجيل الدخول'}
            >
              <User size={18} strokeWidth={1.6} />
            </button>
          </div>

          <a
            href="#top"
            onClick={(e) => handleHomeSectionNav(e, 'top')}
            className="brand-logo"
            dir="ltr"
            aria-label="Halla Academy Home"
          >
            <span className="brand-logo-glow" aria-hidden="true"></span>
            <img
              src="/assets/images/hala-emblem.png"
              alt="Halla Academy Luxury Emblem"
              className="nav-brand-emblem-img"
            />
          </a>

          <div className="header-end">
            <nav className="nav-links" aria-label="التنقل الرئيسي">
              <a
                href="#top"
                onClick={(e) => handleHomeSectionNav(e, 'top')}
                className={`nav-link caption-1 ${currentView === 'home' && activeSection === 'top' ? 'active' : ''}`}
              >
                الرئيسية
              </a>

              <a
                href="#about-hala"
                onClick={handleAboutPageNav}
                className={`nav-link caption-1 ${currentView === 'about' ? 'active' : ''}`}
              >
                عن حلا
              </a>

              <a
                href="#course"
                onClick={(e) => handleHomeSectionNav(e, 'course')}
                className={`nav-link caption-1 ${currentView === 'home' && activeSection === 'course' ? 'active' : ''}`}
              >
                الكورس
              </a>
              <a
                href="#free"
                onClick={(e) => handleHomeSectionNav(e, 'free')}
                className={`nav-link caption-1 ${currentView === 'home' && activeSection === 'free' ? 'active' : ''}`}
              >
                لقطات التدريب
              </a>
              <a
                href="#faq"
                onClick={(e) => handleHomeSectionNav(e, 'faq')}
                className={`nav-link caption-1 ${currentView === 'home' && activeSection === 'faq' ? 'active' : ''}`}
              >
                الأسئلة الشائعة
              </a>
            </nav>

            <div className="header-actions">
              {currentUser ? (
                <div className="nav-user-profile-chip">
                  <span
                    className="nav-user-badge caption-2"
                    onClick={openLmsModal}
                    title="متابعة طلبات الاشتراك وكورساتي"
                  >
                    <span className="user-dot"></span>
                    <span>{currentUser.name}</span>
                  </span>
                  {currentUser.role === 'ADMIN' && (
                    <button
                      type="button"
                      onClick={openAdminModal}
                      className="admin-chip caption-4"
                      style={{ cursor: 'pointer', border: 'none' }}
                      title="لوحة تحكم طلبات الاشتراك"
                    >
                      طلبات الاشتراك
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="nav-logout-btn caption-3"
                    title="تسجيل الخروج"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={openLmsModal}
                    className="btn-luxury-text button-sm"
                    title="متابعة حالة طلب الاشتراك"
                  >
                    كورساتي
                  </button>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="btn-luxury-text button-sm"
                  >
                    تسجيل الدخول
                  </button>
                </>
              )}

              <button
                onClick={() => openBookingModal('pro')}
                className="btn-luxury-primary button-sm"
              >
                <span>اشتركي الآن</span>
              </button>
            </div>

            <button
              className="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileMenuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="drawer-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drawer-header">
            <span className="brand-logo" dir="ltr">
              <img
                src="/assets/images/hala-emblem.png"
                alt="Halla Academy"
                className="nav-brand-emblem-img"
                style={{ height: '28px', width: 'auto' }}
              />
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="drawer-close-btn"
              aria-label="إغلاق"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="drawer-nav">
            <a
              href="#top"
              onClick={(e) => handleHomeSectionNav(e, 'top')}
              className={`drawer-link title-3 ${currentView === 'home' && activeSection === 'top' ? 'active' : ''}`}
            >
              الرئيسية
            </a>
            <a
              href="#about-hala"
              onClick={handleAboutPageNav}
              className={`drawer-link title-3 ${currentView === 'about' ? 'active' : ''}`}
            >
              عن حلا سامي (الشهادات والصحافة)
            </a>
            <a
              href="#course"
              onClick={(e) => handleHomeSectionNav(e, 'course')}
              className={`drawer-link title-3 ${currentView === 'home' && activeSection === 'course' ? 'active' : ''}`}
            >
              المسارات والمنهج
            </a>
            <a
              href="#free"
              onClick={(e) => handleHomeSectionNav(e, 'free')}
              className={`drawer-link title-3 ${currentView === 'home' && activeSection === 'free' ? 'active' : ''}`}
            >
              لقطات التدريب
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openLmsModal();
              }}
              className="drawer-link title-3"
              style={{ textAlign: 'right', width: '100%' }}
            >
              كورساتي وحالة الطلب
            </button>
            {currentUser?.role === 'ADMIN' && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminModal();
                }}
                className="drawer-link title-3"
                style={{ textAlign: 'right', width: '100%', color: 'var(--color-primary)', fontWeight: 600 }}
              >
                لوحة طلبات الاشتراك (الأدمن)
              </button>
            )}
            <a
              href="#faq"
              onClick={(e) => handleHomeSectionNav(e, 'faq')}
              className={`drawer-link title-3 ${currentView === 'home' && activeSection === 'faq' ? 'active' : ''}`}
            >
              الأسئلة الشائعة
            </a>
          </nav>

          <div className="drawer-actions">
            {currentUser ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="caption-1" style={{ color: 'var(--color-primary)', textAlign: 'center' }}>
                  مسجلة باسم: <strong>{currentUser.name}</strong>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="drawer-btn-outline button-md"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="drawer-btn-outline button-md"
              >
                تسجيل الدخول / حساب جديد
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal('pro');
              }}
              className="drawer-btn-primary button-md"
            >
              اشتركي في الكورس الآن
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
