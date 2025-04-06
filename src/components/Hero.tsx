import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Shield, Users, Book } from 'lucide-react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create rotating 3D cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x2C5530 }), // military green
      new THREE.MeshBasicMaterial({ color: 0x1E3D20 }), // military dark
      new THREE.MeshBasicMaterial({ color: 0x3A7144 }), // military light
      new THREE.MeshBasicMaterial({ color: 0x2C5530 }), // military green
      new THREE.MeshBasicMaterial({ color: 0x1E3D20 }), // military dark
      new THREE.MeshBasicMaterial({ color: 0x3A7144 }), // military light
    ];
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    cube.position.set(-7, 2, -5);
    scene.add(cube);
    
    // Create flag
    const flagWidth = 5;
    const flagHeight = 3;
    const flagGeometry = new THREE.PlaneGeometry(flagWidth, flagHeight, 20, 20);
    
    // Create basic colors for flag (in case texture doesn't load)
    const colors = new Float32Array(flagGeometry.attributes.position.count * 3);
    for (let i = 0; i < flagGeometry.attributes.position.count; i++) {
      const y = flagGeometry.attributes.position.getY(i);
      if (y > flagHeight / 3) {
        // Saffron replaced with military green
        colors[i * 3] = 0.17;     // R
        colors[i * 3 + 1] = 0.33;  // G
        colors[i * 3 + 2] = 0.19;  // B
      } else if (y > -flagHeight / 3) {
        // White
        colors[i * 3] = 1.0;     // R
        colors[i * 3 + 1] = 1.0;  // G
        colors[i * 3 + 2] = 1.0;  // B
      } else {
        // Green
        colors[i * 3] = 0.17;     // R
        colors[i * 3 + 1] = 0.53;  // G
        colors[i * 3 + 2] = 0.33;  // B
      }
    }
    
    flagGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const flagMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide
    });
    
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    scene.add(flag);
    
    // Add pole
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8, 16);
    const poleMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(-flagWidth / 2 - 0.1, 0, 0);
    scene.add(pole);
    
    // Position camera
    camera.position.z = 8;
    
    // Flag wave animation
    function animateFlag() {
      const time = Date.now() * 0.002;
      const positions = flagGeometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // More wave effect on the right side of the flag
        const waveStrength = (x + flagWidth / 2) / flagWidth;
        const waveHeight = 0.2 * waveStrength;
        
        // Apply sine wave effect
        positions.setZ(i, Math.sin(x * 1.5 + time) * waveHeight);
      }
      
      positions.needsUpdate = true;
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      animateFlag();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* 3D Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#121212]/95 to-[#121212] z-[-5]"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-text-shadow animate-fade-in">
          For Their <span className="text-military">Sacrifice</span>, <br />
          We Shall Not <span className="text-military">Forget</span>.
        </h1>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/80">
          Sentinel uses cutting-edge technology to ensure the welfare of martyr families, providing emotional support, financial tracking, and community engagement.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/families">
            <Button className="bg-military text-white hover:bg-military-light flex items-center gap-2 text-base w-full">
              <Shield className="h-5 w-5" />
              Register a Martyr Family
            </Button>
          </Link>
          
          <Link to="/volunteer">
            <Button className="bg-[#1A1A1A] text-white hover:bg-[#222222] flex items-center gap-2 text-base w-full">
              <Users className="h-5 w-5" />
              Volunteer Now
            </Button>
          </Link>
          
          <Link to="/resources/educational-support">
            <Button variant="outline" className="border-military text-military hover:bg-military/10 flex items-center gap-2 text-base w-full">
              <Book className="h-5 w-5" />
              View Resources
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#333333]/30 p-6 rounded-lg">
            <div className="text-4xl font-bold text-military mb-2">1,240+</div>
            <div className="text-lg font-medium">Families Supported</div>
          </div>
          
          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#333333]/30 p-6 rounded-lg">
            <div className="text-4xl font-bold text-military mb-2">3,500+</div>
            <div className="text-lg font-medium">Volunteer Hours</div>
          </div>
          
          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#333333]/30 p-6 rounded-lg">
            <div className="text-4xl font-bold text-military mb-2">95%</div>
            <div className="text-lg font-medium">Resolution Rate</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
