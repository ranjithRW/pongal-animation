import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function PongalSetupModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/psetup.glb');

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;

    // Start this model slightly to the right and behind
    gsap.set(group.position, { x: 4, y: 0, z: -4 });
    gsap.set(group.rotation, { x: 0, y: -Math.PI / 4, z: 0 });
    gsap.set(group.scale, { x: 0.7, y: 0.7, z: 0.7 });
    group.visible = true;

    // Wait for scene to be ready, then create animations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Create scroll-triggered animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: '#scroll-container',
      start: '45% top',
      end: '95% bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Smoothly bring in the setup model
        group.position.x = 4 - (progress * 4);
        group.position.z = -4 + (progress * 4);
        group.position.y = progress * 0.5;
        
        group.rotation.y = -Math.PI / 4 + (progress * Math.PI / 4);
        
        const scale = 0.7 + (progress * 0.3);
        group.scale.set(scale, scale, scale);
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
    <group ref={groupRef} position={[4, 0, -4]} rotation={[0, -Math.PI / 4, 0]} scale={0.7}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/psetup.glb');

