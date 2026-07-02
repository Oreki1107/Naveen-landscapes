import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { supabase } from '../../lib/supabase';
import logoImg from '@/imports/WhatsApp_Image_2026-06-20_at_3.20.16_PM-1.jpeg';
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
} from 'lucide-react';

const QUICK_LINKS = ['Home', 'About', 'Services', 'Projects', 'Testimonials', 'Contact'];
const SERVICE_LINKS = [
  'Landscape Contracting',
  'Aquascaping',
  'Hardscape & Softscape',
  'Vertical Landscaping',
  'Nature Scaping',
  'Maintenance',
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── Landscape SVG silhouette ────────────────────────── */
function LandscapeIllustration() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
      viewBox="0 0 1440 280"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.04 }}
    >
      {/* Rolling hills */}
      <path
        d="M0 200 Q200 120 400 160 Q600 200 800 140 Q1000 80 1200 150 Q1350 190 1440 130 L1440 280 L0 280 Z"
        fill="#588157"
      />
      <path
        d="M0 240 Q300 170 600 200 Q900 230 1200 190 Q1350 175 1440 200 L1440 280 L0 280 Z"
        fill="#344E41"
      />
      {/* Tree silhouettes */}
      {[60, 180, 320, 520, 700, 870, 1050, 1200, 1360].map((x, i) => {
        const h = 60 + (i % 3) * 25;
        const w = 28 + (i % 2) * 16;
        const base = 200 - (i % 4) * 15;
        return (
          <g key={x}>
            <rect
              x={x + w / 2 - 3}
              y={base}
              width="6"
              height={h * 0.35}
              rx="2"
              fill="#344E41"
            />
            <ellipse cx={x + w / 2} cy={base} rx={w / 2} ry={h / 2} fill="#344E41" />
          </g>
        );
      })}
      {/* Floating leaf shapes */}
      <ellipse cx="240" cy="160" rx="18" ry="7" fill="#D4AF37" opacity="0.4" transform="rotate(-25 240 160)" />
      <ellipse cx="800" cy="120" rx="14" ry="5" fill="#D4AF37" opacity="0.35" transform="rotate(30 800 120)" />
      <ellipse cx="1100" cy="170" rx="12" ry="4.5" fill="#D4AF37" opacity="0.3" transform="rotate(-20 1100 170)" />
    </svg>
  );
}

