import React, { useState, useEffect, useRef } from 'react';
import promoImgUrl from '../assets/promo-ad.png';

const PROMO_IMAGE = {
  src: promoImgUrl,
  alt: 'إعلان أكاديمية حلا سامي'
};

const INTERVAL_MS = 30 * 1000; // يظهر كل 30 ثانية لجميع الزوار

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [animState, setAnimState] = useState('');
  const [imgLoaded, setImgLoaded] = useState(true);
  const visibleRef = useRef(false);

  // تحميل مسبق للصورة في الخلفية
  useEffect(() => {
    const img = new window.Image();
    img.src = PROMO_IMAGE.src;
  }, []);

  const showPromo = () => {
    if (visibleRef.current) return; // لا نكرر إذا كان مفتوحاً بالفعل
    visibleRef.current = true;
    setAnimState('entering');
    setVisible(true);
    window.setTimeout(() => setAnimState(''), 450);
  };

  const dismiss = () => {
    setAnimState('leaving');
    window.setTimeout(() => {
      visibleRef.current = false;
      setVisible(false);
      setAnimState('');
    }, 350);
  };

  useEffect(() => {
    // يظهر بعد 30 ثانية، ثم يتكرر كل 30 ثانية
    const timer = window.setTimeout(showPromo, INTERVAL_MS);
    const interval = window.setInterval(showPromo, INTERVAL_MS);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`promo-overlay${animState ? ` promo-${animState}` : ''}`}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="إعلان الأكاديمية"
    >
      <div
        className={`promo-card${animState ? ` promo-card-${animState}` : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="promo-close-btn"
          onClick={dismiss}
          aria-label="إغلاق الإعلان"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {!imgLoaded && (
          <div className="promo-img-skeleton" aria-hidden="true" />
        )}

        <img
          src={PROMO_IMAGE.src}
          alt={PROMO_IMAGE.alt}
          className="promo-img"
          draggable={false}
          loading="eager"
          onLoad={() => setImgLoaded(true)}
        />
      </div>
    </div>
  );
}
