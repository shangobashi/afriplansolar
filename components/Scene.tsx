import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { DitherMaterial } from './DitherMaterial';

const FloatingOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.z += 0.001;
    }
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      // Subtle pulse of light source
      materialRef.current.uLightPos = new THREE.Vector3(
         Math.sin(state.clock.elapsedTime * 0.5) * 10,
         10,
         Math.cos(state.clock.elapsedTime * 0.5) * 10
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2.5, 40]} /> 
      {/* 
        args: radius, detail. 
        High detail (40) is needed for smooth noise displacement 
      */}
      <DitherMaterial 
        ref={materialRef} 
        uScale={2.0} // Control dither pixel size
        uColorDark={new THREE.Color('#0a0a0a')}
        uColorLight={new THREE.Color('#e0e0e0')}
      />
    </mesh>
  );
};

const Debris = ({ count = 50 }) => {
   const mesh = useRef<THREE.InstancedMesh>(null);
   
   const particles = useMemo(() => {
     const temp = [];
     for(let i=0; i<count; i++) {
        const t = Math.random() * 100;
        const factor = 20 + Math.random() * 100;
        const speed = 0.01 + Math.random() / 200;
        const xFactor = -50 + Math.random() * 100;
        const yFactor = -50 + Math.random() * 100;
        const zFactor = -50 + Math.random() * 100;
        temp.push({t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0});
     }
     return temp;
   }, [count]);

   const dummy = useMemo(() => new THREE.Object3D(), []);

   useFrame((state) => {
     if(!mesh.current) return;
     particles.forEach((particle, i) => {
       const { t, factor, speed, xFactor, yFactor, zFactor } = particle;
       // Orbit movement
       const time = state.clock.getElapsedTime();
       
       dummy.position.set(
         (particle.xFactor + Math.cos((time * speed) + t) * factor) / 3,
         (particle.yFactor + Math.sin((time * speed) + t) * factor) / 3,
         (particle.zFactor + Math.cos((time * speed * 0.5) + t) * factor) / 3
       );
       
       dummy.scale.setScalar(0.1 + Math.random() * 0.05); // Tiny dithered bits
       dummy.rotation.set(time + t, time + t, time + t);
       dummy.updateMatrix();
       
       mesh.current!.setMatrixAt(i, dummy.matrix);
     });
     mesh.current.instanceMatrix.needsUpdate = true;
   });

   return (
     <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
       <octahedronGeometry args={[0.5, 0]} />
        <DitherMaterial 
        uScale={1.5}
        uColorDark={new THREE.Color('#000000')}
        uColorLight={new THREE.Color('#888888')}
      />
     </instancedMesh>
   );
};

const BackgroundGrid = () => {
    return (
        <group rotation={[Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
             <gridHelper args={[60, 40, 0x333333, 0x111111]} />
        </group>
    )
}

const Scene = () => {
  return (
    <div className="fixed inset-0 z-0 bg-neutral-950">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]} // Limit DPR for performance with heavy shaders
        gl={{ antialias: false }} // Turn off AA to enhance the sharp dither look
      >
        <ambientLight intensity={0.2} />
        <FloatingOrb />
        <Debris />
        <BackgroundGrid />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3}/>
      </Canvas>
    </div>
  );
};

export default Scene;
