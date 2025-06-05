import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Themes: effortless action, starting with simplicity, natural accomplishment
// Visualization: A knot that forms and moves without strain, showing how complexity emerges from simple principles

const DelicateTorusKnot = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Only create scene and renderer once
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
      rendererRef.current = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance" // Prefer GPU rendering
      });

      // Set fixed size to 550x550
      rendererRef.current.setSize(550, 550);
      // Set background to cream color
      rendererRef.current.setClearColor(0xF0EEE6);

      if (containerRef.current) {
        containerRef.current.appendChild(rendererRef.current.domElement);
      }
    }

    const scene = sceneRef.current;
    const renderer = rendererRef.current;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 4;

    // Simple parameters that give rise to complex form
    const geometry = new THREE.TorusKnotGeometry(
      1.8,  // The space to unfold within
      0.3,  // Delicate presence
      150,  // Detail emerges naturally
      24,   // Smooth transitions
      3,    // Primary rhythm
      4     // Secondary rhythm
    );

    const material = new THREE.LineBasicMaterial({
      color: 0x777777, // Medium gray
      transparent: true,
      opacity: 0.7,
      linewidth: 0.25
    });

    const edges = new THREE.EdgesGeometry(geometry);
    const knot = new THREE.LineSegments(edges, material);

    // Center it on screen
    knot.position.set(0, 0, 0);

    scene.add(knot);

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.002; // Halved base time increment

      // Create varied rotation speeds on all axes
      knot.rotation.x = Math.PI / 6 + Math.sin(time * 0.25) * 0.2; // Halved speed
      knot.rotation.y = time * 0.4 + Math.sin(time * 0.15) * 0.3; // Halved speed
      knot.rotation.z = Math.cos(time * 0.2) * 0.15; // Halved speed

      // Add a slight wandering motion
      knot.position.x = Math.sin(time * 0.1) * 0.1; // Halved speed
      knot.position.y = Math.cos(time * 0.15) * 0.1; // Halved speed

      // Breathing effect with slight variation
      const scale = 0.95 + 0.05 * Math.sin(time * 0.6 + Math.sin(time * 0.25) * 0.3); // Halved speed
      knot.scale.setScalar(scale);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Dispose of Three.js resources
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
      if (edges) {
        edges.dispose();
      }
      if (scene && knot) {
        scene.remove(knot);
      }

      // Clear scene
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }

      // Clean up renderer
      if (rendererRef.current) {
        if (containerRef.current && rendererRef.current.domElement && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current = null;
      }

      // Reset time variable
      time = 0;
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#F0EEE6]">
      <div className="w-[550px] h-[550px]">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default DelicateTorusKnot;