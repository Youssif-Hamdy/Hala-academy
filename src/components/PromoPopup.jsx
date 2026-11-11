import React, { useState, useEffect, useRef } from 'react';

const PROMO_IMAGES = [
  {
    src: '/assets/images/prand/Playful%20Arabic%20Makeup%20Quiz%20Ad.png',
    alt: 'إعلان أكاديمية حلا سامي'
  },
  {
    src: '/assets/images/prand/You%27re%20Still%20Just%20Getting%20Started.png',
    alt: 'رسالة من أكاديمية حلا سامي'
  }
];

const FIRST_SHOW_MS  = 8000;          // يظهر أول مرة بعد 8 ثواني
const INTERVAL_MS    = 2 * 60 * 1000; // كل دقيقتين بعد ذلك

/**
 * PromoPopup — إعلان دوري يظهر في منتصف الشاشة كل دقيقتين
 * يتبدّل بين الصورتين بالتسلسل
 */
export default function PromoPopup() {
  const [visible, setVisible]       = useState(false);
  const [animState, setAnimState]   = useState(''); // '' | 'entering' | 'leaving'
  const [currentIdx, setCurrentIdx] = useState(0);
  const idxRef = useRef(0);

  const showPromo = () => {
    const idx = idxRef.current % PROMO_IMAGES.length;
    idxRef.current += 1;
    setCurrentIdx(idx);
    setAnimState('entering');
    setVisible(true);
    setTimeout(() => setAnimState(''), 450);
  };

  const dismiss = () => {
    setAnimState('leaving');
    setTimeout(() => {
      setVisible(false);
      setAnimState('');
    }, 380);
  };

  useEffect(() => {
    // الظهور الأول
    const firstTimer = setTimeout(showPromo, FIRST_SHOW_MS);

    // دوري كل دقيقتين
    const interval = setInterval(showPromo, INTERVAL_MS);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const img = PROMO_IMAGES[currentIdx];

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
        {/* زر الإغلاق */}
        <button
          className="promo-close-btn"
          onClick={dismiss}
          aria-label="إغلاق الإعلان"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* الصورة */}
        <img
          src={img.src}
          alt={img.alt}
          className="promo-img"
          draggable={false}
          loading="eager"
          onError={(e) => {
            console.warn('[PromoPopup] فشل تحميل الصورة:', img.src);
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* مؤشر الصورة الحالية */}
        <div className="promo-dots-row" aria-hidden="true">
          {PROMO_IMAGES.map((_, i) => (
            <span key={i} className={`promo-dot${i === currentIdx ? ' active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
