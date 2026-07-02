import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MessageCircle, PenTool, Package, HardHat, Sparkles } from 'lucide-react';
import stageImg1 from '../../imports/1.png';
import stageImg2 from '../../imports/4.png';
import stageImg3 from '../../imports/2.png';
import stageImg4 from '../../imports/3.png';
import stageImg5 from '../../imports/9.png';

const STAGES = [
  {
    number: '01',
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Consultation',
    subtitle: 'Understanding Your Vision',
    duration: '1–2 Weeks',
    description:
      'We begin with a site visit and deep conversation. Our designer studies the existing space, listens carefully to your aspirations, and maps out a shared vision — whether it is a residential entrance, a community podium, or a coastal resort landscape.',
    image: stageImg1,
    side: 'right' as const,
  },
  {
    number: '02',
    icon: <PenTool className="w-5 h-5" />,
    title: 'Concept Design',
    subtitle: 'From Imagination to Blueprint',
    duration: '2–3 Weeks',
    description:
      'Mood boards, planting palettes, detailed drawings, and layout plans bring your landscape to life on paper. We refine every composition — the balance of shade and light, the rhythm of planting layers, the flow of pathways — until the design feels inevitable.',
    image: stageImg2,
    side: 'left' as const,
  },
  {
    number: '03',
    icon: <Package className="w-5 h-5" />,
    title: 'Material Selection',
    subtitle: 'Curating the Finest Elements',
    duration: '1–2 Weeks',
    description:
      'Timber pergolas, ceramic planters, paving stone, specimen trees, and curated tropical plantings are individually sourced for quality and character. We select each element to ensure the landscape ages beautifully over decades.',
    image: stageImg3,
    side: 'right' as const,
  },
  {
    number: '04',
    icon: <HardHat className="w-5 h-5" />,
    title: 'Execution',
    subtitle: 'Craftsmanship in Motion',
    duration: '4–12 Weeks',
    description:
      'Our skilled ground team brings the design to life with precision — setting avenue trees at exact spacing, laying stone pathways level and true, establishing lawn and groundcover with care for long-term health and beauty.',
    image: stageImg4,
    side: 'left' as const,
  },
  {
    number: '05',
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Final Reveal',
    subtitle: 'Your Space, Transformed',
    duration: 'Completion Day',
    description:
      'At the reveal, you experience the landscape for the first time — pathways winding through coastal plantings, the golden hour light warming the foliage, the sound of water and wind through tropical canopy. We hand over your sanctuary with a full maintenance plan.',
    image: stageImg5,
    side: 'right' as const,
  },
];

/* ── Tiny leaf motif ─────────────────────────────────── */
function TinyLeaf({ style }: { style: React.CSSProperties }) {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" style={style}>
      <ellipse cx="11" cy="7" rx="10" ry="5" fill="#344E41" opacity="0.25" transform="rotate(-20 11 7)" />
      <line x1="2" y1="9" x2="20" y2="5" stroke="#D4AF37" strokeWidth="0.7" opacity="0.35" />
    </svg>
  );
}

/* ── Journey stage card ──────────────────────────────── */
function JourneyStage({ stage, index }: { stage: typeof STAGES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isRight = stage.side === 'right';

  return (
    <div ref={ref} className="relative">
      {/* Center line node */}
      <div
        className="absolute left-1/2 top-8 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center"
        style={{ gap: 0 }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #344E41, #588157)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(52,78,65,0.45)',
            zIndex: 10,
          }}
        >
          {stage.icon}
        </motion.div>
        {/* Connecting line to next stage */}
        {index < STAGES.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{
              width: '1.5px',
              height: '120px',
              background: 'linear-gradient(to bottom, #344E41, rgba(52,78,65,0.15))',
              transformOrigin: 'top',
              marginTop: '0',
            }}
          />
        )}
      </div>

      {/* Stage grid */}
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 !== 0 ? '' : ''}`}>
        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: isRight ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={isRight ? 'lg:order-1' : 'lg:order-2'}
          style={{ paddingRight: isRight ? '60px' : 0, paddingLeft: !isRight ? '60px' : 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TinyLeaf style={{}} />
            <span style={{ color: '#588157', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em' }}>
              STEP {stage.number}
            </span>
          </div>

          <h3
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 700,
              color: '#1B1B1B',
              lineHeight: 1.2,
              marginBottom: '0.3rem',
            }}
          >
            {stage.title}
          </h3>

          <div
            className="flex items-center gap-2 mb-4"
            style={{ color: '#D4AF37', fontSize: '0.8rem', fontWeight: 600 }}
          >
            <span className="w-8 h-px rounded-full inline-block" style={{ background: '#D4AF37' }} />
            {stage.subtitle}
          </div>

          <p style={{ color: '#666', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '1.2rem' }}>
            {stage.description}
          </p>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(52,78,65,0.07)',
              border: '1px solid rgba(52,78,65,0.15)',
            }}
          >
            <span style={{ color: '#344E41', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em' }}>
              DURATION
            </span>
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                color: '#344E41',
                fontSize: '0.88rem',
                fontWeight: 600,
              }}
            >
              {stage.duration}
            </span>
          </div>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: isRight ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`relative ${isRight ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              aspectRatio: '4/3',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={stage.image}
              alt={stage.title}
              className="w-full h-full object-cover"
              style={{ transition: 'transform 0.7s ease' }}
              loading="lazy"
              decoding="async"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            />
          </div>

          {/* Stage number watermark */}
          <div
            className="absolute -top-4 -right-4 text-right pointer-events-none select-none"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '7rem',
              fontWeight: 800,
              color: 'rgba(52,78,65,0.05)',
              lineHeight: 1,
            }}
          >
            {stage.number}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Project Journey Section ─────────────────────────── */
export function ProjectJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section style={{ background: '#FFFFFF', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Light leaf tile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='50' rx='30' ry='12' fill='%23344E41' transform='rotate(30 50 50)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span
            style={{
              color: '#588157',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            THE JOURNEY
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
            From Vision{' '}
            <em style={{ color: '#344E41' }}>To Reality</em>
          </h2>
          <p style={{ color: '#888', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto', lineHeight: 1.8 }}>
            One project. Five chapters. An extraordinary transformation from first conversation to final reveal.
          </p>
        </motion.div>

        {/* Stages */}
        <div className="relative space-y-20 lg:space-y-0">
          {/* Vertical center line on desktop */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
            style={{ background: 'linear-gradient(to bottom, rgba(52,78,65,0.05) 0%, rgba(52,78,65,0.2) 30%, rgba(52,78,65,0.2) 70%, rgba(52,78,65,0.05) 100%)' }}
          />

          {STAGES.map((stage, i) => (
            <div key={stage.number} style={{ paddingBottom: i < STAGES.length - 1 ? '5rem' : 0 }}>
              <JourneyStage stage={stage} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
