import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import PongalModel from './PongalModel';
import PongalSetupModel from './PongalSetupModel';

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b35" wireframe />
    </mesh>
  );
}

export default function PongalScene() {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* soft radial glow behind the models for a more cinematic Apple-like feel */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(248,250,252,0.12)_0,_transparent_60%)]" />

      <Canvas shadows dpr={[0.75, 1]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

        {/* subtle atmospheric fog for more depth and realism */}
        <fog attach="fog" args={['#020617', 6, 18]} />

        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <Suspense fallback={<Loader />}>
          {/* First model shown in the first part of the scroll */}
          <PongalModel />

          {/* Second setup model that moves in as user scrolls further */}
          <PongalSetupModel />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.65}
            scale={10}
            blur={2}
            far={5}
          />
          <Environment preset="sunset" background blur={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
