import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import PongalModel from './PongalModel';

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
    <div className="fixed inset-0 w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
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
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <Suspense fallback={<Loader />}>
          <PongalModel />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="sunset" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
