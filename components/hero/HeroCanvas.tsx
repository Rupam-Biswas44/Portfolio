"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import NeuralCore from "./NeuralCore";
import ParticleBackground from "../particles/ParticleBackground";

export default function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{ antialias: true, alpha: false }}
            >
                <color attach="background" args={["#000000"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#9333ea" />
                <pointLight position={[0, -5, 5]} intensity={1} color="#ffffff" />

                <NeuralCore />
                <ParticleBackground />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.4}
                />
            </Canvas>
        </div>
    );
}
