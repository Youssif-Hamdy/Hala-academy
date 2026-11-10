import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function MediaLightboxModal() {
  const { activeCertificate, setActiveCertificate, activePost, setActivePost } = useApp();

  const activeItem = activeCertificate || activePost;

  const handleClose = () => {
    setActiveCertificate(null);
    setActivePost(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (activeItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeItem]);

  if (!activeItem) return null;

  return (
    <div 
      className="pure-image-lightbox-overlay" 
      onClick={handleClose} 
      role="dialog" 
      aria-modal="true"
      aria-label="معاينة الصورة"
    >
      <button 
        onClick={handleClose} 
        className="pure-image-lightbox-close"
        aria-label="إغلاق"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="pure-image-lightbox-container" onClick={(e) => e.stopPropagation()}>
        <img 
          src={activeItem.src} 
          alt={activeItem.title || activeItem.headline || 'معاينة'}
          className="pure-image-lightbox-img"
        />
      </div>
    </div>
  );
}
