'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import ConsultationCta from '@/components/ConsultationCta';
import ConsultationModal from '@/components/ConsultationModal';
import PolicyModals from '@/components/PolicyModals';
import { FIRM_DETAILS } from '@/lib/legalData';
import { ShieldCheck, Scale, Award, Users, BookOpen, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <main className="min-h-screen relative flex flex-col bg-[#FBFBFA] text-[#1A1918]">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Page Header */}
      <PageHeader
        badge="Established Richmond Hill Legal Practice"
        breadcrumb="About the Firm"
        title="Principled Legal Counsel. Unwavering Advocacy."
        subtitle="JK Law Professional Corporation provides dedicated legal representation and strategic counsel tailored strictly to your individual circumstances and long-term objectives."
      />

      {/* Interactive 3D Architectural Scene & Stats Section */}
      <AboutSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Deep-Dive Firm Profile & Philosophy Section */}
      <section className="py-20 bg-white border-t border-[#EAE7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9B2226]">
                <Scale className="w-4 h-4" />
                <span>Our Professional Standards</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416] leading-tight">
                A Modern Practice Grounded in Traditional Legal Rigour
              </h2>

              <p className="text-base text-[#52504C] leading-relaxed">
                At <strong className="text-[#18181A]">JK Law Professional Corporation</strong>, our practice is built on a clear commitment: delivering exceptional legal advocacy without the detachment often found in traditional legal services. Legal matters are deeply personal and consequential, whether they involve the dissolution of a marriage, a commercial transaction, immigration status, or courtroom litigation.
              </p>

              <p className="text-base text-[#52504C] leading-relaxed">
                Headquartered in Richmond Hill, Ontario, we regularly advocate before the Ontario Court of Justice, the Superior Court of Justice, and administrative tribunals across the Greater Toronto Area. Every file entrusted to us is handled with exhaustive factual review, thorough statutory analysis, and prompt client communication.
              </p>

              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB] space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#18181A] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#9B2226]" />
                  <span>The Solicitor-Client Relationship</span>
                </h3>
                <p className="text-sm text-[#55524E] leading-relaxed">
                  We believe that the most effective legal strategies begin with listening. By fully understanding your immediate priorities and overarching goals, we craft realistic, cost-effective legal roadmaps designed to achieve favorable resolutions while minimizing unnecessary conflict and expense.
                </p>
              </div>
            </div>

            {/* Right Highlights & Values Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 rounded-2xl bg-[#FBFBFA] border border-[#E5E2DC] shadow-xs">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#7C7972] mb-4">
                  Firm Foundations & Credo
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#18181A] mb-1">Law Society Regulated</h4>
                      <p className="text-xs text-[#6E6B65] leading-relaxed">
                        Strict adherence to the Law Society of Ontario Rules of Professional Conduct and continuing legal education.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#18181A] mb-1">Substantive Case Preparation</h4>
                      <p className="text-xs text-[#6E6B65] leading-relaxed">
                        No shortcuts. Every affidavit, agreement, and pleading is crafted with meticulous attention to statutory detail.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#18181A] mb-1">Personalized Counsel</h4>
                      <p className="text-xs text-[#6E6B65] leading-relaxed">
                        Direct communication with your legal representative throughout every stage of your proceeding.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#18181A] mb-1">Richmond Hill Legal Center</h4>
                      <p className="text-xs text-[#6E6B65] leading-relaxed">
                        Centrally situated at 10210 Yonge Street, serving York Region and the entire province of Ontario.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office & Consultation Info Box */}
              <div className="p-6 rounded-2xl bg-[#141518] text-white space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] block">
                  Confidential Case Assessment
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  Discuss Your Legal Matter Directly
                </h4>
                <p className="text-xs text-[#9E9B93] leading-relaxed">
                  Call our Richmond Hill office at{' '}
                  <strong className="text-white">{FIRM_DETAILS.phone}</strong> or schedule an in-person or virtual consultation.
                </p>
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-xl transition-all"
                >
                  Book a Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Consultation CTA Banner */}
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
