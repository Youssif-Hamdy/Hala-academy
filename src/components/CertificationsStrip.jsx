import React from 'react';
import { CERTIFICATES_DATA } from '../data/certificatesData';
import { useApp } from '../context/AppContext';

export default function CertificationsStrip() {
  const { setActiveCertificate } = useApp();

  // Duplicate certificates to create a continuous seamless loop
  const duplicatedCertificates = [...CERTIFICATES_DATA, ...CERTIFICATES_DATA];

  return (
    <section id="certifications" className="certifications-strip-section" aria-label="شهادات حلا">
      {/* Simple, Elegant Luxury Headline */}
      <div className="cert-strip-header">
        <div className="cert-strip-eyebrow">
          <span>ACCREDITATIONS & HONORS</span>
        </div>
        <h2 className="cert-strip-title">
          شهادات حلا
        </h2>
        <p className="cert-strip-english-subtitle">Halla's Certifications</p>
      </div>

      {/* Elegant Infinite Moving Strip */}
      <div className="cert-strip-marquee-wrapper" dir="ltr">
        <div className="cert-strip-marquee-track">
          {duplicatedCertificates.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="cert-strip-card"
              onClick={() => setActiveCertificate(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCertificate(cert)}
              aria-label={`معاينة شهادة ${cert.title}`}
            >
              <div className="cert-strip-card-media">
                <img
                  src={cert.src}
                  alt={cert.title}
                  loading="lazy"
                  className="cert-strip-image"
                />
                <div className="cert-strip-overlay">
                  <div className="cert-strip-zoom-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                  <span className="cert-strip-zoom-text">معاينة الشهادة</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
