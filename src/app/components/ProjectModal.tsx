import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react';

export interface ProjectData {
  id: number;
  img: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription: string;
  location: string;
  year: string;
  services: string[];
  galleryImgs: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  allProjects: ProjectData[];
  onClose: () => void;
  onNavigate: (project: ProjectData) => void;
}

export function ProjectModal({ project, allProjects, onClose, onNavigate }: ProjectModalProps) {
  const idx = project ? allProjects.findIndex(p => p.id === project.id) : -1;
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  const relatedProjects = project
    ? allProjects
        .filter(p => p.categorySlug === project.categorySlug && p.id !== project.id)
        .slice(0, 3)
    : [];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prev) onNavigate(prev);
      if (e.key === 'ArrowRight' && next) onNavigate(next);
    },
    [onClose, prev, next, onNavigate]
  );

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, handleKey]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] overflow-y-auto"
          style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
            style={{ background: '#FAF9F6' }}
          >
            {/* Close & navigation controls */}
            <div className="fixed top-6 right-6 z-[110] flex items-center gap-3">
              <button
                onClick={() => prev && onNavigate(prev)}
                disabled={!prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 hover:scale-110"
                style={{ background: 'rgba(27,27,27,0.6)', color: 'white', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => next && onNavigate(next)}
                disabled={!next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 hover:scale-110"
                style={{ background: 'rgba(27,27,27,0.6)', color: 'white', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: 'rgba(27,27,27,0.85)', color: 'white', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hero image */}
            <div className="relative w-full" style={{ height: '75vh', minHeight: '500px' }}>
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(250,249,246,1) 0%, transparent 45%)' }}
              />
              {/* Category badge */}
              <div className="absolute top-8 left-8">
                <span
                  style={{
                    background: 'rgba(250,249,246,0.12)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    padding: '6px 14px',
                    borderRadius: '99px',
                    display: 'inline-block',
                  }}
                >
                  {project.category.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-24">
              {/* Title row */}
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14" style={{ marginTop: '-60px', position: 'relative', zIndex: 2 }}>
                <div>
                  <h2
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      fontWeight: 700,
                      color: '#1B1B1B',
                      lineHeight: 1.15,
                      marginBottom: '1rem',
                    }}
                  >
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-1.5" style={{ color: '#666', fontSize: '0.88rem' }}>
                      <MapPin className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
                      {project.location}
                    </div>
                    <div style={{ color: '#666', fontSize: '0.88rem' }}>
                      {project.year}
                    </div>
                    <div
                      style={{
                        background: 'rgba(52,78,65,0.08)',
                        color: '#344E41',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        padding: '4px 12px',
                        borderRadius: '99px',
                        border: '1px solid rgba(52,78,65,0.15)',
                      }}
                    >
                      {project.category}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) || onClose()}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #344E41, #588157)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    boxShadow: '0 8px 28px rgba(52,78,65,0.3)',
                  }}
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="grid lg:grid-cols-[3fr_2fr] gap-16 mb-16">
                <div>
                  <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                    {project.description}
                  </p>
                  <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.85 }}>
                    {project.longDescription}
                  </p>
                </div>

                {/* Services */}
                <div>
                  <div style={{ color: '#344E41', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1.25rem' }}>
                    SERVICES DELIVERED
                  </div>
                  <div className="space-y-3">
                    {project.services.map(svc => (
                      <div key={svc} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#D4AF37' }} />
                        <span style={{ color: '#444', fontSize: '0.92rem', fontWeight: 500 }}>{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image gallery strip */}
              {project.galleryImgs.length > 0 && (
                <div className="mb-16">
                  <div style={{ color: '#344E41', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1.25rem' }}>
                    PROJECT GALLERY
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {project.galleryImgs.map((img, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-2xl"
                        style={{ aspectRatio: '4/3' }}
                      >
                        <img
                          src={img}
                          alt={`${project.title} ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related projects */}
              {relatedProjects.length > 0 && (
                <div>
                  <div style={{ color: '#344E41', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1.25rem' }}>
                    RELATED PROJECTS
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedProjects.map(rp => (
                      <button
                        key={rp.id}
                        onClick={() => onNavigate(rp)}
                        className="group relative overflow-hidden rounded-2xl text-left"
                        style={{ aspectRatio: '4/3' }}
                      >
                        <img
                          src={rp.img}
                          alt={rp.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(27,27,27,0.7) 0%, transparent 55%)' }}
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div style={{ color: 'white', fontFamily: '"Playfair Display", serif', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3 }}>
                            {rp.title}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Prev / Next navigation */}
              <div className="flex justify-between items-center mt-16 pt-10" style={{ borderTop: '1px solid rgba(52,78,65,0.1)' }}>
                {prev ? (
                  <button
                    onClick={() => onNavigate(prev)}
                    className="flex items-center gap-3 group"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" style={{ color: '#344E41' }} />
                    <div className="text-left">
                      <div style={{ color: '#888', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '2px' }}>PREVIOUS</div>
                      <div style={{ color: '#1B1B1B', fontSize: '0.9rem', fontWeight: 600 }}>{prev.title}</div>
                    </div>
                  </button>
                ) : <div />}
                {next ? (
                  <button
                    onClick={() => onNavigate(next)}
                    className="flex items-center gap-3 group text-right"
                  >
                    <div>
                      <div style={{ color: '#888', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '2px' }}>NEXT</div>
                      <div style={{ color: '#1B1B1B', fontSize: '0.9rem', fontWeight: 600 }}>{next.title}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#344E41' }} />
                  </button>
                ) : <div />}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
