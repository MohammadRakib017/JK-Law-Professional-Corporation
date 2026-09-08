'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhyChooseSection from '@/components/WhyChooseSection';
import ConsultationCta from '@/components/ConsultationCta';
import ConsultationModal from '@/components/ConsultationModal';
import PolicyModals from '@/components/PolicyModals';
import { FIRM_DETAILS } from '@/lib/legalData';
import {
  Check,
  X,
  Shield,
  Clock,
  Sparkles,
  Scale,
  Users,
  Compass,
  FileCheck,
} from 'lucide-react';

export default function WhyUsPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  const comparisons = [
    {
      feature: 'Communication & Updates',
      standard: 'Unreturned calls, delegation to non-lawyer staff, delayed status updates.',
      jklaw: 'Direct lawyer accessibility, proactive case milestones, transparent timelines.',
    },
    {
      feature: 'Billing & Fee Transparency',
      standard: 'Opaque retainers, surprise line-item fees, uncertain overall cost projections.',
      jklaw: 'Upfront retainer explanations, predictable estimates, itemized accounting.',
    },
    {
      feature: 'Case Preparation & Strategy',
      standard: 'Boilerplate standard pleadings, reactive responses to opposing counsel.',
      jklaw: 'Substantive custom drafting, proactive litigation planning, evidentiary rigor.',
    },
    {
      feature: 'Conflict Resolution Focus',
      standard: 'Unnecessary prolonged courtroom disputes driving up legal expenses.',
      jklaw: 'Strategic negotiation when viable; fierce courtroom advocacy when required.',
    },
    {
      feature: 'Local Jurisdiction Knowledge',
      standard: 'Detached downtown firm unfamiliar with local York Region court nuances.',
      jklaw: 'Established Richmond Hill practice with regular Ontario court presence.',
    },
  ];

  return (
    <main className="min-h-screen relative flex flex-col bg-[#FBFBFA] text-[#1A1918]">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Page Header */}
      <PageHeader
        badge="The JK Law Difference"
        breadcrumb="Why JK Law"
        title="Why Clients Entrust Their Legal Matters to Us"
        subtitle="We combine disciplined legal preparation with accessible, compassionate counsel—ensuring you remain informed, empowered, and vigorously represented at every step."
      />

      {/* Interactive Core Pillars Section */}
      <WhyChooseSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Comparative Standard Section */}
      <section className="py-20 bg-white border-t border-[#EAE7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9B2226] mb-2 block">
              Setting the Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416]">
              How We Deliver a Superior Legal Experience
            </h2>
            <p className="text-sm text-[#636059] mt-3">
              We eliminate traditional legal frustrations through clear accountability and respectful client partnerships.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E5E2DC]">
              <thead>
                <tr className="border-b border-[#E5E2DC] bg-[#F2EFEB]">
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-wider text-[#141416] w-1/4">
                    Dimension
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-wider text-[#7A7771] w-3/8">
                    Conventional Legal Practice
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold uppercase tracking-wider text-[#9B2226] bg-[#9B2226]/5 w-3/8 border-l border-[#E5E2DC]">
                    The JK Law Standard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE7E0]">
                {comparisons.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 text-xs sm:text-sm font-semibold text-[#18181A]">
                      {item.feature}
                    </td>
                    <td className="py-4 px-6 text-xs text-[#6B6862] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-[#A84246] shrink-0 mt-0.5" />
                        <span>{item.standard}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#1E1D1B] leading-relaxed bg-[#9B2226]/5 border-l border-[#E5E2DC] font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#9B2226] shrink-0 mt-0.5" />
                        <span>{item.jklaw}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Assurance and Ethics Section */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#EAE7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E5E2DC] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center mb-5">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#141416] mb-2">Law Society Governed</h3>
              <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed">
                We operate under the rigorous ethical framework and professional responsibilities established by the Law Society of Ontario.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E5E2DC] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center mb-5">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#141416] mb-2">Cost-Conscious Strategy</h3>
              <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed">
                Legal proceedings should never cause more financial distress than the issue itself. We prioritize proportionality and outcome viability.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E5E2DC] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center mb-5">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#141416] mb-2">Absolute Confidentiality</h3>
              <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed">
                Every communication, document, and consultation is shielded by full solicitor-client privilege from your first contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <ConsultationCta onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Footer & Modals */}
      <Footer
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <PolicyModals
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </main>
  );
}
