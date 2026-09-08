'use client';

import React from 'react';
import { X, Shield, Scale } from 'lucide-react';
import { FIRM_DETAILS } from '@/lib/legalData';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function PolicyModals({ type, onClose }: PolicyModalProps) {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FBFBFA] rounded-2xl border border-[#E5E2DC] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#141518] text-white p-6 flex items-center justify-between border-b border-[#2A2B33]">
          <div className="flex items-center gap-2.5">
            {isPrivacy ? (
              <Shield className="w-5 h-5 text-[#C5A059]" />
            ) : (
              <Scale className="w-5 h-5 text-[#C5A059]" />
            )}
            <h3 className="font-serif text-xl font-bold text-white">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Use'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9A978E] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-[#4E4C47] leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                <strong>JK Law Professional Corporation</strong> is committed to preserving the privacy, confidentiality, and security of all personal information entrusted to us in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and the Law Society of Ontario Rules of Professional Conduct.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#18181A] pt-2">
                1. Collection of Personal Information
              </h4>
              <p>
                We collect personal information solely to evaluate potential legal representation, deliver requested legal counsel, verify client identity in adherence to Law Society mandates, and maintain ongoing communications.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#18181A] pt-2">
                2. Solicitor-Client Confidentiality
              </h4>
              <p>
                All substantive legal communications are protected under strict professional confidentiality and, once retained, legal professional privilege. We never disclose, sell, or trade client information to unauthorized commercial third parties.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#18181A] pt-2">
                3. Electronic Communication Notice
              </h4>
              <p>
                While our digital infrastructure employs encrypted transmissions, email and online contact forms cannot be guaranteed 100% secure against interception. Sensitive, confidential materials should only be submitted via secured client portal or directly to our Richmond Hill office.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to the website of <strong>JK Law Professional Corporation</strong>. By accessing this website, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#18181A] pt-2">
                1. No Legal Advice
              </h4>
              <p>
                The materials and information available on this website are provided strictly for general informational and educational purposes. Nothing on this website constitutes formal legal advice or legal opinions.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#18181A] pt-2">
                2. No Solicitor-Client Relationship
              </h4>
              <p>
                Accessing this website, sending email inquiries, or submitting consultation forms does NOT create a solicitor-client relationship. A solicitor-client relationship is established solely after direct conflict clearance and formal execution of a written retainer agreement.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#18181A] pt-2">
                3. Limitation of Liability
              </h4>
              <p>
                JK Law Professional Corporation expressly disclaims all liability with respect to actions taken or not taken based on any contents of this site. Laws in Ontario and Canada evolve rapidly; readers must obtain independent legal counsel before acting upon any information herein.
              </p>
            </>
          )}

          <div className="pt-6 border-t border-[#E8E4DC] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#18181B] hover:bg-[#9B2226] rounded-xl transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
