import React from 'react';
import { useApp } from '../context/AppContext';

export default function CtaBanner() {
  const { openEnrollModal } = useApp();

  return (
    <section id="join" className="minimal-luxury-cta-section" aria-label="الاشتراك في الأكاديمية">
      <div className="container">
        <div className="minimal-cta-card">
          <span dir="ltr" className="minimal-cta-eyebrow">
            HALLA ACADEMY · ENROLLMENT
          </span>

          <h2 className="minimal-cta-title heading-2">
            ابدئي رحلتكِ الاحترافية مع حلا سامي
          </h2>

          <p className="minimal-cta-desc body-2">
            اختاري المسار المناسب لطموحكِ وتعلّمي أسرار المكياج المتقن خطوة بخطوة.
          </p>

          <button
            type="button"
            onClick={() => openEnrollModal('pro')}
            className="minimal-cta-btn button-md"
          >
            <span>اشتركي الآن في الكورس</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
