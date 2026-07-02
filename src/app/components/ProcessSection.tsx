import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MessageSquare, PenTool, Shovel, Leaf } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: <MessageSquare className="w-7 h-7" />,
    title: 'Consultation',
    subtitle: 'Listen & Understand',
    description:
      'We begin with an in-depth consultation to understand your vision, space, lifestyle, and aspirations. Every great landscape starts with truly understanding the person who will live within it.',
    color: '#344E41',
    accent: 'rgba(52,78,65,0.12)',
  },
  {
    number: '02',
    icon: <PenTool className="w-7 h-7" />,
    title: 'Design',
    subtitle: 'Concept & Planning',
    description:
      'Our designers craft detailed concepts, material palettes, and 3D visualizations. You see your future landscape before a single stone is placed — refined until it feels exactly right.',
    color: '#588157',
    accent: 'rgba(88,129,87,0.12)',
  },
  {
    number: '03',
    icon: <Shovel className="w-7 h-7" />,
    title: 'Execution',
    subtitle: 'Craft & Transform',
    description:
      'Our skilled craftsmen bring the design to life with precision and care. Every detail — from stone placement to plant positioning — is executed with the meticulous attention of a master artist.',
    color: '#D4AF37',
    accent: 'rgba(212,175,55,0.1)',
  },
  {
    number: '04',
    icon: <Leaf className="w-7 h-7" />,
    title: 'Maintenance',
    subtitle: 'Nurture & Sustain',
    description:
      'A living landscape evolves. Our ongoing care programs ensure your outdoor sanctuary continues to flourish through every season — always at its most beautiful and healthy.',
    color: '#344E41',
    accent: 'rgba(52,78,65,0.12)',
  },
];

/* ── Organic connector (SVG arrow) ──────────────────── */
function Connector({ index }: { index: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-12">
      <svg
        width="48"
        height="32"
        viewBox="0 0 48 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Organic wavy line */}
        <motion.path
          d="M4 16 Q12 10 24 16 Q36 22 44 16"
          stroke="url(#connGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 + index * 0.2 }}
        />
        {/* Arrowhead */}
        <motion.path
          d="M40 12 L44 16 L40 20"
          stroke="url(#connGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 + index * 0.2 }}
        />
        {/* Small leaf */}
        <motion.ellipse
          cx="24"
          cy="13"
          rx="4"
          ry="2"
          fill="rgba(88,129,87,0.4)"
          transform="rotate(-25 24 13)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 + index * 0.2, type: 'spring' }}
        />
        <defs>
          <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#344E41" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#588157" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Process step card ───────────────────────────────── */
function StepCard({
  step,
  index,
  visible,
}: {
  step: typeof STEPS[0];
  index: number;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl p-7 flex-1 group"
      style={{
        background: '#FAF9F6',
        border: '1px solid rgba(52,78,65,0.11)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        minWidth: '220px',
        transition: 'all 0.45s ease',
      }}
      whileHover={{
        y: -10,
        boxShadow: '0 28px 70px rgba(52,78,65,0.16)',
      }}
    >
      {/* Hover gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
        }}
      />

      {/* Background accent circle */}
      <div
        className="absolute top-4 right-4 w-32 h-32 rounded-full pointer-events-none transition-all duration-500 group-hover:scale-125"
        style={{ background: step.accent, filter: 'blur(20px)' }}
      />

      {/* Step number */}
      <div
        className="mb-4"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '3.5rem',
          fontWeight: 800,
          color: 'rgba(52,78,65,0.08)',
          lineHeight: 1,
          position: 'absolute',
          top: '1rem',
          right: '1.5rem',
        }}
      >
        {step.number}
      </div>

      {/* Icon */}
      <div
        className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400"
        style={{
          background: `linear-gradient(135deg, ${step.accent}, ${step.accent})`,
          color: step.color,
          border: `1px solid ${step.color}22`,
        }}
      >
        {step.icon}
      </div>

      {/* Small leaf ornament */}
      <div className="flex items-center gap-2 mb-2">
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <ellipse cx="9" cy="5" rx="7" ry="3.5" fill={step.color} opacity="0.4" transform="rotate(-15 9 5)" />
          <line x1="9" y1="1" x2="9" y2="9" stroke={step.color} strokeWidth="0.7" opacity="0.5" transform="rotate(-15 9 5)" />
        </svg>
        <span
          style={{
            color: step.color,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
          }}
        >
          STEP {step.number}
        </span>
      </div>

      <h3
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: '#1B1B1B',
          lineHeight: 1.2,
          marginBottom: '0.3rem',
        }}
      >
        {step.title}
      </h3>

      <div
        style={{
          color: step.color,
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          marginBottom: '1rem',
        }}
      >
        {step.subtitle}
      </div>

      <p
        style={{
          color: '#666',
          fontSize: '0.88rem',
          lineHeight: 1.8,
        }}
      >
        {step.description}
      </p>

      {/* Bottom accent */}
      <div
        className="mt-5 pt-4"
        style={{ borderTop: '1px solid rgba(52,78,65,0.08)' }}
      >
        <div className="flex items-center gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? '18px' : '6px',
                height: '6px',
                background: i === index ? step.color : 'rgba(52,78,65,0.15)',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Process Section ────────────────────────────────── */
export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      style={{ background: '#1B1B1B', padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(88,129,87,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52,78,65,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <span
            style={{
              color: '#D4AF37',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            OUR PROCESS
          </span>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            How We Bring Your Vision{' '}
            <em style={{ color: '#D4AF37' }}>To Life</em>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            A seamless journey from concept to completion — crafted with artistry at
            every step.
          </p>
        </motion.div>

        {/* Steps — horizontal desktop / vertical mobile */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-col lg:flex-row items-center flex-1">
              <StepCard step={step} index={i} visible={inView} />
              {i < STEPS.length - 1 && <Connector index={i} />}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-14"
        >
          <button
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
              color: '#1B1B1B',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              boxShadow: '0 8px 32px rgba(212,175,55,0.4)',
            }}
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
