import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WORK_LOOKS = [
  { id: 'look-1', src: '/assets/images/exaple/1.png', title: 'إطلالة ميكب 1' },
  { id: 'look-2', src: '/assets/images/exaple/2.png', title: 'إطلالة ميكب 2' },
  { id: 'look-3', src: '/assets/images/exaple/3.png', title: 'إطلالة ميكب 3' },
  { id: 'look-4', src: '/assets/images/exaple/4.png', title: 'إطلالة ميكب 4' },
  { id: 'look-5', src: '/assets/images/exaple/5.jpg', title: 'إطلالة ميكب 5' },
  { id: 'look-6', src: '/assets/images/exaple/6.jpeg', title: 'إطلالة ميكب 6' },
  { id: 'look-7', src: '/assets/images/exaple/7.jpeg', title: 'إطلالة ميكب 7' },
  { id: 'look-8', src: '/assets/images/exaple/8.jpeg', title: 'إطلالة ميكب 8' },
  { id: 'look-9', src: '/assets/images/exaple/9.jpeg', title: 'إطلالة ميكب 9' },
  { id: 'look-10', src: '/assets/images/exaple/10.jpeg', title: 'إطلالة ميكب 10' },
  { id: 'look-11', src: '/assets/images/exaple/11.jpeg', title: 'إطلالة ميكب 11' },
  { id: 'look-12', src: '/assets/images/exaple/12.jpeg', title: 'إطلالة ميكب 12' },
  { id: 'look-13', src: '/assets/images/exaple/13.jpeg', title: 'إطلالة ميكب 13' }
];

const SLIDE_COUNT = WORK_LOOKS.length;
const SLIDES = [...WORK_LOOKS, WORK_LOOKS[0]];

export default function MakeupShowcase() {
  const { setActiveCertificate, openEnrollModal } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [instant, setInstant] = useState(false);
  const touchStartX = useRef(0);

  const realIndex = activeIndex % SLIDE_COUNT;

  const goTo = (index) => {
    setActiveIndex((index + SLIDE_COUNT) % SLIDE_COUNT);
  };

  const goNext = () => setActiveIndex((current) => current + 1);

  const goPrev = () => {
    if (activeIndex === 0) {
      setInstant(true);
      setActiveIndex(SLIDE_COUNT);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setInstant(false);
          setActiveIndex(SLIDE_COUNT - 1);
        });
      });
      return;
    }
    setActiveIndex((current) => current - 1);
  };

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(goNext, 3800);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (activeIndex !== SLIDE_COUNT) return undefined;
    const timer = window.setTimeout(() => {
      setInstant(true);
      setActiveIndex(0);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    if (!instant) return undefined;
    const timer = window.setTimeout(() => setInstant(false), 30);
    return () => window.clearTimeout(timer);
  }, [instant]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  return (
    <section id="looks" className="makeup-showcase-section" aria-label="أعمال الميكب">
      <div className="container makeup-showcase-container">
        <div className="makeup-showcase-split">
          <div className="makeup-showcase-copy-col">
            <div className="section-eyebrow caption-3">
              <span>أعمال الأكاديمية</span>
            </div>
            <h2 className="heading-2 makeup-showcase-title">شغل الميكب كما يظهر على البشرة</h2>
            <p className="body-2 makeup-showcase-copy">
              إطلالات حقيقية من تطبيق حلا سامي: دمج نظيف، درجات متناسقة، ولمسة ثابتة تناسب المكياج اليومي ومكياج المناسبات.
            </p>
            <ul className="makeup-showcase-points makeup-showcase-points--desktop-only">
              <li>تصوير يوضح حركة الفرشاة وكمية المستحضر</li>
              <li>نتائج عملية على ملامح مختلفة بدون فلتر</li>
              <li>نفس الأسلوب الذي تتعلمينه داخل الكورس</li>
            </ul>
            <button
              type="button"
              className="btn-luxury-primary button-sm"
              onClick={() => openEnrollModal('pro')}
            >
              اكتشفي الكورس
            </button>
          </div>

          <div
            className="makeup-showcase-media-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="makeup-showcase-frame">
              <button
                type="button"
                className="makeup-showcase-nav makeup-showcase-nav-prev"
                onClick={goPrev}
                aria-label="الإطلالة السابقة"
              >
                <ChevronRight size={20} strokeWidth={1.6} />
              </button>

              <div
                className="makeup-showcase-viewport"
                dir="ltr"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`makeup-showcase-track ${instant ? 'is-instant' : ''}`}
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {SLIDES.map((look, index) => (
                    <button
                      key={`${look.id}-${index}`}
                      type="button"
                      className="makeup-showcase-slide"
                      onClick={() => setActiveCertificate(look)}
                      aria-label={`تكبير ${look.title}`}
                    >
                      <span className="makeup-showcase-card">
                        <img src={look.src} alt={look.title} loading={index === 0 ? 'eager' : 'lazy'} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="makeup-showcase-nav makeup-showcase-nav-next"
                onClick={goNext}
                aria-label="الإطلالة التالية"
              >
                <ChevronLeft size={20} strokeWidth={1.6} />
              </button>
            </div>

            <div className="makeup-showcase-dots" role="tablist" aria-label="اختيار الإطلالة">
              {WORK_LOOKS.map((look, index) => (
                <button
                  key={look.id}
                  type="button"
                  className={`makeup-showcase-dot ${index === realIndex ? 'is-active' : ''}`}
                  onClick={() => goTo(index)}
                  aria-label={look.title}
                  aria-selected={index === realIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
