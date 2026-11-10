import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { showToast, openAuthModal, openBookingModal } = useApp();

  return (
    <footer className="site-footer" aria-label="تذييل الموقع">
      <div className="container">
        <div className="footer-top-row">
          {/* Brand Col with Official Emblem */}
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <div
              dir="ltr"
              className="brand-logo footer-brand-logo"
              style={{
                marginBottom: 'var(--spacing-200)'
              }}
            >
              <img 
                src="/assets/images/hala-emblem.png" 
                alt="Halla Academy Luxury Emblem" 
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
              <div>
                <span className="brand-name" style={{ color: '#FFFFFF', fontSize: '24px' }}>HALLA</span>
                <span className="sub" style={{ color: 'var(--color-accent-soft)', fontSize: '11px', display: 'block', letterSpacing: '0.28em' }}>ACADEMY</span>
              </div>
            </div>
            <p className="body-3" style={{ maxWidth: '340px', color: 'var(--color-accent-soft)', opacity: 0.9 }}>
              الأكاديمية الرقمية الأولى المتخصصة في تعليم فنون وتقنيات المكياج الاحترافي بالعربية، بقيادة خبيرة التجميل حلا سامي.
            </p>
          </div>

          {/* Links 1 */}
          <div style={{ flex: '0 1 160px' }}>
            <div className="title-4" style={{ color: '#FFFFFF', marginBottom: 'var(--spacing-100)' }}>
              الأكاديمية
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="#top" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>الرئيسية</a>
              <a href="#certifications" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>الشهادات والاعتمادات</a>
              <a href="#about" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>عن حلا سامي</a>
              <a href="#press" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>الصحافة والإعلام</a>
              <a href="#course" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>المسارات والمنهج</a>
              <a href="#free" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>الدرس المجاني</a>
              <a href="#faq" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>الأسئلة الشائعة</a>
            </div>
          </div>

          {/* Links 2 (B10: Legal links) */}
          <div style={{ flex: '0 1 160px' }}>
            <div className="title-4" style={{ color: '#FFFFFF', marginBottom: 'var(--spacing-100)' }}>
              السياسات والتسجيل
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button 
                onClick={openBookingModal}
                className="caption-1"
                style={{ color: '#DFB76C', minHeight: '34px', display: 'inline-flex', alignItems: 'center', textAlign: 'right', fontWeight: 600 }}
              >
                استمارة الحجز والالتحاق
              </button>
              <button 
                onClick={() => openAuthModal('login')}
                className="caption-1"
                style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center', textAlign: 'right' }}
              >
                دخول المتدربات
              </button>
              <button 
                onClick={() => showToast('سياسة الخصوصية: بيانات المشتركات مشفرة ومحمية بأعلى معايير الأمان.')}
                className="caption-1"
                style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center', textAlign: 'right' }}
              >
                سياسة الخصوصية
              </button>
              <button 
                onClick={() => showToast('الشروط والأحكام: اشتراك شخصي دائم مع إمكانية الوصول لجميع التحديثات.')}
                className="caption-1"
                style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center', textAlign: 'right' }}
              >
                شروط الاستخدام
              </button>
              <button 
                onClick={() => showToast('سياسة الشهادات: تصدر شهادة إتمام رقمية معتمدة لكل طالبة تجتاز التطبيقات.')}
                className="caption-1"
                style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center', textAlign: 'right' }}
              >
                الاعتمادات والشهادات
              </button>
            </div>
          </div>

          {/* Links 3 */}
          <div style={{ flex: '0 1 160px' }}>
            <div className="title-4" style={{ color: '#FFFFFF', marginBottom: 'var(--spacing-100)' }}>
              تابعينا
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>إنستجرام</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>تيك توك</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="caption-1" style={{ color: 'var(--color-accent-soft)', minHeight: '34px', display: 'inline-flex', alignItems: 'center' }}>فيسبوك</a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom-row caption-2">
          <span>جميع الحقوق محفوظة © {new Date().getFullYear()} أكاديمية حلا سامي لفنون المكياج</span>
          <span dir="ltr">Halla Academy · Haute Beauté Masterclass</span>
        </div>
      </div>
    </footer>
  );
}
