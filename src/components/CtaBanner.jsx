import React from 'react';
import { useApp } from '../context/AppContext';

export default function CtaBanner() {
  const { openBookingModal } = useApp();

  return (
    <section id="join" className="join-cta-section gold-injected-cta" aria-label="الدعوة النهائية للتسجيل">
      {/* Golden Atmospheric Glow & Ambient Lighting */}
      <div className="cta-gold-radial-aura" aria-hidden="true"></div>
      <div className="cta-gold-shimmer-pattern" aria-hidden="true"></div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="join-cta-container">
          {/* Luxury Gold Emblem Logo */}
          <div className="cta-gold-emblem-wrap">
            <img 
              src="/assets/images/hala-emblem.png" 
              alt="Halla Academy Luxury Crest"
              className="cta-gold-emblem-img"
            />
          </div>

          {/* Golden Latin Monogram with Diamond Separator */}
          <div className="cta-gold-monogram" dir="ltr">
            <span className="gold-dash"></span>
            <span>HALLA ACADEMY · HAUTE BEAUTÉ</span>
            <span className="gold-dash"></span>
          </div>

          {/* Gold Foiled Headline */}
          <h2 className="join-cta-heading heading-1 gold-foil-text">
            ابدئي رحلتكِ الاحترافية مع حلا سامي اليوم
          </h2>

          {/* Delicate Gold Diamond Divider */}
          <div className="gold-divider-ornament" aria-hidden="true">
            <span className="gold-ornament-line"></span>
            <span className="gold-diamond">◆</span>
            <span className="gold-ornament-line"></span>
          </div>

          <p className="join-cta-subtitle body-1">
            انضمي إلى أكثر من 2,400 متدربة واكتسبي مهارات وفنون المكياج التي تصنع الفارق الحقيقي في حضورك ومستقبلك المهني.
          </p>

          {/* Haute-Couture Gold-Accented Button */}
          <div className="cta-gold-btn-wrapper">
            <button
              onClick={openBookingModal}
              className="cta-gold-luxury-btn button-lg"
              aria-label="تقديم استمارة الحجز والالتحاق"
            >
              <span className="btn-sparkle" aria-hidden="true">✦</span>
              <span>احجزي مقعدكِ الآن وابدئي فوراً</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M19 12H5M11 6l-6 6 6 6"></path>
              </svg>
            </button>
          </div>

          {/* Risk Reversals with Gold Badges */}
          <div className="join-cta-guarantees">
            <div className="gold-guarantee-pill caption-2">
              <span className="gold-check" aria-hidden="true">✓</span>
              <span>وصول دائم وفوري لجميع المواد</span>
            </div>
            <div className="gold-guarantee-pill caption-2">
              <span className="gold-check" aria-hidden="true">✓</span>
              <span>شهادة معتمدة موثقة برقم تسلسلي</span>
            </div>
            <div className="gold-guarantee-pill caption-2">
              <span className="gold-check" aria-hidden="true">✓</span>
              <span>دعم ومتابعة استفساراتكِ مع حلا</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
