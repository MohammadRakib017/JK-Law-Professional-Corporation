'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, ArrowRight, ShieldCheck, Award, MapPin, Scale } from 'lucide-react';
import HeroScene3D from './HeroScene3D';
import { FIRM_DETAILS } from '@/lib/legalData';

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  const handleScrollToServices = () => {
    const servicesEl = document.querySelector('#services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#FBFBFA] to-[#F5F4F0]"
    >
      {/* 3D Scene Layer (Behind content, interactive mouse parallax) */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-70 lg:opacity-85">
        <HeroScene3D />
      </div>

      {/* Decorative architectural grid background overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1a1918 1px, transparent 1px), linear-gradient(to right, #1a1918 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle top ambient red gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-gradient-to-b from-[#9B2226]/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Main Hero Foreground Content: Responsive 2-Column Split */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, CTAs, Trust Elements (7 cols) */}
          <div className="lg:col-span-7">
            {/* Small Label with subtle letter spacing */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E5E2DC] shadow-2xs mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#9B2226] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#4A4844]">
                JK LAW PROFESSIONAL CORPORATION
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-[#141416] leading-[1.08] mb-6">
              Trusted Legal Representation.{' '}
              <span className="italic font-normal text-[#2A2927]">Focused on Your Future.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-[#52504C] font-normal leading-relaxed max-w-2xl mb-8">
              Professional legal guidance for individuals, families, and businesses across Richmond Hill and Ontario.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                id="hero-book-btn"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-btn"
                onClick={handleScrollToServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-semibold text-[#252422] bg-white/90 hover:bg-white border border-[#DDD9D2] hover:border-[#9B2226]/40 rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Prominent Direct Phone Line & Address Chip */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E5E2DC]/80 mb-8">
              <a
                href={`tel:${FIRM_DETAILS.phoneRaw}`}
                id="hero-phone-cta"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-[#18181A] hover:text-[#9B2226] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#9B2226]/10 flex items-center justify-center text-[#9B2226] group-hover:bg-[#9B2226] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#73716C] font-medium">Direct Line</span>
                  <span className="text-base font-bold text-[#141416] group-hover:text-[#9B2226] transition-colors">
                    {FIRM_DETAILS.phone}
                  </span>
                </div>
              </a>

              <div className="hidden sm:flex items-center gap-2 text-xs text-[#615F5A]">
                <MapPin className="w-4 h-4 text-[#9B2226]" />
                <span>10210 Yonge St, Unit B, Richmond Hill, ON</span>
              </div>
            </div>

            {/* Quick Credentials / Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              <div className="p-3 bg-white/80 backdrop-blur-xs border border-[#E8E5DF] rounded-lg flex items-center gap-2.5 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#9B2226] shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-[#1A1918] block leading-tight">Ontario Regulated</span>
                  <span className="text-[#6D6B66] text-[11px]">Law Society of Ontario</span>
                </div>
              </div>
              <div className="p-3 bg-white/80 backdrop-blur-xs border border-[#E8E5DF] rounded-lg flex items-center gap-2.5 shadow-2xs">
                <Award className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-[#1A1918] block leading-tight">Strategic Advocacy</span>
                  <span className="text-[#6D6B66] text-[11px]">Personalized Strategy</span>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 bg-white/80 backdrop-blur-xs border border-[#E8E5DF] rounded-lg flex items-center gap-2.5 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-[#18181A] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                  9+
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#1A1918] block leading-tight">Practice Areas</span>
                  <span className="text-[#6D6B66] text-[11px]">Comprehensive Scope</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: User Requested Hero Image (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[430px]">
              
              {/* Decorative Subtle Accent Frame Backing */}
              <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-tr from-[#9B2226]/15 via-transparent to-[#C5A059]/15 blur-lg pointer-events-none" />
              
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E2DDD4] shadow-[0_20px_45px_-12px_rgba(20,19,24,0.12)] p-3 sm:p-4">
                
                {/* Image Container with Elegant Aspect Ratio */}
                <div className="relative w-full aspect-[4/5] sm:h-[490px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F2EFEB]">
                  <Image
                    src="/hero-lawyer.png"
                    alt="JK Law Professional Corporation Legal Counsel"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
                    priority
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Scale className="w-3 h-3 text-[#C5A059]" />
                      <span>Barrister & Solicitor</span>
                    </div>

                    <div className="w-2 h-2 rounded-full bg-[#9B2226] ring-4 ring-white/30" />
                  </div>

                  {/* Bottom Information Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E5E2DC] shadow-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base font-bold text-[#141416]">
                        JK Law Professional Corporation
                      </span>
                      <span className="text-[10px] font-mono font-semibold uppercase text-[#9B2226]">
                        Richmond Hill
                      </span>
                    </div>
                    <p className="text-xs text-[#5E5B55] leading-snug">
                      Experienced Counsel • 10210 Yonge Street, Unit B
                    </p>
                  </div>
                </div>

                {/* Subtle Gold Accent Bottom Trim */}
                <div className="mt-2 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C8880]">
                    Ontario Court of Justice & Superior Court Advocacy
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-4">
        <button
          onClick={handleScrollToServices}
          aria-label="Scroll down to services"
          className="group flex flex-col items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-[#7A7873] hover:text-[#9B2226] transition-colors focus:outline-none cursor-pointer"
        >
          <span>Scroll to Discover</span>
          <div className="w-5 h-8 rounded-full border border-[#D5D2CA] group-hover:border-[#9B2226] flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-[#9B2226] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
