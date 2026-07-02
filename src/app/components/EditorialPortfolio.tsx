import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectModal, type ProjectData } from './ProjectModal';

/* ── Image imports ───────────────────────────────────── */
import img1  from '../../imports/1.png';
import img2  from '../../imports/2.png';
import img3  from '../../imports/3.png';
import img4  from '../../imports/4.png';
import img5  from '../../imports/5.png';
import img6  from '../../imports/6.png';
import img7  from '../../imports/7.png';
import img8  from '../../imports/8.png';
import img9  from '../../imports/9.png';
import img10 from '../../imports/10.png';
import img11 from '../../imports/11.png';
import img12 from '../../imports/12.png';

/* ── Project data ────────────────────────────────────── */
const PROJECTS: Array<ProjectData & { featured?: boolean }> = [
  {
    id: 1,
    img: img1,
    title: 'Luxury Residential Entrance Landscape',
    category: 'Apartment Communities',
    categorySlug: 'apartment-communities',
    description: 'Podium planting and premium entrance landscaping for residential communities.',
    longDescription: 'This project transforms a standard residential entrance into a welcoming landscape statement — integrating flowering podium planters, boundary hedging, and seasonal colour to create a memorable arrival sequence for residents and visitors alike.',
    location: 'Chennai, Tamil Nadu',
    year: '2023',
    services: ['Landscape Design', 'Podium Planting', 'Hardscape', 'Irrigation', 'Maintenance'],
    galleryImgs: [img3, img12, img5],
    featured: true,
  },
  {
    id: 2,
    img: img2,
    title: 'Pergola & Planter Design',
    category: 'Contemporary Elements',
    categorySlug: 'contemporary',
    description: 'Architectural timber structures combined with contemporary planting.',
    longDescription: 'A curated composition of timber pergola structures and tapered white planters punctuate this exterior corridor, creating a rhythm of shade and light that guides movement while adding botanical character to the architecture.',
    location: 'Bengaluru, Karnataka',
    year: '2023',
    services: ['Landscape Design', 'Plant Selection', 'Hardscape', 'Irrigation'],
    galleryImgs: [img5, img8, img7],
  },
  {
    id: 3,
    img: img3,
    title: 'Tree Avenue Streetscape Design',
    category: 'Streetscape',
    categorySlug: 'streetscape',
    description: 'Linear avenue plantation and pedestrian-friendly green corridors.',
    longDescription: 'A continuous linear plantation of mature trees creates a natural green screen along the boundary, providing privacy, shade, and ecological benefit while establishing a strong sense of place for this residential community.',
    location: 'Chennai, Tamil Nadu',
    year: '2022',
    services: ['Landscape Design', 'Tree Plantation', 'Ground Cover', 'Irrigation', 'Maintenance'],
    galleryImgs: [img1, img12, img11],
  },
  {
    id: 4,
    img: img4,
    title: 'Tropical Courtyard Residence',
    category: 'Residential',
    categorySlug: 'residential',
    description: 'Private courtyard gardens with layered tropical planting.',
    longDescription: 'Designed at the golden hour of dusk, this courtyard brings together palm specimens, tropical understory plantings, and a refined hardscape of linear stone pathways — creating a private sanctuary that feels both lush and architecturally resolved.',
    location: 'Chennai, Tamil Nadu',
    year: '2023',
    services: ['Landscape Design', 'Plant Selection', 'Hardscape', 'Lighting Design', 'Maintenance'],
    galleryImgs: [img5, img6, img3],
    featured: true,
  },
  {
    id: 5,
    img: img5,
    title: 'Modern Garden Walkway',
    category: 'Residential',
    categorySlug: 'residential',
    description: 'Minimal landscape composition surrounding contemporary architecture.',
    longDescription: 'A precision-laid stepping stone path weaves through a manicured lawn and carefully selected tree specimens, framing the architecture with a refined garden composition that celebrates both movement and repose.',
    location: 'Bengaluru, Karnataka',
    year: '2022',
    services: ['Landscape Design', 'Plant Selection', 'Hardscape', 'Turf Establishment', 'Irrigation'],
    galleryImgs: [img4, img6, img1],
  },
  {
    id: 6,
    img: img6,
    title: 'Palm Avenue Residential Landscape',
    category: 'Residential',
    categorySlug: 'residential',
    description: 'Elegant pathways and tropical vegetation for luxury villas.',
    longDescription: 'At golden hour, the warm rendered boundary wall and brick-paved driveway are softened by sweeping arcs of clipped hedging, palm clusters, and flowering tropicals — creating an arrival experience that signals luxury from first sight.',
    location: 'Coimbatore, Tamil Nadu',
    year: '2023',
    services: ['Landscape Design', 'Plant Selection', 'Hardscape', 'Boundary Treatment', 'Irrigation'],
    galleryImgs: [img4, img10, img9],
  },
  {
    id: 7,
    img: img7,
    title: 'Café Exterior Landscape',
    category: 'Commercial',
    categorySlug: 'commercial',
    description: 'Hospitality-focused landscape integrating planting with commercial architecture.',
    longDescription: "The outdoor landscape for Beachville Coffee Roasters creates an immersive botanical streetscape, drawing passersby in with lush banana plants, structured hedging, and warm evening lighting that transforms the café's facade into an inviting destination.",
    location: 'Chennai, Tamil Nadu',
    year: '2023',
    services: ['Commercial Landscape Design', 'Plant Selection', 'Hardscape', 'Lighting', 'Maintenance'],
    galleryImgs: [img8, img2, img5],
    featured: true,
  },
  {
    id: 8,
    img: img8,
    title: 'Indoor Botanical Space',
    category: 'Commercial',
    categorySlug: 'commercial',
    description: 'Natural interior planting enhancing customer experiences.',
    longDescription: "Interior planting brings the outside world into this café's intimate seating area — fan palms, tropical aroids, and a lush exterior green wall viewed through floor-to-ceiling glazing create a botanical immersion that elevates the customer experience.",
    location: 'Chennai, Tamil Nadu',
    year: '2022',
    services: ['Interior Landscape Design', 'Plant Selection', 'Planter Design', 'Maintenance'],
    galleryImgs: [img7, img2, img6],
  },
  {
    id: 9,
    img: img9,
    title: 'Coastal Tropical Landscape',
    category: 'Coastal & Resort',
    categorySlug: 'coastal-resort',
    description: 'Large-scale tropical landscape overlooking coastal environments.',
    longDescription: 'A sweeping coastal landscape unfolds at sunset — a gently curving red earth path winds through native coastal plantings, young palm stands, and seasonal ground covers, connecting the built environment to the ocean horizon in a composition of extraordinary natural beauty.',
    location: 'Goa',
    year: '2023',
    services: ['Masterplanning', 'Coastal Landscape Design', 'Native Planting', 'Path & Circulation', 'Irrigation'],
    galleryImgs: [img10, img6, img4],
    featured: true,
  },
  {
    id: 10,
    img: img10,
    title: 'Sunset Garden Composition',
    category: 'Coastal & Resort',
    categorySlug: 'coastal-resort',
    description: 'Soft landscape layers designed for luxury outdoor living.',
    longDescription: 'A perfectly proportioned circular bed of deep green groundcover anchors a warm rendered boundary wall, framed by the golden light of the setting sun over the sea. The composition is simultaneously simple and dramatic — a hallmark of resort-quality landscape design.',
    location: 'Goa',
    year: '2022',
    services: ['Resort Landscape Design', 'Plant Selection', 'Hardscape', 'Lighting', 'Maintenance'],
    galleryImgs: [img9, img6, img4],
  },
  {
    id: 11,
    img: img11,
    title: 'Masterplanned Green Corridor',
    category: 'Master Planning',
    categorySlug: 'master-planning',
    description: 'Integrated large-scale planting and circulation systems.',
    longDescription: 'Viewed from above, this masterplanned green corridor reveals the full complexity of a large-scale landscape — a rich canopy of tropical trees, structured pathways, and layered planting zones that create a continuous green spine through an urban development.',
    location: 'Chennai, Tamil Nadu',
    year: '2023',
    services: ['Masterplanning', 'Large-Scale Planting', 'Circulation Design', 'Ecological Planting', 'Irrigation'],
    galleryImgs: [img3, img1, img12],
  },
  {
    id: 12,
    img: img12,
    title: 'Podium Garden with Water Feature',
    category: 'Apartment Communities',
    categorySlug: 'apartment-communities',
    description: 'Integrated landscape and water element design for modern communities.',
    longDescription: 'The podium level of this residential tower is transformed into a garden of exceptional quality — a cascading water wall feature anchors one end while structured tree plantings, raised beds, and refined hardscape create a series of outdoor rooms for residents to inhabit.',
    location: 'Chennai, Tamil Nadu',
    year: '2023',
    services: ['Landscape Design', 'Water Feature Design', 'Podium Planting', 'Hardscape', 'Irrigation'],
    galleryImgs: [img1, img3, img11],
    featured: true,
  },
];

