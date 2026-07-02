import { memo, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const HERO_BG =
  'https://images.unsplash.com/photo-1758612120966-b20c01160c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

/* ─────────────────────────────────────────────────────────
   SUN GLARE — atmospheric halo + anamorphic flare streak
   Positioned upper-right where natural light originates.
───────────────────────────────────────────────────────── */
const SunGlare = memo(function SunGlare() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top: '16%', right: '20%', zIndex: 2 }}
    >
      {/* Outer atmospheric haze — very large, very soft */}
      <motion.div
        style={{
          position: 'absolute',
          width: 750,
          height: 750,
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.07) 0%, rgba(180,128,28,0.04) 45%, transparent 70%)',
          filter: 'blur(48px)',
          willChange: 'transform, opacity',
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mid golden halo */}
      <motion.div
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,208,64,0.13) 0%, rgba(212,175,55,0.07) 50%, transparent 75%)',
          filter: 'blur(28px)',
          willChange: 'transform, opacity',
        }}
        animate={{ scale: [0.88, 1.22, 0.88], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Bright inner core */}
      <motion.div
        style={{
          position: 'absolute',
          width: 90,
          height: 90,
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,248,196,0.75) 0%, rgba(255,210,60,0.38) 45%, transparent 72%)',
          filter: 'blur(10px)',
          willChange: 'transform, opacity',
        }}
        animate={{ scale: [0.7, 1.45, 0.7], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      {/* Anamorphic horizontal lens-flare streak */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '380px',
          height: '2px',
          transform: 'translate(-50%, -50%)',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.18) 18%, rgba(255,242,160,0.55) 42%, rgba(255,255,224,0.75) 50%, rgba(255,242,160,0.55) 58%, rgba(212,175,55,0.18) 82%, transparent 100%)',
          borderRadius: '99px',
          filter: 'blur(1px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scaleX: [0, 1, 0.89, 0],
          opacity: [0, 0.9, 1, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.18, 0.72, 1],
        }}
      />

      {/* Secondary shorter streak (offset timing) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '4px',
          left: '50%',
          width: '200px',
          height: '1px',
          transform: 'translate(-50%, -50%)',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,230,120,0.3) 30%, rgba(255,245,180,0.55) 50%, rgba(255,230,120,0.3) 70%, transparent 100%)',
          borderRadius: '99px',
          filter: 'blur(0.5px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scaleX: [0, 1, 0.8, 0],
          opacity: [0, 0.6, 0.75, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.22, 0.68, 1],
          delay: 0.4,
        }}
      />
    </div>
  );
});

/* ─────────────────────────────────────────────────────────
   STAR SPARKLE — 4-point cross with glowing centre
   Arms taper via gradient; centre glow pulses independently.
   The whole element appears → holds → fades in a looping cycle.
───────────────────────────────────────────────────────── */
interface SparkleProps {
  x: string;
  y: string;
  size: number;
  delay: number;
  intensity?: number;
  rotateDeg?: number;
}

const StarSparkle = memo(function StarSparkle({ x, y, size, delay, intensity = 0.85, rotateDeg = 90 }: SparkleProps) {
  const goldFull = `rgba(212,175,55,${intensity})`;
  const goldHot  = `rgba(255,242,155,${Math.min(1, intensity + 0.1)})`;
  const armThick = Math.max(1, size * 0.03);
  const centerR  = Math.max(3.5, size * 0.14);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 2,
        willChange: 'transform, opacity',
      }}
      animate={{
        opacity: [0, intensity, intensity * 0.88, 0],
        scale:   [0, 1, 0.94, 0],
        rotate:  [0, rotateDeg],
      }}
      transition={{
        duration: 2.6 + delay * 0.55,
        repeat: Infinity,
        delay,
        ease: 'anticipate',
        times: [0, 0.2, 0.72, 1],
      }}
    >
      {/* Vertical arm */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: armThick,
          height: '100%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(to bottom, transparent 0%, ${goldHot} 38%, ${goldFull} 50%, ${goldHot} 62%, transparent 100%)`,
          borderRadius: '99px',
        }}
      />
      {/* Horizontal arm */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: armThick,
          transform: 'translateY(-50%)',
          background: `linear-gradient(to right, transparent 0%, ${goldHot} 38%, ${goldFull} 50%, ${goldHot} 62%, transparent 100%)`,
          borderRadius: '99px',
        }}
      />
      {/* Centre bright glow — pulses on its own rhythm */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: centerR * 2,
          height: centerR * 2,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,254,220,0.98) 0%, rgba(255,228,100,0.65) 50%, transparent 100%)',
          filter: `blur(${Math.max(1, centerR * 0.35)}px)`,
          willChange: 'transform, opacity',
        }}
        animate={{ scale: [0.7, 1.6, 0.7], opacity: [0.75, 1, 0.75] }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.3,
        }}
      />
    </motion.div>
  );
});

