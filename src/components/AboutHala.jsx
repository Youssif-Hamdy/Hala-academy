import React from 'react';
import { useApp } from '../context/AppContext';

export default function AboutHala() {
  const { navigateToAbout } = useApp();

  return (
    <section id="about" className="about-section about-home-teaser" aria-label="عن المدربة حلا سامي">
      <div className="container">
        <div className="about-grid about-teaser-grid">
          {/* Photo with couture offset frame */}
          <div className="about-image-wrapper">
            <div className="about-image-container">
              <div className="about-image-card">
                <img
                  src="/assets/images/hala-portrait.jpg"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/images/hala-portrait.jpeg';
                  }}
                  alt="خبيرة التجميل ومؤسسة الأكاديمية حلا سامي"
                  loading="lazy"
                  className="about-hala-real-portrait"
                />
              </div>
              <div className="about-image-frame" aria-hidden="true"></div>

              {/* Luxury Credential Badge */}
              <div className="about-floating-stat caption-1">
                <strong className="gold-text">+10 سنوات</strong>
                <span>خبرة تدريبية وميدانية</span>
              </div>
            </div>
          </div>

          {/* Concise Teaser Content Column */}
          <div className="about-content-col about-teaser-content">
            <div className="section-eyebrow caption-3">
              <span>عن مؤسسة الأكاديمية</span>
            </div>

            <h2 className="section-title heading-2">
              حلا سامي: شغف الإتقان، وخبرة نقل المهارة بصدق
            </h2>

            <p className="about-p body-2" style={{ marginBottom: '20px' }}>
              مدرّبة وخبيرة مكياج معتمدة دولياً، قادت ورش عمل وتدريبات متقدمة لأكثر من 2,400 متدربة في مصر والإمارات وليبيا، وصممت هذا المنهج لمنحكِ أسرار الصالونات الفاخرة بأسلوب علمي مبسّط وواضح.
            </p>

            <div className="about-teaser-actions">
              <button
                type="button"
                onClick={navigateToAbout}
                className="btn-luxury-primary button-md"
                style={{ minHeight: '48px', padding: '0 28px' }}
              >
                <span>تعرّفي على مسيرة حلا وشهاداتها المعتمدة</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
