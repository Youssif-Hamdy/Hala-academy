import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_DATA } from '../data/courseData';
import { buildWhatsAppEnrollmentUrl } from '../services/api';
import { CheckCircle2, ExternalLink, ShieldAlert, Clock } from 'lucide-react';

export default function CheckoutModal() {
  const {
    isEnrollModalOpen,
    closeEnrollModal,
    selectedTrack,
    setSelectedTrack,
    currentUser,
    createBooking,
    openLmsModal,
    showToast,
    openAuthModal
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [wasDuplicate, setWasDuplicate] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name && !fullName) setFullName(currentUser.name);
      if (currentUser.email && !currentUser.email.endsWith('@student.hala.academy') && !email) {
        setEmail(currentUser.email);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeEnrollModal]);

  if (!isEnrollModalOpen) return null;

  /* ── handleClose مرفوع فوق الـ guard عشان يكون متاح فيه ── */
  const handleClose = () => {
    setSubmittedRequest(null);
    setWasDuplicate(false);
    setErrorMessage('');
    closeEnrollModal();
  };

  /* ── Guard: يتطلب تسجيل الدخول ── */
  if (!currentUser) {
    return (
      <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
        <div className="luxury-modal-sheet" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="luxury-modal-header">
            <div className="luxury-modal-header-text">
              <div dir="ltr" className="luxury-modal-brand-tag">HALLA ACADEMY · ENROLLMENT</div>
              <h3 className="luxury-modal-title">طلب الاشتراك وتفعيل الكورس</h3>
            </div>
            <button onClick={handleClose} className="luxury-modal-close" aria-label="إغلاق">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Body: رسالة تسجيل الدخول */}
          <div className="luxury-modal-body-scroll">
            <div className="checkout-auth-required-wrap">
              <div className="checkout-auth-icon" aria-hidden="true">
                <ShieldAlert size={40} color="var(--color-primary)" />
              </div>
              <h4 className="title-2 checkout-auth-title">يتطلب الاشتراك تسجيل الدخول أولاً</h4>
              <p className="body-3 checkout-auth-desc">
                يرجى تسجيل الدخول أو إنشاء حساب جديد للمتابعة وتسجيل طلب اشتراككِ في الكورس.
              </p>
              <button
                onClick={() => { handleClose(); openAuthModal('login'); }}
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

  const currentTrack =
    ACADEMY_DATA.tracks.find((t) => t.id === selectedTrack) || ACADEMY_DATA.tracks[1];

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone) {
      setErrorMessage('يرجى استكمال الاسم بالكامل وبريد Gmail ورقم الهاتف');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('يرجى إدخال بريد Gmail صحيح مرتبط بحساب Google لتفعيل مشاهدة فيديوهات YouTube Private.');
      return;
    }

    setIsSubmitting(true);
    try {
      // POST /api/bookings — { name, phone, email }
      const booking = await createBooking(cleanName, cleanPhone, cleanEmail);

      setSubmittedRequest({
        ...booking,
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        courseName: currentTrack.title
      });

      // فتح WhatsApp بالرسالة المجهزة على الرقم الليبي
      const waUrl = buildWhatsAppEnrollmentUrl({
        courseName: currentTrack.title,
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone
      });
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage('لديكِ طلب حجز قيد المراجعة بالفعل. يمكنكِ التواصل معنا عبر WhatsApp لمتابعة طلبكِ.');
      } else {
        setErrorMessage(err.message || 'حدث خطأ أثناء تسجيل الطلب، يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrlForSubmitted = submittedRequest
    ? buildWhatsAppEnrollmentUrl({
        courseName: submittedRequest.courseName || currentTrack?.title || '',
        fullName: submittedRequest.fullName || fullName,
        email: submittedRequest.email || email,
        phone: submittedRequest.phone || phone
      })
    : '#';

  const previewMessageText = [
    'السلام عليكم، أرغب في الاشتراك في الكورس التالي:',
    `اسم الكورس: ${submittedRequest?.courseName || currentTrack?.title || ''}`,
    `الاسم: ${submittedRequest?.fullName || fullName || '[اسم الطالبة]'}`,
    `البريد الإلكتروني: ${submittedRequest?.email || email || '[البريد]'}`,
    `رقم الهاتف: ${submittedRequest?.phone || phone || '[رقم الهاتف]'}`,
    'من فضلكم أرسلوا لي تفاصيل الدفع.'
  ].join('\n');

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="luxury-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="luxury-modal-header">
          <div className="luxury-modal-header-text">
            <div dir="ltr" className="luxury-modal-brand-tag">
              HALLA ACADEMY · ENROLLMENT
            </div>
            <h3 className="luxury-modal-title">
              {submittedRequest ? 'متابعة طلب الاشتراك عبر WhatsApp' : 'طلب الاشتراك وتفعيل الكورس'}
            </h3>
          </div>

          <button onClick={handleClose} className="luxury-modal-close" aria-label="إغلاق">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="luxury-modal-body-scroll">
          {submittedRequest ? (
            <div className="enrollment-submitted-view">
              <div className="enrollment-status-banner">
                <CheckCircle2 size={28} color="var(--color-primary)" />
                <div>
                  <h4 className="title-2" style={{ color: 'var(--color-noir)', marginBottom: '4px' }}>
                    {wasDuplicate
                      ? 'لديكِ طلب اشتراك مسجل مسبقاً لهذا الكورس'
                      : 'تم تسجيل بيانات اشتراككِ وتجهيز رسالة WhatsApp!'}
                  </h4>
                  <p className="body-5" style={{ color: 'var(--color-text-muted)' }}>
                    لا يُعتبر الطلب مدفوعاً بمجرد فتح WhatsApp. يرجى إرسال الرسالة المجهزة لإتمام الدفع مع الإدارة، وسيتم بعدها إضافة بريدكِ (<strong>{submittedRequest.email}</strong>) إلى فيديوهات YouTube Private وتفعيل الكورس في حسابكِ.
                  </p>
                </div>
              </div>

              {/* Live Status Badges Row */}
              <div className="enrollment-three-status-grid">
                <div className="enrollment-status-box">
                  <span className="caption-4" style={{ color: 'var(--color-text-subtle)' }}>حالة الطلب (requestStatus)</span>
                  <strong className={`status-pill status-${submittedRequest.requestStatus}`}>
                    {submittedRequest.requestStatus === 'approved'
                      ? 'مقبول (approved)'
                      : submittedRequest.requestStatus === 'rejected'
                      ? 'مرفوض (rejected)'
                      : 'قيد المراجعة (pending)'}
                  </strong>
                </div>

                <div className="enrollment-status-box">
                  <span className="caption-4" style={{ color: 'var(--color-text-subtle)' }}>حالة الدفع (paymentStatus)</span>
                  <strong className={`status-pill status-${submittedRequest.paymentStatus}`}>
                    {submittedRequest.paymentStatus === 'paid'
                      ? 'تم الدفع (paid)'
                      : submittedRequest.paymentStatus === 'rejected'
                      ? 'مرفوض (rejected)'
                      : 'بانتظار الدفع (pending)'}
                  </strong>
                </div>

                <div className="enrollment-status-box">
                  <span className="caption-4" style={{ color: 'var(--color-text-subtle)' }}>صلاحية الكورس (accessStatus)</span>
                  <strong className={`status-pill status-${submittedRequest.accessStatus}`}>
                    {submittedRequest.accessStatus === 'active'
                      ? 'مفعّل (active)'
                      : submittedRequest.accessStatus === 'revoked'
                      ? 'ملغى (revoked)'
                      : 'غير مفعّل (not_active)'}
                  </strong>
                </div>
              </div>

              {/* Pre-filled WhatsApp Message Preview */}
              <div className="whatsapp-preview-card">
                <div className="caption-3" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>
                  رسالة WhatsApp المجهزة للإرسال:
                </div>
                <pre className="whatsapp-message-pre">{previewMessageText}</pre>
              </div>

              {/* Actions */}
              <div className="enrollment-submitted-actions">
                <a
                  href={whatsappUrlForSubmitted}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-send button-md"
                >
                  <span>فتح WhatsApp وإرسال طلب الاشتراك</span>
                  <ExternalLink size={17} />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    openLmsModal();
                  }}
                  className="btn-luxury-primary button-md"
                >
                  <Clock size={17} />
                  <span>متابعة حالة الطلب في حسابي («كورساتي»)</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRequest} className="checkout-two-col-grid">
              {/* Left / Form Column */}
              <div className="checkout-form-side">
                {errorMessage && (
                  <div className="auth-error-banner caption-1" role="alert">
                    <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Step 1: Course Selection (Auto-selected) */}
                <div>
                  <label className="luxury-field-label">
                    1. الكورس المختار تلقائياً (يمكنكِ التبديل):
                  </label>
                  <div className="modal-track-selector-grid">
                    {ACADEMY_DATA.tracks.map((t) => {
                      const isActive = selectedTrack === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTrack(t.id)}
                          className={`modal-track-card-opt ${isActive ? 'active' : ''}`}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '14.5px', color: isActive ? '#7A1C2E' : '#1A1A1A' }}>
                              {t.title}
                            </div>
                            <div style={{ fontSize: '12.5px', color: '#7A6568', marginTop: '3px' }}>
                              {t.duration}
                            </div>
                          </div>
                          <span
                            className="modal-track-check-dot"
                            aria-hidden="true"
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: isActive ? '5px solid #7A1C2E' : '1.5px solid #D5C5C7',
                              background: '#FFFFFF',
                              flexShrink: 0
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Student Details */}
                <div>
                  <label className="luxury-field-label">
                    2. الاسم بالكامل (كما يظهر في الشهادة وطلب الاشتراك)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="اكتبي اسمكِ الثلاثي بالكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="luxury-text-input"
                  />
                </div>

                <div>
                  <label className="luxury-field-label">
                    3. بريد Gmail المرتبط بحساب Google (لمشاهدة فيديوهات YouTube Private)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="luxury-text-input"
                    dir="ltr"
                  />
                  <span className="caption-4" style={{ color: 'var(--color-primary)', display: 'block', marginTop: '4px' }}>
                    مهم: سيتم إضافة هذا البريد تحديداً إلى قائمة المشاهدة المسموح بها لفيديوهات الكورس على YouTube بعد تأكيد الدفع.
                  </span>
                </div>

                <div>
                  <label className="luxury-field-label">
                    4. رقم الهاتف (المرتبط بـ WhatsApp للتواصل وتأكيد الدفع)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="luxury-text-input"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Right / Summary & Workflow Explanation Side */}
              <div className="checkout-summary-side">
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', color: '#7A1C2E', marginBottom: '12px' }}>
                    خطوات تفعيل الاشتراك
                  </div>

                  <div className="enrollment-workflow-steps">
                    <div className="workflow-step-item">
                      <span className="workflow-step-num">1</span>
                      <div>
                        <strong>إرسال بيانات الاشتراك</strong>
                        <p>يتم حفظ طلبكِ بحالة «قيد المراجعة» وتجهيز رسالة WhatsApp تلقائياً.</p>
                      </div>
                    </div>
                    <div className="workflow-step-item">
                      <span className="workflow-step-num">2</span>
                      <div>
                        <strong>الاتفاق على الدفع عبر WhatsApp</strong>
                        <p>تتفقين مع الإدارة على وسيلة التحويل المناسبة لكِ خارج الموقع.</p>
                      </div>
                    </div>
                    <div className="workflow-step-item">
                      <span className="workflow-step-num">3</span>
                      <div>
                        <strong>إضافة بريد Gmail وتفعيل الوصول</strong>
                        <p>يؤكد الأدمن الدفع، ويضيف بريد Gmail الخاص بكِ في YouTube Private، ثم يفعّل الكورس في حسابكِ فوراً.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit & Open WhatsApp Button */}
                <div className="checkout-actions-col">
                  {/* زر Submit الرئيسي — يسجّل الطلب ويفتح WhatsApp تلقائياً */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxury-primary button-md checkout-submit-btn"
                  >
                    {isSubmitting ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className="auth-spinner" aria-hidden="true"></span>
                        <span>جاري تسجيل الطلب...</span>
                      </span>
                    ) : (
                      <>
                        <span>تأكيد وإرسال طلب الاشتراك</span>
                        <ExternalLink size={16} />
                      </>
                    )}
                  </button>

                  {/* زر WhatsApp المباشر — بدون تسجيل، للتواصل الفوري */}
                  <a
                    href={`https://wa.me/218946122679`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-direct button-md"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.546 5.877L0 24l6.302-1.519A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.368l-.36-.213-3.733.9.939-3.629-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
                    </svg>
                    <span>تواصلي معنا عبر WhatsApp</span>
                  </a>

                  <div className="caption-4 checkout-actions-hint">
                    بعد تأكيد الطلب، ستنفتح رسالة WhatsApp مجهزة تلقائياً لإتمام الدفع مع الإدارة
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
