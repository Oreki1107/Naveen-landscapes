import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const ONGOING_PROJECTS = [
  'Ceebros',
  'Asta Arise Apartment (Alwarpet)',
  'Clover Riverview Apartment (Kotturpuram)',
  'SRM Housings'
];

const COMPLETED_PROJECTS = [
  'The Palms Residency', 'Pidilite Industries', 'V Square Infra', 'Asta Arise Apartment',
  'Ceebros One 74', 'The Lords Apartment', 'Injambakkam Beach House', 'Rohini Theatre (Residence)',
  'Ramada Plaza', 'TVS Next Limited', 'ABT Constructions', '22 Yards Cricket Ground',
  'Panache Residency', 'Bhaashyaam', 'Ceebros Garden City', 'ESNP',
  'Ceebros Mahalingapuram', 'Kora Leather Factory', 'Clover Riverside View (Kotturpuram)', 'Agarwal Eye Hospital (Residence)',
  'The Checkers Hotel', 'Beach Ville', 'Prestige Resorts (Mamallapuram)', 'Sterling',
  'Swamy School (Porur)', 'Vels (Residence)', 'Siddha Hospital', 'Rajiv Gandhi Institute',
  'SRM (Residence)'
];

function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
      style={{ marginBottom: '4rem' }}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
        <span style={{ color: '#D4AF37', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
          Portfolio
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
        Our Prestigious Projects
      </h2>
      <p
        style={{
          color: '#777',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.85,
          fontWeight: 300,
        }}
      >
        Trusted across residential, commercial, hospitality, healthcare, educational, and institutional developments.
      </p>
    </motion.div>
  );
}

export function PrestigiousProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });

  // Triple the items so we can scroll infinitely without seeing a gap
  const marqueeItems = [...ONGOING_PROJECTS, ...ONGOING_PROJECTS, ...ONGOING_PROJECTS];

  return (
    <section 
      style={{ background: '#FAF9F6', padding: '100px 0' }}
      ref={containerRef}
    >
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
          .animate-scroll-left {
            animation: scrollLeft 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader inView={inView} />
      </div>

      {/* Ongoing Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-24"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full" style={{ background: 'rgba(212, 175, 55, 0.08)' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#344E41', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Currently Under Execution
            </span>
          </div>
          <p className="mt-5" style={{ color: '#777', fontSize: '0.95rem', fontWeight: 300 }}>
            Delivering premium landscaping solutions across ongoing residential and commercial developments.
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-10" style={{ borderTop: '1px solid rgba(52,78,65,0.08)', borderBottom: '1px solid rgba(52,78,65,0.08)', background: 'linear-gradient(to right, rgba(250,249,246,1), rgba(245,244,240,1), rgba(250,249,246,1))' }}>
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-scroll-left group">
            {marqueeItems.map((project, idx) => (
              <div 
                key={idx} 
                className="flex items-center mx-6 md:mx-10 cursor-default"
              >
                <div 
                  className="px-8 py-5 rounded-2xl transition-all duration-500 hover:shadow-[0_12px_40px_rgba(52,78,65,0.08)] hover:-translate-y-1"
                  style={{ 
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.03)',
                  }}
                >
                  <span 
                    style={{ 
                      fontFamily: '"Playfair Display", serif', 
                      fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                      color: '#1B1B1B',
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Completed Projects Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-2"
        >
          {COMPLETED_PROJECTS.map((project, idx) => (
             <motion.div 
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: (idx % 12) * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
               key={idx}
               className="group flex items-center py-4 border-b cursor-default"
               style={{ borderColor: 'rgba(0,0,0,0.05)' }}
             >
               <div className="w-1.5 h-1.5 rounded-full mr-4 transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:scale-[1.8]" style={{ background: 'rgba(52,78,65,0.15)' }} />
               <span 
                className="text-[#444] font-medium text-[0.95rem] transition-colors duration-300 group-hover:text-[#344E41]"
                style={{ letterSpacing: '0.01em' }}
               >
                 {project}
               </span>
             </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
