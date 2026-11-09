import React from 'react';
import { ACADEMY_DATA } from '../data/courseData';

export default function StoriesReviews() {
  const { reviews } = ACADEMY_DATA;

  return (
    <section id="stories" className="stories-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
          <div className="section-label">
            آراء وتجارب
          </div>
          <h2 className="section-title">
            من متدربات الأكاديمية
          </h2>
        </div>

        <div className="stories-grid">
          {reviews.map((item) => (
            <div key={item.id} className="story-card-item">
              <div className="story-img-container">
                <img src={item.image} alt={item.name} />
              </div>

              <p className="story-body-text">
                {item.quote}
              </p>

              <div className="story-author-name">
                {item.name}
              </div>
              <div style={{ fontSize: '13px', color: '#7A6568', marginTop: '2px' }}>
                {item.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
