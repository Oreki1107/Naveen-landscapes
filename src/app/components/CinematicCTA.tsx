import { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useMotionValue, useMotionTemplate } from 'motion/react';
import { ArrowRight, Leaf } from 'lucide-react';

const LAYERS = [
  { src: 'https://images.unsplash.com/photo-1780283574760-e8d7fd944da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', yFactor: 0.12, opacity: 0.6, scale: 1.08 },
  { src: 'https://images.unsplash.com/photo-1758812598083-3793dd46195f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', yFactor: 0.08, opacity: 0.45, scale: 1.06 },
  { src: 'https://images.unsplash.com/photo-1718630366162-065b76caff06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', yFactor: 0.05, opacity: 0.35, scale: 1.04 },
];

const GLASS_CARDS = [
  { label: 'Projects', value: '100+', x: '6%', y: '25%', delay: 0.4 },
  { label: 'Years', value: '10+', x: '8%', y: '65%', delay: 0.6 },
  { label: 'Clients', value: '500+', x: '84%', y: '30%', delay: 0.8 },
  { label: 'Branches', value: '2', x: '82%', y: '68%', delay: 1.0 },
];

function FloatingGlassCard({
  label, value, x, y, delay,
}: { label: string; value: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute hidden lg:block pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}
        style={{
          background: 'rgba(250,249,246,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(212,175,55,0.22)',
          borderRadius: '18px',
          padding: '0.9rem 1.3rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          textAlign: 'center',
          minWidth: '100px',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#D4AF37',
            lineHeight: 1,
            marginBottom: '3px',
          }}
        >
          {value}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em' }}>
          {label.toUpperCase()}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FgLeaf({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{ [isLeft ? 'left' : 'right']: 0, zIndex: 4, opacity: 0.48, willChange: 'transform, opacity' }}
      animate={{ rotate: isLeft ? [0, 2.5, 0] : [0, -2, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 0 : 1.5 }}
    >
      <svg width={isLeft ? 350 : 280} height="260" viewBox={`0 0 ${isLeft ? 350 : 280} 260`} style={{ filter: 'blur(7px)' }}>
        {isLeft ? (
          <>
            <ellipse cx="90" cy="250" rx="120" ry="46" fill="#1A2F20" transform="rotate(-38 90 250)" />
            <ellipse cx="35" cy="258" rx="88" ry="32" fill="#2A3F2F" transform="rotate(-20 35 258)" opacity="0.9" />
            <ellipse cx="175" cy="258" rx="78" ry="28" fill="#1A2F20" transform="rotate(-48 175 258)" opacity="0.7" />
          </>
        ) : (
          <>
            <ellipse cx="195" cy="248" rx="105" ry="40" fill="#1A2F20" transform="rotate(33 195 248)" />
            <ellipse cx="242" cy="258" rx="75" ry="27" fill="#2A3F2F" transform="rotate(19 242 258)" opacity="0.85" />
          </>
        )}
      </svg>
    </motion.div>
  );
}

function GoldParticle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: 'rgba(212,175,55,0.55)', filter: 'blur(0.5px)', willChange: 'transform, opacity' }}
      animate={{ y: [-14, 14, -14], opacity: [0.2, 0.7, 0.2] }}
      transition={{ duration: 5 + delay * 1.8, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export function CinematicCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll(); // no target — tracks window, never warns

  // MotionValues bypass React's render cycle — zero re-renders on mousemove
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlightBg = useMotionTemplate`radial-gradient(circle 600px at ${mouseX}% ${mouseY}%, rgba(212,175,55,0.06) 0%, transparent 70%)`;

  // Three independent MotionValues for each parallax layer
  const y0 = useMotionValue('0%');
  const y1 = useMotionValue('0%');
  const y2 = useMotionValue('0%');
  const layerYs = [y0, y1, y2];
  const yFactors = [0.12, 0.08, 0.05];

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const el = sectionRef.current;
      if (!el) return;
      const start = el.offsetTop - window.innerHeight;
      const end = el.offsetTop + el.offsetHeight;
      const range = end - start;
      if (range <= 0) return;
      // progress 0 = section enters bottom, 1 = section leaves top
      const p = Math.max(0, Math.min(1, (latest - start) / range));
      yFactors.forEach((f, i) => {
        const pct = ((p * 2 - 1) * f * 100).toFixed(2);
        layerYs[i].set(`${pct}%`);
      });
    });
  }, [scrollY]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - r.left) / r.width) * 100);
      mouseY.set(((e.clientY - r.top) / r.height) * 100);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const particles = useMemo(
    () => Array.from({ length: 32 }, (_, i) => ({ x: (i * 43 + 5) % 100, y: (i * 27 + 11) % 100, size: 1.5 + (i % 3), delay: i * 0.2 })),
    []
  );

  return (
    <section
      ref={sectionRef}
      style={{ background: '#0A0A0A', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* Parallax image layers */}
      {LAYERS.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ y: layerYs[i] as any, willChange: 'transform' }}
        >
          <img
            src={layer.src}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: layer.opacity, transform: `scale(${layer.scale})`, filter: 'saturate(0.7)' }}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      ))}

      {/* Multi-layer dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.65)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 50%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(52,78,65,0.15) 0%, transparent 60%)' }} />

      {/* Light rays */}
      {[
        { right: '20%', rot: 22, opacity: 0.1, delay: 0 },
        { right: '35%', rot: 16, opacity: 0.07, delay: 1.5 },
        { left: '28%', rot: -20, opacity: 0.08, delay: 0.8 },
      ].map((ray, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: '-15%', right: (ray as any).right, left: (ray as any).left,
            width: '48px', height: '130%',
            background: `linear-gradient(to bottom, transparent, rgba(212,175,55,${ray.opacity}) 40%, transparent)`,
            transform: `rotate(${ray.rot}deg)`,
            transformOrigin: 'top center',
            filter: 'blur(20px)',
            willChange: 'transform, opacity',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: ray.delay }}
        />
      ))}

      {/* Mouse spotlight — driven by MotionValue, zero React re-renders */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => <GoldParticle key={i} {...p} />)}
      </div>

      {/* Foreground leaves */}
      <FgLeaf side="left" />
      <FgLeaf side="right" />

      {/* Floating glass stat cards */}
      {GLASS_CARDS.map((card) => (
        <FloatingGlassCard key={card.label} {...card} />
      ))}

      {/* Central content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full relative" style={{ zIndex: 5 }}>
        <div className="text-center max-w-3xl mx-auto py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-10"
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
            <Leaf className="w-4 h-4" style={{ color: '#D4AF37' }} />
            <span style={{ color: '#D4AF37', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em' }}>
              NAVEEN LANDSCAPES · EST. 2016
            </span>
            <Leaf className="w-4 h-4" style={{ color: '#D4AF37', transform: 'scaleX(-1)' }} />
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 50px rgba(0,0,0,0.6)',
              marginBottom: '1.2rem',
            }}
          >
            Bring Nature
            <br />
            <em style={{ color: '#D4AF37' }}>Home</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              lineHeight: 1.85,
              maxWidth: '500px',
              margin: '0 auto 3.5rem',
              fontWeight: 300,
            }}
          >
            Crafted with passion and precision since 2016.
            Let us create your outdoor sanctuary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center gap-3 mx-auto px-12 py-5 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                color: '#1B1B1B',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.04em',
                boxShadow: '0 16px 50px rgba(212,175,55,0.45)',
              }}
            >
              {/* Shine sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.7 }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transform: 'skewX(-20deg)',
                }}
              />
              Schedule Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, #FAF9F6, transparent)', zIndex: 3 }} />
    </section>
  );
}
