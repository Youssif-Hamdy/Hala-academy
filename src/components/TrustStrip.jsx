import React from 'react';

const TRUST_ITEMS = [
  { label: 'شعار موثّق' },
  { label: 'شهادة معتمدة' },
  { label: 'تكريم دولي' },
  { label: 'ورش القاهرة وطرابلس' },
  { label: 'ظهور إعلامي' }
];

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="trust-inner">
        <div className="trust-title">
          شهادات وتكريمات وجهات تعاون موثّقة
        </div>

        <div className="trust-badges-grid">
          {TRUST_ITEMS.map((item, idx) => (
            <div key={idx} className="trust-badge-card">
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
