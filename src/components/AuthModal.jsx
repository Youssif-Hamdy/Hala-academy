import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, adminLogin, register } = useApp();

  const [mode, setMode] = useState(authModalMode || 'login'); // 'login' | 'register' | 'admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Keep internal mode synced with context
  React.useEffect(() => {
    if (authModalMode) setMode(authModalMode);
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          setErrorMessage('يرجى إدخال اسمكِ الكريم');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMessage('كلمة المرور يجب ألا تقل عن 6 أحرف');
          setLoading(false);
          return;
        }
        await register(name.trim(), email.trim(), password);
      } else if (mode === 'admin') {
        await adminLogin(email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
    } catch (err) {
      setErrorMessage(err.message || 'حدث خطأ أثناء المحاولة، يرجى إعادة المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal} role="dialog" aria-modal="true">
      <div 
        className="luxury-modal-sheet auth-modal-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Luxury Emblem */}
        <div className="auth-header-top">
          <button 
            onClick={closeAuthModal} 
            className="auth-modal-close"
            aria-label="إغلاق"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="auth-brand-center">
            <img 
              src="/assets/images/hala-emblem.png" 
              alt="Halla Academy Luxury Emblem" 
              className="auth-logo-emblem"
            />
            <div className="auth-brand-title" dir="ltr">
              HALLA ACADEMY
            </div>
            <div className="auth-brand-subtitle caption-3">
              بوابة المتدربات وعالم الاحتراف
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs-row" role="tablist">
          <button
            role="tab"
            aria-selected={mode === 'login'}
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
          >
            تسجيل الدخول
          </button>
          <button
            role="tab"
            aria-selected={mode === 'register'}
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
          >
            حساب جديد
          </button>
          <button
            role="tab"
            aria-selected={mode === 'admin'}
            onClick={() => { setMode('admin'); setErrorMessage(''); }}
            className={`auth-tab-btn ${mode === 'admin' ? 'active' : ''}`}
          >
            دخول الأدمن
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="auth-form-body">
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

          {mode === 'register' && (
            <div className="auth-field-group">
              <label className="luxury-field-label caption-2">الاسم الكامل</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: ندى الأحمد"
                className="luxury-text-input"
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field-group">
            <label className="luxury-field-label caption-2">
              {mode === 'admin' ? 'البريد الإلكتروني للأدمن' : 'البريد الإلكتروني'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={mode === 'admin' ? 'admin@hala.com' : 'yourname@example.com'}
              className="luxury-text-input"
              dir="ltr"
              autoComplete="email"
            />
          </div>

          <div className="auth-field-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="luxury-field-label caption-2">كلمة المرور</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="caption-3"
                style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? 'إخفاء' : 'إظهار'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="luxury-text-input"
              dir="ltr"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
            {mode === 'register' && (
              <span className="caption-4" style={{ color: 'var(--color-text-subtle)', marginTop: '4px', display: 'block' }}>
                * لا تقل عن 6 أحرف
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn button-md"
          >
            {loading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span className="auth-spinner" aria-hidden="true"></span>
                <span>جاري المعالجة...</span>
              </span>
            ) : mode === 'register' ? (
              'إنشاء حساب جديد والانضمام'
            ) : mode === 'admin' ? (
              'دخول لوحة تحكم الأدمن'
            ) : (
              'تسجيل الدخول للمنصة'
            )}
          </button>

          {mode === 'admin' && (
            <div className="caption-4" style={{ textAlign: 'center', color: 'var(--color-text-subtle)', marginTop: '8px' }}>
              بيانات الدخول التجريبية للأدمن: <code>admin@hala.com</code> / <code>Admin@12345</code>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
