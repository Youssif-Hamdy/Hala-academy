import React from 'react';
import { useApp } from '../context/AppContext';

export default function CtaBanner() {
  const { openEnrollModal } = useApp();

  return (
    <section id="join" className="join-cta-section">
      <div className="join-cta-container">
        <div
          dir="ltr"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            letterSpacing: '0.4em',
            color: '#F0D8D6',
            marginBottom: '24px'
          }}
        >
          HALLA ACADEMY
        </div>

        <h2
          style={{
            margin: '0 0 36px',
            fontFamily: "'El Messiri', serif",
            fontWeight: 700,
            fontSize: 'clamp(38px, 5vw, 66px)',
            lineHeight: 1.35,
            color: '#FFFFFF'
          }}
        >
          ابدئي رحلتك مع حلا اليوم
        </h2>

        <button
          onClick={() => openEnrollModal('pro')}
          className="join-cta-btn"
        >
          اشتركي في الكورس
        </button>
      </div>
    </section>
  );
}