/* ── Floating leaf ornament ──────────────────────────── */
function FloatingLeaf() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: '8%', right: '6%', opacity: 0.08 }}
      animate={{ rotate: [0, 12, 0], y: [0, -12, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="45" rx="55" ry="28" fill="#588157" transform="rotate(-30 60 45)" />
        <line x1="20" y1="60" x2="100" y2="30" stroke="#D4AF37" strokeWidth="1.2" opacity="0.6" />
        <line x1="35" y1="38" x2="55" y2="52" stroke="#D4AF37" strokeWidth="0.7" opacity="0.4" />
        <line x1="65" y1="35" x2="85" y2="48" stroke="#D4AF37" strokeWidth="0.7" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

/* ── Newsletter strip ─────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  async function handleSubscribe() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatusMessage('Please enter your email.');
      return;
    }

    setStatusMessage('');

    const { data: existing, error: selectError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', trimmedEmail)
      .limit(1);

    if (selectError) {
      console.error(selectError);
      setStatusMessage('Subscription failed. Please try again later.');
      return;
    }

    if (existing && existing.length > 0) {
      setStatusMessage('You are already subscribed.');
      return;
    }

    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: trimmedEmail }]);

    if (insertError) {
      console.error(insertError);
      setStatusMessage('Subscription failed. Please try again later.');
      return;
    }

    // Notify admin via backend email API
    const emailResponse = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: trimmedEmail,
      }),
    });

    if (!emailResponse.ok) {
      console.error('Failed to send notification email');
    }

    setSent(true);
    setEmail('');
    setStatusMessage('');
  }

  return (
    <div
      className="rounded-2xl p-6 mb-8"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(212,175,55,0.18)',
      }}
    >
      <div
        style={{
          color: '#D4AF37',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          marginBottom: '0.5rem',
        }}
      >
        NEWSLETTER
      </div>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', marginBottom: '1rem', lineHeight: 1.6 }}>
        Seasonal inspiration, design tips & project updates.
      </p>
      {sent ? (
        <div style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: 600 }}>
          ✓ Thank you for subscribing!
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                padding: '10px 14px',
                color: 'white',
                fontSize: '0.82rem',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(212,175,55,0.4)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            />
            <button
              type="button"
              onClick={handleSubscribe}
              className="flex items-center justify-center px-4 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                color: '#1B1B1B',
                flexShrink: 0,
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {statusMessage ? (
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', marginTop: '0.85rem' }}>
              {statusMessage}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

/* ── Social icon with glow ───────────────────────────── */
function SocialIcon({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href || undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-350 outline-none focus:ring-2 focus:ring-[#D4AF37]"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #344E41, #588157)'
          : 'rgba(255,255,255,0.06)',
        border: hovered ? 'none' : '1px solid rgba(255,255,255,0.09)',
        color: hovered ? 'white' : 'rgba(255,255,255,0.55)',
        boxShadow: hovered ? '0 4px 18px rgba(52,78,65,0.5)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {icon}
    </Tag>
  );
}

/* ── Footer ──────────────────────────────────────────── */
export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#0E0E0E', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Landscape illustration */}
      <LandscapeIllustration />

      {/* Floating leaf */}
      <FloatingLeaf />

      {/* Soft top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(52,78,65,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Animated divider */}
      <div style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, #344E41 20%, #D4AF37 50%, #588157 80%, transparent 100%)',
            transformOrigin: 'center',
            boxShadow: '0 0 20px rgba(212,175,55,0.2)',
          }}
        />
      </div>

      {/* Main content */}
      <div style={{ padding: '72px 0 48px', position: 'relative' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-5">
                <img
                  src={logoImg}
                  alt="Naveen Landscapes"
                  decoding="async"
                  style={{
                    height: '44px',
                    width: 'auto',
                    objectFit: 'contain',
                    opacity: 0.9,
                  }}
                />
              </div>

              <p
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.85rem',
                  lineHeight: 1.8,
                  marginBottom: '1.25rem',
                }}
              >
                Transforming outdoor spaces into extraordinary living landscapes across
                South India since 2016. Premium quality, timeless design.
              </p>

              {/* Social icons */}
              <div className="flex gap-2.5 mb-6">
                <SocialIcon icon={<Instagram className="w-4 h-4" />} label="Visit our Instagram" href="https://www.instagram.com/naveen_landscapes_pots?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" />
                <SocialIcon icon={<Facebook className="w-4 h-4" />} label="Visit our Facebook" href="https://www.facebook.com/share/19HYtcGjGk/" />
                <SocialIcon icon={<Youtube className="w-4 h-4" />} label="Visit our YouTube Channel" href="https://youtube.com/@naveenlandscapes?si=z2bVY7TOx_RX32ia" />
                <SocialIcon icon={<Linkedin className="w-4 h-4" />} label="Visit our LinkedIn" href="https://www.linkedin.com/in/naveen-landscapes-58844941a" />
              </div>

              {/* Newsletter */}
              <Newsletter />
            </div>

            {/* Quick links */}
            <div>
              <h4
                style={{
                  color: '#D4AF37',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  marginBottom: '1.4rem',
                }}
              >
                QUICK LINKS
              </h4>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(`#${link.toLowerCase()}`)}
                      className="group flex items-center gap-2 transition-colors duration-300 hover:text-white"
                      style={{
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '0.86rem',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                      }}
                    >
                      <ArrowRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                        style={{ color: '#D4AF37' }}
                      />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4
                style={{
                  color: '#D4AF37',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  marginBottom: '1.4rem',
                }}
              >
                SERVICES
              </h4>
              <ul className="space-y-3">
                {SERVICE_LINKS.map((svc) => (
                  <li key={svc}>
                    <button
                      onClick={() => scrollTo('#services')}
                      className="group flex items-center gap-2 transition-colors duration-300 hover:text-white"
                      style={{
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '0.86rem',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                      }}
                    >
                      <ArrowRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                        style={{ color: '#D4AF37' }}
                      />
                      {svc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4
                style={{
                  color: '#D4AF37',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  marginBottom: '1.4rem',
                }}
              >
                CONTACT US
              </h4>

              <div className="space-y-4 mb-6">
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', marginTop: '-0.5rem' }}>
                  Call Us
                </div>
                
                <div className="flex gap-3 items-start">
                  <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <div>
                    <div style={{ color: '#D4AF37', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Chennai</div>
                    <a href="tel:+919677232993" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.86rem', textDecoration: 'none', display: 'block', marginBottom: '0.8rem' }}>
                      +91 96772 32993
                    </a>
                    
                    <div style={{ color: '#D4AF37', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Bengaluru</div>
                    <a href="tel:+919880766556" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.86rem', textDecoration: 'none', display: 'block' }}>
                      +91 98807 66556
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 items-center pt-2">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                  <a
                    href="mailto:info@naveenlandscapes.com"
                    style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.86rem', textDecoration: 'none' }}
                  >
                    info@naveenlandscapes.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => scrollTo('#contact')}
                className="w-full py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                  color: '#1B1B1B',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
                }}
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '18px 0', position: 'relative' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
            © {year} Naveen Landscapes. All rights reserved.
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
              <button
                key={item}
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.76rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#D4AF37')}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)')
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
