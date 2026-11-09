import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { showToast } = useApp();

  return (
    <footer className="site-footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="footer-top-row">
          {/* Brand Col */}
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <div
              dir="ltr"
              style={{
                textAlign: 'right',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: '28px',
                letterSpacing: '0.14em',
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              HALLA ACADEMY
            </div>
            <p style={{ margin: 0, maxWidth: '320px', fontWeight: 300, lineHeight: 1.8 }}>
              أكاديمية رقمية لتعليم المكياج بالعربية، بقيادة الخبيرة حلا سامي.
            </p>
          </div>

          {/* Links 1 */}
          <div style={{ flex: '0 1 160px' }}>
            <div style={{ fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
              الأكاديمية
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="#about" style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>عن حلا</a>
              <a href="#course" style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>الكورس</a>
              <a href="#faqs" style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>الأسئلة الشائعة</a>
            </div>
          </div>

          {/* Links 2 */}
          <div style={{ flex: '0 1 160px' }}>
            <div style={{ fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
              السياسات
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('سياسة الخصوصية: بياناتكِ مشفرة ومحمية 100%.'); }} style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>الخصوصية</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('الشروط والأحكام: اشتراك دائم بحساب شخصي.'); }} style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>الشروط والأحكام</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('الاسترداد: ضمان رضا واكتمال جودة المحتوى.'); }} style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>الاسترداد</a>
            </div>
          </div>

          {/* Links 3 */}
          <div style={{ flex: '0 1 160px' }}>
            <div style={{ fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
              تابعينا
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>إنستجرام</a>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>تيك توك</a>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#F0D8D6', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>فيسبوك</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div dir="ltr" style={{ paddingTop: '24px', fontSize: '14px', color: '#C5899A' }}>
          © Halla Academy
        </div>
      </div>
    </footer>
  );
}
