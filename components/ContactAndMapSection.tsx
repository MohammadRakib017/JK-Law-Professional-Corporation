'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { FIRM_DETAILS, PRACTICE_AREAS } from '@/lib/legalData';

export default function ContactAndMapSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    legalService: 'Legal Consultation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Realistic inquiry submission state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const encodedMapLocation = encodeURIComponent(
    'JK Law Professional Corporation, 10210 Yonge Street, Unit B, Richmond Hill, ON L4C 3B6'
  );

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[#FBFBFA] relative overflow-hidden border-t border-[#ECE9E2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E2DC] text-[#9B2226] text-xs font-semibold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with Counsel</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#141416] tracking-tight mb-4">
            Contact JK Law Professional Corporation
          </h2>

          <p className="text-base sm:text-lg text-[#5B5954]">
            Conveniently located in Richmond Hill on Yonge Street. Inquiries are reviewed confidentially by our legal team.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Details & Map | Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Info & Integrated Styled Map (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Firm Information Card */}
            <div className="p-8 rounded-2xl bg-white border border-[#E5E2DC] shadow-xs space-y-6">
              <div className="border-b border-[#F0ECE4] pb-5">
                <span className="text-[11px] font-mono tracking-widest text-[#9B2226] uppercase block mb-1">
                  Richmond Hill Office
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#141416]">
                  {FIRM_DETAILS.name}
                </h3>
                <p className="text-xs text-[#6B6862] mt-1">
                  Barristers, Solicitors & Notaries Public
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#3E3C38]">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E8E5DF] flex items-center justify-center shrink-0 text-[#9B2226]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#18181A] block">Office Address</span>
                    <span className="text-[#55524D] leading-relaxed">
                      10210 Yonge Street, Unit B<br />
                      Richmond Hill, ON, Canada, Ontario
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E8E5DF] flex items-center justify-center shrink-0 text-[#9B2226]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#18181A] block">Telephone</span>
                    <a
                      href={`tel:${FIRM_DETAILS.phoneRaw}`}
                      className="text-[#1A1918] font-bold hover:text-[#9B2226] transition-colors"
                    >
                      {FIRM_DETAILS.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E8E5DF] flex items-center justify-center shrink-0 text-[#9B2226]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#18181A] block">Confidential Email</span>
                    <a
                      href={`mailto:${FIRM_DETAILS.email}`}
                      className="text-[#9B2226] font-medium hover:underline break-all"
                    >
                      {FIRM_DETAILS.email}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E8E5DF] flex items-center justify-center shrink-0 text-[#9B2226]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#18181A] block">Hours of Operation</span>
                    <span className="text-[#55524D] block">{FIRM_DETAILS.hours}</span>
                    <span className="text-xs text-[#7A7770]">{FIRM_DETAILS.weekendHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STYLED GOOGLE MAP SECTION */}
            <div className="rounded-2xl overflow-hidden bg-white border border-[#E5E2DC] shadow-xs">
              <div className="p-4 bg-[#F7F6F2] border-b border-[#E8E5DF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#9B2226]" />
                  <span className="text-xs font-semibold text-[#18181A]">
                    Richmond Hill Location Map
                  </span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodedMapLocation}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9B2226] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Clean Framed Responsive Map Embed */}
              <div className="relative w-full h-[260px] bg-[#EFECE6]">
                <iframe
                  title="JK Law Professional Corporation Location"
                  src={`https://maps.google.com/maps?q=10210+Yonge+Street+Unit+B+Richmond+Hill+ON&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 grayscale-[25%] contrast-[105%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Styled Pin Badge Overlay */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#DDD9D0] shadow-xs flex items-center gap-2 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-[#9B2226] animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#18181A]">
                    10210 Yonge St, Unit B
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] text-xs text-[#6B6862] flex items-center justify-between border-t border-[#EAE7DF]">
                <span>On-site client parking available</span>
                <span className="text-[#9B2226] font-medium">York Region Transit Accessible</span>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E5E2DC] shadow-sm">
              <div className="mb-8">
                <span className="text-xs font-mono tracking-wider uppercase text-[#9B2226] block mb-1">
                  Confidential Inquiry
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#141416]">
                  Request an Initial Consultation
                </h3>
                <p className="text-sm text-[#5F5C56] mt-2">
                  Complete the secure form below. A member of our legal team will contact you to discuss your case parameters.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-[#FAF8F5] border border-[#9B2226]/30 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#9B2226]/10 text-[#9B2226] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#18181B]">
                    Inquiry Received
                  </h4>
                  <p className="text-sm text-[#4E4C47] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#18181B]">{formData.fullName}</span>. 
                    JK Law Professional Corporation has logged your inquiry regarding <span className="font-semibold text-[#18181B]">{formData.legalService}</span>.
                    Our office will review the submitted details and contact you shortly at{' '}
                    <span className="font-semibold text-[#18181B]">{formData.phone || formData.email}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          legalService: 'Legal Consultation',
                          message: '',
                        });
                      }}
                      className="text-xs font-semibold uppercase tracking-wider text-[#9B2226] hover:underline"
                    >
                      Submit Another Legal Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="contact-fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#353330] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="contact-fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g., Alexander Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#DDD9D2] text-[#18181A] placeholder-[#9E9B95] text-sm focus:outline-none focus:border-[#9B2226] focus:ring-1 focus:ring-[#9B2226] transition-all"
                    />
                  </div>

                  {/* Email and Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#353330] mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#DDD9D2] text-[#18181A] placeholder-[#9E9B95] text-sm focus:outline-none focus:border-[#9B2226] focus:ring-1 focus:ring-[#9B2226] transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#353330] mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g., (289) 217-7920"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#DDD9D2] text-[#18181A] placeholder-[#9E9B95] text-sm focus:outline-none focus:border-[#9B2226] focus:ring-1 focus:ring-[#9B2226] transition-all"
                      />
                    </div>
                  </div>

                  {/* Legal Service Dropdown with 9 specified options */}
                  <div>
                    <label
                      htmlFor="contact-legalService"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#353330] mb-2"
                    >
                      Legal Service Required *
                    </label>
                    <select
                      id="contact-legalService"
                      required
                      value={formData.legalService}
                      onChange={(e) => setFormData({ ...formData, legalService: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#DDD9D2] text-[#18181A] text-sm focus:outline-none focus:border-[#9B2226] focus:ring-1 focus:ring-[#9B2226] transition-all cursor-pointer"
                    >
                      {PRACTICE_AREAS.map((area) => (
                        <option key={area.id} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#353330] mb-2"
                    >
                      Brief Summary of Your Legal Matter *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline the key timeline, opposing parties (if known), or primary objectives..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#DDD9D2] text-[#18181A] placeholder-[#9E9B95] text-sm focus:outline-none focus:border-[#9B2226] focus:ring-1 focus:ring-[#9B2226] transition-all resize-none"
                    />
                  </div>

                  {/* Legal disclaimer notice */}
                  <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EBE7DF] text-[11px] text-[#6A6761] leading-relaxed flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#9B2226] shrink-0 mt-0.5" />
                    <span>
                      Submitting an inquiry does not establish a solicitor-client relationship. Please do not include confidential details until formal retainer is executed.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Processing Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
