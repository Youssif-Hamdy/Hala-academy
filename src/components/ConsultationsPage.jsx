import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { consultationsApi } from '../services/api';
import { Clock, CheckCircle2, Video, Sparkles, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';

const PACKAGES = [
  {
    duration: 30,
    price: 20,
    title: 'جلسة سريعة ومركزة',
    subtitle: 'إجابات مباشرة على استفسارات محددة',
    badge: 'الأسرع والأخف',
    popular: false,
    features: [
      '30 دقيقة استشارة فردية ومباشرة',
      'فحص سريع لروتينكِ أو مستحضراتكِ الحالية',
      'إجابة مركزة على أسئلة محددة في المكياج',
      'جلسة فيديو أونلاين خاصة ومغلقة'
    ]
  },
  {
    duration: 60,
    price: 30,
    title: 'استشارة شاملة ومكثفة',
    subtitle: 'تحليل دقيق للملامح وتقنيات المكياج',
    badge: 'الأكثر طلباً واختياراً',
    popular: true,
    features: [
      'ساعة كاملة (60 دقيقة) تواصل مباشر مع حلا سامي',
      'تشخيص ملامح الوجه ورسمة العين المناسبة لكِ',
      'تحديد درجات الفاونديشن والكونسيلر والباليتات الأنسب لبشرتكِ',
      'نصائح تطبيقية وتصحيح للأخطاء الشائعة خطوة بخطوة',
      'توصيات بأفضل المنتجات وبدائلها الاقتصادية'
    ]
  },
  {
    duration: 120,
    price: 40,
    title: 'استشارة احترافية موسعة',
    subtitle: 'تطوير شامل للمهارات أو مشاريع التجميل',
    badge: 'أعلى قيمة تدريبية',
    popular: false,
    features: [
      'ساعتان (120 دقيقة) جلسة خاصة ومتكاملة',
      'مناسبة لتطوير مشاريعكِ وبناء شنطة الميكب الاحترافية',
      'توجيه عملي مباشر على ميكب المناسبات أو العمل مع العميلات',
      'مراجعة شاملة لجميع استفساراتكِ التقنية والمهنية',
      'خطة متابعة مخصصة بعد الجلسة'
    ]
  }
];

export default function ConsultationsPage() {
  const { currentUser, openAuthModal, showToast, navigateToHome } = useApp();

  const [selectedDuration, setSelectedDuration] = useState(60);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successResult, setSuccessResult] = useState(null);

  const selectedPkg = PACKAGES.find((p) => p.duration === selectedDuration) || PACKAGES[1];

  const handlePackageSelect = (duration) => {
    setSelectedDuration(duration);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('يرجى ملء جميع الحقول الأساسية (الاسم، الهاتف، البريد الإلكتروني).');
      return;
    }

    setLoading(true);
    try {
      const res = await consultationsApi.create({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        duration: selectedDuration,
        notes: formData.notes.trim() || undefined
      });

      setSuccessResult(res.consultation || res);
      showToast(res.message || 'تم تسجيل طلب الاستشارة بنجاح!');
    } catch (err) {
      console.error('Consultation booking error:', err);
      setErrorMsg(err.message || 'حدث خطأ أثناء إرسال طلب الاستشارة. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultations-page-wrapper">
      <div className="container consultations-page-container">
        {/* زر العودة للصفحة الرئيسية */}
        <div style={{ marginBottom: '20px' }}>
          <button
            type="button"
            onClick={navigateToHome}
            className="btn-luxury-text"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--color-primary)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-primary-subtle)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <span>← العودة للصفحة الرئيسية</span>
          </button>
        </div>

        {/* الهيدر التعريفي */}
        <header className="consultations-header">
          <div className="section-eyebrow caption-3">
            <span>جلسات خاصة ومباشرة</span>
          </div>
          <h1 className="heading-1 consultations-main-title">
            الاستشارات المدفوعة
          </h1>
          <p className="body-1 consultations-hero-desc">
            الاستشارات المدفوعة هي جلسات تواصل مباشرة مع حلا سامي، تتيح لكِ مناقشة جميع استفساراتكِ وأسئلتكِ المتعلقة بالمكياج والحصول على إجابات ونصائح متخصصة.
          </p>
          <div className="consultations-sub-pill">
            <Video size={16} />
            <span>اختاري المدة المناسبة لكِ (30 دقيقة، ساعة أو ساعتين)، واحصلي على استشارة فردية عبر اجتماع أونلاين.</span>
          </div>
        </header>

        {/* عرض نجاح التسجيل */}
        {successResult ? (
          <div className="consultation-success-card">
            <div className="consultation-success-icon">
              <CheckCircle2 size={48} strokeWidth={1.8} />
            </div>
            <h2 className="heading-2" style={{ color: 'var(--color-noir)', marginBottom: '8px' }}>
              تم استلام طلب استشارتكِ بنجاح!
            </h2>
            <p className="body-2" style={{ color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto 20px' }}>
              تم تسجيل حجز استشارة لمدة <strong>{selectedPkg.duration} دقيقة</strong> بقيمة <strong>${selectedPkg.price}</strong>، وحالة الطلب الآن: <span className="status-pill-pending">قيد المراجعة</span>.
            </p>

            <div className="consultation-success-details">
              <div className="detail-row">
                <span>الاسم المسجل:</span>
                <strong>{successResult.name || formData.name}</strong>
              </div>
              <div className="detail-row">
                <span>رقم الهاتف:</span>
                <strong dir="ltr">{successResult.phone || formData.phone}</strong>
              </div>
              <div className="detail-row">
                <span>البريد الإلكتروني:</span>
                <strong dir="ltr">{successResult.email || formData.email}</strong>
              </div>
              <div className="detail-row">
                <span>المدة والتكلفة:</span>
                <strong>{selectedPkg.duration} دقيقة · ${selectedPkg.price} دولار</strong>
              </div>
            </div>

            <p className="caption-1" style={{ color: 'var(--color-text-subtle)', marginTop: '20px' }}>
              سيتواصل معكِ فريق الأكاديمية قريباً عبر الهاتف أو الواتساب لتأكيد موعد اللقاء وإرسال رابط الاجتماع وتفاصيل الدفع.
            </p>

            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setSuccessResult(null);
                  setFormData({ name: '', phone: '', email: '', notes: '' });
                }}
                className="btn-luxury-text"
              >
                حجز استشارة أخرى
              </button>
              <button
                type="button"
                onClick={navigateToHome}
                className="btn-luxury-primary button-md"
              >
                العودة للرئيسية
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* باقات الاستشارة الثلاث */}
            <div className="consultation-packages-grid">
              {PACKAGES.map((pkg) => {
                const isSelected = selectedDuration === pkg.duration;
                return (
                  <div
                    key={pkg.duration}
                    onClick={() => handlePackageSelect(pkg.duration)}
                    className={`consultation-package-card ${isSelected ? 'is-selected' : ''} ${pkg.popular ? 'is-popular' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                  >
                    {pkg.badge && (
                      <div className="package-badge-tag">
                        {pkg.popular && <Sparkles size={12} />}
                        <span>{pkg.badge}</span>
                      </div>
                    )}

                    <div className="package-card-header">
                      <div className="package-duration-pill">
                        <Clock size={16} />
                        <span>{pkg.duration} دقيقة</span>
                      </div>
                      <div className="package-price-wrap">
                        <span className="price-currency">$</span>
                        <span className="price-amount">{pkg.price}</span>
                        <span className="price-period">دولار</span>
                      </div>
                    </div>

                    <h3 className="package-title title-1">{pkg.title}</h3>
                    <p className="package-subtitle caption-2">{pkg.subtitle}</p>

                    <div className="package-divider" />

                    <ul className="package-features-list">
                      {pkg.features.map((feat, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="feature-check-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="package-select-action">
                      <button
                        type="button"
                        className={`package-select-btn ${isSelected ? 'is-selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePackageSelect(pkg.duration);
                        }}
                      >
                        {isSelected ? 'الباقة المختارة حالياً ✓' : 'اختيار هذه الباقة'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* استمارة تأكيد حجز الاستشارة */}
            <div className="consultation-booking-form-wrapper">
              <div className="booking-form-card">
                <div className="booking-form-header">
                  <div className="selected-summary-chip">
                    <span>الباقة المحددة:</span>
                    <strong>{selectedPkg.duration} دقيقة بسعر ${selectedPkg.price} دولار</strong>
                  </div>
                  <h2 className="title-1" style={{ color: 'var(--color-noir)', margin: '8px 0 4px' }}>
                    تأكيد بيانات حجز الاستشارة
                  </h2>
                  <p className="caption-1" style={{ color: 'var(--color-text-subtle)' }}>
                    يرجى تعبئة بياناتكِ وسيتم مراجعة الطلب والتنسيق معكِ لتحديد موعد الجلسة عبر الإنترنت.
                  </p>
                </div>

                {!currentUser && (
                  <div className="consultation-auth-prompt-banner">
                    <AlertCircle size={20} />
                    <div style={{ flex: 1 }}>
                      <strong>تنبيه: يتطلب حجز الاستشارة تسجيل الدخول أولاً</strong>
                      <p className="caption-2" style={{ margin: '2px 0 0' }}>
                        سجّلي دخولكِ أو أنشئي حساباً حتى تتمكني من إرسال الطلب ومتابعة حالته.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="btn-luxury-primary button-sm"
                    >
                      تسجيل الدخول
                    </button>
                  </div>
                )}

                {errorMsg && (
                  <div className="consultation-error-banner" role="alert">
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="consultation-form-fields">
                  <div className="form-two-col-grid">
                    <div>
                      <label className="luxury-field-label caption-1">
                        الاسم بالكامل <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: ياسمين أحمد"
                        className="luxury-text-input"
                      />
                    </div>

                    <div>
                      <label className="luxury-field-label caption-1">
                        رقم الهاتف / واتساب <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="01xxxxxxxxx"
                        className="luxury-text-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="luxury-field-label caption-1">
                      البريد الإلكتروني <span style={{ color: 'var(--color-primary)' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="luxury-text-input"
                    />
                  </div>

                  <div>
                    <label className="luxury-field-label caption-1">
                      ملاحظات أو أسئلة محددة تودين مناقشتها مع حلا سامي (اختياري)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="اكتبي الأسئلة أو الموضوعات الأساسية التي ترغبين في استشارتها خلال الجلسة..."
                      className="luxury-text-input"
                      style={{ height: 'auto', padding: '12px 14px' }}
                    />
                  </div>

                  <div className="form-submit-row">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-luxury-primary button-lg"
                      style={{ minWidth: '260px' }}
                    >
                      {loading ? (
                        <span>جارٍ إرسال الطلب...</span>
                      ) : (
                        <>
                          <span>تأكيد طلب الاستشارة ({selectedPkg.duration} دقيقة - ${selectedPkg.price}$)</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                    <span className="caption-3" style={{ color: 'var(--color-text-subtle)' }}>
                      🔒 جلسة مغلقة وفردية تماماً مع حلا سامي عبر الإنترنت
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
