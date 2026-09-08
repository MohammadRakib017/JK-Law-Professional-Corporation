'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { FIRM_DETAILS, PRACTICE_AREAS } from '@/lib/legalData';

// Custom SVG Icons for Facebook & Instagram
function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenConsultation: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenTerms, onOpenConsultation }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0B0C0E] text-[#D4D1CA] pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#9B2226]/8 rounded-full blur-3xl pointer-events-none" />

      {/* SUBTLE ANIMATED RED LINE SEPARATING FOOTER SECTIONS */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9B2226] to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Brand & Address Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#18191E] border border-[#2D2E36] flex items-center justify-center text-[#C5A059]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white tracking-tight">
                  JK LAW
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#8F8C84]">
                  Professional Corporation
                </span>
              </div>
            </div>

            <p className="text-sm text-[#9E9B93] leading-relaxed max-w-sm">
              Professional legal services in Richmond Hill, Ontario. Providing strategic counsel and dedicated representation for individuals, families, and commercial enterprises.
            </p>

            <div className="space-y-2 text-xs text-[#9E9B93]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#9B2226] shrink-0" />
                <span>{FIRM_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9B2226] shrink-0" />
                <a href={`tel:${FIRM_DETAILS.phoneRaw}`} className="hover:text-white transition-colors">
                  {FIRM_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9B2226] shrink-0" />
                <a href={`mailto:${FIRM_DETAILS.email}`} className="hover:text-white transition-colors">
                  {FIRM_DETAILS.email}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={FIRM_DETAILS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-facebook-link"
                className="w-9 h-9 rounded-lg bg-[#18191E] border border-[#2D2E36] flex items-center justify-center text-[#B5B2AA] hover:text-white hover:border-[#9B2226] hover:bg-[#9B2226]/20 transition-all"
                aria-label="Visit JK Law on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={FIRM_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram-link"
                className="w-9 h-9 rounded-lg bg-[#18191E] border border-[#2D2E36] flex items-center justify-center text-[#B5B2AA] hover:text-white hover:border-[#9B2226] hover:bg-[#9B2226]/20 transition-all"
                aria-label="Visit JK Law on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#E6E3DC]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9B93]">
              <li>
                <Link href="/" prefetch={false} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={false} className="hover:text-white transition-colors">
                  About the Firm
                </Link>
              </li>
              <li>
                <Link href="/services" prefetch={false} className="hover:text-white transition-colors">
                  Legal Services
                </Link>
              </li>
              <li>
                <Link href="/why-us" prefetch={false} className="hover:text-white transition-colors">
                  Why JK Law
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" prefetch={false} className="hover:text-white transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={false} className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas Summary Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#E6E3DC]">
              Areas of Practice
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs text-[#9E9B93]">
              {PRACTICE_AREAS.slice(0, 6).map((area) => (
                <li key={area.id}>
                  <Link href={`/services?service=${area.id}`} prefetch={false} className="hover:text-[#9B2226] transition-colors">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation Fast Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#E6E3DC]">
              Immediate Action
            </h4>
            <p className="text-xs text-[#8F8C84] leading-relaxed">
              Facing impending deadlines or served with court pleadings?
            </p>
            <button
              onClick={onOpenConsultation}
              className="w-full py-2.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-lg transition-all"
            >
              Consult Now
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#7A7871] hover:text-white transition-colors pt-2"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* TRUST & LEGAL DISCLAIMER SECTION */}
        <div className="pt-8 pb-8 border-t border-[#1F2026] text-xs text-[#78756E] leading-relaxed">
          <p className="max-w-4xl">
            <strong className="text-[#A3A097] font-semibold">Legal Disclaimer:</strong> Information provided on this website is for general informational purposes only and does not constitute legal advice. Contact JK Law Professional Corporation directly for advice regarding your specific legal matter. Accessing or using this site or sending an inquiry does not create a solicitor-client relationship. Do not make determinations on case outcomes, success rates, or legal results without independent counsel.
          </p>
        </div>

        {/* Bottom Bar with Copyright & Legal Links */}
        <div className="pt-6 border-t border-[#191A20] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6B65]">
          <div>
            © {new Date().getFullYear()} JK Law Professional Corporation. All rights reserved. Richmond Hill, Ontario.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms of Use
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
