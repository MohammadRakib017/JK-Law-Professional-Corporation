'use client';

import React, { useState } from 'react';
import { Target, Compass, Swords, MessageSquare, ArrowRight } from 'lucide-react';

interface WhyChooseProps {
  onOpenConsultation: () => void;
}

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  extendedDetail: string;
  icon: React.ReactNode;
}

const features: FeatureItem[] = [
  {
    id: 'client-focused',
    number: '01',
    title: 'Client-Focused Approach',
    description: 'We take the time to understand your circumstances and legal objectives.',
    extendedDetail: 'Every legal journey is unique. Rather than applying rigid procedures, we tailor our strategy around your personal goals, family dynamics, or commercial priorities.',
    icon: <Target className="w-6 h-6 text-[#9B2226]" />,
  },
  {
    id: 'clear-guidance',
    number: '02',
    title: 'Clear Legal Guidance',
    description: 'We explain complex legal matters in a straightforward and understandable way.',
    extendedDetail: 'Legal statutes and case precedent can feel overwhelming. We demystify the legal process, giving you the clarity needed to make confident, informed decisions.',
    icon: <Compass className="w-6 h-6 text-[#9B2226]" />,
  },
  {
    id: 'strategic-rep',
    number: '03',
    title: 'Strategic Representation',
    description: 'We approach every matter with careful preparation, attention to detail, and professionalism.',
    extendedDetail: 'Cases are won before entering the courtroom through meticulous evidence review, rigorous legal research, and anticipatory procedural tactics.',
    icon: <Swords className="w-6 h-6 text-[#9B2226]" />,
  },
  {
    id: 'accessible-comm',
    number: '04',
    title: 'Accessible Communication',
    description: 'We prioritize responsive communication and keeping clients informed.',
    extendedDetail: 'You will never be left wondering where your file stands. We maintain direct, prompt updates regarding milestones, court filings, and adversary correspondence.',
    icon: <MessageSquare className="w-6 h-6 text-[#9B2226]" />,
  },
];

export default function WhyChooseSection({ onOpenConsultation }: WhyChooseProps) {
  const [activeCard, setActiveCard] = useState<string>('client-focused');

  return (
    <section
      id="why-us"
      className="py-24 sm:py-32 bg-[#FBFBFA] relative overflow-hidden border-t border-[#ECE9E2]"
    >
      {/* Background architectural watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-radial from-[#9B2226]/4 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E2DC] text-[#9B2226] text-xs font-semibold uppercase tracking-widest mb-4">
              <span>Our Firm Standards</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#141416] tracking-tight">
              Why Clients Choose JK Law
            </h2>
          </div>

          <p className="text-base text-[#5E5B55] max-w-md">
            Built upon principles of uncompromising diligence, transparent communication, and client-centered advocacy.
          </p>
        </div>

        {/* 3D Depth Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const isSelected = activeCard === feature.id;

            return (
              <div
                key={feature.id}
                id={`why-card-${feature.id}`}
                onClick={() => setActiveCard(feature.id)}
                className={`group relative p-8 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#9B2226]/70 shadow-[0_20px_40px_-15px_rgba(155,34,38,0.15)] -translate-y-2'
                    : 'bg-[#FAF9F6] border-[#E8E4DC] hover:bg-white hover:border-[#D5D0C6] hover:-translate-y-1 shadow-2xs'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#9B2226] text-white'
                          : 'bg-white border border-[#E5E2DC] text-[#1A1918] group-hover:border-[#9B2226]/40'
                      }`}
                    >
                      {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, {
                        className: `w-6 h-6 ${isSelected ? 'text-white' : 'text-[#9B2226]'}`,
                      })}
                    </div>
                    <span className="font-mono text-xs font-bold tracking-wider text-[#8F8B83]">
                      {feature.number}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="font-serif text-2xl font-semibold text-[#18181B] mb-3">
                    {feature.title}
                  </h3>

                  {/* Core Prompt Description */}
                  <p className="text-sm text-[#3E3C38] font-medium leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Expanded Detail */}
                  <p className="text-xs text-[#6B6862] leading-relaxed">
                    {feature.extendedDetail}
                  </p>
                </div>

                {/* Bottom Status / Selection indicator */}
                <div className="pt-6 mt-6 border-t border-[#EDE9E1] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#7E7A73]">Commitment</span>
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isSelected ? 'bg-[#9B2226]' : 'bg-[#DCD8D0]'
                    }`}
                  />
                </div>

                {/* Subtle Left Accent Border only for active state */}
                {isSelected && (
                  <div className="absolute inset-x-8 -top-px h-[2px] bg-gradient-to-r from-transparent via-[#9B2226] to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Action Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#18181A] hover:text-[#9B2226] transition-colors py-2 px-4 rounded-lg group"
          >
            <span>Experience the JK Law difference on your legal matter</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#9B2226]" />
          </button>
        </div>
      </div>
    </section>
  );
}
