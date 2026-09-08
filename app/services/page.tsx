'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsultationCta from '@/components/ConsultationCta';
import ConsultationModal from '@/components/ConsultationModal';
import LegalServiceDetailModal from '@/components/LegalServiceDetailModal';
import PolicyModals from '@/components/PolicyModals';
import { PRACTICE_AREAS, PracticeArea } from '@/lib/legalData';
import {
  Scale,
  ArrowRight,
  CheckCircle2,
  Search,
  HeartHandshake,
  ShieldAlert,
  Activity,
  Home as HomeIcon,
  Briefcase,
  Globe2,
  FileCheck,
  Users,
} from 'lucide-react';

const serviceIconMap: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Home: <HomeIcon className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Globe2: <Globe2 className="w-5 h-5" />,
  FileCheck: <FileCheck className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
};

type FilterCategory = 'all' | 'family-estates' | 'litigation-defense' | 'business-property' | 'immigration-advisory';

function ServicesContent() {
  const searchParams = useSearchParams();
  const urlServiceId = searchParams.get('service');

  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userSelectedService, setUserSelectedService] = useState<PracticeArea | null>(null);
  const [dismissedUrlParam, setDismissedUrlParam] = useState<string | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState<string>('Legal Consultation');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  // Derive active modal service from URL parameter or user click
  const activeServiceModal = useMemo(() => {
    if (userSelectedService) return userSelectedService;
    if (urlServiceId && urlServiceId !== dismissedUrlParam) {
      return PRACTICE_AREAS.find((a) => a.id === urlServiceId) || null;
    }
    return null;
  }, [userSelectedService, urlServiceId, dismissedUrlParam]);

  const handleCloseDetailModal = () => {
    setUserSelectedService(null);
    if (urlServiceId) {
      setDismissedUrlParam(urlServiceId);
    }
  };

  const filteredServices = useMemo(() => {
    return PRACTICE_AREAS.filter((service) => {
      // Category filter
      let matchesCategory = true;
      if (selectedFilter === 'family-estates') {
        matchesCategory = service.id === 'family-law' || service.id === 'estate-planning';
      } else if (selectedFilter === 'litigation-defense') {
        matchesCategory =
          service.id === 'civil-litigation' || service.id === 'criminal-law' || service.id === 'personal-injury';
      } else if (selectedFilter === 'business-property') {
        matchesCategory = service.id === 'business-law' || service.id === 'real-estate-law';
      } else if (selectedFilter === 'immigration-advisory') {
        matchesCategory = service.id === 'immigration-law' || service.id === 'legal-consultation';
      }

      // Search query filter
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.keyMatters.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const handleOpenConsultation = (serviceName: string) => {
    setConsultationService(serviceName);
    setIsConsultationOpen(true);
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#FBFBFA] text-[#1A1918]">
      <Navbar
        onOpenConsultation={() => handleOpenConsultation('Legal Consultation')}
        onSelectService={(service) => setUserSelectedService(service)}
      />

      {/* Page Header */}
      <PageHeader
        badge="Ontario Jurisdiction Practice Areas"
        breadcrumb="Legal Services"
        title="Comprehensive Legal Services in Ontario"
        subtitle="Strategic representation across 9 core practice areas. From intricate corporate transactions and estate preservation to high-stakes courtroom litigation and family resolutions."
      />

      {/* Filter and Search Bar */}
      <section className="sticky top-[69px] z-30 bg-white/95 backdrop-blur-md border-b border-[#E8E5DF] py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#9B2226] text-white shadow-2xs'
                  : 'bg-[#F2EFEB] text-[#5A5852] hover:bg-[#E8E4DB]'
              }`}
            >
              All Services ({PRACTICE_AREAS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('family-estates')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'family-estates'
                  ? 'bg-[#9B2226] text-white shadow-2xs'
                  : 'bg-[#F2EFEB] text-[#5A5852] hover:bg-[#E8E4DB]'
              }`}
            >
              Family & Estates
            </button>
            <button
              onClick={() => setSelectedFilter('litigation-defense')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'litigation-defense'
                  ? 'bg-[#9B2226] text-white shadow-2xs'
                  : 'bg-[#F2EFEB] text-[#5A5852] hover:bg-[#E8E4DB]'
              }`}
            >
              Litigation & Defense
            </button>
            <button
              onClick={() => setSelectedFilter('business-property')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'business-property'
                  ? 'bg-[#9B2226] text-white shadow-2xs'
                  : 'bg-[#F2EFEB] text-[#5A5852] hover:bg-[#E8E4DB]'
              }`}
            >
              Business & Property
            </button>
            <button
              onClick={() => setSelectedFilter('immigration-advisory')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === 'immigration-advisory'
                  ? 'bg-[#9B2226] text-white shadow-2xs'
                  : 'bg-[#F2EFEB] text-[#5A5852] hover:bg-[#E8E4DB]'
              }`}
            >
              Immigration & Advisory
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8880]" />
            <input
              type="text"
              placeholder="Search matters or acts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 rounded-full text-xs bg-[#FBFBFA] border border-[#DDD9D2] text-[#1A1918] focus:outline-none focus:border-[#9B2226] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative bg-white rounded-2xl border border-[#E5E2DC] hover:border-[#9B2226]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#9B2226]/30 to-transparent group-hover:via-[#9B2226] transition-all" />

                <div className="p-7 space-y-5">
                  {/* Icon & Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] group-hover:bg-[#9B2226] text-[#9B2226] group-hover:text-white flex items-center justify-center border border-[#EAE7E0] transition-colors shadow-2xs">
                      {serviceIconMap[service.iconName] || <Scale className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8880]">
                      Ontario Law
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#141416] group-hover:text-[#9B2226] transition-colors mb-2.5">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#55524E] leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Key Matters Bullet List */}
                  <div className="pt-3 border-t border-[#F0ECE4] space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#383633] block">
                      Key Matters Handled:
                    </span>
                    <div className="space-y-1.5">
                      {service.keyMatters.slice(0, 3).map((matter, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#5C5A55]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9B2226] shrink-0 mt-0.5" />
                          <span>{matter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 bg-[#FAF8F5] border-t border-[#EAE7E0] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setUserSelectedService(service)}
                    className="text-xs font-semibold text-[#18181A] hover:text-[#9B2226] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Detailed Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenConsultation(service.name)}
                    className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-lg transition-colors cursor-pointer"
                  >
                    Consult
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E5E2DC]">
              <Scale className="w-12 h-12 text-[#9B2226] mx-auto mb-4 opacity-40" />
              <h3 className="font-serif text-xl font-bold text-[#141416] mb-2">No Matching Legal Services</h3>
              <p className="text-sm text-[#6B6963] max-w-md mx-auto mb-6">
                We did not find a practice area matching &ldquo;{searchQuery}&rdquo;. Contact our intake coordinator directly for specific inquiries.
              </p>
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#18181A] rounded-xl hover:bg-[#9B2226] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Procedural Legal Process Section */}
      <section className="py-20 bg-white border-t border-[#EAE7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9B2226] mb-2 block">
              Structured Representation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416]">
              How We Guide Your Case from Inception to Resolution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB]">
              <span className="font-mono text-2xl font-bold text-[#9B2226] block mb-3">01</span>
              <h4 className="font-serif text-lg font-bold text-[#18181A] mb-2">Intake & Conflict Check</h4>
              <p className="text-xs text-[#5E5B55] leading-relaxed">
                Thorough review of key dates and documentation, coupled with mandatory Law Society conflict verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB]">
              <span className="font-mono text-2xl font-bold text-[#9B2226] block mb-3">02</span>
              <h4 className="font-serif text-lg font-bold text-[#18181A] mb-2">Strategy & Assessment</h4>
              <p className="text-xs text-[#5E5B55] leading-relaxed">
                Objective analysis of legal statutes, evidentiary strengths, risks, procedural timelines, and anticipated costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB]">
              <span className="font-mono text-2xl font-bold text-[#9B2226] block mb-3">03</span>
              <h4 className="font-serif text-lg font-bold text-[#18181A] mb-2">Discovery & Pleadings</h4>
              <p className="text-xs text-[#5E5B55] leading-relaxed">
                Rigorous drafting of pleadings, disclosure demands, contracts, or court affidavits with full factual backing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB]">
              <span className="font-mono text-2xl font-bold text-[#9B2226] block mb-3">04</span>
              <h4 className="font-serif text-lg font-bold text-[#18181A] mb-2">Negotiation & Advocacy</h4>
              <p className="text-xs text-[#5E5B55] leading-relaxed">
                Pursuit of favorable settlement through structured mediation, or determined advocacy before Ontario courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <ConsultationCta onOpenConsultation={() => handleOpenConsultation('Legal Consultation')} />

      {/* Footer & Modals */}
      <Footer
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenConsultation={() => handleOpenConsultation('Legal Consultation')}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultService={consultationService}
      />

      <LegalServiceDetailModal
        service={activeServiceModal}
        onClose={handleCloseDetailModal}
        onRequestConsultation={(serviceName) => handleOpenConsultation(serviceName)}
      />

      <PolicyModals
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </main>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFBFA]" />}>
      <ServicesContent />
    </Suspense>
  );
}
