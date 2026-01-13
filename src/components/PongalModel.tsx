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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    tl.to(group.rotation, {
      y: Math.PI * 4,
      duration: 3,
      ease: 'power2.inOut',
    }, 0)
      .to(group.position, {
        y: 2,
        duration: 1.5,
        ease: 'power2.out',
      }, 0)
      .to(group.position, {
        y: -2,
        duration: 1.5,
        ease: 'power2.in',
      }, 1.5)
      .to(group.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 1,
        ease: 'power2.inOut',
      }, 0.5)
      .to(group.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, 2);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/pongal.glb.glb');
