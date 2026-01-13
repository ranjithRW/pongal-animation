import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function PongalModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/pongal.glb.glb');

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;

    // Initialize model position
    gsap.set(group.position, { x: 0, y: 0, z: 0 });
    gsap.set(group.rotation, { x: 0, y: 0, z: 0 });
    gsap.set(group.scale, { x: 1, y: 1, z: 1 });
    group.visible = true;

    // Wait for scene to be ready, then create animations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Create scroll-triggered animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: '55% bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Rotation animation
        group.rotation.y = progress * Math.PI * 2;
        
        // Position animation
        if (progress < 0.6) {
          // First phase: move up and scale
          group.position.y = progress * 1.5;
          const scaleProgress = Math.min(progress / 0.6, 1);
          const scale = 1 + (scaleProgress * 0.3);
          group.scale.set(scale, scale, scale);
          group.position.x = 0;
          group.position.z = 0;
        } else {
          // Second phase: move away
          const moveProgress = (progress - 0.6) / 0.4;
          group.position.y = 1.5 - (moveProgress * 0.5);
          group.position.x = -moveProgress * 3;
          group.position.z = -moveProgress * 4;
          const scale = 1.3 - (moveProgress * 0.3);
          group.scale.set(scale, scale, scale);
        }
      },
    });

    return () => {
      clearTimeout(timer);
      scrollTrigger.kill();
    };
  }, [scene]);

  // Ensure updates happen in render loop
  useFrame(() => {
    if (groupRef.current) {
      // Update matrix to ensure changes are reflected
      groupRef.current.updateMatrixWorld(true);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/pongal.glb.glb');
