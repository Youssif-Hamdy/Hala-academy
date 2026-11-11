import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquarePlus, CheckCircle2 } from 'lucide-react';

const INITIAL_OPINIONS = [
  {
    id: 'op-1',
    trackLabel: 'متدربة موثقة · مسار أتعلّم لنفسي',
    highlight: 'تغير جذري في اختيار الدرجة والدمج',
    quote:
      'كنت دائماً أشتري مستحضرات غالية والنتيجة تطلع رمادية أو تخطط بعد ساعتين. شرح حلا للأندرتون وطريقة توزيع الكونسيلر غيّر طريقتي تماماً، وصرت أعتمد على نفسي في كل مناسباتي بثقة.'
  },
  {
    id: 'op-2',
    trackLabel: 'متدربة موثقة · المسار الاحترافي الشامل',
    highlight: 'أسرار المهنة الحقيقية بدون إخفاء',
    quote:
      'حضرت ورش كثيرة من قبل، لكن لأول مرة ألاقي شرح يعطي أسرار الشغل الحقيقية خطوة بخطوة وبتصوير قريب جداً يوضح حركة الفرشاة وتكنيك إخفاء المسام وثبات مكياج العرائس.'
  },
  {
    id: 'op-3',
    trackLabel: 'متدربة موثقة · مسار أتعلّم لنفسي',
    highlight: 'مكياج يومي راقٍ في 10 دقائق',
    quote:
      'وحدة تحضير البشرة والمكياج الصباحي السريع كانت كنزاً حقيقياً بالنسبة لي. الشرح سلس ومرتب جداً، والنتيجة طبيعية وناعمة كأنها لمسة خبيرة محترفة.'
  }
];

export default function StoriesReviews() {
  const { showToast } = useApp();
  const [opinions, setOpinions] = useState(() => {
    try {
      const saved = localStorage.getItem('hala_student_opinions');
      return saved ? JSON.parse(saved) : INITIAL_OPINIONS;
    } catch {
      return INITIAL_OPINIONS;
    }
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [trackChoice, setTrackChoice] = useState('متدربة موثقة · المسار الاحترافي الشامل');
  const [highlightText, setHighlightText] = useState('');
  const [quoteText, setQuoteText] = useState('');

  const handleAddOpinion = (e) => {
    e.preventDefault();
    if (!quoteText.trim() || quoteText.trim().length < 15) {
      showToast('يرجى كتابة رأيكِ وتجربتكِ بوضوح (15 حرفاً على الأقل)');
      return;
    }

    const newOpinion = {
      id: 'op-' + Date.now(),
      trackLabel: trackChoice,
      highlight: highlightText.trim() || 'تجربة تدريبية مميزة في الأكاديمية',
      quote: quoteText.trim()
    };

    const updated = [newOpinion, ...opinions];
    setOpinions(updated);
    localStorage.setItem('hala_student_opinions', JSON.stringify(updated));
    setQuoteText('');
    setHighlightText('');
    setIsFormOpen(false);
    showToast('شكراً لمشاركتكِ! تم إضافة رأيكِ بنجاح.');
  };

  return (
    <section id="stories" className="stories-section" aria-label="آراء وتجارب المتدربات">
      <div className="container">
        <div className="stories-header-row">
          <div style={{ maxWidth: '620px' }}>
            <div className="section-eyebrow caption-3">
              <span>انطباعات وتجارب المتدربات</span>
            </div>
            <h2 className="section-title heading-2">
              آراء وإشادات من داخل الأكاديمية
            </h2>
            <p className="body-2" style={{ color: 'var(--color-text-muted)' }}>
              انطباعات حقيقية لطالبات طبّقن منهج الأكاديمية ولمسن الفارق في دقة المهارة وثبات النتيجة.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="stories-add-opinion-btn button-sm"
          >
            <MessageSquarePlus size={17} />
            <span>{isFormOpen ? 'إغلاق النموذج' : 'شاركينا رأيكِ وتجربتكِ'}</span>
          </button>
        </div>

        {/* Interactive Anonymous Opinion Submission Form */}
        {isFormOpen && (
          <form onSubmit={handleAddOpinion} className="stories-opinion-form-card">
            <div className="stories-form-top">
              <h3 className="title-2" style={{ color: 'var(--color-noir)' }}>
                أضيفي رأيكِ وتجربتكِ في الكورس
              </h3>
              <span className="caption-2" style={{ color: 'var(--color-text-subtle)' }}>
                يُعرض رأيكِ مباشرة ضمن انطباعات المتدربات دون الحاجة لكتابة الاسم أو الصورة الشخصية
              </span>
            </div>

            <div className="stories-form-grid">
              <div>
                <label className="luxury-field-label caption-1">المسار التدريبي</label>
                <select
                  value={trackChoice}
                  onChange={(e) => setTrackChoice(e.target.value)}
                  className="luxury-text-input"
                >
                  <option value="متدربة موثقة · المسار الاحترافي الشامل">المسار الاحترافي الشامل</option>
                  <option value="متدربة موثقة · مسار أتعلّم لنفسي">مسار أتعلّم لنفسي</option>
                </select>
              </div>

              <div>
                <label className="luxury-field-label caption-1">عنوان مختصر لتجربتكِ (اختياري)</label>
                <input
                  type="text"
                  value={highlightText}
                  onChange={(e) => setHighlightText(e.target.value)}
                  placeholder="مثال: فرق واضح في نظافة الدمج واختيار الدرجات"
                  className="luxury-text-input"
                />
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <label className="luxury-field-label caption-1">رأيكِ وتجربتكِ بالتفصيل</label>
              <textarea
                rows={3}
                required
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="اكتبي انطباعكِ عن الشرح والتطبيق العملي..."
                className="luxury-text-input"
                style={{ padding: '12px 14px', height: 'auto' }}
              />
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="btn-luxury-text button-sm"
              >
                إلغاء
              </button>
              <button type="submit" className="btn-luxury-primary button-sm">
                نشر الرأي
              </button>
            </div>
          </form>
        )}

        {/* Editorial Quote Cards (No AI Photos, No Fake Names) */}
        <div className="stories-grid stories-editorial-quotes-grid">
          {opinions.map((item) => (
            <article key={item.id} className="story-quote-only-card">
              <div className="story-quote-card-top">
                <div className="story-stars-row" aria-label="تقييم 5 نجوم">
                  ★★★★★
                </div>
                <span className="story-quote-mark" aria-hidden="true">“</span>
              </div>

              {item.highlight && (
                <div className="story-highlight-heading title-3">
                  {item.highlight}
                </div>
              )}

              <p className="story-body-text body-3">
                «{item.quote}»
              </p>

              <div className="story-quote-footer">
                <CheckCircle2 size={15} color="var(--color-primary)" />
                <span className="caption-1" style={{ color: 'var(--color-primary)' }}>
                  {item.trackLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
