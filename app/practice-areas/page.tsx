'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PracticeAreasInteractive from '@/components/PracticeAreasInteractive';
import ConsultationCta from '@/components/ConsultationCta';
import ConsultationModal from '@/components/ConsultationModal';
import LegalServiceDetailModal from '@/components/LegalServiceDetailModal';
import PolicyModals from '@/components/PolicyModals';
import { PRACTICE_AREAS, PracticeArea } from '@/lib/legalData';
import { Landmark, Scale, FileText, ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';

export default function PracticeAreasPage() {
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState('Practice Area Consultation');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleOpenConsultation = (serviceName: string) => {
    setConsultationService(serviceName);
    setIsConsultationOpen(true);
  };

  const courts = [
    {
      title: 'Small Claims Court',
      desc: 'Hears civil disputes and monetary claims up to $35,000, including breach of contract, debt recovery, and property damage.',
      scope: 'Simplified civil rules, expedited settlement conferences.',
    },
    {
      title: 'Ontario Court of Justice',
      desc: 'Adjudicates child protection, custody and support under provincial acts, municipal bylaws, and substantial criminal proceedings.',
      scope: 'Youth criminal matters, bail hearings, summary offenses.',
    },
    {
      title: 'Superior Court of Justice',
      desc: 'Inherent jurisdiction over serious civil actions over $35,000, commercial injunctions, divorce, matrimonial property division, and estates.',
      scope: 'Jury and non-jury trials, mandatory pre-trial conferences.',
    },
    {
      title: 'Administrative Tribunals',
      desc: 'Specialized quasi-judicial bodies including the Landlord and Tenant Board (LTB), Human Rights Tribunal of Ontario (HRTO), and LAT.',
      scope: 'Expedited statutory dispute determination.',
    },
  ];

  const faqs = [
    {
      q: 'When should I consult or retain legal counsel in Ontario?',
      a: 'You should seek legal counsel as early as possible—ideally before signing any agreement, waiving any rights, responding to formal pleadings, or providing recorded statements to adverse parties or law enforcement. Early strategic intervention frequently prevents costly procedural missteps.',
    },
    {
      q: 'What is the statutory limitation period for civil claims in Ontario?',
      a: 'Under the Ontario Limitations Act, 2002, the basic limitation period for most civil claims is generally two (2) years from the day on which the claim was discovered. However, certain statutory notice requirements (such as 10-day notice for municipal sidewalk falls) are dramatically shorter, making prompt advice crucial.',
    },
    {
      q: 'What documents should I prepare for our first consultation?',
      a: 'Bring all relevant correspondence, contracts, court orders, issued claims, notices of assessment, police reports, and a concise chronological summary of events. Having organized documentation allows us to maximize the value of your strategic assessment.',
    },
    {
      q: 'Can cases be resolved through negotiation without a formal court trial?',
      a: 'Yes. In Ontario, the vast majority of civil and family disputes are resolved through alternative dispute resolution (ADR), including lawyer-led negotiations, mediation, or pre-trial settlement conferences. Courtroom trials remain the ultimate measure when reasonable settlement cannot be reached.',
    },
  ];

  return (
    <main className="min-h-screen relative flex flex-col bg-[#FBFBFA] text-[#1A1918]">
      <Navbar
        onOpenConsultation={() => handleOpenConsultation('Practice Area Consultation')}
        onSelectService={(service) => setSelectedService(service)}
      />

      {/* Page Header */}
      <PageHeader
        badge="Jurisdiction & Practice Depth"
        breadcrumb="Practice Areas"
        title="Interactive Practice Areas Navigator"
        subtitle="Explore our 9 distinct legal domains using our dynamic judicial scales. Review statutory frameworks, procedural considerations, and Ontario court levels applicable to your case."
      />

      {/* Interactive 3D Balancing Scale Practice Areas Experience */}
      <PracticeAreasInteractive
        onOpenConsultation={() => handleOpenConsultation('Practice Area Consultation')}
        onSelectService={(service) => setSelectedService(service)}
      />

      {/* Ontario Court Jurisdiction & Hierarchy */}
      <section className="py-20 bg-white border-t border-[#EAE7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9B2226] mb-2 block">
              Judicial Forum & Venue
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416]">
              Ontario Court Hierarchies We Advocate In
            </h2>
            <p className="text-sm text-[#636059] mt-3">
              Understanding which court or tribunal governs your dispute is fundamental to framing the appropriate procedural remedy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courts.map((court, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center mb-4">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#18181A] mb-2">
                    {court.title}
                  </h3>
                  <p className="text-xs text-[#5C5953] leading-relaxed mb-4">
                    {court.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE7E0]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9B2226] block">
                    Forum Scope
                  </span>
                  <span className="text-xs text-[#33312E] font-medium">
                    {court.scope}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Legal Questions */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#EAE7E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9B2226] mb-2 block">
              Legal Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E5E2DC] bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#18181A]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C8880] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#9B2226]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C5954] leading-relaxed border-t border-[#F2EFEB]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <ConsultationCta onOpenConsultation={() => handleOpenConsultation('Practice Area Consultation')} />

      {/* Footer & Modals */}
      <Footer
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenConsultation={() => handleOpenConsultation('Practice Area Consultation')}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService={consultationService}
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
