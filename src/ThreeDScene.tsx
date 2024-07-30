import * as THREE from 'three';
import * as f from "./functions"

import React, { useEffect, useRef, useState } from 'react';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDScene: React.FC = () => {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize Renderer
      const newRenderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      newRenderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = newRenderer;

      // Initialize Camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Initialize Scene
      const scene = new THREE.Scene();
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const parentElement = document.getElementById("parent-canvas")!; // Replace with the actual ID or reference to the parent element

      f.resize(newRenderer, f.camera, f.sizes, parentElement);
      f.cursor(f.sizes, f.camera);
      
      // Initialize Controls
      const newControls = new OrbitControls(camera, newRenderer.domElement);
      controlsRef.current = newControls;

      // Animation Loop
      const animate = () => {
        requestRef.current = requestAnimationFrame(animate);

        if (controlsRef.current) controlsRef.current.update();

        if (rendererRef.current) rendererRef.current.render(scene, camera);
      };

      animate();

      // Cleanup function
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (rendererRef.current) rendererRef.current.dispose();
      };
    }
  }, []);

  return (
    <div id="parent-canvas" >
      <canvas ref={canvasRef} style={{ overflow: 'hidden'}} id="canvas" />
    </div>
  );
};

export default ThreeDScene;
