import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { X, Phone, Mail, FileText, Check, ChevronDown, ArrowRight } from 'lucide-react';

/* ── Brand palette for this section ─────────────────── */
const FG = '#2E5E4E';   // Forest Green
const SG = '#7A9B76';   // Sage Green
const EB = '#8B6A45';   // Earth Brown
const BG = '#FAF8F3';   // Warm off-white

/* ── Colour swatches ─────────────────────────────────── */
const COLOURS = [
  { name: 'White',      hex: '#FFFFFF', border: true },
  { name: 'Cream',      hex: '#F5EDDA' },
  { name: 'Brown',      hex: '#6B4226' },
  { name: 'Sand',       hex: '#D4B896' },
  { name: 'Grey',       hex: '#9CA3AF' },
  { name: 'Dark Grey',  hex: '#374151' },
  { name: 'Light Grey', hex: '#D1D5DB' },
  { name: 'Maroon',     hex: '#7B2D2D' },
];

const SUITABLE_FOR = [
  'Villas', 'Apartments', 'Resorts', 'Hotels',
  'Commercial Landscapes', 'Offices', 'Cafes', 'Outdoor Spaces',
];

const PRODUCT_NAMES = [
  'Mocha Series Planter', 'Tower Series Planter', 'Zen Square Planter',
  'Zen Rectangle Planter', 'Vintage Square Planter', 'Vintage Rectangle Planter',
  'Garden Tray Planter', 'Square Series Planter', 'Box Tray Planter',
  'Cube Planter', 'Dove Rectangle Planter', 'Dove Series Planter',
  'Bowl Planter', 'Classic Round Planter', 'RS Cylindrical Planter',
  'Sigma Ribbed Planter', 'Other',
];

