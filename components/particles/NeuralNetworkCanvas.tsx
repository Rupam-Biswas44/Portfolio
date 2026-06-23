"use client";

import { Canvas } from "@react-three/fiber";
import NeuralNetworkBackground from "./NeuralNetworkBackground";

export default function NeuralNetworkCanvas() {
    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <NeuralNetworkBackground />
            </Canvas>
        </div>
    );
}
