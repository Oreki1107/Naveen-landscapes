import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'motion/react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  description: string;
  icon: string;
}

const STATS: Stat[] = [
  {
    value: 100, suffix: '+', label: 'Projects Completed', sub: 'Across South India',
    description: 'Residential gardens, commercial campuses, resort grounds, and public spaces transformed with artistry.',
    icon: '🌿',
  },
  {
    value: 10, suffix: '+', label: 'Years Experience', sub: 'Since 2016',
    description: 'Ten years of refining our craft — from design consultation to final reveal and ongoing care.',
    icon: '✦',
  },
  {
    value: 500, suffix: '+', label: 'Happy Clients', sub: 'Residential + Commercial',
    description: 'Homeowners, developers, hospitality groups, and institutions who trust us with their spaces.',
    icon: '❤',
  },
  {
    value: 2, suffix: '', label: 'Branches', sub: 'Chennai & Bengaluru',
    description: 'Two full-service studios serving clients across Tamil Nadu, Karnataka, and wider South India.',
    icon: '◉',
  },
];

/* ── Tiny card particle ──────────────────────────────── */
function CardParticle({ x, y, delay, gold }: { x: number; y: number; delay: number; gold: boolean }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`, top: `${y}%`,
        width: 3, height: 3,
        background: gold ? 'rgba(212,175,55,0.55)' : 'rgba(88,129,87,0.45)',
      }}
      animate={{ y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] }}
      transition={{ duration: 4 + delay * 2, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ── Animated counter ────────────────────────────────── */
function Counter({ target, suffix, run }: { target: number; suffix: string; run: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let start = 0;
    const steps = 80;
    const inc = target / steps;
    const interval = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(interval); }
      else { setVal(Math.floor(start)); }
    }, 1800 / steps);
    return () => clearInterval(interval);
  }, [run, target]);
  return <>{val}{suffix}</>;
}

/* ── Premium stat card ───────────────────────────────── */
function StatCard({ stat, index, visible }: { stat: Stat; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () => Array.from({ length: 6 }, (_, i) => ({
      x: 10 + (i * 17.3) % 80,
      y: 10 + (i * 23.7) % 80,
      delay: i * 0.3,
      gold: i % 2 === 0,
    })),
    []
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (r.height / 2)) * -5,
      y: ((e.clientX - cx) / (r.width / 2)) * 5,
    });
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      className="relative overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8 text-center"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.15s ease' : 'transform 0.5s ease, box-shadow 0.4s ease',
        background: hovered
          ? 'rgba(255,255,255,0.92)'
          : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: hovered ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(52,78,65,0.12)',
        boxShadow: hovered
          ? '0 24px 64px rgba(52,78,65,0.18), 0 0 0 1px rgba(212,175,55,0.15)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        cursor: 'default',
      }}
    >
      {/* Gradient glow behind on hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(212,175,55,0.12) 0%, transparent 65%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top gold line on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full transition-opacity duration-400"
        style={{
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Tiny floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <CardParticle key={i} {...p} />
        ))}
      </div>

      {/* Icon */}
      <div
        className="mb-3 text-2xl transition-transform duration-400"
        style={{
          transform: hovered ? 'scale(1.2) translateY(-2px)' : 'scale(1)',
        }}
      >
        {stat.icon}
      </div>

      {/* Counter */}
      <div
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.2rem, 8vw, 3.4rem)',
          fontWeight: 700,
          color: hovered ? '#D4AF37' : '#344E41',
          lineHeight: 1,
          marginBottom: '0.55rem',
          transition: 'color 0.4s ease',
          textShadow: hovered ? '0 2px 20px rgba(212,175,55,0.25)' : 'none',
        }}
      >
        <Counter target={stat.value} suffix={stat.suffix} run={visible} />
      </div>

      <div style={{ fontWeight: 700, color: '#1B1B1B', fontSize: 'clamp(0.75rem, 3vw, 0.92rem)', marginBottom: '0.2rem' }}>
        {stat.label}
      </div>

      {/* Sub label transitions to description on hover */}
      <div
        style={{
          fontSize: '0.82rem',
          color: '#888',
          fontWeight: 400,
          lineHeight: 1.6,
          maxHeight: hovered ? '60px' : '20px',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, color 0.3s ease',
        }}
      >
        {hovered ? stat.description : stat.sub}
      </div>

      {/* Gold accent bar */}
      <div
        className="mx-auto mt-4 rounded-full transition-all duration-400"
        style={{
          height: '2px',
          width: hovered ? '60%' : '30%',
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }}
      />
    </motion.div>
  );
}

export function StatisticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: '#FAF9F6', padding: '80px 0' }} ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} visible={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center mt-10 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(88,129,87,0.4))' }} />
          <span className="text-center leading-relaxed" style={{ color: '#588157', fontSize: 'clamp(0.6rem, 2vw, 0.73rem)', fontWeight: 600, letterSpacing: '0.18em' }}>
            SOUTH INDIA COVERAGE • SERVING EXCELLENCE SINCE 2016
          </span>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, rgba(88,129,87,0.4), transparent)' }} />
        </motion.div>
      </div>
    </section>
  );
}
