import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function MyModel() {
  const { scene } = useGLTF('./cat.glb'); // Replace './cat.glb' with the correct path to your model

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={scene} />
    </Canvas>
  );
}

export default MyModel;