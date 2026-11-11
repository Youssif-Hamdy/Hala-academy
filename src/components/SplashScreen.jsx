import React, { useState, useEffect } from 'react';

/**
 * SplashScreen — شاشة تحميل أولية بالـ logo في النص مع تأثير blur جميل
 * يختفي تلقائياً بعد تحميل الصفحة أو بعد 2.2 ثانية كحد أقصى
 */
export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dismiss = () => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    };

    // إذا تحمّلت الصفحة بالفعل، اختفي بعد 1.4 ثانية
    // إذا لم تتحمل، انتظر حتى يكتمل التحميل أو 2.2 ثانية كحد أقصى
    if (document.readyState === 'complete') {
      const t = setTimeout(dismiss, 1400);
      return () => clearTimeout(t);
    } else {
      const onLoad = () => setTimeout(dismiss, 500);
      window.addEventListener('load', onLoad, { once: true });
      const fallback = setTimeout(dismiss, 2200);
      return () => {
        window.removeEventListener('load', onLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-screen ${fadeOut ? 'splash-fade-out' : ''}`} aria-hidden="true">
      {/* طبقات skeleton خلفية */}
      <div className="splash-skeleton-bg">
        <div className="splash-skel splash-skel-nav" />
        <div className="splash-skel splash-skel-hero" />
        <div className="splash-skel splash-skel-strip" />
        <div className="splash-skel splash-skel-cards">
          <div className="splash-skel splash-skel-card" />
          <div className="splash-skel splash-skel-card" />
          <div className="splash-skel splash-skel-card" />
        </div>
      </div>

      {/* طبقة blur فوق الـ skeleton */}
      <div className="splash-blur-layer" />

      {/* Logo في النص */}
      <div className="splash-logo-wrap">
        <img
          src="/assets/images/hala-emblem.png"
          alt="Halla Academy"
          className="splash-logo-img"
        />
        <div className="splash-logo-text" dir="ltr">HALLA ACADEMY</div>
        <div className="splash-dots" aria-label="جاري التحميل">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
