import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Quote } from 'lucide-react';

export function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="founder"
      className="relative overflow-hidden"
      style={{ background: '#FFFFFF', padding: '120px 0' }}
    >
      <div ref={ref} className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: '#D4AF37' }} />
            <span
              style={{
                color: '#D4AF37',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              Leadership
            </span>
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#1B1B1B',
              lineHeight: 1.1,
            }}
          >
            Founder & <em style={{ color: '#344E41' }}>Managing Director</em>
          </h2>
        </motion.div>

        {/* Text Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                color: '#1B1B1B',
                lineHeight: 1.4,
                fontWeight: 500,
              }}
            >
              Our company is led by M. Naveen Kumar, a qualified Civil Engineer (D.C.E.) and a passionate landscape specialist with 10+ years of proven expertise in creating premium outdoor environments.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '1.5rem', fontWeight: 300 }}>
              By uniquely blending his core civil engineering knowledge with creative landscaping aesthetics, Naveen ensures that every project benefits from structurally sound foundations, smart water management, and stunning green designs.
            </p>
            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.85, fontWeight: 300 }}>
              His decade-long experience in managing site execution, labor coordination, and sustainable landscaping practices forms the cornerstone of our company's commitment to delivering excellence.
            </p>
          </motion.div>
        </div>

        {/* Executive Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl p-10 overflow-hidden transition-all duration-500"
            style={{
              background: '#FAF9F6',
              border: '1px solid rgba(52,78,65,0.08)',
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1 transition-transform duration-500 origin-left"
              style={{ background: 'linear-gradient(90deg, #D4AF37, #B8941F)', transform: 'scaleX(0)' }}
            />
            {/* The line below forces a hover style using tailwind group-hover in style is hard, I'll use standard css or tailwind classes where possible. */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <div style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              Founder & Managing Director
            </div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', fontWeight: 700, color: '#1B1B1B', marginBottom: '2.5rem' }}>
              M. Naveen Kumar
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '0.5rem' }}>
                  Qualification
                </div>
                <div style={{ fontWeight: 500, color: '#333', fontSize: '0.95rem' }}>
                  Diploma in Civil Engineering (D.C.E.)
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '0.5rem' }}>
                  Experience
                </div>
                <div style={{ fontWeight: 500, color: '#333', fontSize: '0.95rem' }}>
                  10+ Years
                </div>
              </div>
              <div className="sm:col-span-2">
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1rem' }}>
                  Expertise
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['Civil Engineering', 'Landscape Design', 'Project Execution', 'Sustainable Landscaping'].map(skill => (
                    <span 
                      key={skill}
                      className="px-4 py-1.5 rounded-full"
                      style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', fontSize: '0.85rem', color: '#444', fontWeight: 500 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl p-10 overflow-hidden transition-all duration-500"
            style={{
              background: '#FAF9F6',
              border: '1px solid rgba(52,78,65,0.08)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <div style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              Technical Head
            </div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', fontWeight: 700, color: '#1B1B1B', marginBottom: '2.5rem' }}>
              Mr. Nagaraj
            </h3>
            
            <div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1.2rem' }}>
                Role
              </div>
              <div className="flex flex-col gap-4">
                {['Technical Planning', 'Site Execution', 'Quality Supervision', 'Engineering Coordination'].map(role => (
                  <div key={role} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
                    <span style={{ fontWeight: 500, color: '#333', fontSize: '1rem' }}>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #344E41 0%, #2A3F2F 100%)',
            boxShadow: '0 30px 60px rgba(52,78,65,0.25)',
          }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }}
          />
          <Quote
            className="absolute top-10 left-10 md:top-16 md:left-16 w-32 h-32 opacity-[0.04]"
            style={{ color: '#FAF9F6', transform: 'rotate(-10deg)' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-12 h-px mb-10" style={{ background: '#D4AF37' }} />
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                fontWeight: 600,
                color: '#FAF9F6',
                lineHeight: 1.45,
                fontStyle: 'italic',
                marginBottom: '2.5rem',
              }}
            >
              "Every landscape we create is designed to combine engineering precision, aesthetic excellence, and long-term sustainability while delivering exceptional value and customer satisfaction."
            </p>
            <div
              style={{
                color: '#D4AF37',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Company Philosophy
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
