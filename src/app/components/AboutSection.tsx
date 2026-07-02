import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const ABOUT_IMG =
  'https://images.unsplash.com/photo-1764197943918-f0a5b2d739fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900';

const TIMELINE = [
  { year: '2016', text: 'Founded in Chennai with a vision for premium outdoor spaces', active: false },
  { year: '2021', text: 'Expanded to Bengaluru — 200+ projects milestone reached', active: false },
  { year: '2023', text: 'Launched aquascaping & vertical garden specialty divisions', active: false },
  { year: 'Now', text: "South India's most trusted luxury landscape partner", active: true },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: '#FAF9F6', padding: '100px 0' }}
    >
      {/* Subtle leaf tile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cellipse cx='60' cy='60' rx='35' ry='14' fill='%23344E41' transform='rotate(40 60 60)'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='14' fill='%23344E41' transform='rotate(-40 60 60)'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ aspectRatio: '4/5', boxShadow: '0 30px 80px rgba(52,78,65,0.2)' }}
            >
              <img
                src={ABOUT_IMG}
                alt="Naveen Landscapes garden craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(52,78,65,0.65) 0%, rgba(52,78,65,0.1) 45%, transparent 70%)',
                }}
              />
              {/* Glass label inside image */}
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4"
                style={{
                  background: 'rgba(250,249,246,0.12)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <div
                  style={{
                    color: '#D4AF37',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    marginBottom: '4px',
                  }}
                >
                  AWARD-WINNING TEAM
                </div>
                <div
                  style={{
                    color: 'white',
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                  }}
                >
                  Crafting Nature Since 2016
                </div>
              </div>
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 rounded-2xl p-6 text-white"
              style={{
                background: 'linear-gradient(135deg, #344E41 0%, #588157 100%)',
                boxShadow: '0 20px 50px rgba(52,78,65,0.45)',
                minWidth: '140px',
              }}
            >
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '2.6rem',
                  fontWeight: 700,
                  color: '#D4AF37',
                  lineHeight: 1,
                }}
              >
                100+
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
                Premium Projects
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                color: '#588157',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              About Naveen Landscapes
            </span>

            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: '#1B1B1B',
                lineHeight: 1.2,
                marginTop: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              Crafting Nature With{' '}
              <em style={{ color: '#344E41' }}>Precision</em>
            </h2>

            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.9, marginBottom: '1.2rem' }}>
              At Naveen Landscapes, every outdoor space holds the potential to become a living
              masterpiece. With over ten years crafting premium landscapes across South India, we
              blend artistry with engineering to create environments that breathe life into your
              vision.
            </p>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>
              From intimate residential gardens to expansive commercial landscapes, our passionate
              designers and skilled craftsmen bring nature's finest elements together with
              precision and care.
            </p>

            {/* Timeline */}
            <div className="relative mb-10">
              <div
                className="absolute left-[15px] top-0 bottom-0 w-px"
                style={{
                  background:
                    'linear-gradient(to bottom, #344E41 0%, rgba(52,78,65,0.08) 100%)',
                }}
              />
              <div className="space-y-5">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                    className="flex gap-5 items-start"
                  >
                    <div
                      className="w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 z-10"
                      style={{
                        background: item.active
                          ? 'linear-gradient(135deg, #D4AF37, #B8941F)'
                          : '#344E41',
                        boxShadow: item.active
                          ? '0 4px 16px rgba(212,175,55,0.4)'
                          : 'none',
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="pt-1">
                      <span
                        style={{
                          fontWeight: 700,
                          color: item.active ? '#D4AF37' : '#344E41',
                          fontSize: '0.85rem',
                          display: 'block',
                          marginBottom: '2px',
                        }}
                      >
                        {item.year}
                      </span>
                      <span style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {item.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              className="flex items-center gap-3 px-8 py-4 rounded-full group transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #344E41 0%, #588157 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: '0 8px 30px rgba(52,78,65,0.35)',
              }}
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
