import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
export const screenAtom = atom("home");
export const knightAtom = atom(-1);
export const isMobileAtom = atom(false);
export const transitionAtom = atom(true);

export const TRANSITION_DELAY = 0.8;
export const TRANSITION_DURATION = 3.2;

export const GOD_TRANSITION_DURATION = 2.5;

export const knights = [
  {
    name: "Pegasus Seiya",
    power:
      "Pegasus Meteor Fist- – unleashes hundreds of punches at light speed",
    description:
      "The main protagonist, brave and stubborn, always fighting with hope and determination to protect Athena.",
    model: "pegasus-seiya", //choco_bunny
    scale: 1,
  },
  {
    name: "Cisne-Hyoga",
    power:
      "Diamond Dust / Aurora Thunder Attack – ice techniques that freeze enemies.",
    description:
      "Calm and sometimes cold, he fights with elegance and carries deep feelings for his late mother.",
    model: "cisne-hyoga",

    scale: 1,
  },
  {
    name: "Dragon Shiryu",
    power:
      "Rising Dragon Fist (Rozan Shō Ryū Ha) – a powerful upward punch like a dragon’s ascent.",
    description:
      "Noble and loyal, often sacrifices himself for his friends. His shield is considered the most durable among the Bronze Saints.",
    model: "dragon-shiryu",
    scale: 0.92,
  },
  {
    name: "Andromeda-Shun",
    power:
      "Andromeda Chains – versatile chains for defense and offense, forming barriers and traps.",
    description:
      "Gentle and compassionate, dislikes violence but is incredibly powerful when forced to fight. He shares a strong bond with his brother Ikki.",
    model: "andromeda-shun",
    scale: 0.92,
  },
  {
    name: "Phoenix-Ikki",
    power:
      "Phoenix Illusion Demon Fist (Hōō Genma Ken) – a mental attack trapping enemies in illusions. His Cloth and body resurrect from ashes, like the Phoenix.",
    description:
      "Shun’s older brother, a lone wolf with a fiery personality. Fierce, independent, and extremely strong, often appearing at critical moments.",
    model: "phoenix-ikki",
    scale: 0.92,
  },

  {
    name: "Scorpio-Milo",
    power:
      "Scarlet Needle – a series of precise stings that paralyze and inflict unbearable pain, ending with Antares, the finishing blow.",
    description:
      "Proud and straightforward, Milo is fiercely loyal to Athena. Though ruthless in battle, he respects honorable opponents and shows compassion when he recognizes true courage.",
    model: "scorpio-milo",
    scale: 0.92,
  },
  {
    name: "Libra-Dohko",
    power:
      "Rozan Shō Ryū Ha / Libra weapons – master of all Libra armaments and martial techniques.",
    description:
      "Ancient and wise, Dohko is Shiryu’s master. He balances humor with seriousness and has survived centuries of battle experience.",
    model: "libra-dohko",
    scale: 0.92,
  },
  {
    name: "Capricorn-Shura",
    power:
      "Excalibur – a sword technique that can slice through anything with precision.",
    description:
      "AHonorable and disciplined, Shura is a master swordsman. He embodies dedication, strength, and absolute loyalty to Athena.",
    model: "capricorn-shura",
    scale: 0.92,
  },
  {
    name: "Artemis",
    power:
      "Mastery of archery, control over wild animals, and lunar-based abilities.",
    description:
      "Independent and strong-willed, Artemis protects nature and young women. Calm yet fierce in battle, she embodies purity, agility, and a deep connection with the wilderness.",
    model: "artemis",
    scale: 0.92,
  },
];

knights.forEach((knight) => {
  useGLTF.preload(`/models/${knight.model}.glb`);
});

