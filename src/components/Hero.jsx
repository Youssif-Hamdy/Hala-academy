import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { openEnrollModal } = useApp();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const scrollToFreeVideo = () => {
    const el = document.getElementById('free') || document.getElementById('course');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="hero-section" aria-label="مقدمة الأكاديمية">
      {/* 1. Left-Side Full Viewport Height Video on Large Screens */}
      <div className="hero-left-video-pane" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/hero-reel-poster.jpg"
          className="hero-video-element hero-desktop-media"
        >
          <source src="/assets/videos/hero-section.MOV" type="video/mp4" />
          <source src="/assets/videos/hero-section.MOV" type="video/quicktime" />
        </video>
        <img
          src="/assets/images/m-hero.jpeg"
          alt=""
          className="hero-mobile-media"
        />
        <div className="hero-video-veil"></div>
      </div>

      {/* 2. Premium Multi-Layer Burgundy Gradient Overlays */}
      <div className="hero-gradient-overlay-h" aria-hidden="true"></div>
      <div className="hero-gradient-overlay-v" aria-hidden="true"></div>
      <div className="hero-gradient-overlay-top" aria-hidden="true"></div>
      <div className="hero-atmospheric-glow" aria-hidden="true"></div>

      {/* 3. Foreground Container: Right-aligned Content on Desktop in RTL */}
      <div className="container hero-container">
        <div className="hero-layout-grid">
          {/* Right Column: All Primary Content (Starts first in RTL) */}
          <div className="hero-content-col">
            <div className="hero-brand-monogram" dir="ltr">
              HALLA ACADEMY · HAUTE BEAUTÉ
            </div>

            {/* Slogan & Headline */}
            <h1 className="hero-title">
              تعلّمي فنون المكياج بإتقان،<br />
              من الأساسيات حتى الاحتراف
            </h1>

            {/* Subheadline with subtle elegant gold tone */}
            <p className="hero-subtitle">
              منهج رقمي متكامل تقوده خبيرة التجميل حلا سامي، يكشف أسرار وتقنيات الميك اب العالمية بأسلوب عملي خطوة بخطوة باللغة العربية.
            </p>

            {/* Elevated Dual Rectangular CTAs (matches reference design) */}
            <div className="hero-cta-group">
              <button
                onClick={() => openEnrollModal('pro')}
                className="hero-btn-primary"
                id="hero-primary-cta"
              >
                <span>اكتشفي الكورس</span>
                <span className="hero-btn-arrow" aria-hidden="true">←</span>
              </button>

              <button
                onClick={scrollToFreeVideo}
                className="hero-btn-secondary"
                id="hero-secondary-cta"
              >
                <span className="hero-btn-play-icon" aria-hidden="true">▶</span>
                <span>شاهدي الفيلم</span>
              </button>
            </div>

            {/* Thin Divider Line */}
            <div className="hero-highlights-divider" aria-hidden="true"></div>

            {/* Three Simple Clean Words (matches reference design) */}
            <div className="hero-simple-highlights">
              <span>كورس مسجّل</span>
              <span>بالعربية</span>
              <span>من الأساسيات إلى الاحتراف</span>
            </div>
          </div>

          {/* Left Column Spacer & Subtle Ambient Video Controller */}
          <div className="hero-video-spacer-col">

          </div>
        </div>
      </div>
    </section>
  );
}