const FILTERS = [
  { label: 'All Projects',          value: 'all' },
  { label: 'Residential',          value: 'residential' },
  { label: 'Apartment Communities',value: 'apartment-communities' },
  { label: 'Commercial',           value: 'commercial' },
  { label: 'Coastal & Resort',     value: 'coastal-resort' },
  { label: 'Streetscape',          value: 'streetscape' },
  { label: 'Water Features',       value: 'water-features' },
  { label: 'Master Planning',      value: 'master-planning' },
];

/* ── Reusable image card ─────────────────────────────── */
function ImageCard({
  project,
  onClick,
  style,
  className = '',
  imgPosition = 'center',
}: {
  project: ProjectData;
  onClick: (p: ProjectData) => void;
  style?: React.CSSProperties;
  className?: string;
  imgPosition?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.16)'
          : '0 4px 20px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.55s ease',
        ...style,
      }}
    >
      <img
        src={project.img}
        alt={project.title}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: imgPosition,
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'block',
        }}
      />
      {/* Base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(20,20,20,0.72) 0%, rgba(20,20,20,0.08) 50%, transparent 80%)',
          opacity: hovered ? 1 : 0.55,
          transition: 'opacity 0.5s ease',
        }}
      />
      {/* Category pill */}
      <div style={{ position: 'absolute', top: 14, left: 14 }}>
        <span
          style={{
            background: 'rgba(250,249,246,0.12)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: 'white',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            padding: '4px 10px',
            borderRadius: '99px',
          }}
        >
          {project.category.toUpperCase()}
        </span>
      </div>
      {/* Bottom info */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '18px 18px 16px',
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'transform 0.5s ease',
        }}
      >
        <h3
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.3,
            marginBottom: '8px',
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: '#D4AF37',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          View Project
          <ArrowUpRight style={{ width: 12, height: 12 }} />
        </div>
      </div>
    </div>
  );
}

