"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 150;
const MAX_DISTANCE = 4.5;

export default function NeuralNetworkBackground() {
    const groupRef = useRef<THREE.Group>(null);
    const lineRef = useRef<THREE.LineSegments>(null);
    const pointsRef = useRef<THREE.Points>(null);

    // Initial node positions and velocities
    const { positions, velocities, colors } = useMemo(() => {
        const pos = new Float32Array(NODE_COUNT * 3);
        const vel = new Float32Array(NODE_COUNT * 3);
        const col = new Float32Array(NODE_COUNT * 3);

        for (let i = 0; i < NODE_COUNT; i++) {
            // Spread nodes across a wide volume
            pos[i * 3] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Random velocities
            vel[i * 3] = (Math.random() - 0.5) * 0.05;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

            // Color gradient (cyan to purple)
            const mix = Math.random();
            col[i * 3] = mix * 0.5; // R
            col[i * 3 + 1] = 1 - mix * 0.5; // G
            col[i * 3 + 2] = 1.0; // B
        }
        return { positions: pos, velocities: vel, colors: col };
    }, []);

    // Line segments for connections
    // Each line segment needs 2 points. Worst case scenario: every point connected to every other.
    // We'll pre-allocate a large buffer. NODE_COUNT * 10 connections should be plenty.
    const maxLines = NODE_COUNT * 12;
    const linePositions = useMemo(() => new Float32Array(maxLines * 2 * 3), []);
    const lineColors = useMemo(() => new Float32Array(maxLines * 2 * 3), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (!pointsRef.current || !lineRef.current) return;

        const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const linePosAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const lineColAttr = lineRef.current.geometry.attributes.color as THREE.BufferAttribute;

        const nodes = posAttr.array as Float32Array;
        const lineSegments = linePosAttr.array as Float32Array;
        const lineSegColors = lineColAttr.array as Float32Array;

        let lineIdx = 0;

        // 1. Update node positions with spatial noise variation
        for (let i = 0; i < NODE_COUNT; i++) {
            // Dynamic velocity adjustment based on space-time
            const noise = Math.sin(nodes[i * 3] * 0.1 + t * 0.5) * 0.01;

            nodes[i * 3] += velocities[i * 3] + noise;
            nodes[i * 3 + 1] += velocities[i * 3 + 1];
            nodes[i * 3 + 2] += velocities[i * 3 + 2];

            // Bounce back limits
            if (Math.abs(nodes[i * 3]) > 25) velocities[i * 3] *= -1;
            if (Math.abs(nodes[i * 3 + 1]) > 20) velocities[i * 3 + 1] *= -1;
            if (Math.abs(nodes[i * 3 + 2]) > 15) velocities[i * 3 + 2] *= -1;
        }

        // 2. Find connections and update line segments
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                if (lineIdx >= maxLines) break;

                const dx = nodes[i * 3] - nodes[j * 3];
                const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
                const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
                    const dist = Math.sqrt(distSq);
                    const opacity = 1 - dist / MAX_DISTANCE;

                    // Start point
                    lineSegments[lineIdx * 6] = nodes[i * 3];
                    lineSegments[lineIdx * 6 + 1] = nodes[i * 3 + 1];
                    lineSegments[lineIdx * 6 + 2] = nodes[i * 3 + 2];

                    // End point
                    lineSegments[lineIdx * 6 + 3] = nodes[j * 3];
                    lineSegments[lineIdx * 6 + 4] = nodes[j * 3 + 1];
                    lineSegments[lineIdx * 6 + 5] = nodes[j * 3 + 2];

                    // Fade colors by distance
                    const r = (colors[i * 3] + colors[j * 3]) / 2;
                    const g = (colors[i * 3 + 1] + colors[j * 3 + 1]) / 2;
                    const b = (colors[i * 3 + 2] + colors[j * 3 + 2]) / 2;

                    lineSegColors[lineIdx * 6] = r * opacity;
                    lineSegColors[lineIdx * 6 + 1] = g * opacity;
                    lineSegColors[lineIdx * 6 + 2] = b * opacity;
                    lineSegColors[lineIdx * 6 + 3] = r * opacity;
                    lineSegColors[lineIdx * 6 + 4] = g * opacity;
                    lineSegColors[lineIdx * 6 + 5] = b * opacity;

                    lineIdx++;
                }
            }
        }

        // Reset remaining segments to zero so they don't draw
        for (let k = lineIdx; k < maxLines; k++) {
            lineSegments[k * 6] = 0;
            lineSegments[k * 6 + 1] = 0;
            lineSegments[k * 6 + 2] = 0;
            lineSegments[k * 6 + 3] = 0;
            lineSegments[k * 6 + 4] = 0;
            lineSegments[k * 6 + 5] = 0;
        }

        posAttr.needsUpdate = true;
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
    });

    return (
        <group ref={groupRef}>
            {/* The Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.12}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>

            {/* The Connections */}
            <lineSegments ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[lineColors, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
            </lineSegments>
        </group>
    );
}
