import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_DATA } from '../data/courseData';
import { buildWhatsAppEnrollmentUrl, enrollmentsApi } from '../services/api';
import { Lock, CheckCircle2, Clock, XCircle, ExternalLink, PlayCircle, ShieldCheck } from 'lucide-react';

export default function StudentLmsModal() {
  const {
    isLmsModalOpen,
    closeLmsModal,
    currentUser,
    myEnrollments,
    refreshEnrollments,
    enrolledStudent,
    toggleLessonCompleted,
    openEnrollModal,
    openAdminModal,
    showToast
  } = useApp();

  const [activeLessonId, setActiveLessonId] = useState('1-1');
  const [activeTab, setActiveTab] = useState('my-courses'); // 'my-courses' | 'lessons' | 'resources' | 'certificate'
  const [backendAccessVerified, setBackendAccessVerified] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLmsModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeLmsModal]);

  useEffect(() => {
    if (isLmsModalOpen) {
      refreshEnrollments();
    }
  }, [isLmsModalOpen]);

  // Rule 8: Verify accessStatus === 'active' from the backend/service before unlocking lesson content
  const activeEnrollment = myEnrollments.find((e) => e.accessStatus === 'active') || null;

  useEffect(() => {
    let cancelled = false;
    async function checkAccess() {
      if (!activeEnrollment) {
        setBackendAccessVerified(false);
        return;
      }
      try {
        const res = await enrollmentsApi.verifyLessonAccess(activeEnrollment.courseId, {
          email: activeEnrollment.email,
          userId: activeEnrollment.userId
        });
        if (!cancelled) {
          setBackendAccessVerified(Boolean(res.accessGranted));
        }
      } catch {
        if (!cancelled) {
          setBackendAccessVerified(false);
        }
      }
    }
    checkAccess();
    return () => {
      cancelled = true;
    };
  }, [activeEnrollment]);

  if (!isLmsModalOpen) return null;

  const isCourseUnlocked = Boolean(activeEnrollment && backendAccessVerified);

  const allLessons = ACADEMY_DATA.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleNumber: m.number, moduleTitle: m.title }))
  );

  const currentLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const isCurrentCompleted = enrolledStudent.completedLessonIds.includes(currentLesson.id);
  const totalLessons = allLessons.length;
  const completedCount = enrolledStudent.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="modal-overlay" onClick={closeLmsModal} role="dialog" aria-modal="true">
      <div className="luxury-modal-sheet large" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="luxury-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span dir="ltr" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '20px', letterSpacing: '0.14em', color: '#7A1C2E' }}>
              HALLA <span style={{ fontWeight: 400, letterSpacing: '0.25em', fontSize: '11px', color: '#1A1A1A' }}>STUDENT PORTAL</span>
            </span>
            <span style={{ fontSize: '12px', background: 'var(--color-primary-subtle)', color: '#7A1C2E', padding: '2px 10px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              كورساتي وحالة الاشتراك
            </span>
            {currentUser?.role === 'ADMIN' && (
              <button
                type="button"
                onClick={() => {
                  closeLmsModal();
                  openAdminModal();
                }}
                className="btn-luxury-primary button-xsm"
                style={{ minHeight: '30px', padding: '0 12px' }}
              >
                لوحة تحكم طلبات الاشتراك (الأدمن)
              </button>
            )}
          </div>

          <button onClick={closeLmsModal} className="luxury-modal-close" aria-label="إغلاق">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Strip */}
        <div className="lms-tabs-bar">
          {[
            { id: 'my-courses', label: 'طلبات الاشتراك وكورساتي', locked: false },
            { id: 'lessons', label: 'مشاهدة دروس الكورس (YouTube Private)', locked: !isCourseUnlocked },
            { id: 'resources', label: 'الملفات والمرفقات PDF', locked: !isCourseUnlocked },
            { id: 'certificate', label: 'الشهادة المعتمدة', locked: !isCourseUnlocked }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                if (tab.locked) {
                  showToast('الدروس مقفلة حالياً: يتم فتح الدروس فور تأكيد الدفع وتفعيل بريد Gmail الخاص بكِ من الإدارة.');
                  setActiveTab('my-courses');
                  return;
                }
                setActiveTab(tab.id);
              }}
              className={`lms-tab-btn ${activeTab === tab.id ? 'active' : ''} ${tab.locked ? 'locked' : ''}`}
            >
              {tab.locked && <Lock size={13} style={{ marginLeft: '5px' }} />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content Body */}
        <div className="luxury-modal-body-scroll">
          {activeTab === 'my-courses' && (
            <div style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <h4 className="title-1" style={{ color: 'var(--color-noir)' }}>
                    حالة طلبات الاشتراك وتفعيل الكورسات
                  </h4>
                  <p className="body-5" style={{ color: 'var(--color-text-muted)' }}>
                    تابعي حالة مراجعة طلبكِ، تأكيد الدفع، وتفعيل صلاحية المشاهدة على بريد Gmail الخاص بكِ.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    closeLmsModal();
                    openEnrollModal('pro');
                  }}
                  className="btn-luxury-primary button-sm"
                >
                  + تقديم طلب اشتراك جديد
                </button>
              </div>

              {myEnrollments.length === 0 ? (
                <div className="lms-empty-enrollments-box">
                  <Lock size={32} color="var(--color-primary)" />
                  <h5 className="title-2" style={{ marginTop: '10px', marginBottom: '6px' }}>
                    لا توجد طلبات اشتراك مسجلة حتى الآن
                  </h5>
                  <p className="body-5" style={{ color: 'var(--color-text-muted)', maxWidth: '460px', margin: '0 auto 18px' }}>
                    اختاري الكورس المناسب لكِ، املئي بياناتكِ وبريد Gmail الخاص بالمشاهدة، ثم تواصلي عبر WhatsApp لإتمام الدفع وتفعيل الحساب.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeLmsModal();
                      openEnrollModal('pro');
                    }}
                    className="btn-luxury-primary button-md"
                  >
                    اشتركي في الكورس الآن
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {myEnrollments.map((item) => {
                    const waUrl = buildWhatsAppEnrollmentUrl({
                      courseName: item.courseName,
                      fullName: item.fullName,
                      email: item.email,
                      phone: item.phone
                    });

                    return (
                      <div key={item.id} className="student-enrollment-card">
                        <div className="student-enrollment-header">
                          <div>
                            <span className="caption-4" style={{ color: 'var(--color-text-subtle)' }}>
                              تاريخ الطلب: {new Date(item.requestedAt).toLocaleDateString('ar-EG')}
                            </span>
                            <h5 className="title-2" style={{ color: 'var(--color-noir)', marginTop: '2px' }}>
                              {item.courseName}
                            </h5>
                            <div className="caption-2" style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>
                              الطالبة: <strong>{item.fullName}</strong> · بريد المشاهدة (YouTube Gmail): <code dir="ltr">{item.email}</code>
                            </div>
                          </div>

                          {item.accessStatus === 'active' ? (
                            <button
                              type="button"
                              onClick={() => setActiveTab('lessons')}
                              className="btn-luxury-primary button-sm"
                            >
                              <PlayCircle size={16} />
                              <span>الدخول لمشاهدة الدروس المفعّلة</span>
                            </button>
                          ) : (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-whatsapp-send button-sm"
                            >
                              <span>متابعة الدفع عبر WhatsApp</span>
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>

                        {/* 3 Status Columns */}
                        <div className="enrollment-three-status-grid" style={{ marginTop: '14px' }}>
                          <div className="enrollment-status-box">
                            <span className="caption-4" style={{ color: 'var(--color-text-subtle)' }}>1. حالة الطلب (requestStatus)</span>
                            <strong className={`status-pill status-${item.requestStatus}`}>
                              {item.requestStatus === 'approved' && <CheckCircle2 size={14} />}
                              {item.requestStatus === 'pending' && <Clock size={14} />}
                              {item.requestStatus === 'rejected' && <XCircle size={14} />}
                              <span>
                                {item.requestStatus === 'approved'
                                  ? 'تمت الموافقة (approved)'
                                  : item.requestStatus === 'rejected'
                                  ? 'مرفوض (rejected)'
                                  : 'قيد المراجعة (pending)'}
                              </span>
                            </strong>
                          </div>

                          <div className="enrollment-status-box">
                            <span className="caption-4" style={{ color: 'var(--color-text-subtle)' }}>2. حالة الدفع (paymentStatus)</span>
                            <strong className={`status-pill status-${item.paymentStatus}`}>
                              {item.paymentStatus === 'paid' && <CheckCircle2 size={14} />}
                              {item.paymentStatus === 'pending' && <Clock size={14} />}
                              {item.paymentStatus === 'rejected' && <XCircle size={14} />}
                              <span>
                                {item.paymentStatus === 'paid'
                                  ? 'تم تأكيد الدفع (paid)'
                                  : item.paymentStatus === 'rejected'
                                  ? 'مرفوض (rejected)'
                                  : 'بانتظار الدفع (pending)'}
                              </span>
                            </strong>
                          </div>

                          <div className="enrollment-status-box">
                            <span className="caption-4" style={{ color: 'var(--color-text-subtle)' }}>3. صلاحية المشاهدة (accessStatus)</span>
                            <strong className={`status-pill status-${item.accessStatus}`}>
                              {item.accessStatus === 'active' ? <ShieldCheck size={14} /> : <Lock size={14} />}
                              <span>
                                {item.accessStatus === 'active'
                                  ? 'مفعّل للمشاهدة (active)'
                                  : item.accessStatus === 'revoked'
                                  ? 'تم إلغاء الوصول (revoked)'
                                  : 'بانتظار التفعيل (not_active)'}
                              </span>
                            </strong>
                          </div>
                        </div>

                        {item.adminNotes && (
                          <div className="enrollment-admin-note-banner caption-2">
                            <strong>ملاحظة الإدارة:</strong> {item.adminNotes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Rule 8 Protection: Never render lesson URLs or video content unless isCourseUnlocked is true */}
          {activeTab !== 'my-courses' && !isCourseUnlocked && (
            <div style={{ padding: '48px 32px', textAlign: 'center' }}>
              <Lock size={40} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
              <h4 className="heading-5" style={{ marginBottom: '8px' }}>
                محتوى الدروس محمي ومخصص للمشتركات المفعّل حسابهن فقط
              </h4>
              <p className="body-5" style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 20px' }}>
                يتم فتح الدروس تلقائياً بعد تأكيد الدفع وإضافة بريد Gmail الخاص بكِ إلى قائمة المشاهدة المسموح بها لفيديوهات YouTube Private من قِبل الإدارة.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('my-courses')}
                className="btn-luxury-primary button-sm"
              >
                عرض حالة طلب الاشتراك
              </button>
            </div>
          )}

          {activeTab !== 'my-courses' && isCourseUnlocked && (
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 900 ? '1fr 320px' : '1fr', minHeight: '460px' }}>
              {/* Main Content Side */}
              <div style={{ padding: '28px 32px', borderLeft: '1px solid var(--color-border)' }}>
                {activeTab === 'lessons' && (
                  <div>
                    <div className="youtube-private-verified-banner caption-2">
                      <ShieldCheck size={16} color="#15803d" />
                      <span>
                        صلاحية المشاهدة مفعّلة لبريدكِ (<code dir="ltr">{activeEnrollment.email}</code>) على فيديوهات YouTube Private
                      </span>
                    </div>

                    {/* Video Stage */}
                    <div style={{
                      position: 'relative',
                      aspectRatio: '16/9',
                      background: '#2B2325',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '20px'
                    }}>
                      <video
                        src="/assets/videos/free-trial-section.MP4"
                        poster="/assets/images/masterclass-preview.jpg"
                        controls
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
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
                        type="button"
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
                          borderRadius: '6px',
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
                      جميع المستندات متاحة للمشاهدة والتحميل المباشر للمشتركات المفعّل حسابهن.
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
                            borderRadius: '6px'
                          }}
                        >
                          <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{title}</span>
                          <button
                            type="button"
                            onClick={() => showToast(`جاري تحميل: ${title}`)}
                            style={{
                              border: '1px solid #7A1C2E',
                              color: '#7A1C2E',
                              padding: '6px 14px',
                              fontSize: '12.5px',
                              fontWeight: 600,
                              borderRadius: '6px'
                            }}
                          >
                            تحميل PDF
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'certificate' && (
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <div style={{
                      border: '1px solid var(--color-accent-rose)',
                      padding: '36px 28px',
                      borderRadius: '8px',
                      background: '#FFFFFF',
                      maxWidth: '500px',
                      margin: '0 auto'
                    }}>
                      <div dir="ltr" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', letterSpacing: '0.2em', color: '#7A1C2E' }}>
                        HALLA ACADEMY
                      </div>
                      <h3 style={{ fontSize: '22px', margin: '14px 0 4px', color: '#1A1A1A', fontWeight: 600 }}>
                        شهادة إتمام معتمدة
                      </h3>
                      <p style={{ fontSize: '13px', color: '#7A6568', margin: '0 0 12px' }}>
                        تشهد الأكاديمية بأن المتدربة:
                      </p>
                      <div style={{ fontSize: '20px', fontWeight: 600, color: '#7A1C2E', margin: '0 0 12px' }}>
                        {activeEnrollment?.fullName || enrolledStudent.name}
                      </div>
                      <p style={{ fontSize: '13.5px', color: '#4A3A3D', lineHeight: 1.7, margin: 0 }}>
                        قد أتمت بنجاح متطلبات التدريب العملي المعتمد في الأكاديمية تحت إشراف خبيرة التجميل حلا سامي.
                      </p>
                    </div>
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
                          borderRadius: '6px'
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
          )}
        </div>
      </div>
    </div>
  );
}
