'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PRACTICE_AREAS, PracticeArea } from '@/lib/legalData';
import { Scale, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface PracticeAreasInteractiveProps {
  onOpenConsultation: () => void;
  onSelectService: (service: PracticeArea) => void;
}

export default function PracticeAreasInteractive({
  onOpenConsultation,
  onSelectService,
}: PracticeAreasInteractiveProps) {
  const [selectedArea, setSelectedArea] = useState<PracticeArea>(PRACTICE_AREAS[0]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef<number>(0);
  const targetTiltRef = useRef<number>(0);

  // Update target 3D angle based on selected practice area
  const handleSelectArea = (area: PracticeArea, index: number) => {
    setSelectedArea(area);
    targetRotationRef.current = (index / PRACTICE_AREAS.length) * (Math.PI * 2);
    targetTiltRef.current = (index % 2 === 0 ? 0.08 : -0.08);
  };

  // Interactive 3D Central Legal Object (Scales of Justice & Classical Column Plinth)
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
    camera.position.set(0, 1.2, 4.8);
    camera.lookAt(0, 0.3, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfffdfa, 1.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    mainLight.position.set(3, 5, 4);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const redGlowLight = new THREE.PointLight(0x9b2226, 2.0, 7);
    redGlowLight.position.set(-2, 0.5, 1);
    scene.add(redGlowLight);

    // CENTRAL OBJECT GROUP
    const centralGroup = new THREE.Group();
    scene.add(centralGroup);

    // Materials
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xdfb85b,
      metalness: 0.88,
      roughness: 0.2,
    });
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xf2eee6,
      roughness: 0.35,
      metalness: 0.05,
    });
    const mahoganyMat = new THREE.MeshStandardMaterial({
      color: 0x241510,
      roughness: 0.4,
      metalness: 0.1,
    });

    // 1. Marble Column Plinth Base
    const plinthGeo = new THREE.CylinderGeometry(0.9, 1.05, 0.35, 32);
    const plinth = new THREE.Mesh(plinthGeo, marbleMat);
    plinth.position.y = -0.95;
    plinth.receiveShadow = true;
    centralGroup.add(plinth);

    const subBaseGeo = new THREE.BoxGeometry(2.4, 0.18, 2.4);
    const subBase = new THREE.Mesh(subBaseGeo, mahoganyMat);
    subBase.position.y = -1.18;
    subBase.receiveShadow = true;
    centralGroup.add(subBase);

    // 2. Center Column of Scales
    const stemGeo = new THREE.CylinderGeometry(0.05, 0.08, 1.8, 24);
    const stem = new THREE.Mesh(stemGeo, brassMat);
    stem.position.y = 0.05;
    stem.castShadow = true;
    centralGroup.add(stem);

    // Ornamental Spheres
    const orb1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), brassMat);
    orb1.position.y = -0.7;
    centralGroup.add(orb1);

    const topFinial = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 16), brassMat);
    topFinial.position.y = 1.05;
    centralGroup.add(topFinial);

    // 3. Balance Beam
    const beamPivot = new THREE.Group();
    beamPivot.position.y = 0.88;
    centralGroup.add(beamPivot);

    const beamBar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.7, 16), brassMat);
    beamBar.rotation.z = Math.PI / 2;
    beamBar.castShadow = true;
    beamPivot.add(beamBar);

    // Left Pan Assembly
    const panLeftGroup = new THREE.Group();
    panLeftGroup.position.set(-0.8, 0, 0);
    beamPivot.add(panLeftGroup);

    const stringGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.55);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xb59345 });
    const s1 = new THREE.Mesh(stringGeo, stringMat);
    s1.position.set(-0.08, -0.28, 0.05);
    const s2 = new THREE.Mesh(stringGeo, stringMat);
    s2.position.set(0.08, -0.28, 0.05);
    const s3 = new THREE.Mesh(stringGeo, stringMat);
    s3.position.set(0, -0.28, -0.08);
    panLeftGroup.add(s1, s2, s3);

    const panGeo = new THREE.CylinderGeometry(0.24, 0.16, 0.03, 24);
    const pan1 = new THREE.Mesh(panGeo, brassMat);
    pan1.position.y = -0.56;
    panLeftGroup.add(pan1);

    // Right Pan Assembly
    const panRightGroup = new THREE.Group();
    panRightGroup.position.set(0.8, 0, 0);
    beamPivot.add(panRightGroup);

    const sr1 = new THREE.Mesh(stringGeo, stringMat);
    sr1.position.set(-0.08, -0.28, 0.05);
    const sr2 = new THREE.Mesh(stringGeo, stringMat);
    sr2.position.set(0.08, -0.28, 0.05);
    const sr3 = new THREE.Mesh(stringGeo, stringMat);
    sr3.position.set(0, -0.28, -0.08);
    panRightGroup.add(sr1, sr2, sr3);

    const pan2 = new THREE.Mesh(panGeo, brassMat);
    pan2.position.y = -0.56;
    panRightGroup.add(pan2);

    // Animation Loop
    let frameId: number;
    let clock = new THREE.Clock();
    let currentRotation = 0;
    let currentTilt = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth dampening towards target rotation
      currentRotation += (targetRotationRef.current - currentRotation) * 0.06;
      currentTilt += (targetTiltRef.current - currentTilt) * 0.06;

      centralGroup.rotation.y = currentRotation + Math.sin(elapsed * 0.5) * 0.05;
      beamPivot.rotation.z = currentTilt + Math.sin(elapsed * 1.4) * 0.03;
      panLeftGroup.rotation.z = -beamPivot.rotation.z;
      panRightGroup.rotation.z = -beamPivot.rotation.z;

      // Pulse red glow slightly
      redGlowLight.intensity = 1.6 + Math.sin(elapsed * 2) * 0.4;

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
      id="interactive-areas"
      className="py-24 sm:py-32 bg-[#F5F4F0] relative overflow-hidden border-t border-[#E8E5DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E0DCD4] text-[#9B2226] text-xs font-semibold uppercase tracking-widest mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Interactive Legal Navigator</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#141416] tracking-tight mb-4">
            Explore Your Legal Rights
          </h2>

          <p className="text-base text-[#5B5954]">
            Select an area of Ontario law below to inspect our strategic focus, regulatory scope, and tailored guidance.
          </p>
        </div>

        {/* 3-Column Interactive Layout: Categories List - 3D Center Object - Glass Panel Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Categories (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#73706A] mb-3 px-2">
              Select Legal Practice Area
            </div>

            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {PRACTICE_AREAS.map((area, idx) => {
                const isActive = selectedArea.id === area.id;
                return (
                  <button
                    key={area.id}
                    id={`interactive-tab-${area.id}`}
                    onClick={() => handleSelectArea(area, idx)}
                    onMouseEnter={() => handleSelectArea(area, idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#9B2226] border border-[#9B2226]/40 shadow-sm font-semibold'
                        : 'bg-[#FAF8F5]/60 hover:bg-white text-[#33312E] border border-transparent hover:border-[#E5E2DC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive ? 'bg-[#9B2226]' : 'bg-[#C9C5BC] group-hover:bg-[#9B2226]'
                        }`}
                      />
                      <span className="text-sm">{area.name}</span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-[#9B2226] translate-x-0.5' : 'text-[#A09D96]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Interactive 3D Legal Scales (4 cols) */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center">
            <div
              ref={canvasContainerRef}
              className="w-full h-[360px] sm:h-[420px] relative rounded-2xl overflow-hidden bg-radial from-white via-[#F5F3ED] to-[#EAE6DD] border border-[#DDD9D0] shadow-sm flex items-center justify-center"
            >
              {/* Top watermark badge */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-[#E0DCD4] text-[10px] uppercase font-mono tracking-widest text-[#6E6A64]">
                Scales of Justice • Ontario
              </div>

              {/* Bottom active label */}
              <div className="absolute bottom-3 left-4 right-4 text-center">
                <span className="inline-block text-xs font-serif italic text-[#63605A]">
                  Active Focus: {selectedArea.name}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Glass Detail Panel (4 cols) */}
          <div className="lg:col-span-4">
            <div className="p-7 rounded-2xl bg-white/90 backdrop-blur-md border border-[#9B2226]/20 shadow-md flex flex-col justify-between min-h-[420px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE4] mb-4">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9B2226]">
                    Jurisdiction Analysis
                  </span>
                  <span className="text-xs text-[#8A8780] font-mono">JK Law PC</span>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#18181B] mb-3">
                  {selectedArea.name}
                </h3>

                <p className="text-sm text-[#4E4C47] leading-relaxed mb-6 font-normal">
                  {selectedArea.longDesc}
                </p>

                <div className="mb-6">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#7A7770] mb-2.5">
                    Core Matters Handled:
                  </span>
                  <ul className="space-y-2">
                    {selectedArea.keyMatters.slice(0, 3).map((matter, mIdx) => (
                      <li key={mIdx} className="text-xs text-[#353330] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9B2226] shrink-0 mt-0.5" />
                        <span>{matter}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0ECE4] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onSelectService(selectedArea)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-[#18181A] bg-[#F5F3ED] hover:bg-[#EBE7DF] rounded-xl transition-colors text-center"
                >
                  Full Details
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B2226] hover:bg-[#80191D] rounded-xl transition-colors shadow-xs text-center"
                >
                  Consult Counsel
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
