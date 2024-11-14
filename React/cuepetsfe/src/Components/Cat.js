import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Text} from '@react-three/drei';
import CatModel from '../Models/CatModel';
function Cat() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={
        <Text color="black" position={[0, 0, 0]}>Loading Model...</Text>
      }>
        <CatModel />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default Cat;
