"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;

/* ── Tiny Perlin noise (no-dep) ── */
function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a: number, b: number, t: number) { return a + t * (b - a); }
function grad(hash: number, x: number, y: number, z: number) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}
const _p = Array.from({ length: 256 }, (_, i) => i);
for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_p[i], _p[j]] = [_p[j], _p[i]];
}
const perm = new Uint8Array([..._p, ..._p]);

function noise(x: number, y: number, z: number): number {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fade(x), v = fade(y), w = fade(z);
    const a = perm[X] + Y, aa = perm[a] + Z, ab = perm[a + 1] + Z;
    const b = perm[X + 1] + Y, ba = perm[b] + Z, bb = perm[b + 1] + Z;
    return lerp(
        lerp(lerp(grad(perm[aa], x, y, z), grad(perm[ba], x - 1, y, z), u),
            lerp(grad(perm[ab], x, y - 1, z), grad(perm[bb], x - 1, y - 1, z), u), v),
        lerp(lerp(grad(perm[aa + 1], x, y, z - 1), grad(perm[ba + 1], x - 1, y, z - 1), u),
            lerp(grad(perm[ab + 1], x, y - 1, z - 1), grad(perm[bb + 1], x - 1, y - 1, z - 1), u), v), w
    );
}

export default function ParticleBackground() {
    const geoRef = useRef<THREE.BufferGeometry>(null);

    const { positions, origins, colors, speeds, phases } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const origins = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const speeds = new Float32Array(PARTICLE_COUNT);
        const phases = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 24;
            const z = (Math.random() - 0.5) * 20;
            origins[i * 3] = x; origins[i * 3 + 1] = y; origins[i * 3 + 2] = z;
            positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;

            // Spatial color: cyan (left) → purple (mid) → blue (right)
            const t = (x + 20) / 40;
            const s = (y + 12) / 24;
            colors[i * 3] = 0.0 + t * 0.66;
            colors[i * 3 + 1] = 1.0 - t * 0.67 - s * 0.2;
            colors[i * 3 + 2] = 1.0 - s * 0.15;

            speeds[i] = 0.3 + Math.random() * 0.7;
            phases[i] = Math.random() * Math.PI * 2;
        }
        return { positions, origins, colors, speeds, phases };
    }, []);

    useFrame(({ clock }) => {
        if (!geoRef.current) return;
        const buf = geoRef.current.attributes.position as THREE.BufferAttribute;
        const arr = buf.array as Float32Array;
        const t = clock.getElapsedTime();

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ox = origins[i * 3], oy = origins[i * 3 + 1], oz = origins[i * 3 + 2];
            const sp = speeds[i], ph = phases[i];

            const nx = noise(ox * 0.08 + t * 0.12 * sp, oy * 0.08, oz * 0.05 + ph);
            const ny = noise(ox * 0.06, oy * 0.09 + t * 0.10 * sp + ph, oz * 0.05);
            const nz = noise(oz * 0.07 + ph, ox * 0.05, t * 0.08 * sp);

            arr[i * 3] = ox + nx * 3.5;
            arr[i * 3 + 1] = oy + ny * 2.8;
            arr[i * 3 + 2] = oz + nz * 2.2;
        }
        buf.needsUpdate = true;
    });

    return (
        <points>
            <bufferGeometry ref={geoRef}>
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
                size={0.07}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}
