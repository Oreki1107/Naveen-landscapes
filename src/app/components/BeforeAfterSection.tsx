import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { MoveHorizontal } from 'lucide-react';
import BEFORE_IMG from '../../imports/before.png';
import AFTER_IMG from '../../imports/after.png';

export function BeforeAfterSection() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    setDragging(true);
    const onMove = (ev: MouseEvent) => updatePosition(ev.clientX);
    const onUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function onTouchStart(e: React.TouchEvent) {
    const onMove = (ev: TouchEvent) => updatePosition(ev.touches[0].clientX);
    const onEnd = () => {
      setDragging(false);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
    setDragging(true);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  }

  return (
    <section style={{ background: '#1B1B1B', padding: '100px 0' }} ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
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
            TRANSFORMATION
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
            The Naveen{' '}
            <em style={{ color: '#D4AF37' }}>Difference</em>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Drag the slider to see how a bare villa entrance wall became a
            landmark tropical landscape.
          </p>
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto"
          style={{ maxWidth: '960px' }}
        >
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-3xl select-none"
            style={{
              aspectRatio: '16/9',
              cursor: dragging ? 'grabbing' : 'grab',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
              userSelect: 'none',
            }}
          >
            {/* BEFORE image (base) */}
            <img
              src={BEFORE_IMG}
              alt="Before transformation"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              draggable={false}
            />

            {/* AFTER image (clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                src={AFTER_IMG}
                alt="After transformation"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              {/* After label */}
              <div
                className="absolute top-5 right-5 px-4 py-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #344E41, #588157)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  boxShadow: '0 4px 16px rgba(52,78,65,0.5)',
                }}
              >
                AFTER
              </div>
            </div>

            {/* Before label */}
            <div
              className="absolute top-5 left-5 px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(27,27,27,0.75)',
                backdropFilter: 'blur(12px)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              BEFORE
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5"
              style={{
                left: `${position}%`,
                background: 'linear-gradient(to bottom, rgba(212,175,55,0.2), #D4AF37, rgba(212,175,55,0.2))',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 20px rgba(212,175,55,0.5)',
              }}
            />

            {/* Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: `${position}%`,
                transform: 'translateX(-50%) translateY(-50%)',
                zIndex: 10,
              }}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                  boxShadow: '0 8px 32px rgba(212,175,55,0.6), 0 0 0 4px rgba(212,175,55,0.2)',
                  cursor: 'grab',
                  transition: 'transform 0.2s ease',
                  transform: dragging ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                <MoveHorizontal className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(27,27,27,0.5) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Instruction */}
          <div
            className="text-center mt-5"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}
          >
            ← Drag the slider to compare →
          </div>
        </motion.div>
      </div>
    </section>
  );
}