/* ── Product data ────────────────────────────────────── */
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  tag: string;
  sizes: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Mocha Series Planter',
    description: 'Contemporary rounded planters for premium indoor and outdoor spaces.',
    image: 'https://images.unsplash.com/photo-1775509798027-12259872a37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Roto Series',
    sizes: ['Dia 14" H 24"', 'Dia 18" H 30"', 'Dia 22" H 36"'],
  },
  {
    id: 2,
    name: 'Tower Series Planter',
    description: 'Tall elegant planters ideal for entrances, lobbies, and walkways.',
    image: 'https://images.unsplash.com/photo-1736502184559-9f4ba49d3f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Roto Series',
    sizes: ['Dia 14" H 24"', 'Dia 16" H 30"', 'Dia 21" H 36"'],
  },
  {
    id: 3,
    name: 'Zen Square Planter',
    description: 'Minimal modern square planters for contemporary landscapes and terraces.',
    image: 'https://images.unsplash.com/photo-1708919166928-71cba69fcd0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Zen Series',
    sizes: ['L 14" W 14" H 14"'],
  },
  {
    id: 4,
    name: 'Zen Rectangle Planter',
    description: 'Wide rectangular planters for balconies, boundaries, and pathways.',
    image: 'https://images.unsplash.com/photo-1780599032042-5134d1ce1209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Zen Series',
    sizes: ['L 36" W 14" H 14"'],
  },
  {
    id: 5,
    name: 'Vintage Square Planter',
    description: 'Classic design with timeless aesthetics suited to heritage and resort settings.',
    image: 'https://images.unsplash.com/photo-1643671632163-2ae04119ac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Vintage Series',
    sizes: ['L 16" W 16" H 20"'],
  },
  {
    id: 6,
    name: 'Vintage Rectangle Planter',
    description: 'Traditional elegance combined with modern UV-resistant durability.',
    image: 'https://images.unsplash.com/photo-1693585576674-2e1b7166f583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Vintage Series',
    sizes: ['L 36" W 16" H 20"'],
  },
  {
    id: 7,
    name: 'Garden Tray Planter',
    description: 'Perfect for flower arrangements, decorative plant displays, and window ledges.',
    image: 'https://images.unsplash.com/photo-1770460192012-d140712b2101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Tray Series',
    sizes: ['L 22" W 10" H 10"', 'L 24" W 12" H 12"', 'L 32" W 16" H 16"', 'L 36" W 14" H 13"'],
  },
  {
    id: 8,
    name: 'Square Series Planter',
    description: 'Clean geometric design suitable for homes, offices, and commercial spaces.',
    image: 'https://images.unsplash.com/photo-1761315631531-6994151ed319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Roto Series',
    sizes: ['L 12" W 12" H 10"', 'L 14" W 14" H 12"'],
  },
  {
    id: 9,
    name: 'Box Tray Planter',
    description: 'Wide planters for pathways, landscape edges, and boundary definition.',
    image: 'https://images.unsplash.com/photo-1759375240186-82996df1fcd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Tray Series',
    sizes: ['L 24" W 12" H 12"', 'L 40" W 20" H 18"'],
  },
  {
    id: 10,
    name: 'Cube Planter',
    description: 'Modern cube planters with premium finish for structured landscape compositions.',
    image: 'https://images.unsplash.com/photo-1527760489274-bc4efca90147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Cube Series',
    sizes: ['L 12" H 12"', 'L 12" H 18"', 'L 12" H 24"', 'L 16" H 16"', 'L 20" H 20"'],
  },
  {
    id: 11,
    name: 'Dove Rectangle Planter',
    description: 'Stylish rectangular planters for larger landscapes and commercial frontages.',
    image: 'https://images.unsplash.com/photo-1591758692416-b47871e30eac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Dove Series',
    sizes: ['L 24" W 10" H 10"', 'L 24" W 12" H 12"', 'L 32" W 13" H 13"'],
  },
  {
    id: 12,
    name: 'Dove Series Planter',
    description: 'Elegant planters suitable for villas, resorts, and hotel landscaping.',
    image: 'https://images.unsplash.com/photo-1517938021627-eec2bbe94dcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Dove Series',
    sizes: ['L 24" W 12" H 12"', 'L 32" W 13" H 13"'],
  },
  {
    id: 13,
    name: 'Bowl Planter',
    description: 'Decorative bowl-shaped planters for feature spaces and entrance focal points.',
    image: 'https://images.unsplash.com/photo-1618588487029-ec12af85ece5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Bowl Series',
    sizes: ['Dia 18" H 12"', 'Dia 24" H 13"', 'Dia 30" H 15"'],
  },
  {
    id: 14,
    name: 'Classic Round Planter',
    description: 'Versatile round planters suitable for any landscape — from intimate to grand scale.',
    image: 'https://images.unsplash.com/photo-1759577087702-7164a8997422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Classic Series',
    sizes: ['Dia 13" H 13"', 'Dia 16" H 16"', 'Dia 20" H 20"', 'Dia 24" H 24"', 'Dia 30" H 28"', 'Dia 42" H 42"'],
  },
  {
    id: 15,
    name: 'RS Cylindrical Planter',
    description: 'Contemporary cylindrical planters with sleek proportions for modern architecture.',
    image: 'https://images.unsplash.com/photo-1662322136792-bcf70b1237bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'RS Series',
    sizes: ['Dia 13" H 12"', 'Dia 13" H 24"', 'Dia 16" H 16"', 'Dia 20" H 20"', 'Dia 24" H 24"'],
  },
  {
    id: 16,
    name: 'Sigma Ribbed Planter',
    description: 'Premium textured planters with a sophisticated ribbed surface and refined appearance.',
    image: 'https://images.unsplash.com/photo-1759577087580-a3ce3f36fad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700',
    tag: 'Sigma Series',
    sizes: ['Dia 19–20" H 14"'],
  },
];

/* ── Colour swatch ───────────────────────────────────── */
function ColourDot({ colour, selected, onClick }: { colour: typeof COLOURS[0]; selected: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={colour.name}
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: colour.hex,
        border: selected
          ? `2px solid ${FG}`
          : colour.border
          ? '1.5px solid #D1D5DB'
          : '1.5px solid transparent',
        boxShadow: selected ? `0 0 0 2px ${BG}, 0 0 0 4px ${FG}` : 'none',
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
        transition: 'box-shadow 0.2s ease',
      }}
    />
  );
}

