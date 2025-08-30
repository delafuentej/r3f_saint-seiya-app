import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
import { MathUtils, degToRad } from "three/src/math/MathUtils.js";
import { motion } from "framer-motion-3d";
import { KNIGHT_TRANSITION_DURATION } from "./UI";

//injecting shader code
const fadeFragment = /* glsl */ `
  diffuseColor.a = diffuseColor.a * uProgression;
  float yProgression = smoothstep(-5.0, 5.0, vPosition.y);
  yProgression = smoothstep(0.20, yProgression, uProgression);
  diffuseColor.a = diffuseColor.a * yProgression;
  float noiseFactor = noise(gl_FragCoord.xy * 0.042);
  noiseFactor = step(1.0 - yProgression, noiseFactor);
  diffuseColor.a = diffuseColor.a * noiseFactor;
`;

const declarationsFragment = /* glsl */ `
  uniform float uProgression;
  float myRand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
      mix(myRand(ip),myRand(ip+vec2(1.0,0.0)),u.x),
      mix(myRand(ip+vec2(0.0,1.0)),myRand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
  }
`;

const varyingFragment = /* glsl */ `
  varying vec3 vPosition;
`;

const applyVaryingFragment = /* glsl */ `
  // use world position to apply the effect
  vPosition = gl_Position.xyz;
`;

const colorWashFragment = /* glsl */ `
  vec3 color = vec3(1.0, 1.0, 1.0);
  gl_FragColor.rgb = mix(color, gl_FragColor.rgb, yProgression);
`;

export function TransitionModel({ model, visible, ...props }) {
  const { scene, materials } = useGLTF(`/models/${model}.glb`);

  const transitionData = useRef({
    from: 0,
    to: 1,
    started: 0,
  });

  const [animatedVisible, setAnimatedVisible] = useState(visible);

  useEffect(() => {
    if (visible === animatedVisible) {
      return;
    }
    if (!visible) {
      transitionData.current.from = 1;
      transitionData.current.to = 0;
      transitionData.current.started = new Date();
    }
    const timeout = setTimeout(() => {
      if (visible) {
        transitionData.current.from = 0;
        transitionData.current.to = 1;
        transitionData.current.started = new Date();
      }
      setAnimatedVisible(visible);
    }, KNIGHT_TRANSITION_DURATION * 1000);
    return () => clearTimeout(timeout);
  }, [visible]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.transparent = true;
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uProgression = { value: 0 };
        material.userData.shader = shader;
        // console.log(shader);
        shader.fragmentShader = shader.fragmentShader.replace(
          `void main() {`,
          `${declarationsFragment}
        void main() {`
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <alphamap_fragment>`,
          `#include <alphamap_fragment>
          ${fadeFragment}`
        );
        shader.vertexShader = shader.vertexShader.replace(
          `void main() {`,
          `${varyingFragment}
                  void main() {`
        );
        shader.vertexShader = shader.vertexShader.replace(
          `#include <fog_vertex>`,
          `#include <fog_vertex>
                  ${applyVaryingFragment}`
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          `void main() {`,
          `${varyingFragment}
          void main() {`
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <tonemapping_fragment>`,
          `${colorWashFragment}
                #include <tonemapping_fragment>`
        );
      };
    });
  }, [materials]);

  useFrame(() => {
    Object.values(materials).forEach((material) => {
      if (material.userData.shader) {
        //  material.color.setHex(0x4285f4).convertSRGBToLinear();
        material.userData.shader.uniforms.uProgression.value = MathUtils.lerp(
          transitionData.current.from,
          transitionData.current.to,
          (new Date() - transitionData.current.started) /
            (KNIGHT_TRANSITION_DURATION * 1000)
        );
      }
    });
  });

  return (
    <group {...props} dispose={null} visible={animatedVisible}>
      <motion.group
        animate={visible ? "fadeIn" : "fadeOut"}
        variants={{
          fadeIn: {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            y: 0,
            transition: {
              delay: KNIGHT_TRANSITION_DURATION * 2,
            },
          },
          fadeOut: {
            rotateX: degToRad(20),
            rotateY: degToRad(20),
            y: 0.1,
            scale: 0.8,
          },
        }}
      >
        <primitive object={scene} position-y={-1} />
      </motion.group>
    </group>
  );
}
