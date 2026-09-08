'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Scale } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export default function PageHeader({ badge, title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pb-20 bg-gradient-to-b from-[#FAF8F5] via-[#FBFBFA] to-[#F5F3ED] border-b border-[#EAE7E0] overflow-hidden">
      {/* Subtle top ambient red gradient */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[250px] bg-[#9B2226]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-[#7A7872]">
          <Link href="/" prefetch={false} className="hover:text-[#9B2226] transition-colors flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#AAA69E]" />
          <span className="text-[#18181B] font-medium">{breadcrumb}</span>
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E5E2DC] shadow-2xs mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B2226]" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#55524D]">
            {badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141416] leading-[1.12] max-w-4xl mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#55524D] leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
