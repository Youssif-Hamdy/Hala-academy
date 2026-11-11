import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import CertificationsStrip from './CertificationsStrip';
import PressArticlesSection from './PressArticlesSection';
import { Award, Globe, Sparkles, Mic } from 'lucide-react';

const CAREER_HIGHLIGHTS = [
  {
    id: 'workshops',
    icon: Globe,
    year: 'مصر · الإمارات · ليبيا',
    title: 'ماستركلاسات وورش تدريبية دولية',
    desc: 'قيادة ورش عمل تطبيقية مكثفة لتدريب المئات من خبيرات التجميل على أحدث تقنيات الدمج السحابي وثبات مكياج العرائس.'
  },
  {
    id: 'jury',
    icon: Award,
    year: '+20 اعتماد وتكريم رسمي',
    title: 'لجان التحكيم والملتقيات العربية',
    desc: 'مشاركة فاعلة في تحكيم مسابقات التجميل وتكريمات رسمية من مؤسسات وأكاديميات دولية مرموقة.'
  },
  {
    id: 'media',
    icon: Mic,
    year: '+24 ظهور ومقال متخصص',
    title: 'حضور إعلامي وصحفي واسع',
    desc: 'لقاءات إذاعية وتلفزيونية ومقالات تجميلية متخصصة في أبرز المجلات والمنصات الصحفية العربية.'
  },
  {
    id: 'bridal',
    icon: Sparkles,
    year: '+10 سنوات من الخبرة',
    title: 'إطلالات الهوت كوتور والعرائس',
    desc: 'ابتكار إطلالات فاخرة لجلسات التصوير والعرائس تجمع بين الفخامة الكلاسيكية ونعومة الملمس الطبيعي.'
  }
];

export default function AboutHalaPage() {
  const { navigateToHome, openBookingModal } = useApp();
  const [activeTab, setActiveTab] = useState('philosophy');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoToCourses = () => {
    navigateToHome();
    setTimeout(() => {
      const el = document.getElementById('course');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  return (
    <div className="about-hala-dedicated-page">
      {/* Section 1: Full About Hala (Matches 1st Attached Image) */}
      <section className="about-section about-page-hero-section" aria-label="عن المدربة حلا سامي">
        <div className="container">
          {/* Breadcrumb / Back Link */}
          <div className="about-page-breadcrumb">
            <button
              type="button"
              onClick={navigateToHome}
              className="about-back-pill-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              <span>العودة إلى الرئيسية</span>
            </button>
          </div>

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
                <span>عن مؤسسة الأكاديمية</span>
              </div>

              <h1 className="section-title heading-2">
                حلا سامي: شغف الإتقان، وخبرة نقل المهارة بصدق
              </h1>

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
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Certifications Strip */}
      <CertificationsStrip />

      {/* Section 3: Career Milestones & International Masterclasses (Bridging Section) */}
      <section className="about-milestones-showcase" aria-label="محطات المسيرة المهنية">
        <div className="container">
          <div className="about-milestones-header">
            <div className="section-eyebrow caption-3">
              <span>مسيرة حافلة بالإنجازات</span>
            </div>
            <h2 className="heading-2" style={{ color: 'var(--color-noir)' }}>
              محطات التميز والخبرة الميدانية
            </h2>
            <p className="body-2" style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '8px auto 0' }}>
              رحلة مهنية تجمع بين الدراسة الأكاديمية المعتمدة والتطبيق الميداني في أكبر المحافل العربية.
            </p>
          </div>

          <div className="about-milestones-grid">
            {CAREER_HIGHLIGHTS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="about-milestone-card">
                  <div className="about-milestone-top">
                    <IconComponent size={19} strokeWidth={1.6} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span className="about-milestone-badge caption-3">{item.year}</span>
                  </div>
                  <h3 className="title-1" style={{ color: 'var(--color-noir)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p className="body-5" style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Press & Media Articles */}
      <PressArticlesSection />

      {/* Section 5: Minimalist Bottom Call to Action on About Page */}
      <section className="about-page-bottom-cta">
        <div className="container">
          <div className="about-page-cta-box">
            <h2 className="heading-3" style={{ color: '#FFFFFF', marginBottom: '10px' }}>
              هل أنتِ مستعدة للتعلّم مباشرة مع حلا سامي؟
            </h2>
            <p className="body-2" style={{ color: 'var(--color-accent-soft)', maxWidth: '520px', margin: '0 auto 24px' }}>
              اختاري المسار التدريبي المناسب لكِ وابدئي تطبيق أحدث تقنيات المكياج خطوة بخطوة.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={openBookingModal}
                className="about-cta-primary-btn button-md"
              >
                <span>اشتركي في الكورس الآن</span>
              </button>
              <button
                type="button"
                onClick={handleGoToCourses}
                className="about-cta-secondary-btn button-md"
              >
                <span>استعرضي المسارات والمنهج</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

