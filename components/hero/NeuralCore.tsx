"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function NeuralCore() {
    const coreRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (coreRef.current) {
            coreRef.current.rotation.x = t * 0.3;
            coreRef.current.rotation.y = t * 0.5;
            coreRef.current.position.y = Math.sin(t * 0.8) * 0.3;
        }
        if (outerRef.current) {
            outerRef.current.rotation.x = -t * 0.15;
            outerRef.current.rotation.y = -t * 0.2;
        }
    });

    return (
        <group>
            {/* Core icosahedron */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[1.3, 2]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={1.5}
                    wireframe
                />
            </mesh>

            {/* Outer orbiting cage */}
            <mesh ref={outerRef}>
                <icosahedronGeometry args={[2.0, 1]} />
                <meshStandardMaterial
                    color="#9333ea"
                    emissive="#9333ea"
                    emissiveIntensity={0.8}
                    wireframe
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Small glowing center sphere */}
            <mesh>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={3}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </group>
    );
}