/* ── Product card ────────────────────────────────────── */
function ProductCard({ product, onView }: { product: Product; onView: (p: Product) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 24px 60px rgba(46,94,78,0.14)'
          : '0 4px 20px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        border: '1px solid rgba(46,94,78,0.08)',
      }}
    >
      {/* Image */}
      <div style={{ height: 260, overflow: 'hidden', position: 'relative' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        {/* Series tag */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            background: 'rgba(250,248,243,0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(46,94,78,0.2)',
            color: FG,
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            padding: '4px 10px',
            borderRadius: 99,
          }}
        >
          {product.tag.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.4rem 1.5rem 1.5rem' }}>
        <h3
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#1B1B1B',
            marginBottom: '0.45rem',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>
        <p style={{ color: '#888', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1rem' }}>
          {product.description}
        </p>

        {/* Available text */}
        <p style={{ color: SG, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Available in multiple sizes & colours
        </p>

        {/* Colour dots */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {COLOURS.map(c => <ColourDot key={c.name} colour={c} selected={false} />)}
        </div>

        {/* View Details button */}
        <button
          onClick={() => onView(product)}
          style={{
            width: '100%',
            padding: '10px 0',
            borderRadius: 12,
            border: `1.5px solid ${FG}`,
            background: 'transparent',
            color: FG,
            fontWeight: 600,
            fontSize: '0.82rem',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = FG;
            (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = FG;
          }}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}

/* ── Product detail modal ────────────────────────────── */
function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [selectedColour, setSelectedColour] = useState(0);

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px 24px 24px 24px',
              width: '100%',
              maxWidth: 760,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'sticky',
                top: 16,
                float: 'right',
                marginRight: 16,
                zIndex: 10,
                background: 'rgba(27,27,27,0.08)',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X className="w-4 h-4" style={{ color: '#444' }} />
            </button>

            {/* Hero image */}
            <div style={{ height: 280, overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Modal content */}
            <div className="p-5 sm:p-8 pb-8">
              {/* Series badge + name */}
              <div style={{ color: SG, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', marginBottom: '0.5rem' }}>
                {product.tag.toUpperCase()}
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: '#1B1B1B',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </h2>

              <div className="grid sm:grid-cols-2 gap-8">
                {/* Left: Colours + Sizes */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.68rem', color: '#888', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '0.75rem' }}>
                    AVAILABLE COLOURS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.5rem' }}>
                    {COLOURS.map((c, i) => (
                      <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <ColourDot colour={c} selected={selectedColour === i} onClick={() => setSelectedColour(i)} />
                        <span style={{ fontSize: '0.55rem', color: '#999', whiteSpace: 'nowrap', fontWeight: 500 }}>
                          {c.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {selectedColour !== null && (
                    <div style={{ fontSize: '0.78rem', color: FG, fontWeight: 600, marginBottom: '1.5rem' }}>
                      Selected: {COLOURS[selectedColour].name}
                    </div>
                  )}

                  <div style={{ fontSize: '0.68rem', color: '#888', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '0.75rem' }}>
                    AVAILABLE SIZES
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {product.sizes.map(sz => (
                      <div
                        key={sz}
                        style={{
                          background: BG,
                          border: `1px solid rgba(46,94,78,0.12)`,
                          borderRadius: 8,
                          padding: '6px 12px',
                          fontSize: '0.78rem',
                          color: '#555',
                          fontWeight: 500,
                          display: 'block',
                          wordBreak: 'break-word',
                        }}
                      >
                        {sz}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '1.5rem', fontSize: '0.68rem', color: '#888', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '0.5rem' }}>
                    MATERIAL
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#555', fontWeight: 500 }}>
                    Premium UV Resistant LLDPE
                  </p>
                </div>

                {/* Right: Suitable For */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.68rem', color: '#888', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '0.75rem' }}>
                    SUITABLE FOR
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '2rem' }}>
                    {SUITABLE_FOR.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div
                          style={{
                            width: 18, height: 18, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${FG}, ${SG})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Check style={{ width: 10, height: 10, color: 'white', strokeWidth: 3 }} />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#444', fontWeight: 500 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Request Quote CTA */}
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: 14,
                      border: 'none',
                      background: `linear-gradient(135deg, ${FG} 0%, ${SG} 100%)`,
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      boxShadow: `0 8px 28px rgba(46,94,78,0.35)`,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 14px 40px rgba(46,94,78,0.45)`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px rgba(46,94,78,0.35)`;
                    }}
                  >
                    Request Quote
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── "Need help" divider ─────────────────────────────── */
function HelpDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const CARDS = [
    { icon: <Phone className="w-5 h-5" />, label: 'Call Us', value: '+91 96772 32993', action: 'tel:+919677232993' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email Us', value: 'info@naveenlandscapes.com', action: 'mailto:info@naveenlandscapes.com' },
    { icon: <FileText className="w-5 h-5" />, label: 'Request Quote', value: 'Fill our quick form below', action: '#quote-form', isScroll: true },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: `linear-gradient(135deg, ${FG} 0%, #1A3D30 100%)`,
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Need Help Choosing the{' '}
            <em style={{ color: '#D4AF37' }}>Right Planter?</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 3rem', lineHeight: 1.8 }}>
            Our experts will help you select the ideal planter size, colour, and quantity based on your landscape requirements.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-[820px] mx-auto">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
            >
              <a
                href={card.isScroll ? undefined : card.action}
                onClick={card.isScroll ? (e) => { e.preventDefault(); document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="group rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(250,248,243,0.08)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37' }}
                  >
                    {card.icon}
                  </div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                    {card.label}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                    {card.value}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Quote enquiry form ──────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 12,
  border: '1.5px solid rgba(46,94,78,0.15)',
  background: '#FFFFFF',
  color: '#1B1B1B',
  fontSize: '0.9rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.25s ease',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#555',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  marginBottom: '6px',
};

function QuoteField({
  label,
  name,
  required,
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder || label}
        style={inputStyle}
      />
    </div>
  );
}

function QuoteSelect({
  label,
  name,
  options,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <div style={{ position: 'relative' }}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', paddingRight: '36px' }}
        >
          <option value="">Select {label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 14, height: 14, color: '#888', pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

function QuoteForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', whatsapp: '', email: '', city: '', state: '',
    company: '', projectLocation: '', product: '', quantity: '', colour: '',
    applicationType: '', deliveryLocation: '', notes: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = FG;
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = 'rgba(46,94,78,0.15)';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase
        .from('product_enquiries')
        .insert([
          {
            full_name: form.name,
            phone_number: form.phone,
            whatsapp_number: form.whatsapp,
            email: form.email,
            city: form.city,
            state: form.state,
            company_organization: form.company,
            project_location: form.projectLocation,
            product_interested: form.product,
            quantity_required: form.quantity
              ? parseInt(form.quantity)
              : null,
            preferred_colour: form.colour,
            application_type: form.applicationType,
            delivery_location: form.deliveryLocation,
            additional_requirements: form.notes,
          },
        ]);
      if (error) throw error;
      
      const response = await fetch("/api/product-enquiry", {  method: "POST",  headers: {    "Content-Type": "application/json",  },  body: JSON.stringify({    full_name: form.name,    phone_number: form.phone,    whatsapp_number: form.whatsapp,    email: form.email,    city: form.city,    state: form.state,    company_organization: form.company,    project_location: form.projectLocation,    product_interested: form.product,    quantity_required: form.quantity      ? Number(form.quantity)      : null,    preferred_colour: form.colour,    application_type: form.applicationType,    delivery_location: form.deliveryLocation,    additional_requirements: form.notes,  }),});
      const result = await response.json();
      void result;

      setSubmitted(true);
      setForm({
        name: '',
        phone: '',
        whatsapp: '',
        email: '',
        city: '',
        state: '',
        company: '',
        projectLocation: '',
        product: '',
        quantity: '',
        colour: '',
        applicationType: '',
        deliveryLocation: '',
        notes: '',
      });
    } catch (err: any) {
      console.error('Supabase Error:', err);
      alert(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="quote-form"
      ref={ref}
      style={{ background: BG, padding: '100px 0' }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-14" style={{ background: `linear-gradient(90deg, transparent, #D4AF37)` }} />
            <span style={{ color: '#D4AF37', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em' }}>
              ENQUIRY
            </span>
            <div className="h-px w-14" style={{ background: `linear-gradient(90deg, #D4AF37, transparent)` }} />
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#1B1B1B',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Request <em style={{ color: FG }}>A Quote</em>
          </h2>
          <p style={{ color: '#888', fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            Tell us your requirements and our team will contact you with product details and pricing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            boxShadow: '0 8px 50px rgba(46,94,78,0.08)',
            border: '1px solid rgba(46,94,78,0.1)',
          }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: `linear-gradient(135deg, ${FG}, ${SG})` }}
              >
                <Check className="w-9 h-9 text-white" strokeWidth={2.5} />
              </motion.div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#1B1B1B',
                  marginBottom: '1rem',
                }}
              >
                Thank You!
              </h3>
              <p style={{ color: '#777', fontSize: '1rem', maxWidth: 420, margin: '0 auto', lineHeight: 1.8 }}>
                Thank you for contacting Naveen Landscapes. Our team will get in touch with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: '2rem',
                  padding: '10px 28px',
                  borderRadius: 99,
                  border: `1.5px solid ${FG}`,
                  background: 'transparent',
                  color: FG,
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Submit Another Enquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5">
                {/* Left — Customer details */}
                <div>
                  <div style={{ fontSize: '0.68rem', color: FG, fontWeight: 700, letterSpacing: '0.18em', marginBottom: '1.25rem' }}>
                    CUSTOMER DETAILS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <QuoteField label="Full Name" name="name" required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="Phone Number" name="phone" type="tel" required value={form.phone} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="WhatsApp Number" name="whatsapp" type="tel" placeholder="If different from above" value={form.whatsapp} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="Email Address" name="email" type="email" required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="City" name="city" required value={form.city} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="State" name="state" value={form.state} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="Company / Organization" name="company" placeholder="Optional" value={form.company} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="Project Location" name="projectLocation" placeholder="Site address or area" value={form.projectLocation} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>

                {/* Right — Product requirements */}
                <div>
                  <div style={{ fontSize: '0.68rem', color: FG, fontWeight: 700, letterSpacing: '0.18em', marginBottom: '1.25rem' }}>
                    PRODUCT REQUIREMENTS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <QuoteSelect label="Product Interested In" name="product" required options={PRODUCT_NAMES} value={form.product} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteField label="Quantity Required" name="quantity" type="number" placeholder="e.g. 50" value={form.quantity} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <QuoteSelect
                      label="Preferred Colour"
                      name="colour"
                      options={['White', 'Cream', 'Brown', 'Sand', 'Grey', 'Dark Grey', 'Light Grey', 'Maroon']}
                      value={form.colour}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <QuoteSelect
                      label="Application Type"
                      name="applicationType"
                      options={['Residential', 'Apartment', 'Villa', 'Commercial Building', 'Hotel', 'Restaurant', 'Landscape Project', 'School', 'Hospital', 'Government Project', 'Other']}
                      value={form.applicationType}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <QuoteField label="Delivery Location" name="deliveryLocation" placeholder="City or state" value={form.deliveryLocation} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                    <div>
                      <label style={labelStyle}>Additional Requirements</label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={'Need 50 pieces in Brown colour for apartment landscape project.'}
                        rows={4}
                        style={{ ...inputStyle, resize: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="text-center mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '16px 52px',
                    borderRadius: 99,
                    border: 'none',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                    color: '#1B1B1B',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    letterSpacing: '0.1em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 32px rgba(212,175,55,0.4)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 44px rgba(212,175,55,0.5)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(212,175,55,0.4)';
                  }}
                >
                  {loading ? 'Submitting...' : 'REQUEST QUOTE'}
                </button>
                <p style={{ color: '#aaa', fontSize: '0.75rem', marginTop: '0.85rem' }}>
                  We typically respond within 24 hours — Monday to Saturday.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Main exported section ───────────────────────────── */
export function PremiumCollection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-60px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* Product grid section */}
      <section id="products" style={{ background: BG, padding: '100px 0' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

          {/* Header */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="h-px w-14" style={{ background: `linear-gradient(90deg, transparent, ${EB})` }} />
                <span style={{ color: EB, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em' }}>
                  GARDENCIA COLLECTION
                </span>
                <div className="h-px w-14" style={{ background: `linear-gradient(90deg, ${EB}, transparent)` }} />
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 700,
                  color: '#1B1B1B',
                  lineHeight: 1.2,
                  marginBottom: '1.2rem',
                }}
              >
                Premium Product{' '}
                <em style={{ color: FG }}>Collection</em>
              </h2>
              <p
                style={{
                  color: '#888',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                  maxWidth: 640,
                  margin: '0 auto',
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                Explore our range of premium indoor and outdoor planters suitable for villas, apartments, commercial landscapes, hotels, resorts, offices, and public spaces.
              </p>
            </motion.div>
          </div>

          {/* Product grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          >
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} onView={setSelectedProduct} />
              </motion.div>
            ))}
          </div>

          {/* Product Brochure CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <a
              href="/Naveen_Landscapes_Catalogue.pdf"
              download="Naveen_Landscapes_Catalogue.pdf"
              className="inline-flex flex-col items-center justify-center px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                color: '#1B1B1B',
                boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
                Download Product Brochure
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.8, letterSpacing: '0.1em', marginTop: '2px' }}>
                PDF CATALOGUE
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Product detail modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* "Need Help" divider */}
      <HelpDivider />

      {/* Quote form */}
      <QuoteForm />
    </>
  );
}
