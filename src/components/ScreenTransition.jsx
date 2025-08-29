import { extend, useFrame } from "@react-three/fiber";
import { Hud, OrthographicCamera, shaderMaterial } from "@react-three/drei";
import { Color } from "three";
import { useRef, useEffect } from "react";
import { MathUtils } from "three/src/math/MathUtils.js";
import { TRANSITION_DURATION } from "./UI";
import screenTransitionVertexShader from "../shaders/screenTransition/vertex.glsl";
import screenTransitionFragmentShader from "../shaders/screenTransition/fragment.glsl";

const ScreenTransitionMaterial = shaderMaterial(
  {
    uColor: new Color("pink"),
    uProgression: 0,
    uResolution: [0, 0],
  },
  screenTransitionVertexShader,
  screenTransitionFragmentShader
);

extend({ ScreenTransitionMaterial });

const ScreenTransition = ({ transition, color }) => {
  const transitionMaterial = useRef();
  const transitionData = useRef({
    from: 0,
    to: 0,
    started: 0,
  });

  useEffect(() => {
    transitionData.current.from =
      transition && transitionData.current.started ? 1 : 0;
    transitionData.current.to = transition ? 0 : 1;
    transitionData.current.started = new Date();
  }, [transition]);

  useFrame(() => {
    if (!transitionMaterial.current) {
      return;
    }
    transitionMaterial.current.uniforms.uProgression.value = MathUtils.lerp(
      transitionData.current.from,
      transitionData.current.to,
      (new Date() - transitionData.current.started) /
        (TRANSITION_DURATION * 1000)
    );
    transitionMaterial.current.uniforms.uResolution.value = [
      window.innerWidth,
      window.innerHeight,
    ];
  });

  return (
    // Hud component that will render its children on top of everything.
    <Hud>
      {/* We use an OrthographicCamera to easily cover the entire screen whatever 
      the distance between the camera and the plane is. */}
      <OrthographicCamera
        makeDefault
        top={1}
        right={1}
        bottom={-1}
        left={-1}
        near={0}
        far={1}
      />
      <mesh>
        <planeGeometry args={[2, 2]} />
        <screenTransitionMaterial
          ref={transitionMaterial}
          uColor={color}
          transparent
        />
      </mesh>
    </Hud>
  );
};

export default ScreenTransition;
