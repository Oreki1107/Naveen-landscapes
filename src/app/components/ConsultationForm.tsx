import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Send, CheckCircle, Leaf } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const SERVICES_LIST = [
  'Landscape Contracting',
  'Aquascaping',
  'Hardscape',
  'Softscape',
  'Vertical Landscaping',
  'Nature Scaping',
  'Maintenance',
  'Engineering Works',
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  date: string;
  message: string;
}

export function ConsultationForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', city: '', service: '', date: '', message: '',
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(250,249,246,0.07)',
    border: '1px solid rgba(250,249,246,0.15)',
    borderRadius: '16px',
    padding: '14px 18px',
    color: 'white',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease',
    backdropFilter: 'blur(8px)',
    fontFamily: 'Inter, sans-serif',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    marginBottom: '8px',
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from('consultation_requests')
      .insert([
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          service: form.service,
          preferred_date: form.date,
          message: form.message,
        },
      ]);

    if (error) {
      console.error(error);
      alert('Failed to submit consultation request');
      return;
    }

    const emailResponse = await fetch("/api/consultation", {  method: "POST",  headers: {    "Content-Type": "application/json",  },  body: JSON.stringify({    name: form.name,    phone: form.phone,    email: form.email,    city: form.city,    service: form.service,    preferred_date: form.date,    message: form.message,  }),});if (!emailResponse.ok) {  console.error("Failed to send consultation email");}

    setSubmitted(true);
    setForm({
      name: '',
      phone: '',
      email: '',
      city: '',
      service: '',
      date: '',
      message: '',
    });
  }

  return (
    <section
      id="contact"
      style={{ background: '#1B1B1B', padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cellipse cx='40' cy='40' rx='24' ry='9' fill='%23344E41' transform='rotate(30 40 40)'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(52,78,65,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.3)',
            }}
          >
            <Leaf className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
            <span
              style={{
                color: '#D4AF37',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
              }}
            >
              FREE CONSULTATION
            </span>
          </div>

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
            Let's Bring Your Vision{' '}
            <em style={{ color: '#D4AF37' }}>to Life</em>
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
            Schedule a complimentary consultation with our landscape design experts.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto max-w-[800px] relative overflow-hidden rounded-3xl p-8 md:p-12"
          style={{
            background: 'rgba(52,78,65,0.15)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          }}
        >
          {/* Gold top border */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, #344E41, #588157)' }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '1rem',
                }}
              >
                Thank You!
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8 }}>
                We've received your consultation request. Our team will reach out within 24 hours
                to confirm your appointment.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                  color: '#1B1B1B',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div>
                  <label style={labelStyle}>FULL NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                      e.target.style.background = 'rgba(250,249,246,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(250,249,246,0.15)';
                      e.target.style.background = 'rgba(250,249,246,0.07)';
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>PHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                      e.target.style.background = 'rgba(250,249,246,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(250,249,246,0.15)';
                      e.target.style.background = 'rgba(250,249,246,0.07)';
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                      e.target.style.background = 'rgba(250,249,246,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(250,249,246,0.15)';
                      e.target.style.background = 'rgba(250,249,246,0.07)';
                    }}
                  />
                </div>

                {/* City */}
                <div>
                  <label style={labelStyle}>CITY *</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="Chennai, Bengaluru..."
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                      e.target.style.background = 'rgba(250,249,246,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(250,249,246,0.15)';
                      e.target.style.background = 'rgba(250,249,246,0.07)';
                    }}
                  />
                </div>

                {/* Service */}
                <div>
                  <label style={labelStyle}>SERVICE REQUIRED</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                      e.target.style.background = 'rgba(250,249,246,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(250,249,246,0.15)';
                      e.target.style.background = 'rgba(250,249,246,0.07)';
                    }}
                  >
                    <option value="" style={{ background: '#1B1B1B' }}>Select a service</option>
                    {SERVICES_LIST.map((s) => (
                      <option key={s} value={s} style={{ background: '#1B1B1B' }}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label style={labelStyle}>PREFERRED DATE</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                      e.target.style.background = 'rgba(250,249,246,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(250,249,246,0.15)';
                      e.target.style.background = 'rgba(250,249,246,0.07)';
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label style={labelStyle}>MESSAGE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, space size, and any specific requirements..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212,175,55,0.5)';
                    e.target.style.background = 'rgba(250,249,246,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(250,249,246,0.15)';
                    e.target.style.background = 'rgba(250,249,246,0.07)';
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                  color: '#1B1B1B',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '0.06em',
                  boxShadow: '0 8px 32px rgba(212,175,55,0.4)',
                }}
              >
                Schedule Consultation
                <Send className="w-4 h-4" />
              </button>

              <p
                className="text-center mt-4"
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}
              >
                Free consultation • No obligation • Response within 24 hours
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
