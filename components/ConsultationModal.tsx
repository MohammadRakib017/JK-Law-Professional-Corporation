'use client';

import React, { useState } from 'react';
import { X, Calendar, Phone, Mail, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { FIRM_DETAILS, PRACTICE_AREAS, PracticeArea } from '@/lib/legalData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultService = 'Legal Consultation',
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    legalService: defaultService,
    preferredTime: 'Morning (9 AM - 12 PM)',
    urgency: 'Standard (Within 1-2 Days)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="consultation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="consultation-modal-dialog"
        className="relative w-full max-w-xl bg-[#FBFBFA] rounded-2xl border border-[#E5E2DC] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#141518] text-white p-6 flex items-center justify-between border-b border-[#2A2B33]">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#C5A059] mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>JK Law Professional Corporation</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Schedule Legal Consultation
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
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#18181A]">
                Consultation Request Scheduled
              </h4>
              <p className="text-sm text-[#504E48] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#18181A]">{formData.fullName}</span>. 
                Our Richmond Hill intake coordinator will confirm your session for{' '}
                <span className="font-semibold text-[#18181A]">{formData.legalService}</span> shortly.
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#E5E2DC] text-xs text-[#63605A] text-left space-y-2 max-w-md mx-auto">
                <span className="font-semibold text-[#18181A] block">What to prepare:</span>
                <p>• Pertinent court notices, pleadings, contracts, or correspondence</p>
                <p>• A chronological outline of key dates and involved parties</p>
                <p>• Government-issued photo identification for Law Society verification</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-xl"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D3B37] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full Legal Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD9D2] text-[#18181A] text-sm focus:outline-none focus:border-[#9B2226]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D3B37] mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(289) 217-7920"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD9D2] text-[#18181A] text-sm focus:outline-none focus:border-[#9B2226]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D3B37] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.ca"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD9D2] text-[#18181A] text-sm focus:outline-none focus:border-[#9B2226]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D3B37] mb-1.5">
                    Area of Law *
                  </label>
                  <select
                    value={formData.legalService}
                    onChange={(e) => setFormData({ ...formData, legalService: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD9D2] text-[#18181A] text-sm focus:outline-none focus:border-[#9B2226]"
                  >
                    {PRACTICE_AREAS.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D3B37] mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD9D2] text-[#18181A] text-sm focus:outline-none focus:border-[#9B2226]"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                    <option value="Evening / Special Request">Evening / By Appointment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D3B37] mb-1.5">
                  Brief Legal Context
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Outline key facts or deadlines..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD9D2] text-[#18181A] text-sm focus:outline-none focus:border-[#9B2226] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-xl shadow-sm transition-all"
                >
                  {isSubmitting ? 'Confirming Availability...' : 'Confirm Consultation Request'}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-[#7A7771]">
                  Need immediate response? Direct call:{' '}
                  <a href={`tel:${FIRM_DETAILS.phoneRaw}`} className="text-[#9B2226] font-semibold hover:underline">
                    {FIRM_DETAILS.phone}
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
