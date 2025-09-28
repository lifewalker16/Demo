// // src/components/Cockpit.jsx
// import React from "react";
// import { Canvas, useThree } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";

// function CockpitModel() {
//   // ✅ Correct path to your cockpit model
//   const { scene } = useGLTF("/models/cockpit/scene.gltf");
//   return <primitive object={scene} scale={0.5} />;
// }

// // Camera positioned like pilot's eye
// function CockpitCamera() {
//   const { camera } = useThree();

//   // Since cockpit origin is its center, adjust slightly forward + up
//   camera.position.set(0.002, -0.014, 0.1);  // tweak until window view feels right
//   camera.lookAt(0, -0.2,-2);         // looking forward through window

//   return null;
// }

// export default function Cockpit() {
//   return (
//     <Canvas camera={{ fov: 60, near: 0.1, far: 1000 }}>
//       {/* Lights */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} />

//       {/* Cockpit */}
//       <CockpitModel />

//       {/* First-person fixed camera */}
//       <CockpitCamera />
//     </Canvas>
//   );
// }

// // Preload the model for performance
// useGLTF.preload("/models/cockpit/scene.gltf");



// src/components/Cockpit.jsx
import React, { useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

function CockpitModel() {
  const { scene } = useGLTF("/models/cockpit/scene.gltf");
  return <primitive object={scene} scale={0.5} />;
}

function CockpitCamera() {
  const { camera } = useThree();

  // Spring animation (from → to)
  const { camPos, lookAt } = useSpring({
    from: {
      camPos: [0.02, -0.014, 0.16], // before
      lookAt: [0, -1, -5],
    },
    to: {
      camPos: [0.002, -0.014, 0.1], // after
      lookAt: [0, -0.2, -2],
    },
    config: { duration: 3000 },
  });

  // Update camera every frame
  useFrame(() => {
    if (camPos.get() && lookAt.get()) {
      const pos = camPos.get();
      const target = lookAt.get();

      camera.position.set(pos[0], pos[1], pos[2]);
      camera.lookAt(new THREE.Vector3(target[0], target[1], target[2]));
    }
  });

  return null;
}

export default function Cockpit() {
  return (
    <Canvas camera={{ fov: 60, near: 0.1, far: 1000 }}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Cockpit Model */}
      <CockpitModel />

      {/* Animated Camera */}
      <CockpitCamera />
    </Canvas>
  );
}

// Preload model for performance
useGLTF.preload("/models/cockpit/scene.gltf");
