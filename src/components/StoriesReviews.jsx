import React from 'react';
import { ACADEMY_DATA } from '../data/courseData';

export default function StoriesReviews() {
  const { reviews } = ACADEMY_DATA;

  return (
    <section id="stories" className="stories-section" aria-label="آراء وتجارب المتدربات">
      <div className="container">
        <div style={{ maxWidth: '680px', marginBottom: 'var(--spacing-600)' }}>
          <div className="section-eyebrow caption-3">
            قصص وتجارب حقيقية
          </div>
          <h2 className="section-title heading-2">
            نتائج وإشادات خريجات الأكاديمية
          </h2>
          <p className="body-2" style={{ color: 'var(--color-text-muted)' }}>
            تجارب حقيقية لطالبات بدأن من الصفر وتخرجن بمهارات احترافية صنعت لهن حضوراً ونجاحاً عملياً ملموساً.
          </p>
        </div>

        <div className="stories-grid">
          {reviews.map((item) => (
            <div key={item.id} className="story-card-item">
              <div className="story-img-container">
                <img src={item.image} alt={`تطبيق المتدربة ${item.name}`} loading="lazy" />
              </div>

              {/* Verified Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 'var(--spacing-100) 0' }}>
                <span style={{ color: '#E5A93C', fontSize: '13px', letterSpacing: '2px' }} aria-hidden="true">★★★★★</span>
                <span className="caption-4" style={{ color: 'var(--color-primary)', background: 'var(--color-primary-subtle)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                  متدربة موثقة
                </span>
              </div>

              <p className="story-body-text body-3">
                «{item.quote}»
              </p>

              <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-200)', borderTop: '1px solid var(--color-border)' }}>
                <div className="story-author-name title-4">
                  {item.name}
                </div>
                <div className="caption-2" style={{ color: 'var(--color-text-subtle)', marginTop: '2px' }}>
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
