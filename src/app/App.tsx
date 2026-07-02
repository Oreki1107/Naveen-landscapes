import { lazy, Suspense } from 'react';
import '../styles/fonts.css';

// ── Critical path: always eager-loaded (above the fold) ──────────────────────
import { Navbar }            from './components/Navbar';
import { HeroSection }       from './components/HeroSection';
import { StatisticsSection } from './components/StatisticsSection';
import { FloatingElements }  from './components/FloatingElements';

// ── Deferred: loaded only when browser is idle / user scrolls ─────────────────
const TrustSection          = lazy(() => import('./components/TrustSection').then(m => ({ default: m.TrustSection })));
const ProjectOfTheMonth     = lazy(() => import('./components/ProjectOfTheMonth').then(m => ({ default: m.ProjectOfTheMonth })));
const AboutSection          = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const ServicesSection       = lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const SignatureSpaces        = lazy(() => import('./components/SignatureSpaces').then(m => ({ default: m.SignatureSpaces })));
const ProcessSection         = lazy(() => import('./components/ProcessSection').then(m => ({ default: m.ProcessSection })));
const CinematicStatement     = lazy(() => import('./components/CinematicStatement').then(m => ({ default: m.CinematicStatement })));
const EditorialPortfolio     = lazy(() => import('./components/EditorialPortfolio').then(m => ({ default: m.EditorialPortfolio })));
const PrestigiousProjects    = lazy(() => import('./components/PrestigiousProjects').then(m => ({ default: m.PrestigiousProjects })));
const BeforeAfterSection     = lazy(() => import('./components/BeforeAfterSection').then(m => ({ default: m.BeforeAfterSection })));
const TransformationStories  = lazy(() => import('./components/TransformationStories').then(m => ({ default: m.TransformationStories })));
const ProjectJourney         = lazy(() => import('./components/ProjectJourney').then(m => ({ default: m.ProjectJourney })));
const WhyChooseUsSection     = lazy(() => import('./components/WhyChooseUsSection').then(m => ({ default: m.WhyChooseUsSection })));
const TestimonialsSection    = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FounderSection         = lazy(() => import('./components/FounderSection').then(m => ({ default: m.FounderSection })));
const BranchLocations        = lazy(() => import('./components/BranchLocations').then(m => ({ default: m.BranchLocations })));
const CinematicCTA           = lazy(() => import('./components/CinematicCTA').then(m => ({ default: m.CinematicCTA })));
const PremiumCollection      = lazy(() => import('./components/PremiumCollection').then(m => ({ default: m.PremiumCollection })));
const ConsultationForm       = lazy(() => import('./components/ConsultationForm').then(m => ({ default: m.ConsultationForm })));
const FAQSection             = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const Footer                 = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        background: '#FAF9F6',
        overflowX: 'clip',
        position: 'relative',
      }}
    >
      <FloatingElements />
      <Navbar />

      <main>
        {/* Critical above-the-fold — always eager-loaded */}
        <HeroSection />
        <StatisticsSection />

        {/* Below-the-fold — lazy-loaded; null fallback prevents layout shift */}
        <Suspense fallback={null}>
          {/* 3 · Infinite brand marquee — trust signal */}
          <TrustSection />

          {/* 4 · Editorial magazine — Project of the Month */}
          <ProjectOfTheMonth />

          {/* 5 · About — split layout, animated timeline */}
          <AboutSection />

          {/* 6 · 8 service cards — dark bg, 3D tilt */}
          <ServicesSection />

          {/* 7 · Signature Spaces — cinematic horizontal scroll */}
          <SignatureSpaces />

          {/* 8 · 4-step process timeline */}
          <ProcessSection />

          {/* 9 · "Nature Designed To Be Lived" — cinematic statement */}
          <CinematicStatement />

          {/* 10 · Editorial portfolio — real project photography */}
          <EditorialPortfolio />

          {/* 10.5 · Prestigious Projects */}
          <PrestigiousProjects />

          {/* 11 · Interactive before/after comparison slider */}
          <BeforeAfterSection />

          {/* 12 · Transformation Stories — editorial case study */}
          <TransformationStories />

          {/* 13 · Project Journey — 5-stage storytelling timeline */}
          <ProjectJourney />

          {/* 14 · Why Choose Us feature cards */}
          <WhyChooseUsSection />

          {/* 15 · Testimonials carousel with glassmorphism */}
          <TestimonialsSection />

          {/* 15.5 · Founder Section */}
          <FounderSection />

          {/* 16 · Branch locations — Chennai & Bengaluru */}
          <BranchLocations />

          {/* 17 · "Bring Nature Home" — cinematic CTA with parallax layers */}
          <CinematicCTA />

          {/* 18 · Premium planter catalogue + quote form */}
          <PremiumCollection />

          {/* 19 · Luxury consultation form */}
          <ConsultationForm />

          {/* 20 · FAQ accordion */}
          <FAQSection />
        </Suspense>
      </main>

      {/* Dark luxury footer with landscape illustration & newsletter */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
