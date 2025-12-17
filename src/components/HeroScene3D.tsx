'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

/* =========================
   Detecta se é mobile
========================= */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};

/* =========================
   Network Effect
========================= */
const Network = () => {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const isMobile = useIsMobile();

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        )
      );
    }
    return pts;
  }, []);

  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    const maxDistance = 1.2;

    points.forEach((p1, i) => {
      points.forEach((p2, j) => {
        if (i !== j && p1.distanceTo(p2) < maxDistance) {
          positions.push(
            p1.x, p1.y, p1.z,
            p2.x, p2.y, p2.z
          );
        }
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }, [points]);

  useFrame((state) => {
    if (!group.current) return;

    if (isMobile) {
      // Mobile: rotação lenta automática
      group.current.rotation.y += 0.0015;
      group.current.rotation.x += 0.0008;
    } else {
      // Desktop: segue o cursor suavemente
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.x * 0.6,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.y * 0.4,
        0.05
      );
    }
  });

  return (
    <group ref={group}>
      {/* Points */}
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#8b8bff" />
        </mesh>
      ))}

      {/* Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color="#6f6fff"
          transparent
          opacity={0.35}
        />
      </lineSegments>
    </group>
  );
};

/* =========================
   Scene
========================= */
const HeroScene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <Network />
    </Canvas>
  );
};

export default HeroScene3D;
