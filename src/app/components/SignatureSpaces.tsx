import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import spaceImg1 from '../../imports/4.png';
import spaceImg2 from '../../imports/12.png';
import spaceImg3 from '../../imports/9.png';
import spaceImg4 from '../../imports/5.png';
import spaceImg5 from '../../imports/11.png';
import spaceImg6 from '../../imports/6.png';
import spaceImg7 from '../../imports/7.png';
import spaceImg8 from '../../imports/8.png';

const SPACES = [
  {
    id: 1,
    title: 'Tropical Courtyard Gardens',
    description: 'Private courtyard landscapes with layered tropical planting, stone pathways, and golden-hour atmosphere.',
    category: 'Residential',
    image: spaceImg1,
    accentColor: '#D4AF37',
  },
  {
    id: 2,
    title: 'Podium Water Features',
    description: 'Cascading water walls and raised planting beds that transform apartment podiums into living gardens.',
    category: 'Apartment Communities',
    image: spaceImg2,
    accentColor: '#588157',
  },
  {
    id: 3,
    title: 'Coastal Tropical Landscapes',
    description: 'Large-scale naturalistic landscapes that connect built environments to the coast at sunset.',
    category: 'Coastal & Resort',
    image: spaceImg3,
    accentColor: '#344E41',
  },
  {
    id: 4,
    title: 'Modern Garden Walkways',
    description: 'Minimal stepping-stone compositions through manicured lawns alongside contemporary architecture.',
    category: 'Residential',
    image: spaceImg4,
    accentColor: '#D4AF37',
  },
  {
    id: 5,
    title: 'Masterplanned Corridors',
    description: 'Aerial-scale landscape systems integrating canopy, circulation, and ecology across large developments.',
    category: 'Master Planning',
    image: spaceImg5,
    accentColor: '#588157',
  },
  {
    id: 6,
    title: 'Palm Avenue Residences',
    description: 'Warm ochre boundary walls, sweeping hedges, and tropical plantings creating landmark villa entrances.',
    category: 'Residential',
    image: spaceImg6,
    accentColor: '#D4AF37',
  },
  {
    id: 7,
    title: 'Hospitality Landscapes',
    description: 'Commercial streetscape planting that draws people in and creates immersive botanical environments.',
    category: 'Commercial',
    image: spaceImg7,
    accentColor: '#344E41',
  },
  {
    id: 8,
    title: 'Interior Botanical Spaces',
    description: 'Indoor planting compositions that bring natural warmth and life into commercial and hospitality interiors.',
    category: 'Commercial',
    image: spaceImg8,
    accentColor: '#588157',
  },
];

const CARD_WIDTH = 460;
const CARD_GAP = 40;

function SpaceCard({ space, index }: { space: typeof SPACES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
      style={{
        width: CARD_WIDTH,
        height: '75vh',
        maxHeight: '640px',
        minHeight: '440px',
        boxShadow: hovered
          ? '0 40px 100px rgba(0,0,0,0.55)'
          : '0 16px 50px rgba(0,0,0,0.35)',
        transition: 'box-shadow 0.5s ease',
      }}
      whileHover={{ scale: 1.02, zIndex: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with parallax on hover */}
      <img
        src={space.image}
        alt={space.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        style={{
          transform: hovered ? 'scale(1.1)' : 'scale(1.04)',
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Base dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(14,14,14,0.92) 0%, rgba(14,14,14,0.3) 50%, transparent 80%)',
        }}
      />

      {/* Hover colour wash */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(145deg, ${space.accentColor}18 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top category pill */}
      <div
        className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full"
        style={{
          background: 'rgba(250,249,246,0.1)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.16em',
        }}
      >
        {space.category.toUpperCase()}
      </div>

      {/* Card number */}
      <div
        className="absolute top-5 right-5"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '4rem',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.05)',
          lineHeight: 1,
        }}
      >
        {String(space.id).padStart(2, '0')}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        {/* Gold accent bar */}
        <motion.div
          className="mb-4 rounded-full"
          style={{ height: '1.5px', background: `linear-gradient(90deg, ${space.accentColor}, transparent)` }}
          animate={{ width: hovered ? '70%' : '35%' }}
          transition={{ duration: 0.5 }}
        />

        <h3
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '0.6rem',
          }}
        >
          {space.title}
        </h3>

        {/* Description reveals on hover */}
        <motion.p
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            marginBottom: '1.1rem',
          }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4 }}
        >
          {space.description}
        </motion.p>

        {/* Explore button */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="flex items-center gap-2"
            style={{
              color: space.accentColor,
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Explore Space
            <ArrowRight className="w-3.5 h-3.5" style={{ transform: hovered ? 'translateX(4px)' : 'none', transition: 'transform 0.3s' }} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function SignatureSpaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  // useScroll with no target — tracks window scroll, never triggers the warning
  const { scrollY } = useScroll();

  // MotionValues updated imperatively from scroll events
  const x = useMotionValue(80);
  const scrollYProgress = useMotionValue(0); // used for progress bar

  // Keep track width in a ref so scroll handler always sees latest value
  const translateXRef = useRef(0);

  useEffect(() => {
    function calcTrack() {
      if (!trackRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      translateXRef.current = Math.max(0, trackW - window.innerWidth + 80);
    }
    calcTrack();
    window.addEventListener('resize', calcTrack);
    return () => window.removeEventListener('resize', calcTrack);
  }, []);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const el = sectionRef.current;
      if (!el) return;
      const start = el.offsetTop;
      const end = el.offsetTop + el.offsetHeight - window.innerHeight;
      const range = end - start;
      if (range <= 0) return;
      const p = Math.max(0, Math.min(1, (latest - start) / range));
      x.set(80 - translateXRef.current * p);
      scrollYProgress.set(p);
    });
  }, [scrollY]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      style={{ height: '350vh', position: 'relative' }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#1B1B1B',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full mb-10"
        >
          <div className="flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
            >
              <span
                style={{
                  color: '#D4AF37',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  display: 'block',
                  marginBottom: '0.7rem',
                }}
              >
                SIGNATURE COLLECTION
              </span>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: 1.2,
                }}
              >
                Explore{' '}
                <em style={{ color: '#D4AF37' }}>Signature Spaces</em>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.82rem',
                maxWidth: '220px',
                textAlign: 'right',
                lineHeight: 1.7,
                display: 'none',
              }}
              className="lg:block"
            >
              Immersive outdoor experiences crafted with precision. Scroll to explore.
            </motion.p>
          </div>
        </div>

        {/* Horizontally scrolling track */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <motion.div
            ref={trackRef}
            style={{
              x,
              display: 'flex',
              gap: CARD_GAP,
              paddingLeft: '80px',
              paddingRight: '80px',
              willChange: 'transform',
            }}
          >
            {SPACES.map((space, i) => (
              <SpaceCard key={space.id} space={space} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.2em' }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="h-0.5 rounded-full overflow-hidden"
            style={{ width: '80px', background: 'rgba(255,255,255,0.1)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #344E41, #D4AF37)',
                scaleX: scrollYProgress,
                transformOrigin: 'left',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
