import React from 'react';
import { POSTS_DATA } from '../data/postsData';
import { useApp } from '../context/AppContext';

export default function PressArticlesSection() {
  const { setActivePost } = useApp();

  // Duplicate for seamless infinite loop
  const duplicatedPosts = [...POSTS_DATA, ...POSTS_DATA];

  return (
    <section id="press" className="press-strip-section" aria-label="في الصحافة والإعلام">
      {/* Simple, Elegant Luxury Headline */}
      <div className="press-strip-header">
        <div className="press-strip-eyebrow">
          <span className="press-star">✦</span>
          <span>MEDIA & PRESS COVERAGE</span>
          <span className="press-star">✦</span>
        </div>
        <h2 className="press-strip-title">
          في الصحافة والإعلام
        </h2>
        <p className="press-strip-english-subtitle">Press & Media Features</p>
      </div>

      {/* Elegant Infinite Moving Strip */}
      <div className="press-strip-marquee-wrapper" dir="ltr">
        <div className="press-strip-marquee-track">
          {duplicatedPosts.map((post, index) => (
            <div
              key={`${post.id}-${index}`}
              className="press-strip-card"
              onClick={() => setActivePost(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActivePost(post)}
              aria-label="معاينة التغطية الصحفية"
            >
              <div className="press-strip-card-media">
                <img
                  src={post.src}
                  alt="تغطية صحفية وإعلامية"
                  loading="lazy"
                  className="press-strip-image"
                />
                <div className="press-strip-overlay">
                  <div className="press-strip-zoom-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                  <span className="press-strip-zoom-text">معاينة التغطية</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
