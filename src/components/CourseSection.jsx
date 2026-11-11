import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_DATA } from '../data/courseData';

export default function CourseSection() {
  const { openEnrollModal } = useApp();
  const [expandedUnit, setExpandedUnit] = useState(null);
  const { modules } = ACADEMY_DATA;

  const toggleUnit = (num) => {
    setExpandedUnit(expandedUnit === num ? null : num);
  };

  return (
    <section id="course" className="course-section" aria-label="الكورس والمسارات التدريبية">
      <div className="container">
        {/* Course Intro */}
        <div className="course-intro-box">
          <div className="section-eyebrow caption-3">المسارات التدريبية</div>
          <h2 className="section-title heading-2">مسارك المخصص في التعلّم</h2>
          <p className="body-2" style={{ color: 'var(--color-text-muted)' }}>
            منهج متكامل مسجّل بجودة سينمائية فائقة باللغة العربية، من الأساسيات إلى الاحتراف الكامل. اختاري المسار الذي يناسب طموحك.
          </p>
        </div>

        {/* Tracks Grid (Nested Radius B3 & Mathematical Spacing B2) */}
        <div className="track-cards-grid">
          {/* Card 1: For You */}
          <div className="track-card-for-you">
            <div dir="ltr" className="track-tag-latin" style={{ color: 'var(--color-primary)' }}>
              FOR YOU · مسار الاستخدام الشخصي
            </div>

            <h3 className="track-heading heading-4" style={{ color: 'var(--color-noir)' }}>
              أتعلّم لنفسي وإبراز جمالي
            </h3>

            <p className="track-desc body-3" style={{ color: 'var(--color-text-muted)' }}>
              مكياج يومي ولمسات متقنة تناسب ملامحك بدقة، من تحضير البشرة والعناية بها حتى التثبيت الاحترافي، لتعتمدي على نفسك بثقة في كل مناسبة.
            </p>

            <div className="track-price-row">
              <span className="caption-1" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                6 ساعات تدريبية مكثفة · وصول غير محدود مدى الحياة
              </span>
            </div>

            <button
              onClick={() => openEnrollModal('self')}
              className="button-md"
              style={{
                background: '#FFFFFF',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',
                minHeight: '48px',
                padding: '0 var(--spacing-300)',
                borderRadius: 'var(--radius-md)',
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-100)'
              }}
            >
              <span>اختاري مسار أتعلّم لنفسي</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 6l-6 6 6 6"></path>
              </svg>
            </button>
          </div>

          {/* Card 2: Professional (Haute Couture Featured) */}
          <div className="track-card-pro">
            <div dir="ltr" className="track-tag-latin" style={{ color: 'var(--color-accent-soft)' }}>
              PROFESSIONAL · المسار الاحترافي الشامل
            </div>

            <h3 className="track-heading heading-4" style={{ color: '#FFFFFF' }}>
              احتراف فنون المكياج وسوق العمل
            </h3>

            <p className="track-desc body-3" style={{ color: 'var(--color-accent-soft)' }}>
              تقنيات العرائس والتصوير السينمائي، أسرار خلط وتثبيت كريمات الأساس، فن التعامل مع العميلات، وأخلاقيات المهنة لتأسيس اسمك في السوق بثقة.
            </p>

            <div className="track-price-row" style={{ borderColor: 'rgba(240, 216, 214, 0.35)' }}>
              <span className="caption-1" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                14 ساعة تدريبية متخصصة · شهادة معتمدة موثقة برقم تسلسلي
              </span>
            </div>

            <button
              onClick={() => openEnrollModal('pro')}
              className="button-md"
              style={{
                background: '#FFFFFF',
                color: 'var(--color-primary)',
                minHeight: '48px',
                padding: '0 var(--spacing-300)',
                borderRadius: 'var(--radius-md)',
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-100)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }}
            >
              <span>اختاري مسار الاحتراف الكامل</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 6l-6 6 6 6"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Modules Header */}
        <div className="modules-wrapper">
          <div className="modules-header-row">
            <h3 className="heading-3">
              وحدات ومنهج الكورس
            </h3>
            <div className="caption-1" style={{ color: 'var(--color-text-subtle)' }}>
              6 وحدات تدريبية متسلسلة خطوة بخطوة
            </div>
          </div>

          {/* 6 Modules Grid (01 - 06) */}
          <div className="modules-grid-two-col">
            {/* Column 1: 01, 02, 03 */}
            <div>
              {modules.slice(0, 3).map((mod) => {
                const isOpen = expandedUnit === mod.number;
                return (
                  <div key={mod.number} className="module-item-container">
                    <div
                      className="module-item-row"
                      onClick={() => toggleUnit(mod.number)}
                      aria-expanded={isOpen}
                    >
                      <div dir="ltr" className="module-code-number">
                        {mod.number}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div className="module-title-main title-2">{mod.title}</div>
                        <div className="module-desc-sub caption-2">{mod.summary}</div>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform var(--duration-fast) var(--motion-base)',
                          flexShrink: 0,
                          marginTop: '4px'
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {isOpen && (
                      <div className="module-drawer-details">
                        <div className="caption-3" style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-100)' }}>
                          الدروس والتدريبات العملية ({mod.duration}):
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-75)' }}>
                          {mod.lessons.map((lesson) => (
                            <div key={lesson.id} className="caption-2" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-main)' }}>
                              <span>• {lesson.title}</span>
                              <span dir="ltr" style={{ color: 'var(--color-text-subtle)' }}>{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Column 2: 04, 05, 06 */}
            <div>
              {modules.slice(3, 6).map((mod) => {
                const isOpen = expandedUnit === mod.number;
                return (
                  <div key={mod.number} className="module-item-container">
                    <div
                      className="module-item-row"
                      onClick={() => toggleUnit(mod.number)}
                      aria-expanded={isOpen}
                    >
                      <div dir="ltr" className="module-code-number">
                        {mod.number}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div className="module-title-main title-2">{mod.title}</div>
                        <div className="module-desc-sub caption-2">{mod.summary}</div>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform var(--duration-fast) var(--motion-base)',
                          flexShrink: 0,
                          marginTop: '4px'
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {isOpen && (
                      <div className="module-drawer-details">
                        <div className="caption-3" style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-100)' }}>
                          الدروس والتدريبات العملية ({mod.duration}):
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-75)' }}>
                          {mod.lessons.map((lesson) => (
                            <div key={lesson.id} className="caption-2" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-main)' }}>
                              <span>• {lesson.title}</span>
                              <span dir="ltr" style={{ color: 'var(--color-text-subtle)' }}>{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
