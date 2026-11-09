import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_DATA } from '../data/courseData';

export default function CourseSection() {
  const { openEnrollModal, showToast } = useApp();
  const [expandedUnit, setExpandedUnit] = useState(null);
  const { modules } = ACADEMY_DATA;

  const toggleUnit = (num) => {
    setExpandedUnit(expandedUnit === num ? null : num);
  };

  return (
    <section id="course" className="course-section">
      <div className="course-container">
        {/* Course Intro */}
        <div className="course-intro-box">
          <div className="section-label">الكورس</div>
          <h2 className="section-title">مسارك في التعلّم</h2>
          <p style={{ margin: 0, color: '#4A3A3D', fontSize: '16.5px', lineHeight: '1.9' }}>
            دورة مكياج مسجّلة بالعربية، من الأساسيات إلى التقنيات الاحترافية. اختاري الطريق الأقرب لهدفك.
          </p>
        </div>

        {/* Tracks Grid (Exact Design from Reference) */}
        <div className="track-cards-grid">
          {/* Card 1: For You */}
          <div className="track-card-for-you">
            <div dir="ltr" className="track-tag-latin" style={{ color: '#7A1C2E' }}>
              FOR YOU
            </div>

            <h3 className="track-heading" style={{ color: '#1A1A1A' }}>
              أتعلّم لنفسي
            </h3>

            <p className="track-desc" style={{ color: '#4A3A3D' }}>
              مكياج يومي ولمسات تناسب ملامحك، من تحضير البشرة حتى الثبات، لتعتمدي على نفسك في كل مناسبة.
            </p>

            <div className="track-price-row">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 600, color: '#7A1C2E', lineHeight: 1 }}>
                1,850
              </span>
              <span style={{ fontSize: '15px', fontWeight: 500, color: '#4A3A3D' }}>
                جنيه مصري · وصول غير محدود
              </span>
            </div>

            <button
              onClick={() => openEnrollModal('self')}
              style={{
                background: '#FFFFFF',
                color: '#7A1C2E',
                border: '1px solid #7A1C2E',
                minHeight: '48px',
                padding: '0 24px',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: '2px',
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>اختاري مسار أتعلّم لنفسي</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 6l-6 6 6 6"></path>
              </svg>
            </button>
          </div>

          {/* Card 2: Professional */}
          <div className="track-card-pro">
            <div dir="ltr" className="track-tag-latin" style={{ color: '#F0D8D6' }}>
              PROFESSIONAL
            </div>

            <h3 className="track-heading" style={{ color: '#FFFFFF' }}>
              أطوّر مهاراتي للاحتراف
            </h3>

            <p className="track-desc" style={{ color: '#F0D8D6' }}>
              تقنيات احترافية، وتعامل مع العميلات، وأخلاقيات المهنة، لتطوّري مستواك بثقة.
            </p>

            <div className="track-price-row" style={{ borderColor: 'rgba(240, 216, 214, 0.3)' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1 }}>
                3,450
              </span>
              <span style={{ fontSize: '15px', fontWeight: 400, color: '#F0D8D6' }}>
                جنيه مصري · شهادة معتمدة
              </span>
            </div>

            <button
              onClick={() => openEnrollModal('pro')}
              style={{
                background: '#FFFFFF',
                color: '#7A1C2E',
                minHeight: '48px',
                padding: '0 24px',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: '2px',
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>اختاري مسار الاحتراف الكامل</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 6l-6 6 6 6"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Modules Header */}
        <div className="modules-wrapper">
          <div className="modules-header-row">
            <h3 style={{ margin: 0, fontFamily: "'El Messiri', serif", fontSize: '38px', lineHeight: 1.35, fontWeight: 700 }}>
              وحدات الكورس
            </h3>
            <div style={{ fontSize: '15px', color: '#4A3A3D' }}>
              ست وحدات تُفتح بالتدريج
            </div>
          </div>

          {/* 6 Modules Grid (01 - 06) */}
          <div className="modules-grid-two-col">
            {/* Column 1: 01, 02, 03 */}
            <div>
              {modules.slice(0, 3).map((mod) => {
                const isOpen = expandedUnit === mod.number;
                return (
                  <div key={mod.number} style={{ borderTop: '1px solid #C5899A' }}>
                    <div
                      className="module-item-row"
                      onClick={() => toggleUnit(mod.number)}
                      style={{ border: 'none' }}
                    >
                      <div dir="ltr" className="module-code-number">
                        {mod.number}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div className="module-title-main">{mod.title}</div>
                        <div className="module-desc-sub">{mod.summary}</div>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7A1C2E"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                          marginTop: '4px'
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {isOpen && (
                      <div className="module-drawer-details">
                        <div style={{ fontWeight: 600, color: '#7A1C2E', marginBottom: '8px' }}>
                          الدروس المسجلة ({mod.duration}):
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {mod.lessons.map((lesson) => (
                            <div key={lesson.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#4A3A3D' }}>
                              <span>• {lesson.title}</span>
                              <span dir="ltr" style={{ fontSize: '12px', opacity: 0.8 }}>{lesson.duration}</span>
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
              {modules.slice(3, 6).map((mod, idx) => {
                const isOpen = expandedUnit === mod.number;
                const isLast = idx === 2;
                return (
                  <div key={mod.number} style={{ borderTop: '1px solid #C5899A', borderBottom: isLast ? '1px solid #C5899A' : 'none' }}>
                    <div
                      className="module-item-row"
                      onClick={() => toggleUnit(mod.number)}
                      style={{ border: 'none' }}
                    >
                      <div dir="ltr" className="module-code-number">
                        {mod.number}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div className="module-title-main">{mod.title}</div>
                        <div className="module-desc-sub">{mod.summary}</div>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7A1C2E"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                          marginTop: '4px'
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {isOpen && (
                      <div className="module-drawer-details">
                        <div style={{ fontWeight: 600, color: '#7A1C2E', marginBottom: '8px' }}>
                          الدروس المسجلة ({mod.duration}):
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {mod.lessons.map((lesson) => (
                            <div key={lesson.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#4A3A3D' }}>
                              <span>• {lesson.title}</span>
                              <span dir="ltr" style={{ fontSize: '12px', opacity: 0.8 }}>{lesson.duration}</span>
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
