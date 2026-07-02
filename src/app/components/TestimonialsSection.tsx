import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  company: string;
  role: string;
  projectType: 'Residential' | 'Commercial' | 'Villa' | 'Infrastructure';
  review: string;
  rating: number;
  initial: string;
  avatarColor: string;
  logoInitials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Chennai, Tamil Nadu',
    company: 'Kumar Residences',
    role: 'Homeowner',
    projectType: 'Residential',
    review:
      'Naveen Landscapes transformed our backyard into an absolute paradise. The attention to detail and craftsmanship is simply unmatched. Every morning I walk out and feel like I\'m in a luxury resort.',
    rating: 5,
    initial: 'R',
    avatarColor: '#344E41',
    logoInitials: 'KR',
  },
  {
    id: 2,
    name: 'Priya Venkatesh',
    location: 'Bengaluru, Karnataka',
    company: 'TechPark Bengaluru',
    role: 'Facilities Manager',
    projectType: 'Commercial',
    review:
      'We hired Naveen Landscapes for our entire corporate campus. The green environment has completely transformed the mood and productivity of 3,000 employees. Outstanding professionalism.',
    rating: 5,
    initial: 'P',
    avatarColor: '#588157',
    logoInitials: 'TP',
  },
  {
    id: 3,
    name: 'Arun Chandrasekaran',
    location: 'Coimbatore, Tamil Nadu',
    company: 'Villa Sereno',
    role: 'Property Developer',
    projectType: 'Villa',
    review:
      'The aquascaping work for our luxury villa project is extraordinary. The koi pond and water features have become the centrepiece of our development. Clients are absolutely in love with it.',
    rating: 5,
    initial: 'A',
    avatarColor: '#D4AF37',
    logoInitials: 'VS',
  },
  {
    id: 4,
    name: 'Meenakshi Rajan',
    location: 'Chennai, Tamil Nadu',
    company: 'Rajan Family Home',
    role: 'Homeowner',
    projectType: 'Residential',
    review:
      'From design to completion the experience was seamless. The vertical garden wall has been consistently admired by every guest. Best investment we have made in our home.',
    rating: 5,
    initial: 'M',
    avatarColor: '#344E41',
    logoInitials: 'RF',
  },
  {
    id: 5,
    name: 'Suresh Nair',
    location: 'Kodaikanal, Tamil Nadu',
    company: 'Nair Heritage Resort',
    role: 'Resort Owner',
    projectType: 'Commercial',
    review:
      'Naveen Landscapes redesigned our entire resort grounds. The naturalistic approach perfectly complements our heritage property. Our guest reviews about the landscape have been exceptional.',
    rating: 5,
    initial: 'S',
    avatarColor: '#588157',
    logoInitials: 'NH',
  },
  {
    id: 6,
    name: 'Kavitha Balasubramanian',
    location: 'Bengaluru, Karnataka',
    company: 'Green Homes Project',
    role: 'Interior Designer',
    projectType: 'Infrastructure',
    review:
      'I regularly recommend Naveen Landscapes to my clients. Their ability to blend indoor and outdoor spaces creates a truly holistic luxury experience. Exceptional team, exceptional results.',
    rating: 5,
    initial: 'K',
    avatarColor: '#D4AF37',
    logoInitials: 'GH',
  },
];

const PROJECT_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Residential: { bg: 'rgba(52,78,65,0.2)', text: '#588157' },
  Commercial: { bg: 'rgba(212,175,55,0.15)', text: '#D4AF37' },
  Villa: { bg: 'rgba(88,129,87,0.2)', text: '#8FBC8F' },
  Infrastructure: { bg: 'rgba(250,249,246,0.12)', text: 'rgba(255,255,255,0.7)' },
};

/* ── Animated star row ───────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 20"
          fill="#D4AF37"
          className="w-4 h-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 280 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

/* ── Company logo placeholder ────────────────────────── */
function CompanyLogo({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        background: 'rgba(250,249,246,0.1)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: color,
        fontSize: '0.72rem',
        fontWeight: 800,
        letterSpacing: '0.06em',
      }}
    >
      {initials}
    </div>
  );
}

