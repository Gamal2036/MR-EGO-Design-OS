import {
  AnnouncementBanner,
  NavBar,
  Hero,
  Features,
  AIShowcase,
  HowItWorks,
  ProductPreview,
  WorkflowTimeline,
  AIIntelligence,
  EnterpriseSecurity,
  Testimonials,
  Stats,
  FAQ,
  PricingPreview,
  CTASection,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <>
      <AnnouncementBanner />
      <NavBar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Features />
        <AIShowcase />
        <HowItWorks />
        <ProductPreview />
        <WorkflowTimeline />
        <AIIntelligence />
        <EnterpriseSecurity />
        <Testimonials />
        <FAQ />
        <PricingPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
