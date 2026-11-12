import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigateToHome, navigateToAbout, navigateToFaq } = useApp();

  const handleSectionLink = (e, sectionId) => {
    e.preventDefault();
    navigateToHome();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="site-footer luxury-minimal-footer" aria-label="تذييل الموقع">
      <div className="container">
        <div className="luxury-footer-main">
          {/* Brand Identity */}
          <div className="luxury-footer-brand">
            <a
              href="#top"
              onClick={(e) => handleSectionLink(e, 'top')}
              className="luxury-footer-wordmark"
              dir="ltr"
            >
              <span className="luxury-footer-logo-title">Halla.</span>
              <span className="luxury-footer-logo-sub">ACADEMY</span>
            </a>
            <p className="luxury-footer-tagline body-5">
              أكاديمية رقمية متخصصة في تعليم فنون وتقنيات المكياج الاحترافي بإشراف خبيرة التجميل حلا سامي.
            </p>
          </div>

          {/* Essential Navigation Links (Cleanly Aligned) */}
          <nav className="luxury-footer-nav" aria-label="روابط سريعة">
            <a href="#top" onClick={(e) => handleSectionLink(e, 'top')} className="luxury-footer-link">
              الرئيسية
            </a>
            <button type="button" onClick={navigateToAbout} className="luxury-footer-link">
              عن حلا
            </button>
            <a href="#course" onClick={(e) => handleSectionLink(e, 'course')} className="luxury-footer-link">
              المسارات والمنهج
            </a>
            <a href="#free" onClick={(e) => handleSectionLink(e, 'free')} className="luxury-footer-link">
              لقطات التدريب
            </a>
            <button
              type="button"
              onClick={() => navigateToFaq()}
              className="luxury-footer-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
            >
              الأسئلة الشائعة
            </button>
          </nav>
        </div>

        <div className="luxury-footer-bottom">
          <span>© {new Date().getFullYear()} أكاديمية حلا سامي · جميع الحقوق محفوظة</span>

          <div className="luxury-footer-socials" dir="ltr">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-footer-social-link"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-footer-social-link"
              aria-label="TikTok"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
              <span>TikTok</span>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-footer-social-link"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
