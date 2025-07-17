"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils"; 

type SpotlightCardWithRevealProps = {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const SpotlightCardWithReveal = ({
  children,
  radius = 350,
  color = "#60a5fa", // Tailwind blue-400 as default
  className,
  ...props
}: SpotlightCardWithRevealProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight p-8 md:p-10 rounded-xl relative border border-blue-200 bg-blue-50 overflow-hidden transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <Canvas className="w-full h-full">
            <DotMatrix />
          </Canvas>
        )}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const DotMatrix = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const shaderMaterial = useMemo(() => {
    const colors = [
      new THREE.Vector3(147 / 255, 197 / 255, 253 / 255), // blue-300
      new THREE.Vector3(96 / 255, 165 / 255, 250 / 255), // blue-400
    ];
    const opacities = [0.12, 0.15, 0.18, 0.22, 0.25, 0.28, 0.32, 0.36, 0.4, 0.45];

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_colors: { value: colors },
      u_opacities: { value: opacities },
    };

    const fragmentShader = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_colors[2];
      uniform float u_opacities[10];
      float PHI = 1.61803398874989484820459;
      float random(vec2 xy) {
        return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
      }
      void main() {
        vec2 st = gl_FragCoord.xy;
        vec2 grid = floor(st / 4.0);
        float r = random(grid + u_time * 0.1);
        float opacity = u_opacities[int(r * 10.0)];
        vec3 color = u_colors[int(r * 2.0)];
        gl_FragColor = vec4(color, opacity);
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms,
      fragmentShader,
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      transparent: true,
    });
  }, [size]);

  useFrame(({ clock }) => {
    shaderMaterial.uniforms.u_time.value = clock.getElapsedTime();
    shaderMaterial.uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size.width, size.height]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};
