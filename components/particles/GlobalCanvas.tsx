"use client";

import { Canvas } from "@react-three/fiber";
import NeuralNetworkBackground from "./NeuralNetworkBackground";

/**
 * GlobalCanvas — mounted ONCE at the app level (layout.tsx), fixed behind the page.
 * All sections that previously had their own canvas now share this single WebGL context.
 * This reduces GPU load from 5 contexts → 1 context (80% reduction).
 */
export default function GlobalCanvas() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
            }}
            aria-hidden="true"
        >
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
                dpr={1}
            >
                <NeuralNetworkBackground />
            </Canvas>
        </div>
    );
}