/* ── Testimonial card ────────────────────────────────── */
function TestimonialCard({ t }: { t: Testimonial }) {
  const typeColors = PROJECT_TYPE_COLORS[t.projectType];

  return (
    <motion.div
      className="relative rounded-3xl p-7 flex flex-col h-full"
      style={{
        background: 'rgba(250,249,246,0.06)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
        transition: 'all 0.45s ease',
      }}
      whileHover={{
        scale: 1.025,
        y: -6,
        boxShadow: '0 32px 80px rgba(0,0,0,0.38)',
      }}
    >
      {/* Gold top accent on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
        }}
      />

      {/* Project type badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-3 py-1 rounded-full"
          style={{
            background: typeColors.bg,
            color: typeColors.text,
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            border: `1px solid ${typeColors.text}30`,
          }}
        >
          {t.projectType.toUpperCase()}
        </span>
        {/* Large gold quote */}
        <div
          style={{
            color: 'rgba(212,175,55,0.35)',
          }}
        >
          <Quote className="w-8 h-8" />
        </div>
      </div>

      {/* Stars */}
      <StarRow rating={t.rating} />

      {/* Review text */}
      <p
        className="flex-1 mb-5"
        style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: '0.93rem',
          lineHeight: 1.85,
          fontStyle: 'italic',
        }}
      >
        "{t.review}"
      </p>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          marginBottom: '1.1rem',
        }}
      />

      {/* Author row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${t.avatarColor}, ${t.avatarColor}bb)`,
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'white',
              boxShadow: `0 4px 16px ${t.avatarColor}50`,
            }}
          >
            {t.initial}
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.92rem' }}>{t.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
              {t.role} · {t.location}
            </div>
          </div>
        </div>
        {/* Company logo */}
        <CompanyLogo initials={t.logoInitials} color={t.avatarColor} />
      </div>
    </motion.div>
  );
}

/* ── Background floating particles ───────────────────── */
interface BgParticle {
  x: number;
  y: number;
  size: number;
  delay: number;
}
function BgParticle({ x, y, size, delay }: BgParticle) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: 'rgba(212,175,55,0.25)',
        filter: 'blur(1px)',
      }}
      animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 6 + delay * 2, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ── Testimonials Section ────────────────────────────── */
export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => emblaApi.scrollNext(), 4800);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const bgParticles = useMemo<BgParticle[]>(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        x: (i * 41.7 + 5) % 100,
        y: (i * 29.3 + 11) % 100,
        size: 2 + (i % 3),
        delay: i * 0.22,
      })),
    []
  );

  return (
    <section
      id="testimonials"
      style={{ background: '#344E41', padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '38px 38px',
        }}
      />

      {/* Organic background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'rgba(52,78,65,0.5)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-10 -right-10 rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'rgba(88,129,87,0.4)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Floating bg particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bgParticles.map((p, i) => (
          <BgParticle key={i} {...p} />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
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
              CLIENT VOICES
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
              What Our{' '}
              <em style={{ color: '#D4AF37' }}>Clients Say</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: '360px', lineHeight: 1.7 }}>
              Real stories from clients who trusted us to transform their spaces.
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(250,249,246,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'white',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                color: '#1B1B1B',
                boxShadow: '0 4px 20px rgba(212,175,55,0.45)',
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex gap-5" style={{ touchAction: 'pan-y', alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                style={{
                  flex: '0 0 min(540px, 88vw)',
                  minWidth: 0,
                }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex gap-2 justify-center mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="rounded-full transition-all duration-400"
              style={{
                width: selectedIndex === i ? '26px' : '8px',
                height: '8px',
                background:
                  selectedIndex === i ? '#D4AF37' : 'rgba(255,255,255,0.28)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