/* ── Section header ──────────────────────────────────── */
function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
      style={{ marginBottom: '3rem' }}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
        <span style={{ color: '#D4AF37', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.26em' }}>
          OUR PROJECTS
        </span>
        <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
      </div>
      <h2
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 700,
          color: '#1B1B1B',
          lineHeight: 1.2,
          marginBottom: '1.4rem',
        }}
      >
        Crafting Landscapes <em style={{ color: '#344E41' }}>That Endure</em>
      </h2>
      <p
        style={{
          color: '#777',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          maxWidth: '640px',
          margin: '0 auto',
          lineHeight: 1.85,
          fontWeight: 300,
        }}
      >
        From luxury residences and apartment communities to hospitality and commercial environments,
        every landscape is designed to bring architecture and nature into perfect harmony.
      </p>
    </motion.div>
  );
}

/* ── Category filters ────────────────────────────────── */
function CategoryFilters({
  active,
  onChange,
  inView,
}: {
  active: string;
  onChange: (v: string) => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-wrap justify-center gap-2 mb-14"
    >
      {FILTERS.map((f) => {
        const isActive = active === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            style={{
              padding: '7px 18px',
              borderRadius: '99px',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              transition: 'all 0.3s ease',
              background: isActive
                ? 'linear-gradient(135deg, #344E41, #588157)'
                : 'transparent',
              color: isActive ? 'white' : '#555',
              border: isActive
                ? 'none'
                : '1px solid rgba(52,78,65,0.2)',
              boxShadow: isActive
                ? '0 4px 16px rgba(52,78,65,0.28)'
                : 'none',
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        );
      })}
    </motion.div>
  );
}

/* ── Filtered masonry grid ───────────────────────────── */
function FilteredGrid({
  projects,
  onClick,
}: {
  projects: ProjectData[];
  onClick: (p: ProjectData) => void;
}) {
  return (
    <motion.div
      key="filtered"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.6 }}
          style={{ aspectRatio: i % 5 === 0 ? '3/4' : i % 3 === 0 ? '3/2' : '4/3' }}
        >
          <ImageCard project={project} onClick={onClick} style={{ width: '100%', height: '100%' }} />
        </motion.div>
      ))}
      {projects.length === 0 && (
        <div
          className="col-span-3 text-center py-20"
          style={{ color: '#999', fontSize: '1rem' }}
        >
          No projects in this category yet.
        </div>
      )}
    </motion.div>
  );
}

