import React, { useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

function CatModel() {
  const { scene, animations } = useGLTF('/Assets/cat/bicolor_cat.glb'); // Ensure the path is correct
  const { actions } = useAnimations(animations, scene);

  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (animations.length > 0 && !animationPlayed) {
      // Play the second animation (animations[1])
      const secondAnimation = animations[0].name;
      actions[secondAnimation]?.reset().play();

      setAnimationPlayed(true); // Ensure the animation plays only once
    }
  }, [animations, actions, animationPlayed]);

  const scaleValue=8;
  return <primitive object={scene} scale={scaleValue} position={[0, -2, 0]} />;
}

export default CatModel;
