import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

interface Branch {
  city: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  mapColor: string;
  accent: string;
  mapUrl: string;
}

const BRANCHES: Branch[] = [
  {
    city: 'Chennai',
    tagline: 'Our Founding Branch',
    address: 'Plot No. 51, Gopalakrishnan Nagar, Varadharajapuram, Mudichur, Chennai – 600048',
    phone: '+91 96772 32993',
    email: 'naveenlandscapewebsitee@gmail.com',
    mapColor: '#344E41',
    accent: '#588157',
    mapUrl: 'https://maps.app.goo.gl/QoLdvEvEWUFeyBaMA?g_st=awb',
  },
  {
    city: 'Bengaluru',
    tagline: 'Expanding to Karnataka',
    address: '700, 5th Main, 8th Cross Road, HAL Stage 3, New Thippasandra, Bangalore – 560075',
    phone: '+91 98807 66556',
    email: 'naveenlandscapewebsitee@gmail.com',
    mapColor: '#1B1B1B',
    accent: '#344E41',
    mapUrl: 'https://maps.app.goo.gl/EHoXt9JFu2c5eeRp8?g_st=ac',
  },
];

function MapPlaceholder({ color, accent }: { color: string; accent: string }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ height: '200px', background: color }}
    >
      {/* Grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${color.replace('#', '')}`}
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${color.replace('#', '')})`} />
      </svg>

      {/* Decorative roads */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="60" x2="100%" y2="60" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <line x1="0" y1="120" x2="100%" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="80" y1="0" x2="80" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <line x1="200" y1="0" x2="200" y2="100%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </svg>

      {/* Park patches */}
      <div
        className="absolute rounded-xl opacity-40"
        style={{
          top: '20px',
          left: '20px',
          width: '50px',
          height: '35px',
          background: accent,
        }}
      />
      <div
        className="absolute rounded-xl opacity-30"
        style={{
          top: '90px',
          right: '30px',
          width: '70px',
          height: '45px',
          background: accent,
        }}
      />

      {/* Pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex flex-col items-center"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
            style={{ background: '#D4AF37', boxShadow: '0 0 0 6px rgba(212,175,55,0.25)' }}
          >
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: 'rgba(212,175,55,0.5)' }}
          />
        </div>
      </div>

      {/* Label */}
      <div
        className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl"
        style={{
          background: 'rgba(250,249,246,0.12)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'white',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
        }}
      >
        MAP PREVIEW
      </div>
    </div>
  );
}

function BranchCard({ branch, index, visible }: { branch: Branch; index: number; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl p-8"
      style={{
        background: '#FAF9F6',
        boxShadow: '0 12px 50px rgba(0,0,0,0.08)',
        border: '1px solid rgba(52,78,65,0.1)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{ background: 'linear-gradient(90deg, #344E41, #D4AF37, #588157)' }}
      />

      {/* Branch Badge */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <span
            style={{
              color: '#588157',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            {branch.tagline.toUpperCase()}
          </span>
          <h3
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#1B1B1B',
              lineHeight: 1.2,
            }}
          >
            {branch.city}
          </h3>
        </div>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #344E41, #588157)' }}
        >
          <MapPin className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Map */}
      <div className="mb-6">
        <MapPlaceholder color={branch.mapColor} accent={branch.accent} />
      </div>

      {/* Contact Info */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-3 items-start">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(52,78,65,0.08)' }}
          >
            <MapPin className="w-3.5 h-3.5" style={{ color: '#344E41' }} />
          </div>
          <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>{branch.address}</p>
        </div>

        <div className="flex gap-3 items-center">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(52,78,65,0.08)' }}
          >
            <Phone className="w-3.5 h-3.5" style={{ color: '#344E41' }} />
          </div>
          <a
            href={`tel:${branch.phone}`}
            style={{
              color: '#344E41',
              fontSize: '0.92rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {branch.phone}
          </a>
        </div>

        <div className="flex gap-3 items-center">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(52,78,65,0.08)' }}
          >
            <Mail className="w-3.5 h-3.5" style={{ color: '#344E41' }} />
          </div>
          <a
            href={`mailto:${branch.email}`}
            style={{
              color: '#344E41',
              fontSize: '0.88rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            {branch.email}
          </a>
        </div>
      </div>

      {/* CTA */}
      <a
        href={branch.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #344E41 0%, #588157 100%)',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.9rem',
          letterSpacing: '0.04em',
          boxShadow: '0 6px 24px rgba(52,78,65,0.3)',
          textDecoration: 'none',
        }}
      >
        Get Directions
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

export function BranchLocations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ background: '#FAF9F6', padding: '100px 0' }} ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <span
            style={{
              color: '#588157',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            FIND US
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
            Our <em style={{ color: '#344E41' }}>Branches</em>
          </h2>
          <p style={{ color: '#888', fontSize: '1rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.8 }}>
            Visit us at either of our two locations across South India.
          </p>
        </motion.div>

        {/* Branch Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {BRANCHES.map((branch, i) => (
            <BranchCard key={branch.city} branch={branch} index={i} visible={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
