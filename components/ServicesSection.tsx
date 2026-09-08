'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldAlert,
  Scale,
  Activity,
  Home,
  Briefcase,
  Globe2,
  FileCheck,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PRACTICE_AREAS, PracticeArea } from '@/lib/legalData';

interface ServicesSectionProps {
  onSelectService: (service: PracticeArea) => void;
  onOpenConsultation: () => void;
}

// Icon mapper for practice areas
const iconMap: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Globe2: <Globe2 className="w-6 h-6" />,
  FileCheck: <FileCheck className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

interface ServiceCard3DProps {
  service: PracticeArea;
  index: number;
  onSelect: () => void;
}

function ServiceCard3D({ service, index, onSelect }: ServiceCard3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max 7 degrees for luxury restraint)
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <div
        id={`service-card-${service.id}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered
            ? 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
            : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        className={`relative h-full flex flex-col justify-between p-7 rounded-2xl cursor-pointer select-none bg-white border transition-all duration-300 ${
          isHovered
            ? 'border-[#9B2226]/60 shadow-[0_20px_40px_-15px_rgba(155,34,38,0.18)] bg-gradient-to-b from-white to-[#FDF9F8]'
            : 'border-[#E6E3DC] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#9B2226]/40'
        }`}
      >
        {/* Subtle accent corner badge */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isHovered
                ? 'bg-[#9B2226] text-white rotate-6 shadow-md'
                : 'bg-[#FAF8F5] border border-[#E9E6DF] text-[#1E1E20]'
            }`}
          >
            {iconMap[service.iconName] || <Scale className="w-6 h-6" />}
          </div>

          <span className="text-[11px] font-mono tracking-widest text-[#8C8880] uppercase">
            0{index + 1}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-serif text-2xl font-semibold text-[#18181B] mb-3 group-hover:text-[#9B2226] transition-colors">
            {service.name}
          </h3>
          <p className="text-sm text-[#575550] leading-relaxed mb-6 font-normal">
            {service.shortDesc}
          </p>
        </div>

        {/* Card Footer: "Learn More" */}
        <div className="pt-4 border-t border-[#F0ECE4] flex items-center justify-between text-xs font-semibold">
          <span
            className={`flex items-center gap-1.5 transition-colors ${
              isHovered ? 'text-[#9B2226]' : 'text-[#2D2B28]'
            }`}
          >
            <span>Learn More</span>
            <ArrowRight
              className={`w-3.5 h-3.5 transition-transform ${
                isHovered ? 'translate-x-1' : ''
              }`}
            />
          </span>

          <span className="text-[11px] text-[#9A968E] font-medium">Ontario Law</span>
        </div>

        {/* Glow overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 bg-gradient-to-br from-[#9B2226]/10 to-transparent"
            style={{ borderRadius: '15px' }}
          />
        )}
      </div>
    </div>
  );
}

export default function ServicesSection({
  onSelectService,
  onOpenConsultation,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#FBFBFA] relative border-t border-[#ECE9E2]"
    >
      {/* Background aesthetic details */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-[#9B2226]/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-80 h-80 rounded-full bg-[#C5A059]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B2226]/8 text-[#9B2226] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Areas</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#141416] tracking-tight mb-5">
            Legal Services You Can Rely On
          </h2>

          <p className="text-base sm:text-lg text-[#5B5954] leading-relaxed">
            Delivering strategic advocacy, disciplined preparation, and practical counsel across every stage of your legal matter in Ontario.
          </p>
        </div>

        {/* 3D Interactive Grid of 9 Practice Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRACTICE_AREAS.map((service, index) => (
            <ServiceCard3D
              key={service.id}
              service={service}
              index={index}
              onSelect={() => onSelectService(service)}
            />
          ))}
        </div>

        {/* Bottom Advisory Ribbon */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2DC] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#18181A] mb-1">
              Facing a distinct or multi-faceted legal situation?
            </h4>
            <p className="text-sm text-[#615E58]">
              We evaluate complex overlaps between corporate contracts, family assets, real estate titles, and civil claims.
            </p>
          </div>
          <button
            id="services-consultation-btn"
            onClick={onOpenConsultation}
            className="shrink-0 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Request Case Assessment
          </button>
        </div>
      </div>
    </section>
  );
}
