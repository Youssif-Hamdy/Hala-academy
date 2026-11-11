import React from 'react';
import { Video, Sparkles, Award, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    id: 'cinema-4k',
    icon: Video,
    num: '01',
    title: 'تصوير سينمائي مقرب',
    description: 'زوايا تصوير دقيقة تُظهر حركة الفرشاة، كمية المستحضر، وتكنيك الدمج خطوة بخطوة بوضوح فائق.'
  },
  {
    id: 'facial-anatomy',
    icon: Sparkles,
    num: '02',
    title: 'تشريح الملامح والأندرتون',
    description: 'منهج علمي مبسّط يناسب كل نوع بشرة وشكل عين، بعيداً عن القوالب الجاهزة أو الطبقات الثقيلة.'
  },
  {
    id: 'certified-mastery',
    icon: Award,
    num: '03',
    title: 'شهادات واعتماد دولي',
    description: 'خلاصة خبرة ميدانية وتدريبية معتمدة في كبرى الورش والملتقيات الاحترافية في العالم العربي.'
  },
  {
    id: 'direct-mentorship',
    icon: ShieldCheck,
    num: '04',
    title: 'متابعة وتقييم مباشر',
    description: 'وصول دائم للدروس مع إشراف فني وتوجيه عملي على تطبيقاتكِ لضمان إتقان المهارة بثقة.'
  }
];

export default function LuxuryPillarsSection() {
  return (
    <section className="luxury-pillars-section" aria-label="مميزات الدراسة في أكاديمية حلا سامي">
      <div className="container">
        <div className="luxury-pillars-header">
          <div className="section-eyebrow caption-3">
            <span>معايير أكاديمية حلا سامي</span>
          </div>
          <h2 className="luxury-pillars-title heading-2">
            تجربة تعليمية صُممت بمعايير الصالونات الفاخرة
          </h2>
        </div>

        <div className="luxury-pillars-grid">
          {PILLARS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="luxury-pillar-card">
                <div className="luxury-pillar-heading-row">
                  <IconComponent size={20} strokeWidth={1.5} className="luxury-pillar-bare-icon" aria-hidden="true" />
                  <h3 className="luxury-pillar-heading title-1">
                    {item.title}
                  </h3>
                </div>
                <p className="luxury-pillar-desc body-5">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

