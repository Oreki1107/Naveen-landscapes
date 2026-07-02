import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, ArrowRight, Quote } from 'lucide-react';
import BEFORE_IMG from '../../imports/before.png';
import AFTER_IMG from '../../imports/after.png';

const METRICS = [
  { value: '45', unit: 'Days', label: 'Project Duration' },
  { value: 'Several', unit: 'Acres', label: 'Area Transformed' },
  { value: '30%', unit: 'Increase', label: 'Property Value' },
  { value: '100%', unit: 'Rating', label: 'Client Satisfaction' },
];

export function TransformationStories() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const sectionRef = useRef<HTMLElement>(null);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);

  function handleMouseMove(e: React.MouseEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSpotX(((e.clientX - r.left) / r.width) * 100);
    setSpotY(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section
      ref={sectionRef}
      style={{ background: '#0E0E0E', padding: '100px 0', position: 'relative', overflow: 'hidden', minHeight: '80vh' }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${spotX}% ${spotY}%, rgba(52,78,65,0.1) 0%, transparent 70%)`,
          transition: 'background 0.4s ease',
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(212,175,55,0.8) 1px, transparent 1px)`,
          backgroundSize: '42px 42px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <span
            style={{
              color: '#D4AF37',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            CASE STUDY
          </span>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
            }}
          >
            Transformation{' '}
            <em style={{ color: '#D4AF37' }}>Stories</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.8 }}>
            A single project. An extraordinary journey. A life changed.
          </p>
        </motion.div>

        {/* Images — Before / After split */}
        <div className="relative mb-10">
          <div className="grid lg:grid-cols-2 gap-4">
            {/* BEFORE */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl"
              style={{ aspectRatio: '4/3' }}
            >
              <img src={BEFORE_IMG} alt="Before" className="w-full h-full object-cover" style={{ filter: 'saturate(0.6)' }} loading="lazy" decoding="async" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,14,14,0.5) 0%, transparent 60%)' }} />
              <div
                className="absolute top-5 left-5 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(14,14,14,0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                }}
              >
                BEFORE
              </div>
              <div className="absolute bottom-5 left-5">
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '2px' }}>Bare Entrance Wall</div>
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem' }}>Raw earth, no planting</div>
              </div>
            </motion.div>

            {/* AFTER */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl"
              style={{ aspectRatio: '4/3' }}
            >
              <img src={AFTER_IMG} alt="After" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(52,78,65,0.3) 0%, transparent 60%)' }} />
              <div
                className="absolute top-5 left-5 px-4 py-2 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #344E41, #588157)',
                  color: 'white',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  boxShadow: '0 4px 16px rgba(52,78,65,0.45)',
                }}
              >
                AFTER
              </div>
              <div className="absolute bottom-5 left-5">
                <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>Luxury Tropical Villa Entrance</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>Palm Avenue Residence · Coimbatore</div>
              </div>
            </motion.div>
          </div>

          {/* Central divider */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center z-10">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                width: '1.5px',
                flex: 1,
                background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)',
                transformOrigin: 'top',
                boxShadow: '0 0 12px rgba(212,175,55,0.4)',
              }}
            />
          </div>

          {/* Floating metrics card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 hidden lg:block"
            style={{
              background: 'rgba(14,14,14,0.88)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(212,175,55,0.25)',
              borderRadius: '24px',
              padding: '1.5rem 2rem',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              minWidth: '520px',
            }}
          >
            <div className="grid grid-cols-4 gap-6">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: '#D4AF37',
                      lineHeight: 1,
                      marginBottom: '2px',
                    }}
                  >
                    {m.value}
                    <span style={{ fontSize: '0.9rem' }}> {m.unit}</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', fontWeight: 500 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating quote card + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 lg:mt-28 grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Quote */}
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: 'rgba(52,78,65,0.12)',
              border: '1px solid rgba(52,78,65,0.3)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Quote className="w-8 h-8 mb-4" style={{ color: 'rgba(212,175,55,0.35)' }} />
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "Our entrance wall was just bare plaster and raw earth for years. Naveen Landscapes reimagined it completely — the golden render, the sweeping hedges, the frangipani at golden hour. Every guest who arrives now stops and stares. It changed the entire character of our home."
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #344E41, #588157)', color: 'white', fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 700 }}
              >
                A
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Rajiv Krishnamurthy</div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" style={{ color: '#D4AF37' }} />
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>Palm Avenue Residence · Coimbatore</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project info + CTA */}
          <div className="text-center lg:text-left">
            <div style={{ color: '#D4AF37', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '0.8rem' }}>
              FEATURED PROJECT
            </div>
            <h3
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '0.6rem',
              }}
            >
              Palm Avenue Villa Entrance
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A bare boundary wall and raw earth beds transformed in 45 days into a landmark
              tropical entrance — clipped hedges, agave, frangipani, and a warm ochre render finish.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 mx-auto lg:mx-0 px-8 py-4 rounded-full group"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                color: '#1B1B1B',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 8px 30px rgba(212,175,55,0.4)',
              }}
            >
              Read Complete Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
