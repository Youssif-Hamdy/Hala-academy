import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { openBookingModal, openAuthModal, currentUser, logout, openLmsModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['top', 'certifications', 'about', 'press', 'course', 'free', 'stories', 'faq'];
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
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Brand Logo with Official Luxury Emblem */}
          <a href="#top" className="brand-logo" dir="ltr" aria-label="Halla Academy Home">
            <img
              src="/assets/images/hala-emblem.png"
              alt="Halla Academy Luxury Emblem"
              className="nav-brand-emblem-img"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-links" aria-label="التنقل الرئيسي">
            <a
              href="#top"
              className={`nav-link caption-1 ${activeSection === 'top' ? 'active' : ''}`}
            >
              الرئيسية
            </a>

            <a
              href="#about"
              className={`nav-link caption-1 ${activeSection === 'about' ? 'active' : ''}`}
            >
              عن حلا
            </a>

            <a
              href="#course"
              className={`nav-link caption-1 ${activeSection === 'course' ? 'active' : ''}`}
            >
              الكورس
            </a>
            <a
              href="#free"
              className={`nav-link caption-1 ${activeSection === 'free' ? 'active' : ''}`}
            >
              الدرس المجاني
            </a>
            <a
              href="#faq"
              className={`nav-link caption-1 ${activeSection === 'faq' ? 'active' : ''}`}
            >
              الأسئلة الشائعة
            </a>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {currentUser ? (
              <div className="nav-user-profile-chip">
                <span className="nav-user-badge caption-2" onClick={openLmsModal} title="لوحة المتدربة">
                  <span className="user-dot"></span>
                  <span>{currentUser.name}</span>
                  {currentUser.role === 'ADMIN' && (
                    <span className="admin-chip caption-4">أدمن</span>
                  )}
                </span>
                <button
                  onClick={logout}
                  className="nav-logout-btn caption-3"
                  title="تسجيل الخروج"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="btn-luxury-text button-sm"
              >
                تسجيل الدخول
              </button>
            )}

            <button
              onClick={openBookingModal}
              className="btn-luxury-primary button-sm"
            >
              <span>احجزي مقعدكِ</span>
            </button>

            {/* Mobile Toggle */}
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
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link title-3 ${activeSection === 'top' ? 'active' : ''}`}
            >
              الرئيسية
            </a>
            <a
              href="#certifications"
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link title-3 ${activeSection === 'certifications' ? 'active' : ''}`}
            >
              الشهادات والاعتمادات
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link title-3 ${activeSection === 'about' ? 'active' : ''}`}
            >
              عن حلا سامي
            </a>
            <a
              href="#press"
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link title-3 ${activeSection === 'press' ? 'active' : ''}`}
            >
              المقالات والتغطية الإعلامية
            </a>
            <a
              href="#course"
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link title-3 ${activeSection === 'course' ? 'active' : ''}`}
            >
              المسارات والمنهج
            </a>
            <a
              href="#free"
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link title-3 ${activeSection === 'free' ? 'active' : ''}`}
            >
              الدرس المجاني
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`drawer-link title-3 ${activeSection === 'faq' ? 'active' : ''}`}
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
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
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
                openBookingModal();
              }}
              className="drawer-btn-primary button-md"
            >
              استمارة الحجز والالتحاق
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
