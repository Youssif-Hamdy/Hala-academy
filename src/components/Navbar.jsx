import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { openEnrollModal, openLmsModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px 32px', padding: '16px 24px', maxWidth: '1360px', margin: '0 auto' }}>
          {/* Brand Logo */}
          <a href="#top" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '30px', letterSpacing: '0.14em', color: '#7A1C2E', lineHeight: 1.2 }} dir="ltr">
            HALLA <span style={{ fontWeight: 500, letterSpacing: '0.3em', fontSize: '14px', color: '#1A1A1A' }}>ACADEMY</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-links" style={{ gap: '8px 32px', fontSize: '16px' }}>
            <a href="#top" className="nav-link">الرئيسية</a>
            <a href="#about" className="nav-link">عن حلا</a>
            <a href="#course" className="nav-link">الكورس</a>
            <a href="#free" className="nav-link">شاهدي مجانًا</a>
            <a href="#stories" className="nav-link">آراء المتدربات</a>
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 24px' }}>
            <button
              onClick={openLmsModal}
              style={{ color: '#7A1C2E', fontWeight: 500, minHeight: '44px', display: 'inline-flex', alignItems: 'center', fontSize: '15px' }}
            >
              دخول المتدربات
            </button>
            <button
              onClick={() => openEnrollModal('pro')}
              style={{ background: '#7A1C2E', color: '#FFFFFF', fontWeight: 500, minHeight: '44px', padding: '0 28px', display: 'inline-flex', alignItems: 'center', borderRadius: '2px', fontSize: '15px' }}
            >
              اشتركي الآن
            </button>

            {/* Mobile Toggle */}
            <button
              className="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7A1C2E" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '24px', letterSpacing: '0.14em', color: '#7A1C2E' }} dir="ltr">
              HALLA <span style={{ fontWeight: 500, letterSpacing: '0.28em', fontSize: '11px', color: '#1A1A1A' }}>ACADEMY</span>
            </span>
            <button onClick={() => setMobileMenuOpen(false)} style={{ color: '#7A1C2E', padding: '6px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
            <a href="#top" onClick={() => setMobileMenuOpen(false)} className="nav-link">الرئيسية</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="nav-link">عن حلا</a>
            <a href="#course" onClick={() => setMobileMenuOpen(false)} className="nav-link">الكورس</a>
            <a href="#free" onClick={() => setMobileMenuOpen(false)} className="nav-link">شاهدي مجانًا</a>
            <a href="#stories" onClick={() => setMobileMenuOpen(false)} className="nav-link">آراء المتدربات</a>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openLmsModal();
              }}
              style={{ border: '1px solid #C5899A', color: '#7A1C2E', minHeight: '48px', fontWeight: 500, borderRadius: '2px' }}
            >
              دخول المتدربات
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnrollModal('pro');
              }}
              style={{ background: '#7A1C2E', color: '#FFFFFF', minHeight: '48px', fontWeight: 500, borderRadius: '2px' }}
            >
              اشتركي الآن
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
