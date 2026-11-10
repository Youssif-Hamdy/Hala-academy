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
    <section id="free" className="free-video-section" aria-label="مشاهدة الدرس المجاني">
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: 'var(--spacing-600)' }}>
          <div className="section-eyebrow caption-3" style={{ color: 'var(--color-accent-soft)' }}>
            شاهدي مجاناً قبل الاشتراك
          </div>
          <h2 className="heading-2" style={{ color: '#FFFFFF', marginBottom: 'var(--spacing-200)' }}>
            {freeMasterclass.title}
          </h2>
          <p className="body-2" style={{ color: 'var(--color-accent-soft)', opacity: 0.9 }}>
            {freeMasterclass.tagline}
          </p>
        </div>

        {/* Video Frame with Nested Radius Formula (B3) */}
        <div className="free-video-frame">
          <div className="free-video-player-box">
            <img
              src="/assets/images/masterclass-preview.jpg"
              alt="معاينة الدرس التدريبي المجاني مع حلا سامي"
              className="free-video-poster"
              loading="lazy"
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

            <div className="caption-2" style={{ position: 'relative', zIndex: 5, color: 'var(--color-accent-soft)', marginTop: 'var(--spacing-200)', background: 'rgba(26,26,26,0.75)', padding: '6px 16px', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(4px)' }}>
              {currentChapter.title}
            </div>

            <div dir="ltr" className="caption-2" style={{ position: 'absolute', left: 'var(--spacing-300)', bottom: 'var(--spacing-200)', color: 'var(--color-accent-soft)', fontFamily: 'var(--font-luxury)' }}>
              {currentChapter.time} / 20:00
            </div>
          </div>
        </div>

        {/* Chapters Strip */}
        <div className="chapter-selector-strip" aria-label="فصول الدرس">
          {freeMasterclass.chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleSelectChapter(ch)}
              className={`chapter-btn-item caption-2 ${currentChapter.id === ch.id ? 'active' : ''}`}
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
