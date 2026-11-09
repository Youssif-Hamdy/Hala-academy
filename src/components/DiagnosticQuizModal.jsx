import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, Award } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "ما هو مستواكِ الحالي وخبرتكِ في وضع المكياج؟",
    options: [
      { text: "مبتدئة تماماً، أشعر بالحيرة أمام الفرش والمنتجات", points: 'self' },
      { text: "أضع مكياجاً بسيطاً لكنه يتأكسد أو يخطط في وجهي", points: 'self' },
      { text: "أجيد وضع المكياج لنفسي، وأريد العمل مع عميلات وعرائس", points: 'pro' },
      { text: "أعمل بالفعل في صالون وأريد تطوير تكنيكاتي وشهادة موثقة", points: 'pro' }
    ]
  },
  {
    id: 2,
    title: "ما هو هدفكِ الأهم الذي ترغبين في تحقيقه خلال الشهرين القادمين؟",
    options: [
      { text: "الاعتماد على نفسي وتوفير مصاريف الصالونات في كل مناسبة", points: 'self' },
      { text: "إتقان رسمة العيون، وتحديد الشفاه، وإخفاء الهالات تماماً", points: 'self' },
      { text: "بدء استقبال حجوزات عرائس وبناء مصدر دخل مستقل ومربح", points: 'pro' },
      { text: "بناء شنطة مكياج احترافية متكاملة وتسعير خدماتي باحتراف", points: 'pro' }
    ]
  },
  {
    id: 3,
    title: "ما مقدار الوقت المتاح لديكِ للتطبيق العملي أسبوعياً؟",
    options: [
      { text: "ساعة إلى ساعتين في أوقات فراغي على راحتي", points: 'self' },
      { text: "أكثر من 4 ساعات أسبوعياً لأنني جادة في تأسيس مهنتي", points: 'pro' }
    ]
  }
];

export default function DiagnosticQuizModal() {
  const { isQuizModalOpen, setIsQuizModalOpen, openEnrollModal } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultTrack, setResultTrack] = useState(null);

  if (!isQuizModalOpen) return null;

  const handleSelectOption = (points) => {
    const updated = { ...answers, [currentStep]: points };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate outcome
      const values = Object.values(updated);
      const proCount = values.filter((v) => v === 'pro').length;
      setResultTrack(proCount >= 2 ? 'pro' : 'self');
    }
  };

  const handleClose = () => {
    setIsQuizModalOpen(false);
    setCurrentStep(0);
    setAnswers({});
    setResultTrack(null);
  };

  const handleApplyResult = () => {
    const track = resultTrack || 'pro';
    handleClose();
    openEnrollModal(track);
  };

  return (
    <div className="lms-modal-backdrop">
      <div style={{
        background: 'var(--color-white)',
        width: '100%',
        maxWidth: '580px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--color-primary)',
          color: 'var(--color-white)',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} className="text-gold" />
            <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '700' }}>
              مستشاركِ التجميلي الذكي
            </h3>
          </div>
          <button onClick={handleClose} style={{ color: 'var(--color-white)', padding: '4px' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {!resultTrack ? (
            <>
              {/* Progress bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px', color: 'var(--color-text-subtle)' }}>
                <span>السؤال {currentStep + 1} من {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '999px', overflow: 'hidden', marginBottom: '28px' }}>
                <div style={{
                  height: '100%',
                  background: 'var(--color-primary)',
                  width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                  transition: 'width 0.3s'
                }}></div>
              </div>

              <h4 style={{ fontSize: '19px', color: 'var(--color-noir)', marginBottom: '24px', lineHeight: '1.4' }}>
                {QUESTIONS[currentStep].title}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {QUESTIONS[currentStep].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(opt.points)}
                    style={{
                      textAlign: 'right',
                      padding: '16px 20px',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--color-white)',
                      fontSize: '15px',
                      color: 'var(--color-text-main)',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.background = 'var(--color-primary-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.background = 'var(--color-white)';
                    }}
                  >
                    <span>{opt.text}</span>
                    <ArrowLeft size={16} color="var(--color-primary)" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Award size={36} />
              </div>

              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                المسار الموصى به لكِ بدقة:
              </div>

              <h3 style={{ fontSize: '26px', color: 'var(--color-noir)', marginBottom: '14px', fontFamily: 'var(--font-serif)' }}>
                {resultTrack === 'pro' ? 'مسار «أطوّر مهاراتي للاحتراف»' : 'مسار «أتعلّم لنفسي»'}
              </h3>

              <p style={{ color: 'var(--color-text-muted)', fontSize: '15.5px', lineHeight: '1.8', marginBottom: '24px' }}>
                {resultTrack === 'pro'
                  ? 'بناءً على طموحكِ، هذا المسار يمنحكِ تقنيات العرائس المتقدمة، وبناء الشنطة، واستراتيجية تسويق نفسك كـ MUA محترفة مع شهادة معتمدة.'
                  : 'بناءً على إجاباتكِ، هذا المسار هو الأنسب تماماً ليعلمكِ كيف تبرزين ملامحكِ بدون تكتل، وتختارين المنتجات الاقتصادية المطابقة لبشرتكِ.'}
              </p>

              <div style={{
                background: 'var(--color-primary-subtle)',
                border: '1px dashed var(--color-accent-rose)',
                padding: '12px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '14px',
                color: 'var(--color-primary)',
                fontWeight: '600',
                marginBottom: '28px'
              }}>
                هدية ترحيبية: كود الخصم <strong>HALA10</strong> مفعّل لكِ بخصم 10% إضافي
              </div>

              <button
                onClick={handleApplyResult}
                className="btn-luxury-primary"
                style={{ width: '100%', padding: '15px', fontSize: '16px', justifyContent: 'center' }}
              >
                <span>الانتقال للتسجيل في المسار المقترح</span>
                <ArrowLeft size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
