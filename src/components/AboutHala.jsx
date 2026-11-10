import React, { useState } from 'react';

export default function AboutHala() {
  const [activeTab, setActiveTab] = useState('philosophy');

  return (
    <section id="about" className="about-section" aria-label="عن المدربة حلا سامي">
      <div className="container">
        <div className="about-grid">
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

          {/* Content Column */}
          <div className="about-content-col">
            <div className="section-eyebrow caption-3">
              <span className="gold-sparkle">✦</span>
              <span>عن مؤسسة الأكاديمية</span>
              <span className="gold-sparkle">✦</span>
            </div>

            <h2 className="section-title heading-2">
              حلا سامي: شغف الإتقان، وخبرة نقل المهارة بصدق
            </h2>

            <p className="about-p body-2">
              مدرّبة وخبيرة مكياج معتمدة دولياً، قادت ورش عمل وتدريبات متقدمة في مصر والإمارات وليبيا، ولها ظهور إعلامي ومقالات متخصصة في كبرى المجلات والمنصات الصحفية العربية.
            </p>

            {/* Quick Metrics Bar */}
            <div className="about-metrics-row">
              <div className="about-metric-item">
                <span className="metric-number heading-4 gold-number">+2,400</span>
                <span className="metric-label caption-2">متدربة معتمدة</span>
              </div>
              <div className="about-metric-divider" aria-hidden="true"></div>
              <div className="about-metric-item">
                <span className="metric-number heading-4 gold-number">+20</span>
                <span className="metric-label caption-2">شهادة واعتماد دولي</span>
              </div>
              <div className="about-metric-divider" aria-hidden="true"></div>
              <div className="about-metric-item">
                <span className="metric-number heading-4 gold-number">24+</span>
                <span className="metric-label caption-2">تغطية ومقال صحفي</span>
              </div>
            </div>

            {/* Interactive Tabs Row */}
            <div className="about-tabs-strip" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'philosophy'}
                onClick={() => setActiveTab('philosophy')}
                className={`about-tab-btn caption-2 ${activeTab === 'philosophy' ? 'active' : ''}`}
              >
                فلسفة التدريب
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'milestones'}
                onClick={() => setActiveTab('milestones')}
                className={`about-tab-btn caption-2 ${activeTab === 'milestones' ? 'active' : ''}`}
              >
                المحطات والورش
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'mission'}
                onClick={() => setActiveTab('mission')}
                className={`about-tab-btn caption-2 ${activeTab === 'mission' ? 'active' : ''}`}
              >
                رؤية الأكاديمية
              </button>
            </div>

            {/* Tab Panels */}
            <div className="about-tab-panel-box body-3">
              {activeTab === 'philosophy' && (
                <div className="about-panel-content">
                  «أؤمن أن المكياج الاحترافي ليس مجرد طبقات متراكمة من المستحضرات، بل يبدأ من فهم تشريح الوجه، ونوعية البشرة، ونظافة تقنية الدمج. صممت هذا المنهج ليكون دليلاً عملياً مباشراً يمنح كل فتاة القدرة على تحقيق نتائج الصالونات الفاخرة بنفسها دون أي غموض أو إخفاء للأسرار المهنية.»
                </div>
              )}

              {activeTab === 'milestones' && (
                <div className="about-panel-content">
                  قدمت حلا سامي ماستركلاسات مكثفة في القاهرة وطرابلس ودبي، وشاركت في لجان تحكيم ملتقيات التجميل العربية، إلى جانب إعداد جلسات تصوير أزياء وعرائس كبرى حظيت باهتمام إعلامي واسع وتكريمات رسمية من مؤسسات دولية.
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="about-panel-content">
                  تهدف الأكاديمية إلى تمكين الفتاة العربية من امتلاك مهارة مهنية عالية الجودة، سواء للتألق الذاتي أو لبدء مشروع مستقل يدر دخلاً مجزياً، مع دعم ومتابعة مستمرة للتطبيقات وملاحظات فنية دقيقة لكل طالبة.
                </div>
              )}
            </div>

            {/* Direct Links to Certifications & Press */}
            <div className="about-quick-links-row">
              <a href="#certifications" className="btn-luxury-text button-sm" style={{ padding: 0 }}>
                <span>شاهدي شهادات واعتمادات حلا</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6"></path>
                </svg>
              </a>

              <a href="#press" className="btn-luxury-text button-sm" style={{ padding: 0, color: 'var(--color-text-muted)' }}>
                <span>طالعي التغطية الصحفية والمقالات</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
