import React, { useState } from 'react';

export default function AboutHala() {
  const [showStory, setShowStory] = useState(false);

  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        {/* Photo with offset border */}
        <div className="about-image-wrapper">
          <div className="about-image-container">
            <div className="about-image-card">
              <img
                src="/assets/images/hala-portrait.jpg"
                alt="خبيرة التجميل حلا سامي"
              />
            </div>
            <div className="about-image-frame" aria-hidden="true"></div>
          </div>
        </div>

        {/* Content */}
        <div className="about-content-col">
          <div className="section-label">
            عن حلا
          </div>

          <h2 className="section-title">
            خبرة حقيقية، بأسلوب قريب منك
          </h2>

          <p className="about-p">
            حلا سامي مدرّبة وخبيرة مكياج مصرية، لها نشاط مهني وتدريبي في مصر وليبيا، وظهور إعلامي وتعاونات مع مراكز تجميل وعلامات دعائية.
          </p>

          <p className="about-p" style={{ marginBottom: '36px' }}>
            بنت الأكاديمية لتنقل خبرتها لكل فتاة تريد أن تتقن المكياج بنفسها، بخطوات واضحة وتقنيات جرّبتها في الورش والاستوديو.
          </p>

          {showStory && (
            <div style={{
              background: '#FDF7F8',
              border: '1px solid #F0D8D6',
              padding: '20px 24px',
              marginBottom: '28px',
              color: '#4A3A3D',
              fontSize: '15px',
              lineHeight: '1.9'
            }}>
              «أؤمن أن المكياج المتقن يبدأ من فهم تشريح الوجه ونوع البشرة، وليس من كثرة الطبقات. في هذه الأكاديمية وضعت خلاصة 9 سنوات من العمل خلف الكواليس لتصلي للنتيجة التي تتمنينها بثقة وسهولة.»
            </div>
          )}

          <button
            onClick={() => setShowStory(!showStory)}
            className="about-link-story"
          >
            <span>{showStory ? 'إغلاق الرسالة' : 'اعرفي قصتها كاملة'}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7A1C2E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{
                transform: showStory ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s'
              }}
            >
              <path d="M19 12H5M11 6l-6 6 6 6"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
