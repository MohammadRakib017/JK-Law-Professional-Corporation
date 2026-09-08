'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactAndMapSection from '@/components/ContactAndMapSection';
import ConsultationModal from '@/components/ConsultationModal';
import PolicyModals from '@/components/PolicyModals';
import { FIRM_DETAILS } from '@/lib/legalData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  FileCheck2,
  CalendarCheck,
  Shield,
} from 'lucide-react';

export default function ContactPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <main className="min-h-screen relative flex flex-col bg-[#FBFBFA] text-[#1A1918]">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Page Header */}
      <PageHeader
        badge="Richmond Hill, Ontario Office"
        breadcrumb="Contact Us"
        title="Connect With Our Legal Team"
        subtitle="Schedule a confidential consultation at our Richmond Hill office or connect virtually. We provide accessible, prompt communication to protect your legal position."
      />

      {/* Urgent Legal Deadlines Callout Banner */}
      <section className="bg-[#141518] text-white py-6 border-b border-[#252528]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#9B2226]/20 text-[#C5A059] flex items-center justify-center shrink-0 border border-[#9B2226]/30">
              <AlertTriangle className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] block">
                Time-Sensitive Court Matter?
              </span>
              <p className="text-xs text-[#BAB6AE]">
                If you have been served with an Ontario Statement of Claim or Court Order, strict limitation deadlines apply (often 20 days).
              </p>
            </div>
          </div>

          <a
            href={`tel:${FIRM_DETAILS.phoneRaw}`}
            className="shrink-0 px-4 py-2 bg-[#9B2226] hover:bg-[#80191D] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {FIRM_DETAILS.phone}</span>
          </a>
        </div>
      </section>

      {/* Main Contact, Hours, Location & Interactive Map Section */}
      <ContactAndMapSection />

      {/* First Consultation Expectations Guide */}
      <section className="py-20 bg-white border-t border-[#EAE7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9B2226] mb-2 block">
              Clear Expectations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141416]">
              What to Expect During Your Initial Consultation
            </h2>
            <p className="text-sm text-[#5C5953] mt-3">
              We structure our intake process to be focused, confidential, and actionable from the first minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB]">
              <div className="w-10 h-10 rounded-xl bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center mb-5">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181A] mb-2">1. Conflict Verification</h3>
              <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed">
                Prior to discussing sensitive case details, we verify opposing party names against our Law Society conflict registry to safeguard your absolute privilege.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB]">
              <div className="w-10 h-10 rounded-xl bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center mb-5">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181A] mb-2">2. Fact & Statute Assessment</h3>
              <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed">
                We review the timeline, contracts, or court documents, assessing legal merits, procedural venues, and initial risk exposure candidly.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DB]">
              <div className="w-10 h-10 rounded-xl bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center mb-5">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18181A] mb-2">3. Strategic Roadmap & Retainer</h3>
              <p className="text-xs sm:text-sm text-[#5C5954] leading-relaxed">
                If both parties agree to proceed, we establish a written Retainer Agreement detailing billing terms, assigned counsel, and next court steps.
              </p>
            </div>
          </div>
        </div>
      </section>

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
