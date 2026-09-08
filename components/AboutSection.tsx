'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Shield, CheckCircle2, ArrowUpRight, Scale, Award, BookOpen } from 'lucide-react';
import * as THREE from 'three';
import { FIRM_DETAILS } from '@/lib/legalData';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export default function AboutSection({ onOpenConsultation }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [count, setCount] = useState(0);

  // Animated counter on viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const end = 9;
          const duration = 1200;
          const stepTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Three.js architectural courthouse visual on the left
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);
    camera.lookAt(0, 0.4, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfffcf7, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
    dirLight.position.set(3, 5, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const redRimLight = new THREE.PointLight(0x9b2226, 1.5, 6);
    redRimLight.position.set(-2.5, 0.8, -1);
    scene.add(redRimLight);

    // Architectural model group
    const archGroup = new THREE.Group();
    scene.add(archGroup);

    // Pediment / Frieze (Courthouse Top)
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.4,
      metalness: 0.08,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Frieze beam
    const friezeGeo = new THREE.BoxGeometry(3.6, 0.28, 0.6);
    const frieze = new THREE.Mesh(friezeGeo, marbleMat);
    frieze.position.y = 1.6;
    frieze.castShadow = true;
    archGroup.add(frieze);

    // Classical Columns (4 fluted columns)
    const colPositions = [-1.35, -0.45, 0.45, 1.35];
    colPositions.forEach((xPos) => {
      const col = new THREE.Group();
      col.position.set(xPos, 0.4, 0);

      const shaftGeo = new THREE.CylinderGeometry(0.12, 0.14, 2.1, 20);
      const shaft = new THREE.Mesh(shaftGeo, marbleMat);
      shaft.castShadow = true;
      col.add(shaft);

      const capGeo = new THREE.BoxGeometry(0.34, 0.12, 0.34);
      const cap = new THREE.Mesh(capGeo, marbleMat);
      cap.position.y = 1.1;
      col.add(cap);

      const baseGeo = new THREE.BoxGeometry(0.38, 0.14, 0.38);
      const base = new THREE.Mesh(baseGeo, marbleMat);
      base.position.y = -1.1;
      col.add(base);

      archGroup.add(col);
    });

    // Courthouse Steps
    const step1Geo = new THREE.BoxGeometry(4.0, 0.16, 1.2);
    const step1 = new THREE.Mesh(step1Geo, marbleMat);
    step1.position.set(0, -0.76, 0.1);
    step1.receiveShadow = true;
    archGroup.add(step1);

    const step2Geo = new THREE.BoxGeometry(4.3, 0.16, 1.5);
    const step2 = new THREE.Mesh(step2Geo, marbleMat);
    step2.position.set(0, -0.92, 0.25);
    step2.receiveShadow = true;
    archGroup.add(step2);

    // Central brass emblem disk
    const emblemGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 32);
    const emblem = new THREE.Mesh(emblemGeo, brassMat);
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(0, 0.35, 0.25);
    archGroup.add(emblem);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      archGroup.rotation.y = Math.sin(t * 0.4) * 0.14;
      archGroup.position.y = Math.cos(t * 0.6) * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 sm:py-32 bg-[#F5F4F0] relative overflow-hidden border-t border-[#E8E5DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: 3D Architectural Legal Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white to-[#ECEAE3] border border-[#DDD9D0] p-4 shadow-lg">
              
              {/* Inner Three.js Canvas container */}
              <div
                ref={canvasContainerRef}
                className="w-full h-[380px] sm:h-[450px] relative rounded-2xl overflow-hidden bg-radial from-[#FBFBFA] via-[#F2EFE9] to-[#E5E1D7] flex items-center justify-center"
              >
                {/* Overlay floating glass badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="px-3 py-1.5 rounded-lg bg-white/85 backdrop-blur-md border border-[#DDD9D0] text-[11px] font-semibold text-[#18181A] shadow-xs flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#9B2226]" />
                    <span>Courthouse Precision</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#78756F]">
                    Richmond Hill, ON
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#E0DCD4] shadow-xs pointer-events-none z-10">
                  <p className="text-xs text-[#44423E] font-medium leading-relaxed">
                    Dedicated advocates navigating the Ontario Court of Justice, Superior Court, and administrative tribunals.
                  </p>
                </div>
              </div>

              {/* Decorative Accent Ribbon */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[#9B2226]/10 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>

          {/* Right Side: Editorial Content & Animated Stats */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E0DCD4] text-[#9B2226] text-xs font-semibold uppercase tracking-widest mb-4 shadow-2xs">
              <Shield className="w-3.5 h-3.5" />
              <span>About The Firm</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#141416] tracking-tight leading-[1.15] mb-6">
              Experienced Guidance.{' '}
              <span className="text-[#9B2226] font-normal">Personalized Legal Solutions.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#52504C] leading-relaxed mb-8">
              <p>
                At <strong className="text-[#1A1918] font-semibold">JK Law Professional Corporation</strong>, 
                we recognize that legal challenges do not occur in a vacuum. Whether drafting an intricate corporate 
                agreement, protecting your custodial rights, or resolving high-stakes civil disputes, the outcome 
                profoundly shapes your future and peace of mind.
              </p>
              <p>
                Our firm provides dedicated legal representation and practical legal guidance tailored strictly to 
                our clients&apos; individual circumstances. We reject one-size-fits-all legal templates, approaching every 
                case with rigorous legal analysis, tactical foresight, and transparent communication.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-[#E4E0D8]">
                <CheckCircle2 className="w-5 h-5 text-[#9B2226] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-[#18181B] block mb-0.5">Rigorous Case Preparation</span>
                  <span className="text-[#65635D] text-xs">Exhaustive discovery, legal research, and strategic positioning.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-[#E4E0D8]">
                <CheckCircle2 className="w-5 h-5 text-[#9B2226] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-[#18181B] block mb-0.5">Direct Lawyer Access</span>
                  <span className="text-[#65635D] text-xs">Accessible counsel who keep you fully apprised at every juncture.</span>
                </div>
              </div>
            </div>

            {/* Animated Statistics as requested in prompt */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#DFDBD2]">
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#141416] tracking-tight flex items-baseline">
                  <span>{count}</span>
                  <span className="text-[#9B2226]">+</span>
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#66635D] mt-1">
                  Areas of Legal Service
                </div>
              </div>

              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#141416] tracking-tight pt-1">
                  Client-Focused
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#66635D] mt-1">
                  Approach
                </div>
              </div>

              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#141416] tracking-tight pt-1">
                  Professional
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#66635D] mt-1">
                  Legal Guidance
                </div>
              </div>
            </div>

            {/* Consultation CTA Link */}
            <div className="mt-8 flex items-center gap-4">
              <button
                id="about-consultation-btn"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#18181B] hover:bg-[#9B2226] rounded-xl transition-colors cursor-pointer"
              >
                <span>Discuss Your Case</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-[#706D67]">
                Located at 10210 Yonge St, Richmond Hill
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
