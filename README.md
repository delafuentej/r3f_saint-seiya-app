# Saint Seiya Knights — Shader Transitions Project

A **React Three Fiber** project inspired by the legendary anime **Saint Seiya (Knights of the Zodiac)**.

This project showcases **custom shader transitions** applied to 3D models of the characters, allowing smooth screen and model fade effects for cinematic scene changes.

---

## ✨ Features

- **Shader Transitions**

  - **Screen Transition Effect**  
    A full-screen transition where you can control:

    - Duration
    - Easing function
    - Transition color
    - Shader logic itself

  - **Model Transition Effect**  
    A fade-in/fade-out effect applied to the 3D models.
    - Dissolves the model into white when fading out
    - Restores original colors when fading in

- **Custom Shader Material**

  - Built with `@react-three/drei`’s `shaderMaterial`
  - Two uniforms:
    - `uColor`: the base color of the transition
    - `uProgression`: controls the progression from visible → invisible

- **3D Models**

  - Bronze and Gold Saints (plus Artemis) from Saint Seiya.
  - Models licensed under **Creative Commons Attribution**:
    - [RaulV2 - Sketchfab](http://creativecommons.org/licenses/by/4.0/)
  - "Grande Arena" Model under **Creative Commons Attribution**:
    - [Adriano.Fontoura.Fraga - Sketchfab](http://creativecommons.org/licenses/by/4.0/).

- **Styling & Animations**

  - **Tailwind CSS** for styling
  - **Framer Motion** & **Framer Motion 3D** for smooth animations
  - **Jotai** for shared state management
  - **Leva controls** to tweak colors live

- **Typography**

  - [Kanit](https://fonts.google.com/specimen/Kanit)
  - [Rubik Doodle Shadow](https://fonts.google.com/specimen/Rubik+Doodle+Shadow)

- 🛠️ **Starter Pack & Dependencies**
  - This project is built with:
    - react-three-fiber
    - @react-three/drei
    - THREE.js
    - three-custom-shader-material
    - vite-plugin-glsl
    - jotai

## 🚀 Getting Started

Follow these steps to set up the project locally:

1️⃣ Clone the repository

```
git clone https://github.com/delafuentej/r3f_saint-seiya-app.git

cd r3f_saint-seiya-app
```

2️⃣ Install dependencies

```
npm install
yarn install
```

3️⃣ Start the development server

```
npm run server
yarn dev
```

## 📌 Conclusion

We have learned how to create **custom transition effects** for both models and screens using shaders in React Three Fiber.

This opens up endless possibilities to design unique and creative transitions within your projects.

✨ Keep experimenting with different effects and shaders to craft the perfect visual experience for your users.  
Don’t rely on a single technique — mix **motion, shaders, and other effects** to create a truly engaging and memorable experience.
