'use client';

import React, { useEffect, useRef } from 'react';
import { Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { FIRM_DETAILS } from '@/lib/legalData';

interface ConsultationCtaProps {
  onOpenConsultation: () => void;
}

export default function ConsultationCta({ onOpenConsultation }: ConsultationCtaProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

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

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.8, 3.8);
    camera.lookAt(0, 0.2, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dramatic Dark Scene Lighting
    const ambientLight = new THREE.AmbientLight(0x222226, 0.8);
    scene.add(ambientLight);

    const warmKeyLight = new THREE.DirectionalLight(0xffdf9e, 2.5);
    warmKeyLight.position.set(3, 4, 3);
    scene.add(warmKeyLight);

    // Dramatic Red Ambient Point Light
    const redPoint = new THREE.PointLight(0x9b2226, 3.5, 8);
    redPoint.position.set(-2.5, 1, 0.5);
    scene.add(redPoint);

    // Slowly rotating 3D scales-of-justice object
    const scales = new THREE.Group();
    scene.add(scales);

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfb85b,
      metalness: 0.92,
      roughness: 0.18,
    });

    // Base
    const baseGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.08, 32);
    const base = new THREE.Mesh(baseGeo, brassMaterial);
    base.position.y = -0.65;
    scales.add(base);

    // Upright column
    const colGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.4, 24);
    const col = new THREE.Mesh(colGeo, brassMaterial);
    col.position.y = 0.05;
    scales.add(col);

    // Finial
    const finialGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const finial = new THREE.Mesh(finialGeo, brassMaterial);
    finial.position.y = 0.8;
    scales.add(finial);

    // Cross beam
    const beamGroup = new THREE.Group();
    beamGroup.position.y = 0.72;
    scales.add(beamGroup);

    const beamBar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.3, 16), brassMaterial);
    beamBar.rotation.z = Math.PI / 2;
    beamGroup.add(beamBar);

    // Left Pan
    const leftPanGroup = new THREE.Group();
    leftPanGroup.position.set(-0.62, 0, 0);
    beamGroup.add(leftPanGroup);

    const panGeo = new THREE.CylinderGeometry(0.2, 0.12, 0.03, 24);
    const panL = new THREE.Mesh(panGeo, brassMaterial);
    panL.position.y = -0.45;
    leftPanGroup.add(panL);

    // Right Pan
    const rightPanGroup = new THREE.Group();
    rightPanGroup.position.set(0.62, 0, 0);
    beamGroup.add(rightPanGroup);

    const panR = new THREE.Mesh(panGeo, brassMaterial);
    panR.position.y = -0.45;
    rightPanGroup.add(panR);

    // String indicators
    const stringGeo = new THREE.CylinderGeometry(0.0025, 0.0025, 0.44);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xb59345 });
    const s1 = new THREE.Mesh(stringGeo, stringMat);
    s1.position.y = -0.22;
    leftPanGroup.add(s1);
    const s2 = new THREE.Mesh(stringGeo, stringMat);
    s2.position.y = -0.22;
    rightPanGroup.add(s2);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow elegant 3D rotation
      scales.rotation.y = elapsed * 0.45;
      beamGroup.rotation.z = Math.sin(elapsed * 1.1) * 0.05;
      leftPanGroup.rotation.z = -beamGroup.rotation.z;
      rightPanGroup.rotation.z = -beamGroup.rotation.z;

      // Subtle red light pulse
      redPoint.intensity = 3.2 + Math.sin(elapsed * 1.5) * 0.6;

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
      id="consultation-cta"
      className="relative py-24 sm:py-32 bg-[#0E0F12] text-white overflow-hidden"
    >
      {/* Subtle red ambient lighting background blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#9B2226]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#C5A059]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Grid line texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Center Text (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C5A059] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Prompt Case Assessment</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
              Need Legal Guidance?
            </h2>

            <p className="text-lg sm:text-xl text-[#B3B0A8] font-normal leading-relaxed mb-10 max-w-xl">
              Speak with JK Law Professional Corporation to discuss your legal needs and determine the right next step.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                id="cta-book-consultation"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] active:scale-[0.98] rounded-xl shadow-lg transition-all cursor-pointer group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${FIRM_DETAILS.phoneRaw}`}
                id="cta-call-phone"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call {FIRM_DETAILS.phone}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#8A8780]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Confidential legal consultations conducted in accordance with Law Society of Ontario rules.</span>
            </div>
          </div>

          {/* Right: Slowly Rotating 3D Scales of Justice Object (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md h-[340px] sm:h-[400px] rounded-3xl bg-gradient-to-b from-[#18191E] to-[#121317] border border-white/10 p-4 shadow-2xl flex items-center justify-center overflow-hidden">
              <div
                ref={canvasContainerRef}
                className="w-full h-full relative"
              />
              <div className="absolute bottom-4 left-6 right-6 text-center pointer-events-none">
                <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#7A7872]">
                  Equitable Advocacy • Proven Focus
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
