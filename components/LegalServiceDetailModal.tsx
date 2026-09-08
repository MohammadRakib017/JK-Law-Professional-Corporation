'use client';

import React from 'react';
import { X, CheckCircle2, Shield, ArrowRight, FileText, Scale } from 'lucide-react';
import { PracticeArea } from '@/lib/legalData';

interface LegalServiceDetailModalProps {
  service: PracticeArea | null;
  onClose: () => void;
  onRequestConsultation: (serviceName: string) => void;
}

export default function LegalServiceDetailModal({
  service,
  onClose,
  onRequestConsultation,
}: LegalServiceDetailModalProps) {
  if (!service) return null;

  return (
    <div
      id="service-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="service-detail-modal-dialog"
        className="relative w-full max-w-2xl bg-[#FBFBFA] rounded-2xl border border-[#E5E2DC] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#141518] text-white p-6 sm:p-8 flex items-start justify-between border-b border-[#2A2B33]">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#C5A059] mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Practice Area In-Depth • Ontario Jurisdiction</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {service.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9A978E] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#7C7972] mb-2">
              Legal Scope & Overview
            </h4>
            <p className="text-sm sm:text-base text-[#3E3C38] leading-relaxed">
              {service.longDesc}
            </p>
          </div>

          {/* Key Matters Handled */}
          <div className="p-5 rounded-xl bg-white border border-[#E5E2DC]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18181A] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#9B2226]" />
              <span>Key Matters & Proceedings Handled</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.keyMatters.map((matter, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#4A4844]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9B2226] shrink-0 mt-0.5" />
                  <span>{matter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Guidance Advisory */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DB] text-xs text-[#52504B] leading-relaxed">
            <strong className="text-[#18181A] font-semibold block mb-1">
              Lawyer&apos;s Practice Note:
            </strong>
            {service.guidanceNote}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#EDEAE2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#7A7771]">
              Richmond Hill, Ontario Office & Virtual Appointments
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-[#504E48] hover:text-[#18181A] bg-[#F5F3ED] hover:bg-[#EBE7DF] rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onRequestConsultation(service.name);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-xl transition-colors shadow-xs"
              >
                <span>Book for {service.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
