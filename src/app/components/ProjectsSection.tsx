import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface Project {
  id: number;
  name: string;
  location: string;
  category: 'Residential' | 'Commercial' | 'Infrastructure';
  image: string;
  height: 'tall' | 'normal';
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Villa Garden Oasis',
    location: 'Chennai, Tamil Nadu',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1780283574760-e8d7fd944da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'tall',
  },
  {
    id: 2,
    name: 'Corporate Campus Green',
    location: 'Bengaluru, Karnataka',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1760972543716-eb03ada2adb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'normal',
  },
  {
    id: 3,
    name: 'Aqua Paradise Pool Garden',
    location: 'Chennai, Tamil Nadu',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1779813377635-0b493c937b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'normal',
  },
  {
    id: 4,
    name: 'Resort Landscape Master Plan',
    location: 'Kodaikanal, Tamil Nadu',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1758812598083-3793dd46195f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'tall',
  },
  {
    id: 5,
    name: 'Living Wall Boulevard',
    location: 'Bengaluru, Karnataka',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1780369088387-2557882d8aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'normal',
  },
  {
    id: 6,
    name: 'Koi Pond Retreat',
    location: 'Coimbatore, Tamil Nadu',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1678754183715-87b12a70ef28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'tall',
  },
  {
    id: 7,
    name: 'Heritage Garden Restoration',
    location: 'Mysuru, Karnataka',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1764197943918-f0a5b2d739fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'normal',
  },
  {
    id: 8,
    name: 'Poolside Paradise',
    location: 'Chennai, Tamil Nadu',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1685276535317-eef9a75e7fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    height: 'normal',
  },
];

const FILTERS = ['All', 'Residential', 'Commercial', 'Infrastructure'] as const;

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-3xl cursor-pointer"
      style={{
        height: project.height === 'tall' ? '420px' : '280px',
        boxShadow: hovered
          ? '0 30px 80px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.15)',
        transition: 'box-shadow 0.5s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        style={{
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Base overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(27,27,27,0.85) 0%, rgba(27,27,27,0.1) 55%, transparent 100%)',
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(145deg, rgba(52,78,65,0.6) 0%, rgba(27,27,27,0.7) 100%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Category badge */}
      <div
        className="absolute top-5 left-5 px-3 py-1 rounded-full"
        style={{
          background: 'rgba(250,249,246,0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
        }}
      >
        {project.category}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3
          className="text-white mb-1"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.15rem',
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {project.name}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: '12px' }}>
          {project.location}
        </p>

        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
            color: '#1B1B1B',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            boxShadow: '0 8px 24px rgba(212,175,55,0.4)',
          }}
        >
          Explore Project
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" style={{ background: '#FAF9F6', padding: '100px 0' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20" ref={ref}>
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
                color: '#588157',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              OUR PORTFOLIO
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: '#1B1B1B',
                lineHeight: 1.2,
              }}
            >
              Featured <em style={{ color: '#344E41' }}>Projects</em>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex gap-2 p-1.5 rounded-full"
            style={{
              background: 'rgba(52,78,65,0.08)',
              border: '1px solid rgba(52,78,65,0.12)',
              flexWrap: 'wrap',
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    activeFilter === f
                      ? 'linear-gradient(135deg, #344E41, #588157)'
                      : 'transparent',
                  color: activeFilter === f ? 'white' : '#344E41',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  boxShadow:
                    activeFilter === f ? '0 4px 16px rgba(52,78,65,0.35)' : 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}
            >
              <Masonry gutter="20px">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            className="px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'transparent',
              border: '2px solid #344E41',
              color: '#344E41',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
            }}
          >
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}
