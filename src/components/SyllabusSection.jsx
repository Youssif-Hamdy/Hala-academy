import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, Sparkles, Play, Clock, CheckCircle2, Lock, FileText } from 'lucide-react';
import { ACADEMY_DATA } from '../data/courseData';

export default function SyllabusSection() {
  const [expandedModule, setExpandedModule] = useState('01');
  const { openEnrollModal, showToast } = useApp();
  const { modules } = ACADEMY_DATA;

  const toggleModule = (num) => {
    setExpandedModule(expandedModule === num ? null : num);
  };

  const handleLessonPreviewClick = (lesson) => {
    if (lesson.isPreview) {
      const el = document.getElementById('free-preview');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      showToast(`جاري تشغيل المعاينة المجانية: ${lesson.title}`);
    } else {
      openEnrollModal('pro');
    }
  };

  return (
    <section id="syllabus" style={{ padding: '120px 0', background: 'var(--color-white)' }}>
      <div className="container">
        {/* Header */}
        <div className="syllabus-header">
          <div>
            <div className="section-label">
              <Sparkles size={16} />
              <span>المنهج التدريبي المعتمد</span>
            </div>
            <h2 className="section-title" style={{ marginBottom: '8px' }}>
              وحدات الكورس التفصيلية
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
              ست وحدات مصممة بمنهجية تدريجية تنقلكِ خطوة بخطوة من الصفر حتى الإتقان.
            </p>
          </div>

          <div style={{
            background: 'var(--color-primary-subtle)',
            padding: '10px 20px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-border)',
            fontSize: '14px',
            color: 'var(--color-primary)',
            fontWeight: '600'
          }}>
            تُفتح الدروس تدريجياً لضمان التطبيق العملي
          </div>
        </div>

        {/* Accordion List */}
        <div className="modules-list">
          {modules.map((mod) => {
            const isExpanded = expandedModule === mod.number;

            return (
              <div
                key={mod.number}
                className={`module-card ${isExpanded ? 'expanded' : ''}`}
              >
                {/* Header Row */}
                <div
                  className="module-summary-row"
                  onClick={() => toggleModule(mod.number)}
                >
                  <div className="module-num-title">
                    <span className="module-num font-luxury" dir="ltr">
                      {mod.number}
                    </span>
                    <div>
                      <div className="module-title-text">{mod.title}</div>
                      <div className="module-subtitle-text">{mod.summary}</div>
                    </div>
                  </div>

                  <div className="module-badge-meta">
                    <span style={{ fontSize: '13.5px', color: 'var(--color-text-subtle)', display: 'none' }}>
                      {mod.duration}
                    </span>
                    <div className="module-chevron">
                      <ChevronDown size={22} />
                    </div>
                  </div>
                </div>

                {/* Drawer Content */}
                {isExpanded && (
                  <div className="module-content-drawer">
                    {/* Key Takeaways */}
                    <div style={{
                      background: 'var(--color-white)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '18px 22px',
                      margin: '18px 0 14px'
                    }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '8px' }}>
                        أهم ما ستتقنينه في هذه الوحدة:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {mod.keyTakeaways.map((takeaway, tIdx) => (
                          <div key={tIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                            <CheckCircle2 size={15} color="var(--color-primary)" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lessons breakdown */}
                    <div className="lessons-table">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="lesson-row"
                          onClick={() => handleLessonPreviewClick(lesson)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="lesson-row-left">
                            {lesson.isPreview ? (
                              <Play size={16} color="var(--color-primary)" fill="var(--color-primary)" />
                            ) : (
                              <Lock size={15} color="var(--color-text-subtle)" />
                            )}
                            <span style={{ fontWeight: '500' }}>{lesson.title}</span>
                            {lesson.isPreview && (
                              <span className="lesson-badge-preview">معاينة مجانية</span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--color-text-subtle)' }}>
                            <Clock size={14} />
                            <span>{lesson.duration}</span>
                          </div>
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
    </section>
  );
}
