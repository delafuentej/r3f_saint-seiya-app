import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { useAtom } from "jotai";
import { Leva, useControls } from "leva";
import { Suspense, useEffect } from "react";
import { UI, transitionAtom } from "./components/UI";
import Experience from "./components/Experience";
import ScreenTransition from "./components/ScreenTransition";

function App() {
  const [transition, setTransition] = useAtom(transitionAtom);
  const { progress } = useProgress();

  const { backgroundColor } = useControls({
    backgroundColor: "#1d1d1d",
  });

  useEffect(() => {
    if (progress === 100) {
      setTransition(false);
    }
  }, [progress]);
  return (
    <>
      <Leva />
      <UI />
      <Canvas camera={{ position: [0, 1.8, 5], fov: 42 }}>
        <color attach="background" args={[backgroundColor]} />
        <fog attach="fog" args={[backgroundColor, 5, 12]} />
        <ScreenTransition transition={transition} color="#1d1d1d" />
        <Suspense>
          <Experience />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
