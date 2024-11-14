import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Text} from '@react-three/drei';
import DogModel from '../Models/DogModel';
function Dog() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={
        <Text color="black" position={[0, 0, 0]}>Loading Model...</Text>
      }>
        <DogModel />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default Dog;
