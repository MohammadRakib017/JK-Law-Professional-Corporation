'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, Scale } from 'lucide-react';
import { FIRM_DETAILS } from '@/lib/legalData';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why JK Law', href: '#why-us' },
    { name: 'Practice Areas', href: '#interactive-areas' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-b border-[#E5E2DC]/80 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            id="nav-logo"
            className="group flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#9B2226] rounded-md p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-[#18181B] text-[#FBFBFA] flex items-center justify-center border border-[#303035] group-hover:border-[#9B2226] transition-colors shadow-xs">
              <Scale className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-[#141416] leading-tight group-hover:text-[#9B2226] transition-colors">
                JK LAW
              </span>
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#63615D] font-medium">
                Professional Corporation
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-medium text-[#4A4844] hover:text-[#9B2226] transition-colors relative py-1 focus:outline-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#9B2226] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${FIRM_DETAILS.phoneRaw}`}
              id="nav-phone-link"
              className="flex items-center gap-2 text-xs font-semibold text-[#1A1918] hover:text-[#9B2226] transition-colors px-3 py-2 rounded-lg border border-transparent hover:border-[#E5E2DC]"
              title="Direct Telephone Line"
            >
              <Phone className="w-3.5 h-3.5 text-[#9B2226]" />
              <span>{FIRM_DETAILS.phone}</span>
            </a>

            <button
              id="nav-consultation-btn"
              onClick={onOpenConsultation}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] active:scale-[0.98] transition-all rounded-lg shadow-sm hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9B2226] focus:ring-offset-2"
            >
              Book a Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#1A1918] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#9B2226]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden flex justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-[82%] max-w-sm h-full bg-[#FBFBFA] shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E2DC]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#18181B] text-[#C5A059] flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-serif text-base font-bold text-[#141416]">
                      JK LAW
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider text-[#63615D]">
                      Richmond Hill, Ontario
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#4A4844] hover:text-[#141416]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 py-6">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className="flex items-center justify-between py-3 px-3 text-left text-base font-medium text-[#2A2927] hover:text-[#9B2226] hover:bg-[#9B2226]/5 rounded-lg transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#8C8983]" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E2DC] space-y-3">
              <a
                href={`tel:${FIRM_DETAILS.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[#1A1918] bg-white border border-[#E5E2DC] rounded-lg shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#9B2226]" />
                <span>{FIRM_DETAILS.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 text-sm font-semibold text-white bg-[#9B2226] hover:bg-[#80191D] rounded-lg shadow-sm"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
