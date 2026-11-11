import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function BookingModal() {
  const {
    isBookingModalOpen,
    closeBookingModal,
    currentUser,
    openAuthModal,
    submitApplication
  } = useApp();

  const [name, setName] = useState('');
  const [currentChallenges, setCurrentChallenges] = useState('');
  const [courseGoal, setCourseGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedApp, setSubmittedApp] = useState(null);

  /* ملء الاسم تلقائياً من بيانات المستخدم */
  useEffect(() => {
    if (currentUser?.name && !name) setName(currentUser.name);
  }, [currentUser]);

  /* إغلاق بـ Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  /* ── Guard: يتطلب تسجيل الدخول ── */
  if (!currentUser) {
    return (
      <div className="modal-overlay" onClick={() => closeBookingModal()} role="dialog" aria-modal="true">
        <div className="luxury-modal-sheet booking-modal-slim" onClick={(e) => e.stopPropagation()}>
          <div className="luxury-modal-header">
            <div>
              <div className="luxury-modal-brand-tag caption-4">APPLICATION FORM · استمارة الالتحاق</div>
              <h3 className="luxury-modal-title title-2">طلب الانضمام لأكاديمية حلا سامي</h3>
            </div>
            <button onClick={() => closeBookingModal()} className="luxury-modal-close" aria-label="إغلاق">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="luxury-modal-body-scroll">
            <div className="checkout-auth-required-wrap">
              <div className="checkout-auth-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <h4 className="title-2 checkout-auth-title">تقديم الاستمارة يتطلب تسجيل الدخول</h4>
              <p className="body-3 checkout-auth-desc">سجّلي دخولكِ أو أنشئي حساباً جديداً لتقديم استمارة الالتحاق الرسمية.</p>
              <button
                onClick={() => { closeBookingModal(); openAuthModal('login'); }}
                className="btn-luxury-primary button-md checkout-auth-login-btn"
              >
                تسجيل الدخول / إنشاء حساب
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const countWords = (t) => t.trim().split(/\s+/).filter(Boolean).length;
  const challengesWords = countWords(currentChallenges);
  const goalWords = countWords(courseGoal);

  const handleClose = () => {
    setSubmittedApp(null);
    setErrorMessage('');
    closeBookingModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) { setErrorMessage('الاسم مطلوب'); return; }
    if (challengesWords < 50) {
      setErrorMessage(`التحديات قصيرة جداً — ${challengesWords}/50 كلمة على الأقل`); return;
    }
    if (challengesWords > 500) {
      setErrorMessage(`التحديات تجاوزت الحد الأقصى (${challengesWords}/500 كلمة)`); return;
    }
    if (goalWords < 50) {
      setErrorMessage(`الهدف قصير جداً — ${goalWords}/50 كلمة على الأقل`); return;
    }
    if (goalWords > 500) {
      setErrorMessage(`الهدف تجاوز الحد الأقصى (${goalWords}/500 كلمة)`); return;
    }

    setLoading(true);
    try {
      const app = await submitApplication(name.trim(), currentChallenges.trim(), courseGoal.trim());
      setSubmittedApp(app || { name: name.trim() });
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage('لقد قدّمتِ استمارة مسبقاً — يحق لكل مستخدمة استمارة واحدة فقط.');
      } else {
        setErrorMessage(err.message || 'حدث خطأ، يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="luxury-modal-sheet booking-modal-slim" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="luxury-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/assets/images/hala-emblem.png" alt="Halla" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
            <div>
              <div className="luxury-modal-brand-tag caption-4">APPLICATION FORM · استمارة الالتحاق الرسمية</div>
              <h3 className="luxury-modal-title title-2">طلب الانضمام لأكاديمية حلا سامي</h3>
            </div>
          </div>
          <button onClick={handleClose} className="luxury-modal-close" aria-label="إغلاق">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="luxury-modal-body-scroll">
          {submittedApp ? (
            /* ── شاشة النجاح ── */
            <div className="booking-success-box">
              <div className="booking-success-icon" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h4 className="heading-3" style={{ color: 'var(--color-noir)', marginBottom: '8px' }}>تم استلام استمارتكِ بنجاح!</h4>
              <p className="body-2" style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 20px', lineHeight: 1.8 }}>
                شكراً لكِ يا <strong>{submittedApp?.name || name}</strong>. سيتم مراجعة استمارتكِ والتواصل معكِ قريباً.
              </p>
              {submittedApp?.id && (
                <div className="booking-summary-pill caption-2">
                  <span>رقم الطلب: <code>{submittedApp.id}</code></span>
                  <span className="cert-dot">·</span>
                  <span>قيد المراجعة</span>
                </div>
              )}
              <div style={{ marginTop: '24px' }}>
                <button onClick={handleClose} className="btn-luxury-primary button-md">العودة للرئيسية</button>
              </div>
            </div>
          ) : (
            /* ── الاستمارة — عمود واحد نظيف ── */
            <form onSubmit={handleSubmit} className="booking-slim-form">

              {errorMessage && (
                <div className="auth-error-banner caption-1" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* الاسم */}
              <div className="auth-field-group">
                <label className="luxury-field-label">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتبي اسمكِ كما ترغبين أن يظهر في الشهادة"
                  className="luxury-text-input"
                />
              </div>

              {/* التحديات */}
              <div className="auth-field-group">
                <div className="booking-label-row">
                  <label className="luxury-field-label">أبرز التحديات في المكياج</label>
                  <span className={`caption-3 ${challengesWords >= 50 && challengesWords <= 500 ? 'word-count-valid' : 'word-count-pending'}`}>
                    {challengesWords} / 500 كلمة
                  </span>
                </div>
                <textarea
                  rows={5}
                  required
                  value={currentChallenges}
                  onChange={(e) => setCurrentChallenges(e.target.value)}
                  placeholder="صفي التحديات التي تواجهينها — اختيار الأساس، تثبيت المكياج، دمج الألوان... (50 كلمة على الأقل)"
                  className="luxury-text-input booking-textarea"
                />
              </div>

              {/* الهدف */}
              <div className="auth-field-group">
                <div className="booking-label-row">
                  <label className="luxury-field-label">هدفكِ من هذا الكورس</label>
                  <span className={`caption-3 ${goalWords >= 50 && goalWords <= 500 ? 'word-count-valid' : 'word-count-pending'}`}>
                    {goalWords} / 500 كلمة
                  </span>
                </div>
                <textarea
                  rows={5}
                  required
                  value={courseGoal}
                  onChange={(e) => setCourseGoal(e.target.value)}
                  placeholder="صفي ما تأملين تحقيقه — إتقان المكياج الشخصي، العمل كخبيرة تجميل... (50 كلمة على الأقل)"
                  className="luxury-text-input booking-textarea"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-luxury-primary button-md booking-submit-btn"
              >
                {loading ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span className="auth-spinner" aria-hidden="true"></span>
                    <span>جاري إرسال الاستمارة...</span>
                  </span>
                ) : 'تأكيد وتقديم استمارة الالتحاق'}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
