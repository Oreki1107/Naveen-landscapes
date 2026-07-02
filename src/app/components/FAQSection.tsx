import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does a landscaping project take?',
    a: 'Project timelines vary based on scope and complexity. A residential garden typically takes 2–4 weeks, while larger commercial projects may span 2–6 months. We provide a detailed project schedule during the initial consultation so you always know exactly what to expect at each milestone.',
  },
  {
    q: 'Do you provide maintenance services?',
    a: 'Yes — we offer comprehensive year-round maintenance programmes tailored to your landscape. Our plans cover seasonal planting, irrigation servicing, pruning, fertilisation, pest management, and emergency care. We treat your landscape as a living investment and ensure it flourishes every season.',
  },
  {
    q: 'Do you undertake commercial projects?',
    a: 'Absolutely. We have an extensive portfolio of commercial landscapes including corporate campuses, retail spaces, hospitality properties, and public infrastructure. Our team is experienced in large-scale project management and works seamlessly with architects and developers.',
  },
  {
    q: 'Do you work in Bengaluru and Chennai?',
    a: 'Yes — we operate two full-service branches: our founding studio in Chennai, Tamil Nadu, and our Bengaluru branch in Karnataka. Both branches serve clients across their respective cities and the wider South India region, including Coimbatore, Mysuru, and Kodaikanal.',
  },
  {
    q: 'Can I schedule a consultation online?',
    a: 'Yes, you can use the Book Consultation form on this page to schedule your complimentary consultation. Simply fill in your name, contact details, preferred date, and a brief description of your project. Our team will confirm your appointment within 24 hours.',
  },
  {
    q: 'Can you customize designs to match my vision?',
    a: 'Customisation is at the heart of everything we do — every landscape we create is unique. We work closely with you through mood boards, concept drawings, material palettes, and 3D visualisations to ensure the final design reflects your personality, lifestyle, and aspirations exactly.',
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
  visible,
}: {
  item: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isOpen
          ? 'linear-gradient(145deg, rgba(52,78,65,0.07) 0%, rgba(88,129,87,0.04) 100%)'
          : '#FFFFFF',
        border: isOpen
          ? '1px solid rgba(52,78,65,0.2)'
          : '1px solid rgba(52,78,65,0.09)',
        boxShadow: isOpen
          ? '0 12px 40px rgba(52,78,65,0.1)'
          : '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left p-6 group"
      >
        <div className="flex items-center gap-4">
          {/* Step dot */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-300"
            style={{
              background: isOpen
                ? 'linear-gradient(135deg, #344E41, #588157)'
                : 'rgba(52,78,65,0.08)',
              color: isOpen ? 'white' : '#344E41',
              fontSize: '0.72rem',
              fontWeight: 800,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              fontWeight: isOpen ? 700 : 600,
              color: isOpen ? '#344E41' : '#1B1B1B',
              lineHeight: 1.35,
              transition: 'color 0.3s',
            }}
          >
            {item.q}
          </span>
        </div>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg, #D4AF37, #B8941F)'
              : 'rgba(52,78,65,0.07)',
            color: isOpen ? 'white' : '#344E41',
            boxShadow: isOpen ? '0 4px 14px rgba(212,175,55,0.35)' : 'none',
          }}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-6 pb-6"
              style={{ paddingLeft: 'calc(1.5rem + 28px + 1rem)' }}
            >
              <div
                className="h-px mb-4"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(52,78,65,0.2), rgba(212,175,55,0.2), transparent)',
                }}
              />
              <p style={{ color: '#666', fontSize: '0.92rem', lineHeight: 1.85 }}>
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section
      style={{ background: '#FAF9F6', padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Leaf pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cellipse cx='70' cy='70' rx='42' ry='16' fill='%23344E41' transform='rotate(35 70 70)'/%3E%3Cellipse cx='70' cy='70' rx='42' ry='16' fill='%23344E41' transform='rotate(-35 70 70)'/%3E%3C/svg%3E")`,
          backgroundSize: '140px 140px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="text-center mb-14"
          >
            <span
              style={{
                color: '#588157',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              FREQUENTLY ASKED
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: '#1B1B1B',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              Frequently Asked{' '}
              <em style={{ color: '#344E41' }}>Questions</em>
            </h2>
            <p
              style={{
                color: '#888',
                fontSize: '0.95rem',
                maxWidth: '440px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}
            >
              Everything you need to know before beginning your landscape
              transformation.
            </p>
          </motion.div>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                visible={inView}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-12 text-center"
          >
            <p style={{ color: '#888', fontSize: '0.92rem', marginBottom: '1rem' }}>
              Still have questions? We'd love to hear from you.
            </p>
            <button
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #344E41, #588157)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                boxShadow: '0 6px 24px rgba(52,78,65,0.3)',
              }}
            >
              Ask Us Anything
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
