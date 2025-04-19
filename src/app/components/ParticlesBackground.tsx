// components/ParticlesBackground.tsx
'use client';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#6366f1", // More vibrant indigo
          },
          links: {
            color: "#818cf8", // Brighter indigo
            distance: 120,
            enable: true,
            opacity: 0.5,  // Increased opacity
            width: 1.5,    // Thicker lines
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,   // More natural movement
            speed: 2,      // Slightly faster
            straight: false,
            trail: {
              enable: true,
              length: 10,
              fillColor: "#6366f1",
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100,    // More particles
          },
          opacity: {
            value: 0.7,    // More opaque
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.3,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 5 }, // Larger particles
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 3,
          },
        },
        detectRetina: true,
      }}
    />
  );
}