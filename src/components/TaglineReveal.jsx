import React, { useEffect, useRef, useState } from 'react';

export default function TaglineReveal() {
  const containerRef = useRef(null);
  const [activeWordsCount, setActiveWordsCount] = useState(0);

  const text = "الجمال الحقيقي ليس مجرد ملامح تُزيَّن، بل مهارة متقنة وهوية واثقة تُبنى خطوة بعد خطوة لتصنع حضوركِ وتفتح لكِ آفاق الاحتراف.";
  const words = text.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress as the section moves across the viewport
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.25;
      const current = rect.top;

      if (current > start) {
        setActiveWordsCount(0);
      } else if (current < end) {
        setActiveWordsCount(words.length);
      } else {
        const progress = (start - current) / (start - end);
        const count = Math.min(words.length, Math.floor(progress * words.length));
        setActiveWordsCount(count);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <section ref={containerRef} className="tagline-reveal-section">
      <div className="container">
        <div className="tagline-inner">
          <div className="tagline-badge caption-3">
            <span>فلسفة الأكاديمية</span>
          </div>

          <h2 className="tagline-heading heading-2">
            {words.map((word, index) => {
              const isActive = index < activeWordsCount;
              return (
                <span
                  key={index}
                  className={`tagline-word ${isActive ? 'active' : ''}`}
                  style={{
                    transitionDelay: `${Math.min(index * 20, 200)}ms`
                  }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </h2>

          <div className="tagline-author title-3">
            <span>حلا سامي</span>
            <span className="tagline-author-title caption-2">· مؤسسة الأكاديمية وخبيرة التجميل</span>
          </div>
        </div>
      </div>
    </section>
  );
}
