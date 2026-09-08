'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Scale,
  ArrowRight,
  HeartHandshake,
  ShieldAlert,
  Activity,
  Home,
  Briefcase,
  Globe2,
  FileCheck,
  Users,
  Sparkles,
} from 'lucide-react';
import { FIRM_DETAILS, PRACTICE_AREAS, PracticeArea } from '@/lib/legalData';

interface NavbarProps {
  onOpenConsultation: () => void;
  onSelectService?: (service: PracticeArea) => void;
}

const serviceIconMap: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" />,
  Scale: <Scale className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Globe2: <Globe2 className="w-4 h-4" />,
  FileCheck: <FileCheck className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
};

export default function Navbar({ onOpenConsultation, onSelectService }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services', isDropdown: true },
    { name: 'Why JK Law', href: '#why-us' },
    { name: 'Practice Areas', href: '#interactive-areas' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceItem = (service: PracticeArea) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);

    // Scroll smoothly to the services section
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Open the service detail modal
    if (onSelectService) {
      onSelectService(service);
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-b border-[#E5E2DC]/80 py-3.5'
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
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      id="nav-link-services"
                      type="button"
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors relative py-1 focus:outline-none cursor-pointer ${
                        servicesDropdownOpen
                          ? 'text-[#9B2226]'
                          : 'text-[#4A4844] hover:text-[#9B2226]'
                      }`}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-[#9B2226]' : 'text-[#8C8880]'
                        }`}
                      />
                      {/* Underline indicator */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#9B2226] transition-all duration-200 ${
                          servicesDropdownOpen ? 'w-full' : 'w-0'
                        }`}
                      />
                    </button>

                    {/* SERVICES DROPDOWN MEGA MENU */}
                    {servicesDropdownOpen && (
                      <div
                        id="services-mega-dropdown"
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[720px] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E2DC] shadow-[0_20px_50px_-12px_rgba(20,19,24,0.18)] p-6 backdrop-blur-xl overflow-hidden">
                          
                          {/* Dropdown Header */}
                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EFECE6]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#9B2226] animate-pulse" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#141416]">
                                Legal Practice Categories
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E5E2DC] text-[#7C7972]">
                                Ontario Jurisdiction
                              </span>
                            </div>
                            <span className="text-[11px] text-[#7A7771]">
                              Click any category to view full legal scope
                            </span>
                          </div>

                          {/* 3-Column Services Grid */}
                          <div className="grid grid-cols-3 gap-3">
                            {PRACTICE_AREAS.map((service) => (
                              <button
                                key={service.id}
                                id={`nav-service-item-${service.id}`}
                                type="button"
                                onClick={() => handleSelectServiceItem(service)}
                                className="group text-left p-3 rounded-xl border border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF8F5] transition-all duration-150 flex flex-col justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5 mb-1.5">
                                  <div className="w-7 h-7 rounded-lg bg-[#F5F3ED] text-[#9B2226] group-hover:bg-[#9B2226] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                                    {serviceIconMap[service.iconName] || <Scale className="w-4 h-4" />}
                                  </div>
                                  <span className="font-serif text-sm font-semibold text-[#18181A] group-hover:text-[#9B2226] transition-colors leading-tight">
                                    {service.name}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#6E6B65] line-clamp-2 leading-relaxed pl-9">
                                  {service.shortDesc}
                                </p>
                              </button>
                            ))}
                          </div>

                          {/* Dropdown Footer Action Strip */}
                          <div className="mt-5 pt-4 border-t border-[#EFECE6] flex items-center justify-between bg-[#FCFBFA] -mx-6 -mb-6 px-6 py-3.5">
                            <button
                              type="button"
                              onClick={() => handleLinkClick('#services')}
                              className="text-xs font-semibold text-[#504E48] hover:text-[#9B2226] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <span>View All 9 Services on Page</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setServicesDropdownOpen(false);
                                onOpenConsultation();
                              }}
                              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-lg shadow-2xs transition-all cursor-pointer"
                            >
                              Book Consultation
                            </button>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-sm font-medium text-[#4A4844] hover:text-[#9B2226] transition-colors relative py-1 focus:outline-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#9B2226] hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
                >
                  {link.name}
                </button>
              );
            })}
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
            className="w-[88%] max-w-sm h-full bg-[#FBFBFA] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E5E2DC]">
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

              <div className="flex flex-col gap-1 py-5">
                {navLinks.map((link) => {
                  if (link.isDropdown) {
                    return (
                      <div key={link.name} className="py-1">
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="flex items-center justify-between w-full py-2.5 px-3 text-left text-base font-medium text-[#2A2927] hover:text-[#9B2226] hover:bg-[#9B2226]/5 rounded-lg transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span>Services</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#9B2226]/10 text-[#9B2226]">
                              9 Categories
                            </span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileServicesOpen ? 'rotate-180 text-[#9B2226]' : 'text-[#8C8983]'
                            }`}
                          />
                        </button>

                        {/* Expandable Mobile Services List */}
                        {mobileServicesOpen && (
                          <div className="pl-3 pr-1 py-2 space-y-1 bg-[#F5F3ED]/60 rounded-xl my-1 border border-[#E8E4DC]">
                            {PRACTICE_AREAS.map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => handleSelectServiceItem(service)}
                                className="flex items-center gap-2.5 w-full py-2 px-2.5 text-left text-xs font-medium text-[#383633] hover:text-[#9B2226] hover:bg-white rounded-lg transition-colors"
                              >
                                <span className="text-[#9B2226]">
                                  {serviceIconMap[service.iconName] || <Scale className="w-3.5 h-3.5" />}
                                </span>
                                <span className="truncate">{service.name}</span>
                              </button>
                            ))}
                            
                            <button
                              type="button"
                              onClick={() => handleLinkClick('#services')}
                              className="block w-full text-center py-2 text-[11px] font-semibold text-[#9B2226] hover:underline"
                            >
                              View All 9 Services Overview →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center justify-between py-2.5 px-3 text-left text-base font-medium text-[#2A2927] hover:text-[#9B2226] hover:bg-[#9B2226]/5 rounded-lg transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#8C8983]" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-[#E5E2DC] space-y-3">
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
