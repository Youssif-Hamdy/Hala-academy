import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

export default function FreeVideoSection() {
  const videoRef = useRef(null);
  const { openEnrollModal } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    vid.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  return (
    <section id="free" className="free-video-section" aria-label="لقطات حية من التدريب">
      <div className="container">
        <div className="free-snap-layout">
          {/* Editorial Copy Side */}
          <div className="free-snap-copy">
            <div className="section-eyebrow caption-3" style={{ color: 'var(--color-accent-soft)' }}>
              <span>لقطة حية من الكواليس</span>
            </div>

            <h2 className="heading-2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              شغف التفاصيل ودقة اللمسة الاحترافية
            </h2>

            <p className="body-2" style={{ color: 'var(--color-accent-soft)', opacity: 0.9, lineHeight: 1.8, marginBottom: '24px' }}>
              لمحة سريعة من كواليس العمل والتطبيق العملي مع حلا سامي، لتشاهدي عن قرب نظافة الدمج، إشراقة البشرة، وجودة التصوير التي سترافقكِ في كل درس داخل الأكاديمية.
            </p>

            <div className="free-snap-highlights">
              <div className="free-snap-pill">
                <span className="free-snap-dot"></span>
                <span>تصوير مقرب يوضح حركة اليد والفرشاة</span>
              </div>
              <div className="free-snap-pill">
                <span className="free-snap-dot"></span>
                <span>تطبيقات حقيقية بدون فلاتر تجميلية</span>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <button
                type="button"
                onClick={() => openEnrollModal('pro')}
                className="free-snap-cta-btn button-md"
              >
                <span>اشتركي الآن في الكورس الكامل</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Real Video Snap Player */}
          <div className="free-snap-player-col">
            <div className="free-snap-frame" onClick={togglePlay}>
              <video
                ref={videoRef}
                src="/assets/videos/free-trial-section.MP4"
                poster="/assets/images/masterclass-preview.jpg"
                className="free-snap-video-el"
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Center Play Button Overlay when paused */}
              {!isPlaying && (
                <div className="free-snap-overlay">
                  <button
                    type="button"
                    className="free-video-center-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    aria-label="تشغيل المقطع"
                  >
                    <Play size={28} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '3px' }} />
                  </button>
                  <span className="free-snap-badge">تشغيل اللقطة</span>
                </div>
              )}

              {/* Bottom Minimal Controls Bar */}
              <div className="free-snap-controls" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="free-snap-ctrl-btn"
                  aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <div className="free-snap-progress-track">
                  <div
                    className="free-snap-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="free-snap-ctrl-btn"
                  aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="free-snap-ctrl-btn"
                  aria-label="إعادة التشغيل"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
