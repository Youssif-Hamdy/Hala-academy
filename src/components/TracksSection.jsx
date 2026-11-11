import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, HelpCircle, ArrowLeft, Clock, Film, Award } from 'lucide-react';
import { ACADEMY_DATA } from '../data/courseData';

export default function TracksSection() {
  const { selectedTrack, setSelectedTrack, openEnrollModal, setIsQuizModalOpen } = useApp();
  const { tracks } = ACADEMY_DATA;

  return (
    <section id="tracks" className="course-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <Sparkles size={16} />
            <span>مساركِ في التعلّم</span>
          </div>
          <h2 className="section-title">
            اختاري المسار الأنسب لهدفكِ
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '17px', lineHeight: '1.9' }}>
            سواء كنتِ تريدين إتقان مكياجك الشخصي لتتألقي في كل مناسبة، أو تطمحين لبدء مسار مهني حر ومربح كخبيرة تجميل معتمدة.
          </p>
        </div>

        {/* Diagnostic Quiz Prompt Banner */}
        <div className="quiz-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <HelpCircle size={28} />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-noir)', marginBottom: '4px' }}>
                محتارة أي مسار تختارين؟
              </h4>
              <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', margin: 0 }}>
                أجيبي على 3 أسئلة سريعة لنحدد لكِ المسار الذي يناسب خبرتك وميزانيتك في أقل من دقيقة.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQuizModalOpen(true)}
            className="btn-luxury-primary"
            style={{ whiteSpace: 'nowrap', padding: '12px 24px' }}
          >
            <span>ابدئي اختبار المسار السريع</span>
            <ArrowLeft size={16} />
          </button>
        </div>

        {/* Tracks Grid */}
        <div className="track-cards-grid">
          {tracks.map((track) => {
            const isFeatured = track.isPopular;

            return (
              <div
                key={track.id}
                className={`track-card ${isFeatured ? 'featured' : ''}`}
              >
                {isFeatured && (
                  <div style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '32px',
                    background: 'linear-gradient(135deg, #D4AF37, #C99726)',
                    color: '#1A1A1A',
                    fontWeight: '700',
                    fontSize: '12.5px',
                    padding: '4px 16px',
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Sparkles size={13} />
                    <span>{track.badge}</span>
                  </div>
                )}

                <div className="track-card-tag" dir="ltr">
                  {track.code}
                </div>

                <h3 className="track-card-title">
                  {track.title}
                </h3>

                <p className="track-card-desc">
                  {track.description}
                </p>

                {/* Duration & Lessons Meta */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '12px 0',
                  marginBottom: '20px',
                  borderTop: isFeatured ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--color-border)',
                  borderBottom: isFeatured ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--color-border)',
                  fontSize: '13.5px',
                  color: isFeatured ? 'var(--color-accent-soft)' : 'var(--color-text-muted)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} />
                    <span>{track.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Film size={16} />
                    <span>{track.lessonsCount}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="track-feature-list">
                  {track.features.map((feat, idx) => (
                    <li key={idx} className="track-feature-item">
                      <Check size={18} />
                      <span style={{ lineHeight: '1.6' }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Price Box */}
                <div className="track-price-box">
                  <span className="track-price-current">
                    {track.price.toLocaleString('ar-EG')}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>
                    {track.currency}
                  </span>
                  <span className="track-price-original">
                    {track.originalPrice.toLocaleString('ar-EG')} {track.currency}
                  </span>
                </div>

                {/* Action button */}
                <button
                  onClick={() => openEnrollModal(track.id)}
                  className={isFeatured ? 'btn-luxury-secondary' : 'btn-luxury-primary'}
                  style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '16px',
                    justifyContent: 'center',
                    background: isFeatured ? 'var(--color-white)' : undefined,
                    color: isFeatured ? 'var(--color-primary)' : undefined
                  }}
                >
                  <span>اشتركي في هذا المسار</span>
                  <ArrowLeft size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
