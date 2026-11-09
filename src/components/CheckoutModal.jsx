import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_DATA } from '../data/courseData';

export default function CheckoutModal() {
  const {
    isEnrollModalOpen,
    closeEnrollModal,
    selectedTrack,
    setSelectedTrack,
    setEnrolledStudent,
    openLmsModal,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('instapay');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeEnrollModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeEnrollModal]);

  if (!isEnrollModalOpen) return null;

  const currentTrack = ACADEMY_DATA.tracks.find((t) => t.id === selectedTrack) || ACADEMY_DATA.tracks[1];
  const basePrice = currentTrack.price;
  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const finalPrice = basePrice - discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'HALA10') {
      setDiscountPercent(10);
      showToast('تم تفعيل كود الخصم (خصم 10%)');
    } else {
      showToast('كود الخصم غير متاح حالياً');
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      showToast('يرجى استكمال البيانات المطلوبة');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setEnrolledStudent((prev) => ({
        ...prev,
        name: fullName,
        email: email,
        trackId: selectedTrack
      }));
      closeEnrollModal();
      showToast(`تم تأكيد اشتراككِ في ${currentTrack.title} بنجاح`);
      openLmsModal();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={closeEnrollModal}>
      <div className="luxury-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Minimal Luxury Header */}
        <div className="luxury-modal-header">
          <div>
            <div dir="ltr" className="luxury-modal-brand-tag">
              HALLA ACADEMY · CHECKOUT
            </div>
            <h3 className="luxury-modal-title">
              تأكيد الاشتراك وتفعيل الحساب
            </h3>
          </div>

          <button onClick={closeEnrollModal} className="luxury-modal-close" aria-label="إغلاق">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="luxury-modal-body-scroll">
          <form onSubmit={handleCheckoutSubmit} className="checkout-two-col-grid">
            {/* Form Column */}
            <div className="checkout-form-side">
              {/* Track Switcher */}
              <div>
                <label className="luxury-field-label">
                  المسار التعليمي المختار:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
                          <div style={{ fontSize: '12.5px', color: '#7A6568', marginTop: '2px' }}>
                            {t.duration}
                          </div>
                        </div>
                        <div style={{ textAlign: 'left', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '18px', color: isActive ? '#7A1C2E' : '#1A1A1A' }}>
                          {t.price.toLocaleString('ar-EG')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inputs */}
              <div>
                <label className="luxury-field-label">الاسم بالكامل (كما يظهر في الشهادة)</label>
                <input
                  type="text"
                  required
                  placeholder="الاسم الثلاثي"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="luxury-text-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="luxury-field-label">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="luxury-text-input"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="luxury-field-label">رقم الهاتف / واتساب</label>
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

              {/* Payment Methods */}
              <div>
                <label className="luxury-field-label">
                  طريقة الدفع:
                </label>
                <div className="payment-selector-strip">
                  {[
                    { id: 'instapay', label: 'إنستاباي (تحويل فوري)' },
                    { id: 'card', label: 'بطاقة ائتمان / ميزة' },
                    { id: 'wallet', label: 'محافظ إلكترونية كاش' },
                    { id: 'installments', label: 'تقسيط ميسر (تابي / فاليو)' }
                  ].map((pm) => (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`payment-method-pill ${paymentMethod === pm.id ? 'active' : ''}`}
                    >
                      {pm.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Code */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="كود الخصم (اختياري)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="luxury-text-input"
                  style={{ flexGrow: 1 }}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  style={{
                    border: '1px solid #7A1C2E',
                    color: '#7A1C2E',
                    padding: '0 20px',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    borderRadius: '2px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  تطبيق
                </button>
              </div>
            </div>

            {/* Order Summary Side Panel */}
            <div className="checkout-summary-side">
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', color: '#7A1C2E', marginBottom: '14px' }}>
                  تفاصيل الاشتراك
                </div>

                {/* Course Card Preview */}
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '16px',
                  borderRadius: '2px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: '#1A1A1A', marginBottom: '4px' }}>
                    {currentTrack.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#7A6568', lineHeight: 1.6 }}>
                    {currentTrack.code} · {currentTrack.duration}
                  </div>
                </div>

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#4A3A3D', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#7A1C2E' }}>✓</span>
                    <span>وصول غير محدود مدى الحياة</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#7A1C2E' }}>✓</span>
                    <span>جميع تحديثات الدروس الجديدة</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#7A1C2E' }}>✓</span>
                    <span>ملفات المرفقات والكتيبات (PDF)</span>
                  </div>
                  {currentTrack.id === 'pro' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#7A1C2E' }}>✓</span>
                      <span>شهادة إتمام معتمدة قابلة للتحقق</span>
                    </div>
                  )}
                </div>

                {/* Pricing Summary */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#4A3A3D', marginBottom: '6px' }}>
                    <span>قيمة المسار:</span>
                    <span>{basePrice.toLocaleString('ar-EG')} {currentTrack.currency}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#7A1C2E', marginBottom: '6px' }}>
                      <span>خصم الكود (10%):</span>
                      <span>- {discountAmount.toLocaleString('ar-EG')} {currentTrack.currency}</span>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--color-border)',
                    marginTop: '8px'
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>الإجمالي المطلوب:</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#7A1C2E' }}>
                      {finalPrice.toLocaleString('ar-EG')} <span style={{ fontSize: '14px', fontFamily: 'inherit' }}>{currentTrack.currency}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: '#7A1C2E',
                    color: '#FFFFFF',
                    border: 'none',
                    minHeight: '48px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s'
                  }}
                >
                  {isSubmitting ? (
                    <span>جاري التفعيل...</span>
                  ) : (
                    <>
                      <span>تأكيد الاشتراك وتفعيل الحساب</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M11 6l-6 6 6 6"></path>
                      </svg>
                    </>
                  )}
                </button>

                <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#7A6568', marginTop: '10px' }}>
                  ضمان رضا واكتمال جودة المحتوى · تفعيل فوري
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
