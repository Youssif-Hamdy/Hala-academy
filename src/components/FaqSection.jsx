import React, { useState } from 'react';
import { ACADEMY_DATA } from '../data/courseData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const { faqs } = ACADEMY_DATA;

  const toggleFaq = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faqs" style={{ padding: '96px 24px', background: '#FFFFFF', borderTop: '1px solid #F0D8D6' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
          <div className="section-label">
            الأسئلة الشائعة
          </div>
          <h2 className="section-title">
            إجابات على استفساراتك
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;

            return (
              <div
                key={i}
                style={{
                  borderTop: '1px solid #C5899A',
                  borderBottom: i === faqs.length - 1 ? '1px solid #C5899A' : 'none'
                }}
              >
                <div
                  onClick={() => toggleFaq(i)}
                  style={{
                    padding: '24px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontWeight: 600,
                    fontSize: '17px',
                    color: isOpen ? '#7A1C2E' : '#1A1A1A'
                  }}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7A1C2E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                      marginRight: '12px'
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {isOpen && (
                  <div style={{
                    paddingBottom: '24px',
                    fontSize: '15.5px',
                    lineHeight: '1.9',
                    color: '#4A3A3D'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
