import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Clock, Maximize2, ArrowRight, Check } from 'lucide-react';
import PROJECT_IMAGE from '../../imports/12.png';

const SERVICES = ['Podium Landscape Design', 'Water Feature & Cascade', 'Tree Planting & Softscape', 'Irrigation & Lighting'];

const METRICS = [
  { icon: <Maximize2 className="w-4 h-4" />, label: 'Project Area', value: 'Several Acres' },
  { icon: <Clock className="w-4 h-4" />, label: 'Duration', value: '5 Months' },
];

/* ── Timeline bar ──────────────────────────────────────── */
function TimelineBar({ visible }: { visible: boolean }) {
  const stages = ['Consultation', 'Design', 'Execution', 'Reveal'];
  return (
    <div className="mb-8">
      <div
        style={{
          fontSize: '0.68rem',
          color: '#588157',
          fontWeight: 700,
          letterSpacing: '0.18em',
          marginBottom: '0.8rem',
        }}
      >
        PROJECT TIMELINE
      </div>
      <div className="flex items-center gap-0">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center flex-1">
            <div className="flex flex-col items-center" style={{ minWidth: '60px' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={visible ? { scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.12, type: 'spring', stiffness: 260 }}
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: i < 4 ? 'linear-gradient(135deg, #344E41, #588157)' : 'rgba(52,78,65,0.12)',
                  boxShadow: '0 2px 10px rgba(52,78,65,0.3)',
                }}
              >
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </motion.div>
              <span style={{ fontSize: '0.62rem', color: '#888', marginTop: '4px', whiteSpace: 'nowrap' }}>
                {stage}
              </span>
            </div>
            {i < stages.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={visible ? { scaleX: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.4 }}
                className="flex-1 h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #344E41, #D4AF37)',
                  transformOrigin: 'left',
                  marginBottom: '16px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Before / After mini-card ──────────────────────────── */
function BeforeAfterCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden mb-8"
      style={{
        border: '1px solid rgba(52,78,65,0.12)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      <div className="grid grid-cols-2">
        <div
          className="p-4 text-center"
          style={{ background: 'rgba(27,27,27,0.04)', borderRight: '1px solid rgba(52,78,65,0.1)' }}
        >
          <div style={{ fontSize: '0.62rem', color: '#999', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
            BEFORE
          </div>
          <div
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#666',
            }}
          >
            Ordinary Backyard
          </div>
        </div>
        <div
          className="p-4 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(52,78,65,0.06), rgba(88,129,87,0.04))' }}
        >
          <div style={{ fontSize: '0.62rem', color: '#D4AF37', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
            AFTER
          </div>
          <div
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#344E41',
            }}
          >
            Private Resort Experience
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Floating leaf ornament ────────────────────────────── */
function LeafOrnament({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="70" height="48" viewBox="0 0 70 48" fill="none">
        <ellipse cx="35" cy="24" rx="32" ry="15" fill="#344E41" opacity="0.12" transform="rotate(-25 35 24)" />
        <line x1="10" y1="32" x2="60" y2="16" stroke="#D4AF37" strokeWidth="0.8" opacity="0.25" />
        <line x1="22" y1="18" x2="35" y2="28" stroke="#344E41" strokeWidth="0.5" opacity="0.2" />
      </svg>
    </motion.div>
  );
}

/* ── Project Of The Month ──────────────────────────────── */
export function ProjectOfTheMonth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <section
      style={{ background: '#FAF9F6', padding: '110px 0', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Floating ornaments */}
      <LeafOrnament style={{ top: '8%', right: '3%', opacity: 0.9 }} />
      <LeafOrnament style={{ bottom: '12%', left: '2%', opacity: 0.7, transform: 'rotate(40deg)' }} />

      {/* Subtle vertical grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23344E41'/%3E%3Crect width='1' height='4' fill='%23FAF9F6' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '4px 4px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
          <span style={{ color: '#D4AF37', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.24em' }}>
            PROJECT OF THE MONTH
          </span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
        </motion.div>

        {/* Main editorial grid */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

          {/* LEFT — Large image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ aspectRatio: '4/3' }}
          >
            <div
              className="relative w-full h-full rounded-3xl overflow-hidden"
              style={{
                boxShadow: '0 30px 80px rgba(52,78,65,0.18)',
              }}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              <img
                src={PROJECT_IMAGE}
                alt="Podium Garden with Water Feature, Chennai"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{
                  transform: imgHovered ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(27,27,27,0.55) 0%, transparent 55%)',
                }}
              />

              {/* Image credit / editorial mark */}
              <div
                className="absolute top-5 left-5 px-3 py-1.5 rounded-xl"
                style={{
                  background: 'rgba(250,249,246,0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <span style={{ color: 'white', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em' }}>
                  APARTMENT COMMUNITY
                </span>
              </div>

              {/* Bottom image label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  Podium Garden with Water Feature
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-white/60" />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem' }}>
                    Chennai, Tamil Nadu
                  </span>
                </div>
              </div>
            </div>

            {/* Floating award badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-4 -right-4 lg:-right-6 rounded-2xl p-5 text-center"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                boxShadow: '0 16px 40px rgba(212,175,55,0.45)',
                minWidth: '120px',
              }}
            >
              <div style={{ fontSize: '0.58rem', color: 'rgba(27,27,27,0.7)', fontWeight: 700, letterSpacing: '0.18em', marginBottom: '2px' }}>
                FEATURED
              </div>
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#1B1B1B',
                  lineHeight: 1,
                }}
              >
                ★ 4.8
              </div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(27,27,27,0.65)', marginTop: '2px' }}>Client Rating</div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Editorial content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-4"
          >
            {/* Category + headline */}
            <span style={{ color: '#588157', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
              APARTMENT COMMUNITY LANDSCAPE
            </span>

            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                fontWeight: 700,
                color: '#1B1B1B',
                lineHeight: 1.15,
                marginBottom: '0.5rem',
              }}
            >
              Podium Garden
              <br />
              <em style={{ color: '#344E41' }}>with Water Feature</em>
            </h2>

            <div className="flex items-center gap-2 mb-8">
              <MapPin className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
              <span style={{ color: '#666', fontSize: '0.88rem' }}>Chennai, Tamil Nadu</span>
            </div>

            {/* Glass metric cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(52,78,65,0.12)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: '#588157' }}>
                    {m.icon}
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: '#888' }}>
                      {m.label.toUpperCase()}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#1B1B1B',
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Services checklist */}
            <div className="mb-8">
              <div style={{ fontSize: '0.68rem', color: '#888', fontWeight: 600, letterSpacing: '0.18em', marginBottom: '0.8rem' }}>
                SERVICES DELIVERED
              </div>
              <div className="space-y-2.5">
                {SERVICES.map((svc, i) => (
                  <motion.div
                    key={svc}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #344E41, #588157)' }}
                    >
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span style={{ color: '#444', fontSize: '0.9rem', fontWeight: 500 }}>{svc}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Before/After mini-card */}
            <BeforeAfterCard />

            {/* Timeline */}
            <TimelineBar visible={inView} />

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 rounded-full group"
              style={{
                background: 'linear-gradient(135deg, #344E41, #588157)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: '0 8px 30px rgba(52,78,65,0.35)',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 40px rgba(52,78,65,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(52,78,65,0.35)';
              }}
            >
              View Full Case Study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
