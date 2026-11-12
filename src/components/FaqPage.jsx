import React from 'react';
import { useApp } from '../context/AppContext';
import FaqSection from './FaqSection';

export default function FaqPage() {
  const { navigateToHome } = useApp();

  return (
    <div className="faq-page-wrapper" style={{ minHeight: '80vh', paddingTop: '80px', paddingBottom: '60px' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
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
            border: 'none',
            marginBottom: '16px'
          }}
        >
          <span>← العودة للصفحة الرئيسية</span>
        </button>
      </div>
      <FaqSection />
    </div>
  );
}
