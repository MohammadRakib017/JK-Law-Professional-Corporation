'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroScene3DProps {
  className?: string;
}

export default function HeroScene3D({ className = '' }: HeroScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const testCanvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !webglSupported) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f4f0, 0.042);

    // CAMERA
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.8);
    camera.lookAt(0, 0.6, 0);

    // RENDERER
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // LIGHTING - Refined volumetric courthouse palette
    const ambientLight = new THREE.AmbientLight(0xfcfbf9, 1.2);
    scene.add(ambientLight);

    // Soft warm key light from high left
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Subtle Canadian legal muted red rim/fill light
    const redAccentLight = new THREE.PointLight(0x9b2226, 1.4, 8);
    redAccentLight.position.set(-3.5, 1.2, -1.5);
    scene.add(redAccentLight);

    // Soft gold secondary bounce light
    const goldBounceLight = new THREE.PointLight(0xd4af37, 0.9, 7);
    goldBounceLight.position.set(2.5, 0.4, 2.5);
    scene.add(goldBounceLight);

    // MASTER ROOT GROUP FOR PARALLAX
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. REALISTIC DARK WOODEN LEGAL DESK
    // Rich mahogany tone
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x241611,
      roughness: 0.35,
      metalness: 0.12,
    });

    const deskTopGeo = new THREE.BoxGeometry(9, 0.22, 5);
    const deskTop = new THREE.Mesh(deskTopGeo, woodMaterial);
    deskTop.position.set(0, -0.6, 0.2);
    deskTop.receiveShadow = true;
    worldGroup.add(deskTop);

    // Leather blotter on desk
    const blotterGeo = new THREE.BoxGeometry(4.2, 0.02, 2.6);
    const blotterMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a18,
      roughness: 0.7,
      metalness: 0.05,
    });
    const blotter = new THREE.Mesh(blotterGeo, blotterMat);
    blotter.position.set(0, -0.48, 0.4);
    blotter.receiveShadow = true;
    worldGroup.add(blotter);

    // Gold trim for blotter corners
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.85,
      roughness: 0.25,
    });

    // 2. ARCHITECTURAL COURTHOUSE COLUMNS (Background & Flanks)
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xf0ede6,
      roughness: 0.45,
      metalness: 0.05,
    });

    function createFlutedColumn(x: number, z: number, scale = 1) {
      const colGroup = new THREE.Group();
      colGroup.position.set(x, 1.2, z);
      colGroup.scale.set(scale, scale, scale);

      // Base plinth
      const baseGeo = new THREE.BoxGeometry(0.7, 0.2, 0.7);
      const base = new THREE.Mesh(baseGeo, marbleMat);
      base.position.y = -1.8;
      base.castShadow = true;
      colGroup.add(base);

      // Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.24, 0.26, 4.2, 24);
      const shaft = new THREE.Mesh(shaftGeo, marbleMat);
      shaft.position.y = 0.3;
      shaft.castShadow = true;
      colGroup.add(shaft);

      // Capital
      const capGeo = new THREE.BoxGeometry(0.65, 0.22, 0.65);
      const cap = new THREE.Mesh(capGeo, marbleMat);
      cap.position.y = 2.45;
      colGroup.add(cap);

      return colGroup;
    }

    const leftCol1 = createFlutedColumn(-3.8, -2.2, 0.95);
    const leftCol2 = createFlutedColumn(-4.8, -3.2, 0.85);
    const rightCol1 = createFlutedColumn(3.8, -2.2, 0.95);
    const rightCol2 = createFlutedColumn(4.8, -3.2, 0.85);

    worldGroup.add(leftCol1, leftCol2, rightCol1, rightCol2);

    // 3. SCALES OF JUSTICE (Procedural brass & gold centerpiece)
    const scalesGroup = new THREE.Group();
    scalesGroup.position.set(1.4, 0.25, 0.6);
    worldGroup.add(scalesGroup);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd6b25a,
      metalness: 0.88,
      roughness: 0.22,
    });

    // Scales base
    const scalesBaseGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.08, 32);
    const scalesBase = new THREE.Mesh(scalesBaseGeo, brassMat);
    scalesBase.position.y = -0.7;
    scalesBase.castShadow = true;
    scalesGroup.add(scalesBase);

    // Central Pillar
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.5, 24);
    const pillar = new THREE.Mesh(pillarGeo, brassMat);
    pillar.position.y = 0.05;
    pillar.castShadow = true;
    scalesGroup.add(pillar);

    // Finial on top
    const finialGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const finial = new THREE.Mesh(finialGeo, brassMat);
    finial.position.y = 0.82;
    scalesGroup.add(finial);

    // Crossbeam
    const beamGroup = new THREE.Group();
    beamGroup.position.y = 0.72;
    scalesGroup.add(beamGroup);

    const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.25, 16);
    const beam = new THREE.Mesh(beamGeo, brassMat);
    beam.rotation.z = Math.PI / 2;
    beam.castShadow = true;
    beamGroup.add(beam);

    // Left Pan Assembly
    const panAssemblyLeft = new THREE.Group();
    panAssemblyLeft.position.set(-0.6, 0, 0);
    beamGroup.add(panAssemblyLeft);

    // Strings
    const stringGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.45);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xb59345 });

    const str1 = new THREE.Mesh(stringGeo, stringMat);
    str1.position.set(-0.06, -0.22, 0.04);
    str1.rotation.x = 0.12;
    str1.rotation.z = -0.1;
    const str2 = new THREE.Mesh(stringGeo, stringMat);
    str2.position.set(0.06, -0.22, 0.04);
    str2.rotation.x = 0.12;
    str2.rotation.z = 0.1;
    const str3 = new THREE.Mesh(stringGeo, stringMat);
    str3.position.set(0, -0.22, -0.06);
    str3.rotation.x = -0.15;
    panAssemblyLeft.add(str1, str2, str3);

    // Dish Pan
    const panGeo = new THREE.CylinderGeometry(0.2, 0.12, 0.03, 24);
    const panLeft = new THREE.Mesh(panGeo, brassMat);
    panLeft.position.y = -0.45;
    panLeft.castShadow = true;
    panAssemblyLeft.add(panLeft);

    // Right Pan Assembly
    const panAssemblyRight = new THREE.Group();
    panAssemblyRight.position.set(0.6, 0, 0);
    beamGroup.add(panAssemblyRight);

    const strR1 = new THREE.Mesh(stringGeo, stringMat);
    strR1.position.set(-0.06, -0.22, 0.04);
    strR1.rotation.x = 0.12;
    strR1.rotation.z = -0.1;
    const strR2 = new THREE.Mesh(stringGeo, stringMat);
    strR2.position.set(0.06, -0.22, 0.04);
    strR2.rotation.x = 0.12;
    strR2.rotation.z = 0.1;
    const strR3 = new THREE.Mesh(stringGeo, stringMat);
    strR3.position.set(0, -0.22, -0.06);
    strR3.rotation.x = -0.15;
    panAssemblyRight.add(strR1, strR2, strR3);

    const panRight = new THREE.Mesh(panGeo, brassMat);
    panRight.position.y = -0.45;
    panRight.castShadow = true;
    panAssemblyRight.add(panRight);

    // 4. ELEGANT LAW BOOKS (Stacked leather volumes)
    const booksGroup = new THREE.Group();
    booksGroup.position.set(-1.6, -0.32, 0.5);
    worldGroup.add(booksGroup);

    const leatherMat1 = new THREE.MeshStandardMaterial({
      color: 0x3d1719, // Deep burgundy leather
      roughness: 0.55,
      metalness: 0.1,
    });
    const leatherMat2 = new THREE.MeshStandardMaterial({
      color: 0x1f262b, // Dark navy legal reports
      roughness: 0.5,
      metalness: 0.1,
    });
    const leatherMat3 = new THREE.MeshStandardMaterial({
      color: 0x2e2017, // Classic brown calfskin
      roughness: 0.6,
      metalness: 0.08,
    });
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xede6d6,
      roughness: 0.9,
    });

    function createBook(width: number, height: number, depth: number, coverMat: THREE.Material, rotationY: number, posY: number) {
      const book = new THREE.Group();
      book.position.y = posY;
      book.rotation.y = rotationY;

      // Cover
      const coverGeo = new THREE.BoxGeometry(width, height, depth);
      const cover = new THREE.Mesh(coverGeo, coverMat);
      cover.castShadow = true;
      book.add(cover);

      // Gold spine ribs
      const goldRib = new THREE.Mesh(
        new THREE.BoxGeometry(width * 0.98, height * 0.04, depth * 1.02),
        goldTrimMat
      );
      goldRib.position.y = height * 0.15;
      book.add(goldRib);

      // Pages insert
      const pageGeo = new THREE.BoxGeometry(width * 0.95, height * 0.88, depth * 0.96);
      const pages = new THREE.Mesh(pageGeo, pagesMat);
      pages.position.x = 0.02;
      book.add(pages);

      return book;
    }

    const b1 = createBook(1.15, 0.18, 0.85, leatherMat1, 0.08, 0);
    const b2 = createBook(1.08, 0.16, 0.8, leatherMat2, -0.15, 0.17);
    const b3 = createBook(1.0, 0.14, 0.75, leatherMat3, 0.22, 0.32);
    booksGroup.add(b1, b2, b3);

    // 5. PREMIUM FOUNTAIN PEN
    const penGroup = new THREE.Group();
    penGroup.position.set(-0.3, -0.45, 1.2);
    penGroup.rotation.y = 0.65;
    penGroup.rotation.z = -0.05;
    worldGroup.add(penGroup);

    // Pen Barrel (Black lacquer)
    const penMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      roughness: 0.15,
      metalness: 0.3,
    });
    const barrelGeo = new THREE.CylinderGeometry(0.022, 0.018, 0.65, 16);
    const barrel = new THREE.Mesh(barrelGeo, penMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.castShadow = true;
    penGroup.add(barrel);

    // Pen Gold Rings & Cap Clip
    const ring1 = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.04, 16), brassMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.z = 0.05;
    penGroup.add(ring1);

    // Pen Gold Nib
    const nibGeo = new THREE.ConeGeometry(0.02, 0.08, 8);
    const nib = new THREE.Mesh(nibGeo, brassMat);
    nib.rotation.x = -Math.PI / 2;
    nib.position.z = 0.37;
    penGroup.add(nib);

    // 6. FLOATING TRANSLUCENT GLASS PANELS (Subtle refractive presence)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 0.6,
      transparent: true,
      roughness: 0.15,
      ior: 1.45,
      thickness: 0.08,
      specularIntensity: 0.9,
    });

    const panel1Geo = new THREE.BoxGeometry(1.6, 1.1, 0.03);
    const panel1 = new THREE.Mesh(panel1Geo, glassMat);
    panel1.position.set(-2.2, 1.3, -0.5);
    panel1.rotation.set(0.1, 0.35, -0.05);
    worldGroup.add(panel1);

    const panel2Geo = new THREE.BoxGeometry(1.4, 0.95, 0.03);
    const panel2 = new THREE.Mesh(panel2Geo, glassMat);
    panel2.position.set(2.4, 1.5, -0.8);
    panel2.rotation.set(-0.1, -0.4, 0.08);
    worldGroup.add(panel2);

    // Initial load fade
    setTimeout(() => {
      setIsLoaded(true);
    }, 120);

    // MOUSE PARALLAX & INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1, Math.min(1, normX));
      targetMouseY = Math.max(-1, Math.min(1, normY));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      if (!prefersReducedMotion) {
        // Parallax rotation of the entire legal world
        worldGroup.rotation.y = mouseX * 0.12;
        worldGroup.rotation.x = -mouseY * 0.06;
        worldGroup.position.x = mouseX * 0.2;
        worldGroup.position.y = mouseY * 0.12;

        // Subtle realistic scale breathing tilt
        beamGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.04 + mouseX * 0.03;
        panAssemblyLeft.rotation.z = -beamGroup.rotation.z;
        panAssemblyRight.rotation.z = -beamGroup.rotation.z;

        // Floating glass panels gentle drift
        panel1.position.y = 1.3 + Math.sin(elapsedTime * 0.7) * 0.05;
        panel1.rotation.y = 0.35 + Math.cos(elapsedTime * 0.5) * 0.03;

        panel2.position.y = 1.5 + Math.cos(elapsedTime * 0.6) * 0.06;
        panel2.rotation.y = -0.4 + Math.sin(elapsedTime * 0.45) * 0.03;

        // Soft red accent light breathing
        redAccentLight.intensity = 1.3 + Math.sin(elapsedTime * 1.2) * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [webglSupported]);

  return (
    <div
      ref={containerRef}
      id="hero-3d-scene-container"
      className={`relative w-full h-full min-h-[540px] pointer-events-none transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      {/* Graceful Fallback if WebGL is disabled or unsupported */}
      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F5F4F0] via-[#FAF9F6] to-[#ECE9E2] p-8 text-center">
          <div className="max-w-md p-6 bg-white/80 border border-[#E5E2DC] rounded-xl shadow-sm">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#9B2226]/10 flex items-center justify-center text-[#9B2226]">
              <span className="text-xl font-serif">JK</span>
            </div>
            <p className="text-sm text-[#4A4A4A]">
              JK Law Professional Corporation — Richmond Hill, Ontario
            </p>
          </div>
        </div>
      )}

      {/* Subtle radial vignette gradient to blend with off-white editorial page */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#FBFBFA]/90 pointer-events-none" />
    </div>
  );
}
