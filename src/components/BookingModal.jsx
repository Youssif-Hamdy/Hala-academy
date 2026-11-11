import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function BookingModal() {
  const { isBookingModalOpen, closeBookingModal, currentUser, openAuthModal, submitApplication, selectedTrack } = useApp();

  const [name, setName] = useState('');
  const [currentChallenges, setCurrentChallenges] = useState('');
  const [courseGoal, setCourseGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedApp, setSubmittedApp] = useState(null);

  useEffect(() => {
    if (currentUser?.name) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  if (!isBookingModalOpen) return null;

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const challengesWords = countWords(currentChallenges);
  const goalWords = countWords(courseGoal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!currentUser) {
      setErrorMessage('يجب تسجيل الدخول أولاً لتقديم استمارة الالتحاق');
      return;
    }

    if (!name.trim()) {
      setErrorMessage('الاسم مطلوب');
      return;
    }

    if (challengesWords < 50) {
      setErrorMessage(`أبرز التحديات قصير جداً (${challengesWords}/50 كلمة على الأقل). يرجى توضيح التحديات بمزيد من التفصيل.`);
      return;
    }

    if (challengesWords > 500) {
      setErrorMessage(`أبرز التحديات تجاوز الحد الأقصى (${challengesWords}/500 كلمة).`);
      return;
    }

    if (goalWords < 50) {
      setErrorMessage(`هدف الكورس قصير جداً (${goalWords}/50 كلمة على الأقل). يرجى توضيح هدفك بمزيد من التفصيل.`);
      return;
    }

    if (goalWords > 500) {
      setErrorMessage(`هدف الكورس تجاوز الحد الأقصى (${goalWords}/500 كلمة).`);
      return;
    }

    setLoading(true);
    try {
      const app = await submitApplication(name.trim(), currentChallenges.trim(), courseGoal.trim());
      setSubmittedApp(app);
    } catch (err) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تقديم الاستمارة، يرجى مراجعة البيانات.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmittedApp(null);
    setErrorMessage('');
    closeBookingModal();
  };

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div 
        className="luxury-modal-sheet large booking-modal-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="luxury-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/assets/images/hala-emblem.png" 
              alt="Halla Emblem" 
              style={{ width: '36px', height: '36px', objectFit: 'contain' }}
            />
            <div>
              <div className="luxury-modal-brand-tag caption-4">
                استمارة الحجز والالتحاق الرسمية · APPLICATION FORM
              </div>
              <h3 className="luxury-modal-title title-2">
                طلب الانضمام لأكاديمية حلا سامي
              </h3>
            </div>
          </div>

          <button 
            onClick={handleClose} 
            className="luxury-modal-close"
            aria-label="إغلاق"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="luxury-modal-body-scroll booking-modal-body">
          {submittedApp ? (
            /* Success confirmation screen */
            <div className="booking-success-box">
              <div className="booking-success-icon" aria-hidden="true">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>

              <h4 className="heading-3" style={{ color: 'var(--color-noir)', marginBottom: '8px' }}>
                تم استلام استمارتكِ بنجاح!
              </h4>

              <p className="body-2" style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.8 }}>
                شكراً لكِ يا <strong>{submittedApp.name || name}</strong>. تم تسجيل طلب التحاقكِ برقم مرجعي رسمي، وستتلقين رسالة تأكيد عبر بريدكِ المسجل مع تفاصيل متابعة التطبيقات العملية.
              </p>

              <div className="booking-summary-pill caption-2">
                <span>رقم الطلب: <code>{submittedApp.id}</code></span>
                <span className="cert-dot">·</span>
                <span>الحالة: قيد المراجعة الفنية</span>
              </div>

              <div style={{ marginTop: '32px' }}>
                <button
                  onClick={handleClose}
                  className="btn-luxury-primary button-md"
                >
                  العودة للرئيسية وتصفح المنهج
                </button>
              </div>
            </div>
          ) : (
            /* Form screen */
            <div className="booking-form-wrapper">
              {!currentUser && (
                <div className="booking-auth-required-banner">
                  <div>
                    <h5 className="title-3" style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>
                      تنبيه: يتطلب تقديم الطلب تسجيل الدخول
                    </h5>
                    <p className="caption-1" style={{ color: 'var(--color-text-muted)' }}>
                      حسب معايير المنصة، ترتبط كل استمارة بحساب الطالبة لتوثيق الشهادة ومتابعة الملاحظات.
                    </p>
                  </div>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="btn-luxury-primary button-sm"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    تسجيل الدخول / إنشاء حساب
                  </button>
                </div>
              )}

              {errorMessage && (
                <div className="auth-error-banner caption-1" role="alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="booking-fields-form">
                <div className="auth-field-group">
                  <label className="luxury-field-label title-4">الاسم الكامل للطالبة</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اكتبي اسمكِ كما ترغبين أن يظهر في الشهادة المعتمدة"
                    className="luxury-text-input"
                  />
                </div>

                <div className="auth-field-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label className="luxury-field-label title-4">
                      أبرز التحديات التي تواجهينها في المكياج
                    </label>
                    <span className={`caption-3 ${challengesWords >= 50 && challengesWords <= 500 ? 'word-count-valid' : 'word-count-pending'}`}>
                      {challengesWords} / 500 كلمة (الحد الأدنى 50 كلمة)
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={currentChallenges}
                    onChange={(e) => setCurrentChallenges(e.target.value)}
                    placeholder="مثال: أواجه صعوبة في تحديد الأندرتون واختيار درجة كريم الأساس المناسبة، كما أعاني من تكتل الكونسيلر تحت العين ودمج ظلال العيون بسلاسة دون خطوط حادة، وأرغب في معرفة أسرار تثبيت المكياج ليدوم في المناسبات الطويلة..."
                    className="luxury-text-input booking-textarea"
                  />
                  <span className="caption-4" style={{ color: 'var(--color-text-subtle)', marginTop: '4px' }}>
                    نصيحة: صفي نوع بشرتكِ، والتكنيكات التي تجدين صعوبة في إتقانها لنخصص لكِ التوجيه المناسب.
                  </span>
                </div>

                <div className="auth-field-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label className="luxury-field-label title-4">
                      الهدف الذي تسعين لتحقيقه من هذا الكورس
                    </label>
                    <span className={`caption-3 ${goalWords >= 50 && goalWords <= 500 ? 'word-count-valid' : 'word-count-pending'}`}>
                      {goalWords} / 500 كلمة (الحد الأدنى 50 كلمة)
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={courseGoal}
                    onChange={(e) => setCourseGoal(e.target.value)}
                    placeholder="مثال: هدفي إتقان المكياج اليومي والسواريه لنفسي بأعلى درجات الاحترافية، والوصول إلى مستوى يؤهلني للعمل كخبيرة تجميل حرة واستقبال العميلات في صالوني الخاص بثقة واكتساب سمعة طيبة في هذا المجال..."
                    className="luxury-text-input booking-textarea"
                  />
                  <span className="caption-4" style={{ color: 'var(--color-text-subtle)', marginTop: '4px' }}>
                    صفي رؤيتكِ وما تأملين تحقيقه بعد إتمام الدورة واجتياز التطبيقات العملية.
                  </span>
                </div>

                <div className="booking-submit-row">
                  <button
                    type="submit"
                    disabled={loading || !currentUser}
                    className="btn-luxury-primary button-md"
                    style={{ minWidth: '220px' }}
                  >
                    {loading ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className="auth-spinner" aria-hidden="true"></span>
                        <span>جاري إرسال الطلب...</span>
                      </span>
                    ) : (
                      'تأكيد وتقديم استمارة الالتحاق'
                    )}
                  </button>

                  <div className="caption-3" style={{ color: 'var(--color-text-subtle)' }}>
                    سيتم إرسال نسخة من طلبكِ فورياً إلى خادم الأكاديمية
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
