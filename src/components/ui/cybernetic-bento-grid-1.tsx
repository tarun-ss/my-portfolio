"use client"; // This component uses client-side hooks, so this is required.
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 COMPONENT 1: CYBERNETIC GRID SHADER
// ═══════════════════════════════════════════════════════════════════════════
const CyberneticGridShader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    // --- Three.js Scene Setup ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;
        float t = iTime * 0.2;
        float mouseDist = length(uv - mouse);
        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
        warp *= smoothstep(0.4, 0.0, mouseDist);
        uv += warp;
        vec2 gridUv = abs(fract(uv * 10.0) - 0.5);
        float line = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);
        vec3 gridColor = vec3(0.1, 0.5, 1.0);
        vec3 color = gridColor * line * (0.5 + sin(t * 2.0) * 0.2);
        float energy = sin(uv.x * 20.0 + t * 5.0) * sin(uv.y * 20.0 + t * 3.0);
        energy = smoothstep(0.8, 1.0, energy);
        color += vec3(1.0, 0.2, 0.8) * energy * line;
        float glow = smoothstep(0.1, 0.0, mouseDist);
        color += vec3(1.0) * glow * 0.5;
        color += random(uv + t * 0.1) * 0.05;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };
    
    const onMouseMove = (e: MouseEvent) => {
        uniforms.iMouse.value.set(e.clientX, window.innerHeight - e.clientY);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    onResize();

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.setAnimationLoop(null);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute', // Changed from fixed to work inside the container
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Behind the content
        pointerEvents: 'none'
      }}
      aria-label="Cybernetic Grid animated background"
    />
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// 🎴 COMPONENT 2: BENTO ITEM (Individual Grid Card)
// ═══════════════════════════════════════════════════════════════════════════
const BentoItem = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      item.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);
    return () => item.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={itemRef}
      className={ `bento-item ${className}`}
    >
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 🏗️ COMPONENT 3: BENTO GRID CONTAINER
// ═══════════════════════════════════════════════════════════════════════════
const CyberneticBentoGrid = ({ items }: { items: any[] }) => {
  return (
    <div className="w-full max-w-6xl z-10 p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {items.map(item => (
          <BentoItem key={item.id} className={item.className}>
            <div>
              <h2 className="text-2xl font-bold text-white">{item.title}</h2>
              <p className="mt-2 text-gray-400">{item.description}</p>
            </div>
            {item.content}
          </BentoItem>
        ))}
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// 🎯 MAIN EXPORT: COMPLETE CYBERNETIC BENTO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const CyberneticBentoComponent = ({ items }: { items: any[] }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Full-screen WebGL shader background */}
      <CyberneticGridShader />
      {/* Interactive bento grid content */}
      <CyberneticBentoGrid items={items} />
    </div>
  );
};

export default CyberneticBentoComponent;

