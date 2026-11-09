import React from 'react';

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      {/* Background Media */}
      <div className="hero-bg-media" aria-hidden="true">
        <img
          src="/assets/images/hero-cinematic.jpg"
          alt="Halla Academy Masterclass Cinematic"
          className="hero-bg-image"
        />
        <div className="hero-overlay-gradient"></div>
        <div className="hero-overlay-bottom"></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="hero-content">
          <div className="hero-divider" aria-hidden="true"></div>

          <div
            dir="ltr"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              letterSpacing: '0.45em',
              color: '#F0D8D6',
              marginBottom: '28px',
              paddingLeft: '0.45em'
            }}
          >
            HALLA ACADEMY
          </div>

          <h1 className="hero-title">
            تعلّمي المكياج بإتقان،<br />
            خطوة بعد خطوة
          </h1>

          <p className="hero-subtitle">
            أكاديمية رقمية تقودها خبيرة التجميل حلا سامي، لتتعلّمي المكياج لنفسك أو تطوّري مهارتك للاحتراف، بالعربية وعلى راحتك.
          </p>

          <div className="hero-cta-group">
            <a href="#course" className="hero-btn-white">
              <span>اكتشفي الكورس</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A1C2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6"></path>
              </svg>
            </a>

            <a href="#free" className="btn-luxury-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                <path d="M7 4.5v15l13-7.5z"></path>
              </svg>
              <span>شاهدي الفيلم</span>
            </a>
          </div>

          <div className="hero-pill-highlights">
            <span>كورس مسجّل</span>
            <span>·</span>
            <span>بالعربية</span>
            <span>·</span>
            <span>من الأساسيات إلى الاحتراف</span>
          </div>
        </div>
      </div>
    </section>
  );
}
