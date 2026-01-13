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
    const container = document.getElementById('scroll-container');

    // Initialize model position
    group.position.set(0, 0, 0);
    group.rotation.set(0, 0, 0);
    group.scale.set(1, 1, 1);
    group.visible = true;

    // Wait a bit for the scene to be ready, then refresh ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.inOut',
      },
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: '55% bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate the first model in the first part of scroll
    tl.to(group.rotation, {
      y: Math.PI * 2,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 0)
      .to(group.position, {
        y: 1.5,
        duration: 1.5,
        ease: 'power2.out',
      }, 0)
      .to(group.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 0.3)
      // Move slightly away as the second model comes in
      .to(group.position, {
        x: -3,
        z: -4,
        duration: 2,
        ease: 'power2.inOut',
      }, 1.5);

    return () => {
      clearTimeout(timer);
      tl.kill();
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.trigger === container || (trigger.vars && trigger.vars.trigger === '#scroll-container')) {
          trigger.kill();
        }
      });
    };
  }, [scene]);

  // Ensure updates happen in render loop
  useFrame(() => {
    if (groupRef.current) {
      // Force update if needed
      groupRef.current.updateMatrixWorld();
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/pongal.glb.glb');
