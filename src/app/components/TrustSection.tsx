import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

/* ── Brand logo SVG components ──────────────────────── */
function WiproLogo() {
  return (
    <svg viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" height="22">
      <circle cx="8" cy="14" r="6" fill="currentColor" opacity="0.6" />
      <circle cx="8" cy="14" r="3" fill="currentColor" />
      <text x="20" y="19" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="currentColor" letterSpacing="0.5">
        WIPRO
      </text>
    </svg>
  );
}

function CeebrosLogo() {
  return (
    <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" height="22">
      <rect x="0" y="5" width="14" height="18" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="8" width="8" height="12" rx="1" fill="currentColor" />
      <text x="20" y="19" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="13" fill="currentColor" letterSpacing="0.8">
        CEEBROS
      </text>
    </svg>
  );
}

function BeachvilleLogo() {
  return (
    <svg viewBox="0 0 148 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="24">
      <path d="M8 24 Q4 16 8 8 Q12 4 16 8 Q20 4 24 8 Q28 16 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="16" cy="14" r="3" fill="currentColor" />
      <text x="32" y="20" fontFamily='"Playfair Display", serif' fontWeight="600" fontSize="12" fill="currentColor" letterSpacing="0.3">
        Beachville Coffee
      </text>
    </svg>
  );
}

function SrmLogo() {
  return (
    <svg viewBox="0 0 70 28" fill="none" xmlns="http://www.w3.org/2000/svg" height="22">
      <path d="M4 20 Q4 8 12 8 Q20 8 16 16 Q12 20 20 20 Q28 20 28 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <text x="34" y="20" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="15" fill="currentColor" letterSpacing="1">
        SRM
      </text>
    </svg>
  );
}

function ResidentialLogo() {
  return (
    <svg viewBox="0 0 160 28" fill="none" xmlns="http://www.w3.org/2000/svg" height="22">
      <path d="M4 20 L4 12 L10 6 L16 12 L16 20 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
      <rect x="7" y="14" width="6" height="6" rx="0.5" fill="currentColor" />
      <text x="24" y="19" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11.5" fill="currentColor" letterSpacing="0.2">
        Residential Villas
      </text>
    </svg>
  );
}

function CommercialLogo() {
  return (
    <svg viewBox="0 0 168 28" fill="none" xmlns="http://www.w3.org/2000/svg" height="22">
      <rect x="2" y="6" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12" />
      <rect x="5" y="9" width="3" height="3" fill="currentColor" opacity="0.7" />
      <rect x="10" y="9" width="3" height="3" fill="currentColor" opacity="0.7" />
      <rect x="5" y="14" width="3" height="3" fill="currentColor" opacity="0.7" />
      <rect x="10" y="14" width="3" height="3" fill="currentColor" opacity="0.7" />
      <text x="28" y="19" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11.5" fill="currentColor" letterSpacing="0.2">
        Commercial Projects
      </text>
    </svg>
  );
}

function InfraLogo() {
  return (
    <svg viewBox="0 0 148 28" fill="none" xmlns="http://www.w3.org/2000/svg" height="22">
      <path d="M2 20 L2 14 L8 14 L8 10 L12 6 L16 10 L16 14 L22 14 L22 20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="30" y="19" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11.5" fill="currentColor" letterSpacing="0.2">
        Infrastructure
      </text>
    </svg>
  );
}

const BRANDS = [
  { Component: WiproLogo, name: 'Wipro', width: 105 },
  { Component: CeebrosLogo, name: 'Ceebros', width: 130 },
  { Component: BeachvilleLogo, name: 'Beachville Coffee', width: 165 },
  { Component: SrmLogo, name: 'SRM', width: 82 },
  { Component: ResidentialLogo, name: 'Residential Villas', width: 168 },
  { Component: CommercialLogo, name: 'Commercial Projects', width: 178 },
  { Component: InfraLogo, name: 'Infrastructure Clients', width: 158 },
];

function BrandItem({ brand }: { brand: typeof BRANDS[0] }) {
  return (
    <div
      className="group flex items-center justify-center flex-shrink-0 px-8 transition-all duration-500"
      style={{
        color: '#8A9A8A',
        minWidth: brand.width + 64,
        transition: 'color 0.4s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.color = '#D4AF37';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.color = '#8A9A8A';
      }}
    >
      <brand.Component />
    </div>
  );
}

/* ── Trust Section ──────────────────────────────────── */
export function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      style={{ background: '#FAF9F6', padding: '80px 0', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Subtle leaf tile bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cellipse cx='60' cy='60' rx='35' ry='13' fill='%23344E41' transform='rotate(40 60 60)'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <span
            style={{
              color: '#588157',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              display: 'block',
              marginBottom: '0.9rem',
            }}
          >
            OUR CLIENTS
          </span>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: '#1B1B1B',
              lineHeight: 1.25,
              marginBottom: '0.9rem',
            }}
          >
            Trusted By{' '}
            <em style={{ color: '#344E41' }}>Leading Brands</em>
          </h2>
          <p
            style={{
              color: '#888',
              fontSize: '0.95rem',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Creating extraordinary landscapes for commercial and residential clients across
            South India.
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(52,78,65,0.25), rgba(212,175,55,0.3), rgba(52,78,65,0.25), transparent)',
            marginBottom: '3.5rem',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* Infinite Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.4 }}
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '140px',
            background:
              'linear-gradient(to right, #FAF9F6, transparent)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '140px',
            background:
              'linear-gradient(to left, #FAF9F6, transparent)',
          }}
        />

        {/* Scrolling track */}
        <motion.div
          className="flex items-center"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {/* Two copies for seamless loop */}
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <BrandItem key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </motion.div>
      </motion.div>

      {/* Separator bottom */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(52,78,65,0.25), rgba(212,175,55,0.3), rgba(52,78,65,0.25), transparent)',
            marginTop: '3.5rem',
            transformOrigin: 'center',
          }}
        />
      </div>
    </section>
  );
}
