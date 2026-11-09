import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_DATA } from '../data/courseData';

export default function FreeVideoSection() {
  const { freeMasterclass } = ACADEMY_DATA;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(freeMasterclass.chapters[0]);
  const { showToast } = useApp();

  const handleSelectChapter = (ch) => {
    setCurrentChapter(ch);
    setIsPlaying(true);
    showToast(`انتقلتِ إلى: ${ch.title}`);
  };

  return (
    <section id="free" className="free-video-section">
      <div className="free-video-container">
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '48px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.08em', color: '#F0D8D6', marginBottom: '16px' }}>
            شاهدي قبل الاشتراك
          </div>
          <h2 style={{ margin: '0 0 20px', fontFamily: "'El Messiri', serif", fontWeight: 700, fontSize: 'clamp(36px, 4.4vw, 58px)', lineHeight: 1.35, color: '#FFFFFF' }}>
            {freeMasterclass.title}
          </h2>
          <p style={{ margin: 0, color: '#F0D8D6', fontWeight: 300, fontSize: '17px' }}>
            {freeMasterclass.tagline}
          </p>
        </div>

        {/* Video Frame */}
        <div className="free-video-frame">
          <div className="free-video-player-box">
            <img
              src="/assets/images/masterclass-preview.jpg"
              alt="Halla Academy Free Lesson Preview"
              className="free-video-poster"
            />

            <button
              className="free-video-center-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}
            >
              {isPlaying ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true" style={{ marginRight: '-3px' }}>
                  <path d="M7 4.5v15l13-7.5z"></path>
                </svg>
              )}
            </button>

            <div style={{ position: 'relative', zIndex: 5, color: '#F0D8D6', fontSize: '15px', marginTop: '16px', background: 'rgba(26,26,26,0.7)', padding: '4px 14px', borderRadius: '2px' }}>
              {currentChapter.title}
            </div>

            <div dir="ltr" style={{ position: 'absolute', left: '24px', bottom: '18px', fontSize: '14px', color: '#F0D8D6', fontFamily: "'Cormorant Garamond', serif" }}>
              {currentChapter.time} / 20:00
            </div>
          </div>
        </div>

        {/* Chapters Strip */}
        <div className="chapter-selector-strip">
          {freeMasterclass.chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleSelectChapter(ch)}
              className={`chapter-btn-item ${currentChapter.id === ch.id ? 'active' : ''}`}
            >
              <strong dir="ltr" style={{ marginLeft: '6px' }}>{ch.time}</strong>
              <span>{ch.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
