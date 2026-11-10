import React, { useState } from 'react';
import { ACADEMY_DATA } from '../data/courseData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const { faqs } = ACADEMY_DATA;

  const toggleFaq = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section" aria-label="الأسئلة الشائعة">
      <div className="container">
        <div className="faq-container">
          <div style={{ maxWidth: '680px', marginBottom: 'var(--spacing-600)' }}>
            <div className="section-eyebrow caption-3">
              الأسئلة الشائعة
            </div>
            <h2 className="section-title heading-2">
              إجابات دقيقة على كل ما يشغل بالك
            </h2>
            <p className="body-2" style={{ color: 'var(--color-text-muted)' }}>
              كل ما تحتاجين معرفته حول المنهج، الوصول للدروس، الشهادات المعتمدة، وطرق المتابعة والتطبيق.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;

              return (
                <div key={i} className="faq-item">
                  <div
                    onClick={() => toggleFaq(i)}
                    className={`faq-trigger title-3 ${isOpen ? 'open' : ''}`}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform var(--duration-fast) var(--motion-base)',
                        flexShrink: 0,
                        marginRight: 'var(--spacing-200)'
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {isOpen && (
                    <div className="faq-answer body-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
