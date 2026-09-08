'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import PracticeAreasInteractive from '@/components/PracticeAreasInteractive';
import ConsultationCta from '@/components/ConsultationCta';
import ContactAndMapSection from '@/components/ContactAndMapSection';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';
import LegalServiceDetailModal from '@/components/LegalServiceDetailModal';
import PolicyModals from '@/components/PolicyModals';
import { PracticeArea } from '@/lib/legalData';

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const [defaultConsultationService, setDefaultConsultationService] = useState<string>('Legal Consultation');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setDefaultConsultationService(serviceName);
    } else {
      setDefaultConsultationService('Legal Consultation');
    }
    setIsConsultationOpen(true);
  };

  const handleSelectService = (service: PracticeArea) => {
    setSelectedService(service);
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#FBFBFA] text-[#1A1918]">
      {/* Sticky Premium Navbar */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Hero Section with Cinematic 3D Scene */}
      <Hero onOpenConsultation={() => handleOpenConsultation()} />

      {/* Services Section with 9 Interactive 3D Cards */}
      <ServicesSection
        onSelectService={handleSelectService}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Split-Layout About Section with 3D Architectural Visual & Animated Stats */}
      <AboutSection onOpenConsultation={() => handleOpenConsultation()} />

      {/* Why Choose JK Law 3D Feature Cards Section */}
      <WhyChooseSection onOpenConsultation={() => handleOpenConsultation()} />

      {/* Practice Areas Interactive Experience with Central 3D Object */}
      <PracticeAreasInteractive
        onOpenConsultation={() => handleOpenConsultation()}
        onSelectService={handleSelectService}
      />

      {/* Dramatic Charcoal Legal Consultation CTA with Rotating 3D Scales */}
      <ConsultationCta onOpenConsultation={() => handleOpenConsultation()} />

      {/* Contact Section & Integrated Styled Google Map */}
      <ContactAndMapSection />

      {/* Premium Dark Footer */}
      <Footer
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService={defaultConsultationService}
      />

      <LegalServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestConsultation={(serviceName) => handleOpenConsultation(serviceName)}
      />

      <PolicyModals
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </main>
  );
}
