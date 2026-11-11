import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import authEditorialImg from '../assets/images/auth-editorial-beauty.jpg';

export default function AuthPage() {
  const { 
    authModalMode, 
    setAuthModalMode, 
    login, 
    adminLogin, 
    register, 
    navigateToHome,
    currentUser
  } = useApp();

  const [mode, setMode] = useState(authModalMode || 'login'); // 'login' | 'register' | 'admin'
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState(''); // phone number or email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Keep internal mode synced with context
  useEffect(() => {
    if (authModalMode) setMode(authModalMode);
  }, [authModalMode]);

  // If already logged in, show logged-in state or return
  useEffect(() => {
    if (currentUser) {
      // User is already logged in
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const cleanIdentifier = identifier.trim();
      if (!cleanIdentifier) {
        setErrorMessage('يرجى إدخال رقم الهاتف أو البريد الإلكتروني');
        setLoading(false);
        return;
      }

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
        if (password !== confirmPassword) {
          setErrorMessage('كلمتا المرور غير متطابقتين، يرجى التأكد منهما');
          setLoading(false);
          return;
        }
        // If identifier doesn't have @, treat as phone and format an email or pass
        const emailToSubmit = cleanIdentifier.includes('@') 
          ? cleanIdentifier 
          : `${cleanIdentifier.replace(/[^0-9]/g, '')}@student.hala.academy`;

        await register(name.trim(), emailToSubmit, password);
        navigateToHome();
      } else if (mode === 'admin') {
        await adminLogin(cleanIdentifier, password);
        navigateToHome();
      } else {
        // Login mode
        const emailToSubmit = cleanIdentifier.includes('@') 
          ? cleanIdentifier 
          : `${cleanIdentifier.replace(/[^0-9]/g, '')}@student.hala.academy`;

        await login(emailToSubmit, password);
        navigateToHome();
      }
    } catch (err) {
      setErrorMessage(err.message || 'حدث خطأ أثناء المحاولة، يرجى إعادة المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  const switchToMode = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
    if (setAuthModalMode) setAuthModalMode(newMode);
    if (typeof window !== 'undefined') {
      window.location.hash = newMode === 'register' ? '#signup' : '#login';
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Outer Card with Editorial Canvas */}
      <div className="auth-page-canvas">
        
        {/* Left / Form Column */}
        <div className="auth-card-left">
          {/* Top Bar with Back to Home */}
          <div className="auth-card-topbar">
            <button 
              type="button"
              onClick={navigateToHome}
              className="auth-back-home-btn"
              aria-label="العودة إلى الصفحة الرئيسية"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>العودة للرئيسية</span>
            </button>
          </div>

          <div className="auth-form-inner-container">
            {/* Brand Logo & Wordmark (Matching Inspiration 'Vella' Editorial Style) */}
            <div className="auth-brand-signature">
              <a href="#top" onClick={(e) => { e.preventDefault(); navigateToHome(); }} className="auth-signature-link">
                <span className="auth-signature-text">Halla.</span>
                <span className="auth-signature-sub">ACADEMY</span>
              </a>
            </div>

            {/* Editorial Heading */}
            <div className="auth-heading-block">
              <h1 className="auth-primary-title">
                {mode === 'register' ? 'Create an account' : mode === 'admin' ? 'Admin Portal' : 'Welcome back'}
              </h1>
              <p className="auth-secondary-subtitle caption-1">
                {mode === 'register' 
                  ? 'انضمي لنخبة متدربات أكاديمية حلا سامي واكتشفي أسرار فنون المكياج' 
                  : mode === 'admin' 
                  ? 'بوابة التحكم والإشراف على الاستمارات والطلبات' 
                  : 'سجّلي دخولكِ لمتابعة دوراتكِ وتطبيق مهاراتكِ الاحترافية'}
              </p>
            </div>

            {/* Error Banner */}
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

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="auth-editorial-form">
              
              {/* Full Name Field (Only in Register Mode) */}
              {mode === 'register' && (
                <div className="auth-input-group">
                  <label className="auth-input-question title-4">
                    <span className="auth-input-arabic-sub">الاسم بالكامل</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="auth-minimal-input"
                    dir="ltr"
                    autoComplete="name"
                    autoFocus
                  />
                </div>
              )}

              {/* Phone or Email Field */}
              <div className="auth-input-group">
                <label className="auth-input-question title-4">
                  <span className="auth-input-arabic-sub">
                    {mode === 'admin' ? 'البريد الإلكتروني للأدمن' : 'رقم الهاتف أو البريد الإلكتروني'}
                  </span>
                </label>
                <input
                  type={mode === 'admin' ? 'email' : 'text'}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    mode === 'admin' 
                      ? 'admin@hala.com' 
                      : 'Enter phone number or email'
                  }
                  className="auth-minimal-input"
                  dir="ltr"
                  autoComplete={mode === 'admin' ? 'email' : 'username'}
                  autoFocus={mode !== 'register'}
                />
              </div>

              {/* Password Field */}
              <div className="auth-input-group">
                <div className="auth-input-header-row">
                  <label className="auth-input-question title-4">
                    <span className="auth-input-arabic-sub">كلمة المرور</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-toggle-pwd-btn caption-2"
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
                  className="auth-minimal-input"
                  dir="ltr"
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                />
              </div>

              {/* Confirm Password Field (Only in Register Mode) */}
              {mode === 'register' && (
                <div className="auth-input-group">
                  <div className="auth-input-header-row">
                    <label className="auth-input-question title-4">
                      <span className="auth-input-arabic-sub">تأكيد كلمة المرور</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="auth-toggle-pwd-btn caption-2"
                    >
                      {showConfirmPassword ? 'إخفاء' : 'إظهار'}
                    </button>
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="auth-minimal-input"
                    dir="ltr"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {/* Primary Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="auth-primary-continue-btn"
              >
                {loading ? (
                  <span className="auth-btn-loading-state">
                    <span className="auth-spinner" aria-hidden="true"></span>
                    <span>جاري المتابعة...</span>
                  </span>
                ) : (
                  <span>
                    {mode === 'register' 
                      ? 'Create account' 
                      : mode === 'admin' 
                      ? 'Sign in to Admin' 
                      : 'Continue'}
                  </span>
                )}
              </button>

              {/* Divider: 'or' */}
              <div className="auth-or-divider" aria-hidden="true">
                <span className="auth-or-line"></span>
                <span className="auth-or-text">or</span>
                <span className="auth-or-line"></span>
              </div>

              {/* Secondary Action: "or create a new account" (As requested: neglect Google & Apple, make it or create a new account) */}
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => switchToMode('register')}
                  className="auth-secondary-switch-btn"
                >
                  <span>or create a new account</span>
                  <span className="auth-btn-arabic-hint">أو إنشاء حساب جديد</span>
                </button>
              )}

              {mode === 'register' && (
                <button
                  type="button"
                  onClick={() => switchToMode('login')}
                  className="auth-secondary-switch-btn"
                >
                  <span>or sign in with existing account</span>
                  <span className="auth-btn-arabic-hint">أو تسجيل الدخول إلى حسابكِ</span>
                </button>
              )}

              {mode === 'admin' && (
                <button
                  type="button"
                  onClick={() => switchToMode('login')}
                  className="auth-secondary-switch-btn"
                >
                  <span>العودة لتسجيل دخول المتدربات</span>
                </button>
              )}

              {/* Bottom Subtle Switch Link */}
              <div className="auth-bottom-switch-row caption-2">
                {mode === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => switchToMode('register')}
                      className="auth-inline-link"
                    >
                      Register
                    </button>
                  </p>
                ) : mode === 'register' ? (
                  <p>
                    Already have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => switchToMode('login')}
                      className="auth-inline-link"
                    >
                      Log in
                    </button>
                  </p>
                ) : (
                  <p style={{ color: 'var(--color-text-subtle)' }}>
                    بيانات التجربة للأدمن: <code>admin@hala.com</code> / <code>Admin@12345</code>
                  </p>
                )}
              </div>

            </form>
          </div>
        </div>

        {/* Right / Editorial Visual Column (Matching Reference Image) */}
        <div className="auth-card-right">
          <div className="auth-visual-image-wrapper">
            <img 
              src={authEditorialImg} 
              alt="Halla Academy Haute-Couture Makeup & Beauty Artistry" 
              className="auth-editorial-image"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
