import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Waves, Mountain, Layers, TreePine, Building2, Wrench, Cog, Leaf } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  index: number;
  visible: boolean;
}

const SERVICES = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Landscape Contracting',
    description:
      'End-to-end landscape construction with premium materials and expert craftsmanship for residential and commercial projects.',
    image:
      'https://images.unsplash.com/photo-1718630366162-065b76caff06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: 'Aquascaping',
    description:
      'Breathtaking water features, koi ponds, and aquatic ecosystems that bring serene water elements to your space.',
    image:
      'https://images.unsplash.com/photo-1678754183715-87b12a70ef28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    icon: <Mountain className="w-6 h-6" />,
    title: 'Hardscape',
    description:
      'Elegant stone pathways, patios, retaining walls, and structural elements that define outdoor spaces.',
    image:
      'https://images.unsplash.com/photo-1685276535317-eef9a75e7fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Softscape',
    description:
      'Curated plant selections, lawn establishment, garden beds, and flowering arrangements for living beauty.',
    image:
      'https://images.unsplash.com/photo-1576897955702-24ad19680db3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Vertical Landscaping',
    description:
      'Living walls and vertical green installations that transform urban spaces into lush green sanctuaries.',
    image:
      'https://images.unsplash.com/photo-1780369088387-2557882d8aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    icon: <TreePine className="w-6 h-6" />,
    title: 'Nature Scaping',
    description:
      'Naturalistic landscapes inspired by regional ecosystems, using native plants for sustainable beauty.',
    image:
      'https://images.unsplash.com/photo-1667162099692-2769a2858470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Maintenance',
    description:
      'Year-round landscape care programs to keep your outdoor environment pristine and flourishing.',
    image:
      'https://images.unsplash.com/photo-1764197943918-f0a5b2d739fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    icon: <Cog className="w-6 h-6" />,
    title: 'Engineering Works',
    description:
      'Irrigation systems, drainage solutions, outdoor lighting, and technical infrastructure for complex projects.',
    image:
      'https://images.unsplash.com/photo-1760972543716-eb03ada2adb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
];

function ServiceCard({ icon, title, description, image, index, visible }: ServiceCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -6,
      y: ((e.clientX - cx) / (rect.width / 2)) * 6,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-3xl cursor-pointer group"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.3s ease, box-shadow 0.4s ease',
        boxShadow: hovered
          ? '0 30px 80px rgba(52,78,65,0.25)'
          : '0 4px 24px rgba(0,0,0,0.06)',
        height: '280px',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>

      {/* Default overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(145deg, rgba(52,78,65,0.9) 0%, rgba(27,27,27,0.85) 100%)'
            : 'linear-gradient(145deg, rgba(27,27,27,0.72) 0%, rgba(52,78,65,0.55) 100%)',
        }}
      />

      {/* Glass shimmer on hover */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Content */}
      <div className="absolute inset-0 p-7 flex flex-col justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-400"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, #D4AF37, #B8941F)'
              : 'rgba(255,255,255,0.12)',
            color: 'white',
            backdropFilter: 'blur(8px)',
            boxShadow: hovered ? '0 8px 24px rgba(212,175,55,0.4)' : 'none',
          }}
        >
          {icon}
        </div>

        <div>
          <h3
            className="text-white mb-2"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.2rem',
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          <p
            className="text-white/70 transition-all duration-400"
            style={{
              fontSize: '0.85rem',
              lineHeight: 1.6,
              maxHeight: hovered ? '80px' : '0px',
              overflow: 'hidden',
              opacity: hovered ? 1 : 0,
              marginBottom: hovered ? '12px' : '0',
            }}
          >
            {description}
          </p>
          <div
            className="flex items-center gap-2 transition-all duration-400"
            style={{
              color: '#D4AF37',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              opacity: hovered ? 1 : 0.6,
              transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
            }}
          >
            Explore Service
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-300"
              style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" style={{ background: '#1B1B1B', padding: '100px 0' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
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
            WHAT WE OFFER
          </span>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Our <em style={{ color: '#D4AF37' }}>Expertise</em>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '1rem',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Eight specialized services, one unified vision — transforming South India's
            outdoor spaces into extraordinary living environments.
          </p>
        </motion.div>

        {/* Services Grid 4×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={i}
              visible={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
