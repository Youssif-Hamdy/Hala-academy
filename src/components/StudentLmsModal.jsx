import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_DATA } from '../data/courseData';

export default function StudentLmsModal() {
  const {
    isLmsModalOpen,
    closeLmsModal,
    enrolledStudent,
    toggleLessonCompleted,
    showToast
  } = useApp();

  const [activeLessonId, setActiveLessonId] = useState('1-1');
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'resources' | 'qa' | 'certificate'
  const [qaText, setQaText] = useState('');

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLmsModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeLmsModal]);

  if (!isLmsModalOpen) return null;

  const allLessons = ACADEMY_DATA.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleNumber: m.number, moduleTitle: m.title }))
  );

  const currentLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const isCurrentCompleted = enrolledStudent.completedLessonIds.includes(currentLesson.id);
  const totalLessons = allLessons.length;
  const completedCount = enrolledStudent.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const handleSendQa = (e) => {
    e.preventDefault();
    if (!qaText.trim()) return;
    showToast('تم إرسال استفساركِ إلى خبيرة التجميل حلا سامي بنجاح');
    setQaText('');
  };

  return (
    <div className="modal-overlay" onClick={closeLmsModal}>
      <div className="luxury-modal-sheet large" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="luxury-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span dir="ltr" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '20px', letterSpacing: '0.14em', color: '#7A1C2E' }}>
              HALLA <span style={{ fontWeight: 400, letterSpacing: '0.25em', fontSize: '11px', color: '#1A1A1A' }}>STUDENT PORTAL</span>
            </span>
            <span style={{ fontSize: '12px', background: 'var(--color-primary-subtle)', color: '#7A1C2E', padding: '2px 10px', borderRadius: '2px', border: '1px solid var(--color-border)' }}>
              بوابة المتدربات
            </span>
          </div>

          <button onClick={closeLmsModal} className="luxury-modal-close" aria-label="إغلاق">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Strip */}
        <div style={{
          background: '#FAF5F4',
          color: '#4A3A3D',
          padding: '0 32px',
          display: 'flex',
          gap: '24px',
          borderBottom: '1px solid var(--color-border)',
          overflowX: 'auto',
          flexShrink: 0
        }}>
          {[
            { id: 'lessons', label: 'مشاهدة الدروس' },
            { id: 'resources', label: 'الملفات والمرفقات PDF' },
            { id: 'qa', label: 'اسألي حلا سامي' },
            { id: 'certificate', label: 'الشهادة المعتمدة' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                color: activeTab === tab.id ? '#7A1C2E' : '#7A6568',
                fontWeight: activeTab === tab.id ? 600 : 400,
                fontSize: '14px',
                padding: '14px 4px',
                borderBottom: activeTab === tab.id ? '2px solid #7A1C2E' : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Main Area */}
        <div className="luxury-modal-body-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 900 ? '1fr 320px' : '1fr', minHeight: '480px' }}>
            {/* Main Content Side */}
            <div style={{ padding: '28px 32px', borderLeft: '1px solid var(--color-border)' }}>
              {activeTab === 'lessons' && (
                <div>
                  {/* Video Stage */}
                  <div style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    background: '#2B2325',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    marginBottom: '20px'
                  }}>
                    <img
                      src="/assets/images/masterclass-preview.jpg"
                      alt={currentLesson.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(26,26,26,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <button
                        onClick={() => showToast(`تشغيل الدرس: ${currentLesson.title}`)}
                        style={{
                          width: '68px',
                          height: '68px',
                          borderRadius: '50%',
                          background: '#7A1C2E',
                          border: '1px solid #C5899A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" style={{ marginRight: '-2px' }}>
                          <path d="M7 4.5v15l13-7.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Title & Complete Action */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#7A1C2E', fontWeight: 600 }}>
                        الوحدة {currentLesson.moduleNumber}: {currentLesson.moduleTitle}
                      </div>
                      <h4 style={{ fontSize: '19px', fontWeight: 600, margin: '4px 0 0', color: '#1A1A1A' }}>
                        {currentLesson.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        toggleLessonCompleted(currentLesson.id);
                        showToast(isCurrentCompleted ? 'تم إلغاء تحديد الدرس' : 'تم تسجيل إتمام الدرس');
                      }}
                      style={{
                        border: isCurrentCompleted ? '1px solid #16a34a' : '1px solid #7A1C2E',
                        color: isCurrentCompleted ? '#16a34a' : '#7A1C2E',
                        background: isCurrentCompleted ? '#f0fdf4' : '#FFFFFF',
                        padding: '8px 18px',
                        fontSize: '13px',
                        fontWeight: 600,
                        borderRadius: '2px',
                        cursor: 'pointer'
                      }}
                    >
                      {isCurrentCompleted ? 'تم إتمام هذا الدرس ✓' : 'تعليم الدرس كمكتمل'}
                    </button>
                  </div>

                  <p style={{ color: '#4A3A3D', fontSize: '15px', lineHeight: 1.85 }}>
                    في هذا الدرس التطبيقي، نستعرض بالخطوات الحية كيفية توزيع الأساس بدون تكتل، مع تصوير مقرب يُظهر حركة اليد وزاوية الفرشاة وكمية المستحضر المطلوبة بالضبط.
                  </p>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h4 style={{ fontSize: '19px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
                    المرفقات والكتيبات المرجعية (PDF)
                  </h4>
                  <p style={{ color: '#4A3A3D', fontSize: '14px', marginBottom: '20px' }}>
                    جميع المستندات متاحة للمشاهدة والتحميل المباشر.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      'دليل درجات الأندرتون ومطابقة الفاونديشن',
                      'قائمة أدوات المكياج الأساسية والبدائل الاقتصادية',
                      'نموذج عقد اتفاق حجز العرائس والمناسبات',
                      'جدول تعقيم وتجهيز شنطة المكياج للمحترفات'
                    ].map((title, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '14px 18px',
                          border: '1px solid var(--color-border)',
                          background: '#FFFFFF',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: '2px'
                        }}
                      >
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{title}</span>
                        <button
                          onClick={() => showToast(`جاري تحميل: ${title}`)}
                          style={{
                            border: '1px solid #7A1C2E',
                            color: '#7A1C2E',
                            padding: '6px 14px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            borderRadius: '2px'
                          }}
                        >
                          تحميل PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div>
                  <h4 style={{ fontSize: '19px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
                    اسألي خبيرة التجميل حلا سامي
                  </h4>
                  <p style={{ color: '#4A3A3D', fontSize: '14px', marginBottom: '20px' }}>
                    اكتبي استفساركِ حول أي تطبيق عملي لتحصلي على التوجيه المباشر.
                  </p>

                  <form onSubmit={handleSendQa} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <textarea
                      rows={5}
                      required
                      placeholder="اكتبي استفساركِ بالتفصيل هنا..."
                      value={qaText}
                      onChange={(e) => setQaText(e.target.value)}
                      className="luxury-text-input"
                      style={{ resize: 'vertical' }}
                    ></textarea>

                    <button
                      type="submit"
                      style={{
                        alignSelf: 'flex-start',
                        background: '#7A1C2E',
                        color: '#FFFFFF',
                        padding: '10px 24px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        borderRadius: '2px'
                      }}
                    >
                      إرسال الاستفسار
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'certificate' && (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{
                    border: '1px solid var(--color-accent-rose)',
                    padding: '36px 28px',
                    borderRadius: '2px',
                    background: '#FFFFFF',
                    maxWidth: '500px',
                    margin: '0 auto'
                  }}>
                    <div dir="ltr" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', letterSpacing: '0.2em', color: '#7A1C2E' }}>
                      HALLA ACADEMY
                    </div>
                    <h3 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: '22px', margin: '14px 0 4px', color: '#1A1A1A', fontWeight: 600 }}>
                      شهادة إتمام معتمدة
                    </h3>
                    <p style={{ fontSize: '13px', color: '#7A6568', margin: '0 0 12px' }}>
                      تشهد الأكاديمية بأن المتدربة:
                    </p>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: '#7A1C2E', margin: '0 0 12px' }}>
                      {enrolledStudent.name}
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#4A3A3D', lineHeight: 1.7, margin: 0 }}>
                      قد أتمت بنجاح متطلبات التدريب العملي المعتمد في الأكاديمية تحت إشراف خبيرة التجميل حلا سامي.
                    </p>
                    <div style={{
                      marginTop: '24px',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--color-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#7A6568'
                    }}>
                      <span>كود التحقق: HA-PRO-2026</span>
                      <span>توقيع: حلا سامي</span>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('جاري استخراج وتحميل الشهادة الرسمية بدقة الطباعة PDF')}
                    style={{
                      marginTop: '20px',
                      background: '#7A1C2E',
                      color: '#FFFFFF',
                      padding: '10px 24px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      borderRadius: '2px'
                    }}
                  >
                    تحميل الشهادة بصيغة PDF
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Playlist */}
            <div style={{ background: '#FAF5F4', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  <span>نسبة الإنجاز:</span>
                  <span style={{ color: '#7A1C2E' }}>{progressPercent}%</span>
                </div>
                <div style={{ height: '4px', background: '#E8CFD2', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#7A1C2E', width: `${progressPercent}%` }}></div>
                </div>
              </div>

              <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A1A' }}>
                قائمة الدروس:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '380px', overflowY: 'auto' }}>
                {allLessons.map((l) => {
                  const isSelected = l.id === activeLessonId;
                  const isDone = enrolledStudent.completedLessonIds.includes(l.id);

                  return (
                    <div
                      key={l.id}
                      onClick={() => {
                        setActiveLessonId(l.id);
                        setActiveTab('lessons');
                      }}
                      style={{
                        padding: '10px 12px',
                        border: isSelected ? '1px solid #7A1C2E' : '1px solid var(--color-border)',
                        background: isSelected ? '#FFFFFF' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '2px'
                      }}
                    >
                      <span style={{ fontWeight: isSelected ? 600 : 400, color: isSelected ? '#7A1C2E' : '#1A1A1A' }}>
                        {isDone ? '✓ ' : ''}{l.title}
                      </span>
                      <span dir="ltr" style={{ fontSize: '11px', color: '#7A6568' }}>{l.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
