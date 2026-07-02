import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';



const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1678754183715-87b12a70ef28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', label: 'Waterfalls', top: '10%', left: '4%', w: 260, h: 360, rotate: -4 },
  { src: 'https://images.unsplash.com/photo-1780283574760-e8d7fd944da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', label: 'Pool Gardens', top: '55%', left: '2%', w: 220, h: 280, rotate: 3 },
  { src: 'https://images.unsplash.com/photo-1685276535317-eef9a75e7fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', label: 'Stone Pathways', top: '8%', right: '3%', w: 240, h: 320, rotate: 4 },
  { src: 'https://images.unsplash.com/photo-1758812598083-3793dd46195f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', label: 'Resort Spaces', top: '60%', right: '4%', w: 200, h: 260, rotate: -3 },
  { src: 'https://images.unsplash.com/photo-1760972543716-eb03ada2adb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700', label: 'Night Landscapes', top: '32%', right: '1%', w: 180, h: 220, rotate: 2 },
];

/* ── Light ray ─────────────────────────────────────────── */
function LightRay({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...style, filter: 'blur(22px)' }}
      animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [1, 1.3, 1] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Floating leaf ─────────────────────────────────────── */
function FgLeaf({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{ [isLeft ? 'left' : 'right']: 0, zIndex: 3, opacity: 0.45 }}
      animate={{ rotate: isLeft ? [0, 2, 0] : [0, -2, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 0 : 2 }}
    >
      <svg
        width={isLeft ? 320 : 260}
        height="240"
        viewBox={`0 0 ${isLeft ? 320 : 260} 240`}
        style={{ filter: 'blur(8px)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {isLeft ? (
          <>
            <ellipse cx="80" cy="230" rx="110" ry="42" fill="#2A3F2F" transform="rotate(-40 80 230)" />
            <ellipse cx="30" cy="235" rx="80" ry="30" fill="#344E41" transform="rotate(-22 30 235)" opacity="0.85" />
          </>
        ) : (
          <>
            <ellipse cx="190" cy="225" rx="95" ry="38" fill="#2A3F2F" transform="rotate(35 190 225)" />
            <ellipse cx="235" cy="238" rx="70" ry="26" fill="#344E41" transform="rotate(20 235 238)" opacity="0.8" />
          </>
        )}
      </svg>
    </motion.div>
  );
}

/* ── Floating particle ─────────────────────────────────── */
function Particle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: 'rgba(212,175,55,0.6)', filter: 'blur(0.5px)' }}
      animate={{ y: [-12, 12, -12], opacity: [0.2, 0.7, 0.2] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Floating image card ───────────────────────────────── */
function ImageCard({ img, index }: { img: typeof IMAGES[0]; index: number }) {
  const floatAmount = index % 2 === 0 ? -8 : 8;

  return (
    /* Outer: handles entrance (opacity + scale) — no y here to avoid conflicts */
    <motion.div
      className="hidden lg:block"
      style={{
        position: 'absolute',
        top: img.top,
        left: (img as any).left,
        right: (img as any).right,
        width: img.w,
        height: img.h,
        zIndex: 3,
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.15 }}
    >
      {/* Inner: handles continuous float loop — isolated from whileInView */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          rotate: img.rotate,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
          position: 'relative',
        }}
        animate={{ y: [0, floatAmount, 0] }}
        transition={{
          duration: 5.5 + index * 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4 + 1.2,
        }}
      >
        <img
          src={img.src}
          alt={img.label}
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.05)' }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.6) 0%, transparent 55%)' }}
        />
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg"
          style={{
            background: 'rgba(250,249,246,0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
          }}
        >
          {img.label.toUpperCase()}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Cinematic Statement ───────────────────────────────── */
export function CinematicStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });


  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const particles = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      x: (i * 41 + 7) % 100, y: (i * 29 + 13) % 100,
      size: 1.5 + (i % 3), delay: i * 0.22,
    })),
    []
  );

  return (
    <section
      ref={sectionRef}
      style={{ background: '#0E0E0E', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52,78,65,0.18) 0%, transparent 70%)' }}
      />

      {/* Light rays */}
      {[
        { top: '-20%', right: '22%', width: '50px', height: '130%', rotate: '22deg', bg: 'rgba(212,175,55,0.09)' },
        { top: '-10%', right: '38%', width: '40px', height: '110%', rotate: '16deg', bg: 'rgba(88,129,87,0.07)' },
        { top: '-15%', left: '25%', width: '45px', height: '120%', rotate: '-20deg', bg: 'rgba(212,175,55,0.07)' },
      ].map((ray, i) => (
        <LightRay
          key={i}
          delay={i * 1.8}
          style={{
            position: 'absolute',
            top: ray.top,
            right: (ray as any).right,
            left: (ray as any).left,
            width: ray.width,
            height: ray.height,
            background: `linear-gradient(to bottom, transparent, ${ray.bg} 40%, transparent)`,
            transform: `rotate(${ray.rotate})`,
            transformOrigin: 'top center',
          }}
        />
      ))}

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 550px at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,0.055) 0%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* Foreground leaves */}
      <FgLeaf side="left" />
      <FgLeaf side="right" />

      {/* Floating image cards */}
      {IMAGES.map((img, i) => <ImageCard key={img.label} img={img} index={i} />)}

      {/* Central content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full relative" style={{ zIndex: 5 }}>
        <div className="text-center max-w-3xl mx-auto py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
              style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#D4AF37',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              THE NAVEEN PHILOSOPHY
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              marginBottom: '1.5rem',
            }}
          >
            Nature Designed
            <br />
            <em style={{ color: '#D4AF37' }}>To Be Lived</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              lineHeight: 1.85,
              maxWidth: '520px',
              margin: '0 auto 3rem',
              fontWeight: 300,
            }}
          >
            Every outdoor space holds the power to become a living sanctuary — a place
            where nature and design converge in perfect harmony.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 mx-auto px-10 py-4 rounded-full group"
              style={{
                background: 'linear-gradient(135deg, #344E41 0%, #588157 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 12px 40px rgba(52,78,65,0.5)',
              }}
            >
              Begin Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FAF9F6, transparent)', zIndex: 2 }}
      />
    </section>
  );
}
