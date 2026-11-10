import React from 'react';

const TRUST_CREDENTIALS = [
  { 
    title: 'اعتماد دولي',
    desc: 'منهج موافق لمعايير فنون التجميل العالمية'
  },
  { 
    title: '+10 سنوات خبرة',
    desc: 'خبرة حلا سامي في التدريب والمكياج السينمائي والعرائس'
  },
  { 
    title: 'شهادة رقمية موثقة',
    desc: 'تحمل رقماً تسلسلياً يثبت إتمامك لكافة متطلبات الكورس'
  },
  { 
    title: 'ورش القاهرة ودبي',
    desc: 'مئات الخريجات اللاتي أطلقن مشاريعهن الخاصة بنجاح'
  }
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="الاعتمادات والمصداقية">
      <div className="container">
        <div className="trust-inner">
          <div className="trust-heading-block">
            <span className="caption-3 trust-eyebrow">معايير التميز</span>
            <p className="trust-title title-3">
              اعتمادات وخبرة مهنية موثوقة تضمن لكِ أعلى جودة تدريبية
            </p>
          </div>

          <div className="trust-badges-grid">
            {TRUST_CREDENTIALS.map((item, idx) => (
              <div key={idx} className="trust-badge-card">
                <div className="trust-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div className="trust-card-text">
                  <h3 className="trust-item-title title-4">{item.title}</h3>
                  <p className="trust-item-desc caption-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