/* ── Editorial "All Projects" layout ─────────────────── */
function EditorialLayout({ onClick }: { onClick: (p: ProjectData) => void }) {
  const p = (id: number) => PROJECTS.find(x => x.id === id)!;

  /* entrance animation wrapper */
  const FadeUp = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

      {/* ── BLOCK 1 — Hero composition: large left + 2 stacked right ─ */}
      <FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5 md:gap-6">
          {/* Large hero image — spans 2 rows */}
          <div className="h-[420px] md:h-[600px]">
            <ImageCard project={p(4)} onClick={onClick} style={{ height: '100%' }} imgPosition="center 60%" />
          </div>
          <div className="flex flex-col gap-5 md:gap-6">
            {/* Top right */}
            <div className="h-[280px] md:h-[288px]">
              <ImageCard project={p(9)} onClick={onClick} style={{ height: '100%' }} imgPosition="center 40%" />
            </div>
            {/* Bottom right */}
            <div className="h-[280px] md:h-[288px]">
              <ImageCard project={p(10)} onClick={onClick} style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ── BLOCK 2 — Full-width panoramic ───────────────────────── */}
      <FadeUp delay={0.05}>
        <div className="h-[280px] md:h-[460px]">
          <ImageCard project={p(3)} onClick={onClick} style={{ height: '100%' }} imgPosition="center 55%" />
        </div>
      </FadeUp>

      {/* ── BLOCK 3 — Three-column asymmetric ────────────────────── */}
      <FadeUp delay={0.05}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr_1fr] gap-5 md:gap-6">
          {/* Left — tall aerial portrait */}
          <div className="h-[360px] md:h-[500px]">
            <ImageCard project={p(11)} onClick={onClick} style={{ height: '100%' }} imgPosition="center top" />
          </div>
          {/* Centre — wide diptych water feature */}
          <div className="h-[360px] md:h-[500px]">
            <ImageCard project={p(12)} onClick={onClick} style={{ height: '100%' }} imgPosition="left center" />
          </div>
          {/* Right — palm villa, golden hour */}
          <div className="h-[360px] md:h-[500px]">
            <ImageCard project={p(6)} onClick={onClick} style={{ height: '100%' }} imgPosition="30% center" />
          </div>
        </div>
      </FadeUp>

      {/* ── BLOCK 4 — Editorial text + image split ────────────────── */}
      <FadeUp delay={0.05}>
        <div className="grid lg:grid-cols-[1fr_1.5fr] items-center gap-10 lg:gap-[60px] min-h-[clamp(320px,52vh,560px)]">
          {/* Text panel */}
          <div className="pt-8 lg:py-0">
            <div style={{ color: '#D4AF37', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', marginBottom: '1.4rem' }}>
              LANDSCAPE PHILOSOPHY
            </div>
            <h3
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                fontWeight: 700,
                color: '#1B1B1B',
                lineHeight: 1.2,
                marginBottom: '1.4rem',
              }}
            >
              Where Architecture Meets <em style={{ color: '#344E41' }}>Living Nature</em>
            </h3>
            <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>
              Each project begins with a close reading of the site — its light, its scale, its relationship to the buildings it surrounds. From that understanding, we create landscapes that feel inevitable rather than designed.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[['100+', 'Projects'], ['10+', 'Years'], ['500+', 'Clients'], ['2', 'Studios']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 700, color: '#344E41', lineHeight: 1 }}>{val}</div>
                  <div style={{ color: '#999', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.1em', marginTop: '3px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Image */}
          <div className="h-[360px] md:h-[480px] w-full">
            <ImageCard project={p(5)} onClick={onClick} style={{ height: '100%' }} />
          </div>
        </div>
      </FadeUp>

      {/* ── BLOCK 5 — Two column ─────────────────────────────────── */}
      <FadeUp delay={0.05}>
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-5 md:gap-6">
          <div className="h-[340px] md:h-[440px]">
            <ImageCard project={p(1)} onClick={onClick} style={{ height: '100%' }} imgPosition="center 65%" />
          </div>
          <div className="h-[340px] md:h-[440px]">
            <ImageCard project={p(7)} onClick={onClick} style={{ height: '100%' }} />
          </div>
        </div>
      </FadeUp>

      {/* ── BLOCK 6 — Three small cards ──────────────────────────── */}
      <FadeUp delay={0.05}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <div className="h-[320px] md:h-[360px]">
            <ImageCard project={p(8)}  onClick={onClick} style={{ height: '100%' }} />
          </div>
          <div className="h-[320px] md:h-[360px]">
            <ImageCard project={p(2)}  onClick={onClick} style={{ height: '100%' }} imgPosition="left center" />
          </div>
          {/* Pull-quote card */}
          <div
            className="rounded-2xl flex flex-col items-center justify-center text-center p-8 h-[320px] md:h-[360px]"
            style={{
              background: 'linear-gradient(145deg, #344E41 0%, #2A3F2F 100%)',
            }}
          >
            <div
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '0.95rem',
                fontStyle: 'italic',
                color: 'rgba(250,249,246,0.82)',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
              }}
            >
              "Every landscape we create is designed to endure — in beauty, in ecology, and in memory."
            </div>
            <div style={{ width: '32px', height: '1.5px', background: '#D4AF37', borderRadius: '1px' }} />
            <div style={{ color: 'rgba(212,175,55,0.9)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', marginTop: '1rem' }}>
              NAVEEN LANDSCAPES
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ── Main exported section ───────────────────────────── */
export function EditorialPortfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-60px' });

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : activeFilter === 'water-features'
      ? PROJECTS.filter(p => p.categorySlug === 'apartment-communities' && p.id === 12)
      : PROJECTS.filter(p => p.categorySlug === activeFilter);

  function handleFilterChange(value: string) {
    setActiveFilter(value);
  }

  return (
    <section
      id="projects"
      style={{ background: '#FAF9F6', padding: '100px 0 120px' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header + filters */}
        <div ref={headerRef}>
          <SectionHeader inView={inView} />
          <CategoryFilters active={activeFilter} onChange={handleFilterChange} inView={inView} />
        </div>

        {/* Gallery */}
        <AnimatePresence mode="wait">
          {activeFilter === 'all' ? (
            <motion.div
              key="editorial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <EditorialLayout onClick={setSelectedProject} />
            </motion.div>
          ) : (
            <FilteredGrid
              key={activeFilter}
              projects={filteredProjects}
              onClick={setSelectedProject}
            />
          )}
        </AnimatePresence>

        {/* View all / contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #344E41 0%, #588157 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              boxShadow: '0 8px 30px rgba(52,78,65,0.3)',
            }}
          >
            Discuss Your Project
          </button>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        allProjects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onNavigate={setSelectedProject}
      />
    </section>
  );
}