/* ─────────────────────────────────────────────────────────
   GLOW ORB — soft bokeh-style atmospheric blob.
   Large → blurred → pulsing. Adds warm depth to the air.
───────────────────────────────────────────────────────── */
interface OrbProps { x: string; y: string; size: number; delay: number; warm?: boolean }

const GlowOrb = memo(function GlowOrb({ x, y, size, delay, warm = true }: OrbProps) {
  const bg = warm
    ? 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(178,128,24,0.10) 50%, transparent 75%)'
    : 'radial-gradient(circle, rgba(255,238,160,0.18) 0%, transparent 70%)';

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: bg,
        filter: `blur(${Math.round(size * 0.28)}px)`,
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform, opacity',
      }}
      animate={{ opacity: [0.12, 0.52, 0.12], scale: [0.82, 1.18, 0.82] }}
      transition={{ duration: 5 + delay * 1.6, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
});

/* ─────────────────────────────────────────────────────────
   GLARE DUST — tiny warm motes drifting upward.
   Replace the old neutral dots with warm-toned, glowing specks.
───────────────────────────────────────────────────────── */
interface DustProps { x: number; y: number; size: number; delay: number }

const WARM_COLORS = [
  'rgba(212,175,55,0.8)',
  'rgba(255,210,70,0.7)',
  'rgba(255,238,150,0.75)',
  'rgba(200,155,40,0.7)',
];