export const UI = () => {
  const [screen, setScreen] = useAtom(screenAtom);
  const [knight, setKnight] = useAtom(knightAtom);
  const [_, setIsMobile] = useAtom(isMobileAtom);
  const [transition, setTransition] = useAtom(transitionAtom);
  const timeout = useRef();

  const transitionToScreen = (newScreen) => {
    setTransition(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setScreen(newScreen);
      setTransition(false);
    }, TRANSITION_DURATION * 1000 + TRANSITION_DELAY * 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setKnight(0);
  }, [screen]);
  return (
    <main className="select-none text-white text-xl pointer-events-none">
      <motion.h1
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
     text-white text-center font-display text-7xl md:text-8xl"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              duration: TRANSITION_DURATION / 2,
              delay: TRANSITION_DURATION - 0.3,
            },
          },
          hidden: {
            opacity: 0,
            transition: {
              duration: TRANSITION_DURATION / 2,
            },
          },
        }}
        initial={{
          opacity: 1,
        }}
        animate={transition ? "visible" : "hidden"}
      >
        <span className="mb-10">Knights </span>
        <span className="text-yellow-500">of the Zodiac</span>
      </motion.h1>
      {/* HOME */}
      <motion.section
        animate={!transition && screen === "home" ? "visible" : "hidden"}
        className={`z-10 fixed bottom-4 md:bottom-auto 
        md:top-1/2 md:-translate-y-1/2 md:left-1/2 
        text-left p-4
        ${screen === "home" ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <motion.h2
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              y: 50,
              transition: {
                delay: 0.6,
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            y: 50,
          }}
          className="text-6xl font-display text-white"
        >
          Welcome to Knights of the Zodiac
        </motion.h2>
        <motion.p
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              y: 50,
              transition: {
                delay: 0.3,
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            y: 50,
          }}
          className="text-white/80 mt-10"
        >
          Check out <span className="text-yellow-500">the characters</span>
        </motion.p>
        <motion.button
          onClick={() => transitionToScreen("menu")}
          className="text-sm bg-transparent hover:bg-white font-semibold
           text-yellow-500 hover:text-black border-2
            border-white  transition-colors duration-500 px-4 py-2 mt-4 rounded-lg uppercase"
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: TRANSITION_DURATION + 0.6,
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              y: 50,
              transition: {
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            y: 50,
          }}
        >
          Explore
        </motion.button>
      </motion.section>

      {/* MENU */}
      <motion.section
        animate={!transition && screen === "menu" ? "visible" : "hidden"}
        className={`${
          screen === "menu" ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {knights.map((item, idx) => (
          <motion.div
            key={idx}
            className="fixed top-[15%] w-full md:w-auto md:left-1/2 md:-translate-x-1/2 text-center  p-4 z-10"
            animate={knight === idx && screen === "menu" ? "visible" : "hidden"}
          >
            <motion.h3
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.5,
                  },
                },
                hidden: {
                  opacity: 0,
                  y: 50,
                  transition: {
                    duration: 1,
                    delay: 0.3,
                  },
                },
              }}
              initial={{
                opacity: 0,
                y: 50,
              }}
              className="text-5xl md:text-7xl font-semibold text-yellow-500"
            >
              {item.name}
            </motion.h3>
            <motion.p
              className="text-white/80"
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.3,
                    duration: 1,
                  },
                },
                hidden: {
                  opacity: 0,
                  y: 50,
                  transition: {
                    duration: 1.5,
                  },
                },
              }}
              initial={{
                opacity: 0,
                y: 50,
              }}
            >
              {item.power}
            </motion.p>
          </motion.div>
        ))}

        <div className="z-10 fixed bottom-4 left-0 w-full md:w-auto md:left-1/2 md:-translate-x-1/2 text-center  p-4">
          {/*   <motion.h2
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            className="text-6xl font-display"
          >
            La Carte
          </motion.h2>
          <motion.p
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            className="text-white/80"
          >
            item.description
          </motion.p> */}
          <motion.button
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.5,
                },
              },
              hidden: {
                opacity: 0,
                y: 50,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
            onClick={() => transitionToScreen("home")}
            className="bg-transparent hover:bg-white font-medium text-white hover:text-black border-2 border-white  transition-colors duration-500 px-4 py-2 mt-4 rounded-lg"
          >
            Back
          </motion.button>
        </div>
        <motion.button
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              x: -50,
              transition: {
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            x: -50,
          }}
          className="fixed left-4 md:left-1/4 top-1/2 -translate-y-1/2 z-10"
          onClick={() =>
            setKnight(
              (knight) => (knight - 1 + knights.length) % knights.length
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 stroke-white/70 hover:stroke-white transition-colors duration-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </motion.button>
        <motion.button
          className="fixed right-4 md:right-1/4 top-1/2 -translate-y-1/2 z-10"
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 1.5,
              },
            },
            hidden: {
              opacity: 0,
              x: 50,
              transition: {
                duration: 1.5,
              },
            },
          }}
          initial={{
            opacity: 0,
            x: 50,
          }}
          onClick={() => setKnight((knight) => (knight + 1) % knights.length)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 stroke-white/70 hover:stroke-white transition-colors duration-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </motion.button>
      </motion.section>
    </main>
  );
};
