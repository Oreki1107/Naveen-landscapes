import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logoImg from '@/imports/WhatsApp_Image_2026-06-20_at_3.20.16_PM-1.jpeg';

const navLinks = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Products',     href: '#products' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact' },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(27, 27, 27, 0.88)' : 'rgba(27, 27, 27, 0.15)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.18)' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center group"
          >
            <img
              src={logoImg}
              alt="Naveen Landscapes"
              decoding="async"
              style={{
                height: '48px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'opacity 0.3s ease',
                opacity: 0.92,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.92'; }}
            />
          </button>

          {/* Desktop Nav Links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative group text-white/75 hover:text-white transition-colors duration-300"
                style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.04em' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-400"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, #B8941F)' }}
                />
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => scrollTo('#contact')}
            className="hidden lg:flex items-center px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
              color: '#1B1B1B',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
            }}
          >
            Book Consultation
          </button>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-lg transition-colors hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(20, 20, 20, 0.98)', borderTop: '1px solid rgba(212,175,55,0.15)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => { scrollTo(link.href); setMobileOpen(false); }}
                  className="text-white/80 hover:text-white text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-all"
                  style={{ fontSize: '0.95rem', fontWeight: 500 }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { scrollTo('#contact'); setMobileOpen(false); }}
                className="mt-2 py-3 rounded-full text-center transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                  color: '#1B1B1B',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                Book Consultation
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