const GlareDust = memo(function GlareDust({ x, y, size, delay }: DustProps) {
  const color = WARM_COLORS[Math.round(x + y + delay) % WARM_COLORS.length];
  const driftX = ((delay * 13.7) % 14) - 7; // −7 … +7 px

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 4}px ${size * 1.5}px ${color.replace(/[\d.]+\)$/, '0.25)')}`,
        pointerEvents: 'none',
        zIndex: 2,
        willChange: 'transform, opacity',
      }}
      animate={{
        y:       [0, -(18 + size * 4), 0],
        x:       [0, driftX, 0],
        opacity: [0, 0.9, 0],
        scale:   [0.3, 1.1, 0.3],
      }}
      transition={{
        duration: 4 + delay * 1.7,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
});

/* ─────────────────────────────────────────────────────────
   Static sparkle / orb / dust data — defined once, outside
   the component, so there are no useMemo deps.
───────────────────────────────────────────────────────── */
const SPARKLES: SparkleProps[] = [
  // Large — concentrated near the sun glare source
  { x: '71%', y: '17%', size: 60, delay: 0.2,  intensity: 0.9 },
  { x: '57%', y: '27%', size: 45, delay: 3.1,  intensity: 0.78 },
  { x: '84%', y: '43%', size: 38, delay: 1.7,  intensity: 0.72 },
  // Medium — scattered across the upper half
  { x: '24%', y: '37%', size: 30, delay: 4.0,  intensity: 0.65 },
  { x: '44%', y: '54%', size: 26, delay: 0.9,  intensity: 0.65, rotateDeg: 60 },
  { x: '67%', y: '61%', size: 22, delay: 5.2,  intensity: 0.6  },
  { x: '32%', y: '19%', size: 24, delay: 2.2,  intensity: 0.6, rotateDeg: 75 },
  { x: '89%', y: '29%', size: 18, delay: 6.0,  intensity: 0.55 },
  // Small — twinkling in the background
  { x: '14%', y: '47%', size: 14, delay: 2.7,  intensity: 0.5 },
  { x: '51%', y: '14%', size: 16, delay: 3.8,  intensity: 0.58 },
  { x: '77%', y: '71%', size: 12, delay: 5.5,  intensity: 0.48, rotateDeg: 45 },
  { x: '39%', y: '79%', size: 13, delay: 1.3,  intensity: 0.45 },
  { x: '63%', y: '88%', size: 10, delay: 7.0,  intensity: 0.42 },
];

const ORBS: OrbProps[] = [
  { x: '70%', y: '19%', size: 200, delay: 0,   warm: true  },
  { x: '82%', y: '46%', size: 140, delay: 1.8, warm: true  },
  { x: '30%', y: '34%', size: 110, delay: 2.8, warm: false },
  { x: '54%', y: '64%', size: 95,  delay: 4.2, warm: true  },
  { x: '14%', y: '24%', size: 75,  delay: 1.1, warm: false },
  { x: '46%', y: '42%', size: 60,  delay: 3.5, warm: true  },
];

const DUST: DustProps[] = Array.from({ length: 30 }, (_, i) => ({
  x:     (i * 37.3 + 11) % 100,
  y:     (i * 29.1 + 7)  % 100,
  size:  1 + (i % 3),
  delay: i * 0.21,
}));

/* ─────────────────────────────────────────────────────────
   Blurred foreground leaf cluster (unchanged)
───────────────────────────────────────────────────────── */
function ForegroundLeaves({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{
        left: isLeft ? 0 : 'auto',
        right: isLeft ? 'auto' : 0,
        zIndex: 3,
        transformOrigin: 'bottom center',
      }}
      animate={{ rotate: isLeft ? [0, 2.5, 0] : [0, -2, 0] }}
      transition={{ duration: isLeft ? 9 : 11, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 0 : 1.5 }}
    >
      <svg
        width={isLeft ? 380 : 300}
        height="280"
        viewBox={`0 0 ${isLeft ? 380 : 300} 280`}
        style={{ filter: `blur(${isLeft ? 7 : 10}px)`, opacity: isLeft ? 0.52 : 0.4 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {isLeft ? (
          <>
            <ellipse cx="90" cy="270" rx="130" ry="50" fill="#2A3F2F" transform="rotate(-38 90 270)" />
            <ellipse cx="35" cy="275" rx="95"  ry="34" fill="#344E41" transform="rotate(-22 35 275)" opacity="0.85" />
            <ellipse cx="180" cy="280" rx="85" ry="30" fill="#3A5A40" transform="rotate(-48 180 280)" opacity="0.7" />
            <line x1="90" y1="200" x2="90" y2="275" stroke="#D4AF37" strokeWidth="0.7" opacity="0.2" />
          </>
        ) : (
          <>
            <ellipse cx="210" cy="260" rx="110" ry="42" fill="#2A3F2F" transform="rotate(32 210 260)" />
            <ellipse cx="255" cy="272" rx="80"  ry="30" fill="#344E41" transform="rotate(18 255 272)" opacity="0.85" />
          </>
        )}
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Floating glass stat card (unchanged)
───────────────────────────────────────────────────────── */
const StatGlassCard = memo(function StatGlassCard({ value, label, delay, floatOffset }: {
  value: string; label: string; delay: number; floatOffset: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, floatOffset, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay + 1.2 }}
        style={{
          background: 'rgba(250,249,246,0.07)',
          backdropFilter: 'blur(26px)',
          WebkitBackdropFilter: 'blur(26px)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '22px',
          padding: '1.25rem 1.6rem',
          boxShadow: '0 8px 36px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.07)',
          minWidth: '158px',
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)', borderRadius: '22px', pointerEvents: 'none' }} />
        <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.62rem', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '0.45rem' }}>
          {label.toUpperCase()}
        </div>
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.3rem', fontWeight: 700, color: '#D4AF37', lineHeight: 1, textShadow: '0 2px 16px rgba(212,175,55,0.3)' }}>
          {value}
        </div>
        <div style={{ marginTop: '0.8rem', height: '1.5px', background: 'linear-gradient(90deg, rgba(212,175,55,0.7), rgba(212,175,55,0.1), transparent)', borderRadius: '1px' }} />
      </motion.div>
    </motion.div>
  );
});

/* ─────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────── */
const STAT_CARDS = [
  { value: '100+', label: 'Projects Completed', top: '17%', right: '8%', delay: 1.05, float: -7 },
  { value: '10+',   label: 'Years Experience',   top: '46%', right: '3%', delay: 1.25, float: -9 },
  { value: '500+', label: 'Happy Clients',       top: '73%', right: '9%', delay: 1.45, float: -6 },
];

const LIGHT_RAYS = [
  { right: '16%', rotation: 24,  opacity: 0.11,  delay: 0,   h: '130%', top: '-15%' },
  { right: '26%', rotation: 19,  opacity: 0.07,  delay: 1.8, h: '115%', top: '-10%' },
  { right: '38%', rotation: 30,  opacity: 0.065, delay: 0.9, h: '120%', top: '-12%' },
  { right: '10%', rotation: 14,  opacity: 0.09,  delay: 2.5, h: '100%', top: '0%'  },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY      = useTransform(scrollY, [0, 900], [0, 200]);
  const contentY = useTransform(scrollY, [0, 900], [0, 110]);
  const fadeOut  = useTransform(scrollY, [0, 650], [1, 0]);

  // MotionValues bypass React's render cycle — no re-renders on mousemove
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlightBg = useMotionTemplate`radial-gradient(circle 520px at ${mouseX}% ${mouseY}%, rgba(212,175,55,0.065) 0%, transparent 70%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - r.left) / r.width) * 100);
      mouseY.set(((e.clientY - r.top) / r.height) * 100);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="home" ref={heroRef} className="relative overflow-hidden" style={{ height: '100vh', minHeight: '680px' }}>

      {/* Ken Burns background */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: bgY }}>
        <motion.img
          src={HERO_BG}
          alt="Luxury landscape aerial"
          className="w-full h-full object-cover"
          style={{ transformOrigin: 'center center', willChange: 'transform' }}
          animate={{ scale: [1.1, 1.2] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          draggable={false}
          fetchPriority="high"
          decoding="sync"
        />
      </motion.div>

      {/* Cinematic dark overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,27,27,0.78) 0%, rgba(52,78,65,0.42) 45%, rgba(27,27,27,0.68) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,27,27,0.88) 0%, transparent 55%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(27,27,27,0.38) 0%, transparent 40%)' }} />

      {/* Diagonal light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {LIGHT_RAYS.map((ray, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              right: ray.right, top: ray.top,
              width: '55px', height: ray.h,
              background: `linear-gradient(to bottom, transparent 0%, rgba(212,175,55,${ray.opacity}) 35%, rgba(250,249,246,${ray.opacity * 0.55}) 65%, transparent 100%)`,
              transform: `rotate(${ray.rotation}deg)`,
              transformOrigin: 'top center',
              filter: 'blur(20px)',
              willChange: 'transform, opacity',
            }}
            animate={{ opacity: [0.45, 1, 0.45], scaleX: [1, 1.3, 1] }}
            transition={{ duration: 7 + i * 1.8, repeat: Infinity, ease: 'easeInOut', delay: ray.delay }}
          />
        ))}
      </div>

      {/* Mouse spotlight — driven by MotionValue, zero React re-renders */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* ── SUN GLARE SYSTEM ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Atmospheric sun halo + lens flare streak */}
        <SunGlare />

        {/* Soft bokeh glow orbs */}
        {ORBS.map((orb, i) => <GlowOrb key={i} {...orb} />)}

        {/* 4-point sparkle stars */}
        {SPARKLES.map((sp, i) => <StarSparkle key={i} {...sp} />)}

        {/* Warm floating dust motes */}
        {DUST.map((d, i) => <GlareDust key={i} {...d} />)}
      </div>

      {/* Foreground depth leaves */}
      <ForegroundLeaves side="left" />
      <ForegroundLeaves side="right" />

      {/* Floating glass stat cards — desktop only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
        {STAT_CARDS.map((card) => (
          <div key={card.value} style={{ position: 'absolute', top: card.top, right: card.right }}>
            <StatGlassCard value={card.value} label={card.label} delay={card.delay} floatOffset={card.float} />
          </div>
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        className="absolute inset-0 flex items-center"
        style={{ y: contentY, opacity: fadeOut, zIndex: 5 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
                style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.38)', color: '#D4AF37', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', backdropFilter: 'blur(12px)', display: 'inline-flex' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37', display: 'inline-block' }} />
                PREMIUM LANDSCAPE DESIGN
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5 }}
              className="text-white mb-6"
              style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)', fontWeight: 700, lineHeight: 1.12, textShadow: '0 4px 40px rgba(0,0,0,0.55)' }}
            >
              Transforming Spaces Into{' '}
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Living Landscapes</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75 }}
              className="text-white/70 mb-10"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontWeight: 300, lineHeight: 1.85, maxWidth: '560px' }}
            >
              Premium Landscape Design, Construction & Maintenance Across South India
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #344E41 0%, #588157 100%)', color: 'white', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em', boxShadow: '0 8px 32px rgba(52,78,65,0.55)' }}
              >
                View Projects
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'white', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em', border: '1px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(12px)' }}
              >
                Book Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: fadeOut as any, zIndex: 5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
      >
        <motion.div
          animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1.5px', height: '32px', background: 'linear-gradient(to bottom, rgba(212,175,55,0.8), transparent)', borderRadius: '1px', marginBottom: '4px' }}
        />
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.62rem', letterSpacing: '0.26em', fontWeight: 600 }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
