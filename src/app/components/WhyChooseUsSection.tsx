import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Clock, Users, Palette } from 'lucide-react';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: <Award className="w-7 h-7" />,
    title: 'Premium Quality',
    description:
      'We source only the finest materials, plants, and elements — ensuring every project meets the highest standards of craftsmanship and durability.',
    highlight: 'Award-winning results',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Timely Delivery',
    description:
      'Our disciplined project management ensures your landscape is delivered on schedule without compromising the quality or detail of our work.',
    highlight: '98% on-time delivery',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Experienced Team',
    description:
      'Six years of specialized expertise across landscape design, horticulture, engineering, and construction — all under one roof.',
    highlight: '50+ skilled professionals',
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: 'Customized Solutions',
    description:
      'Every landscape we create is unique. We listen, design, and craft around your vision, preferences, and the natural character of your space.',
    highlight: '100% tailored design',
  },
];

function FeatureCard({ card, index, visible }: { card: FeatureCard; index: number; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl p-8"
      style={{
        background: 'linear-gradient(145deg, rgba(52,78,65,0.06) 0%, rgba(88,129,87,0.03) 100%)',
        border: '1px solid rgba(52,78,65,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
        transition: 'all 0.4s ease',
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 28px 70px rgba(52,78,65,0.15)',
        background: 'linear-gradient(145deg, rgba(52,78,65,0.1) 0%, rgba(88,129,87,0.06) 100%)',
      }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }}
      />

      {/* Icon */}
      <div
        className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-400"
        style={{
          background: 'linear-gradient(135deg, rgba(52,78,65,0.15) 0%, rgba(88,129,87,0.1) 100%)',
          color: '#344E41',
        }}
      >
        {card.icon}
      </div>

      {/* Content */}
      <h3
        className="mb-3"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#1B1B1B',
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </h3>

      <p
        style={{
          color: '#666',
          fontSize: '0.92rem',
          lineHeight: 1.8,
          marginBottom: '1.25rem',
        }}
      >
        {card.description}
      </p>

      <div
        className="flex items-center gap-2"
        style={{ color: '#344E41', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em' }}
      >
        <span
          className="w-6 h-0.5 rounded-full"
          style={{ background: '#D4AF37', display: 'inline-block' }}
        />
        {card.highlight}
      </div>
    </motion.div>
  );
}

export function WhyChooseUsSection() {
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
            WHY NAVEEN LANDSCAPES
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
            Built on Trust,{' '}
            <em style={{ color: '#344E41' }}>Delivered with Excellence</em>
          </h2>
          <p
            style={{
              color: '#888',
              fontSize: '1rem',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Four pillars that define our commitment to transforming your outdoor
            vision into enduring reality.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} visible={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
