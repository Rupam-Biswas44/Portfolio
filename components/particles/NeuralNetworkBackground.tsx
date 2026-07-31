"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60; // Reduced from 150
const MAX_DISTANCE = 3.5;

export default function NeuralNetworkBackground() {
    const groupRef = useRef<THREE.Group>(null);
    const lineRef = useRef<THREE.LineSegments>(null);
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, velocities, colors } = useMemo(() => {
        const pos = new Float32Array(NODE_COUNT * 3);
        const vel = new Float32Array(NODE_COUNT * 3);
        const col = new Float32Array(NODE_COUNT * 3);

        for (let i = 0; i < NODE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

            vel[i * 3] = (Math.random() - 0.5) * 0.04;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;

            const mix = Math.random();
            col[i * 3] = mix * 0.5;
            col[i * 3 + 1] = 1 - mix * 0.5;
            col[i * 3 + 2] = 1.0;
        }
        return { positions: pos, velocities: vel, colors: col };
    }, []);

    // Reduce max connections proportionally
    const maxLines = NODE_COUNT * 8;
    const linePositions = useMemo(() => new Float32Array(maxLines * 2 * 3), []);
    const lineColors = useMemo(() => new Float32Array(maxLines * 2 * 3), []);

    // Throttle to every 2nd frame
    const frameCount = useRef(0);

    useFrame((state) => {
        frameCount.current++;
        // Skip odd frames — runs at ~30fps visually but 0 JS cost on skipped frames
        if (frameCount.current % 2 !== 0) return;

        if (!pointsRef.current || !lineRef.current) return;

        const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const linePosAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const lineColAttr = lineRef.current.geometry.attributes.color as THREE.BufferAttribute;

        const nodes = posAttr.array as Float32Array;
        const lineSegs = linePosAttr.array as Float32Array;
        const lineSegColors = lineColAttr.array as Float32Array;

        let lineIdx = 0;

        for (let i = 0; i < NODE_COUNT; i++) {
            nodes[i * 3] += velocities[i * 3];
            nodes[i * 3 + 1] += velocities[i * 3 + 1];
            nodes[i * 3 + 2] += velocities[i * 3 + 2];

            if (Math.abs(nodes[i * 3]) > 25) velocities[i * 3] *= -1;
            if (Math.abs(nodes[i * 3 + 1]) > 20) velocities[i * 3 + 1] *= -1;
            if (Math.abs(nodes[i * 3 + 2]) > 15) velocities[i * 3 + 2] *= -1;
        }

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

                    lineSegs[lineIdx * 6] = nodes[i * 3];
                    lineSegs[lineIdx * 6 + 1] = nodes[i * 3 + 1];
                    lineSegs[lineIdx * 6 + 2] = nodes[i * 3 + 2];
                    lineSegs[lineIdx * 6 + 3] = nodes[j * 3];
                    lineSegs[lineIdx * 6 + 4] = nodes[j * 3 + 1];
                    lineSegs[lineIdx * 6 + 5] = nodes[j * 3 + 2];

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

        for (let k = lineIdx; k < maxLines; k++) {
            lineSegs[k * 6] = 0; lineSegs[k * 6 + 1] = 0; lineSegs[k * 6 + 2] = 0;
            lineSegs[k * 6 + 3] = 0; lineSegs[k * 6 + 4] = 0; lineSegs[k * 6 + 5] = 0;
        }

        posAttr.needsUpdate = true;
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.1} vertexColors transparent opacity={0.7} sizeAttenuation />
            </points>

            <lineSegments ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
            </lineSegments>
        </group>
    );
}
