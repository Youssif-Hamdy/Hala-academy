import React, { useEffect, useRef, useState } from 'react';

const VISION_LINES = [
  'الجمال الحقيقي ليس مجرد ملامح تُزيَّن،',
  'بل مهارة متقنة وهوية واثقة تُبنى خطوة بعد خطوة',
  'لتصنع حضوركِ وتفتح لكِ آفاق الاحتراف.'
];

export default function TaglineReveal() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`tagline-reveal-section ${isVisible ? 'is-revealed' : ''}`}
      aria-label="رؤية وفلسفة الأكاديمية"
    >
      <div className="container">
        <div className="tagline-editorial-card">
          <div className="tagline-ornament-top">
            <span className="tagline-badge">رؤية الأكاديمية</span>
          </div>

          <blockquote className="tagline-quote-block">
            {VISION_LINES.map((line, idx) => (
              <span
                key={idx}
                className="tagline-reveal-line"
                style={{ '--line-index': idx }}
              >
                {line}
              </span>
            ))}
          </blockquote>

          <div className="tagline-author-signature">
            <span className="tagline-author-name">حلا سامي</span>
            <span className="tagline-author-dot" aria-hidden="true">·</span>
            <span className="tagline-author-role">مؤسسة الأكاديمية وخبيرة التجميل</span>
          </div>
        </div>
      </div>
    </section>
  );
}
