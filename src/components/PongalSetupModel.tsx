import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
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
    group.position.set(4, 0, -4);
    group.rotation.set(0, -Math.PI / 4, 0);
    group.visible = true;

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.inOut',
      },
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '45% top',
        end: '95% bottom',
        scrub: 1,
      },
    });

    // Bring in the setup model as the user scrolls down
    tl.to(group.position, {
      x: 0,
      z: 0,
      y: 0.5,
      duration: 2,
      ease: 'power2.inOut',
    }, 0)
      .to(group.rotation, {
        y: 0,
        duration: 2,
        ease: 'power2.inOut',
      }, 0)
      .fromTo(group.scale, {
        x: 0.7,
        y: 0.7,
        z: 0.7,
      }, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2,
        ease: 'power2.inOut',
      }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/psetup.glb');

