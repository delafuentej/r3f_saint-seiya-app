import { ContactShadows, Float, Gltf, SpotLight } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";
import { TransitionModel } from "./TransitionModel";
import {
  knightAtom,
  knights,
  isMobileAtom,
  screenAtom,
  GOD_TRANSITION_DURATION,
  TRANSITION_DURATION,
  transitionAtom,
} from "./UI";

const Experience = () => {
  const ref = useRef();
  const [knight, setKnight] = useAtom(knightAtom);
  const [screen] = useAtom(screenAtom);
  const { groundColor } = useControls({
    groundColor: "#2d2d2d",
  });
  const [isMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    setKnight(screen === "menu" ? 0 : -1);
  }, [screen]);

  const materialShadowsHide = useRef();
  const [fadeOutShadows, setFadeOutShadows] = useState(false);
  useEffect(() => {
    setFadeOutShadows(true);
    const timeout = setTimeout(() => {
      setFadeOutShadows(false);
    }, GOD_TRANSITION_DURATION * 1.42 * 1000);
    return () => clearTimeout(timeout);
  }, [knight]);

  useFrame(() => {
    materialShadowsHide.current.opacity = MathUtils.lerp(
      materialShadowsHide.current.opacity,
      fadeOutShadows ? 1 : 0,
      0.02
    );
  });
  const [transition] = useAtom(transitionAtom);

  const { color, distance, attenuation, angle, anglePower } = useControls({
    color: "#876ae5",
    distance: 6,
    attenuation: 2.2,
    angle: 1,
    anglePower: 1,
  });

  return (
    <>
      <group position-y={isMobile ? -0.66 : -1}>
        {/* HOME */}
        <group visible={screen === "home"}>
          <motion.group
            animate={!transition && screen === "home" ? "visible" : "hidden"}
            variants={{
              visible: {
                scale: isMobile ? 0.75 : 1,
                x: isMobile ? 0 : -1.5,
                rotateY: degToRad(-42),
                transition: {
                  delay: TRANSITION_DURATION - 0.3,
                  duration: 1.2,
                },
              },
              hidden: {
                x: 0,
                scale: isMobile ? 0.9 : 1.15,
                rotateY: degToRad(-90),
                transition: {
                  duration: 1,
                },
              },
            }}
            initial={{
              x: 0,
              rotateY: degToRad(-90),
              scale: isMobile ? 0.9 : 1.15,
            }}
          >
            <Gltf src="/models/grande-arena.glb" scale={0.05}>
              <SpotLight
                ref={ref}
                color={color}
                distance={distance}
                angle={angle}
                attenuation={attenuation}
                anglePower={anglePower}
              />
            </Gltf>
          </motion.group>
        </group>
        {/* MENU */}
        <group position-y={isMobile ? 0.42 : 0.75} visible={screen === "menu"}>
          <ambientLight intensity={1} />
          <directionalLight
            position={[0, 3, -3]}
            intensity={0.5}
            color={"green"}
          />
          <directionalLight
            position={[3, 3, 3]}
            intensity={0.5}
            color={"red"}
          />
          <directionalLight
            position={[-3, 3, 3]}
            intensity={0.5}
            color={"blue"}
          />
          <Float scale={isMobile ? 0.75 : 1}>
            {knights.map((knightItem, index) => (
              <TransitionModel
                key={index}
                model={knightItem.model}
                scale={knightItem.scale}
                visible={index === knight}
              />
            ))}
          </Float>
        </group>
        <ContactShadows opacity={0.42} scale={25} />

        <mesh rotation-x={degToRad(-90)} position-y={0.001}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial
            ref={materialShadowsHide}
            opacity={0}
            transparent
            color={groundColor}
            toneMapped={false}
          />
        </mesh>
        <mesh rotation-x={degToRad(-90)} position-y={-0.001}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial color={groundColor} toneMapped={false} />
        </mesh>
      </group>
    </>
  );
};

export default Experience;
