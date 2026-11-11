
import { useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import Header from "./Header";

const scenes = [
  {
    name: "Bone",
    color: "#F1ECE4",
    ink: "#141210",
    ghost: "rgba(20,18,16,0.16)",
  },
  {
    name: "Tangerine",
    color: "#FF5B2E",
    ink: "#141210",
    ghost: "rgba(20,18,16,0.15)",
  },
  {
    name: "Night",
    color: "#171311",
    ink: "#F1ECE4",
    ghost: "rgba(241,236,228,0.16)",
  },
];

export default function Hero() {
  const [scene, setScene] = useState(0);
  const reduceMotion = useReducedMotion();

  const active = scenes[scene];

  const nextScene = () => {
    setScene((current) => (current + 1) % scenes.length);
  };

  // Pointer-following light
  const moveLight = (event) => {
    if (
      reduceMotion ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty("--light-x", `${x}px`);
    event.currentTarget.style.setProperty("--light-y", `${y}px`);
  };

  // Clicking the empty hero area changes the backdrop
  const changeOnBackground = (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest("a, button")
    ) {
      return;
    }

    nextScene();
  };

  return (
    <section
      id="home"
      onPointerMove={moveLight}
      onClick={changeOnBackground}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 transition-colors duration-700"
      style={{
        backgroundColor: active.color,
        color: active.ink,
      }}
    >
      {/* Interactive atmospheric lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background: reduceMotion
            ? "none"
            : "radial-gradient(650px circle at var(--light-x, 70%) var(--light-y, 35%), rgba(255,255,255,0.27), transparent 72%)",
        }}
      />

      {/* Subtle bottom shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(20,18,16,0.10), transparent 70%)",
        }}
      />

      <Header />

      <div className="mv-container relative z-10 flex flex-1 flex-col">

        {/* Top information */}
        <div className="flex items-start justify-between gap-4 pt-8">

          <p className="mv-eyebrow flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#66844e] opacity-40" />
              <span className="relative h-2 w-2 rounded-full bg-[#66844e]" />
            </span>
            AVAILABLE FOR WORK
          </p>

          <p className="mv-eyebrow text-right leading-6">
            SOFTWARE ENGINEER
            <br />
            & AI DEVELOPER
          </p>
        </div>

        {/* Main hero composition */}
        <div className="relative flex min-h-[650px] flex-1 items-center justify-center py-12 lg:min-h-0 lg:py-0">

          {/* Oversized name behind portrait */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2">

            <Motion.h1
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 30 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="whitespace-nowrap text-center font-display text-[clamp(7rem,15.5vw,15.5rem)] font-black leading-[0.8] tracking-[-0.09em]"
              style={{
                color: active.ghost,
              }}
              aria-hidden="true"
            >
              MEER
            </Motion.h1>
          </div>

          {/* Portrait placeholder */}
          <Motion.img
            src="/images/meer-portrait-placeholder.svg"
            alt="Portrait placeholder for Meer"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 35,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 h-[min(68vh,680px)] w-auto max-w-[90vw] object-contain object-bottom drop-shadow-[0_24px_45px_rgba(30,20,14,0.15)] sm:h-[min(76vh,740px)]"
          />

          {/* Left editorial introduction */}
          <Motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -25,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.35,
            }}
            className="absolute left-0 top-[21%] z-20 hidden w-[min(310px,27vw)] flex-col gap-5 lg:flex"
          >
            <p className="mv-eyebrow opacity-60">
              SOFTWARE ENGINEER / AI DEVELOPER
            </p>

            <h2 className="font-display text-[clamp(2rem,3vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.065em]">
              Turning ideas into
              <span className="text-brass"> meaningful </span>
              digital experiences.
            </h2>

            <p className="max-w-[290px] text-sm leading-7 opacity-70">
              I build software, explore artificial intelligence,
              and experiment with technology to solve real-world
              problems.
            </p>

            <div className="mt-2 flex flex-wrap gap-3">

              <a
                href="#work"
                className="bg-brass px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-ink transition-all duration-300 hover:-translate-y-1"
              >
                Explore my work ↗
              </a>

              <a
                href="#contact"
                className="border border-current/30 px-5 py-3 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 hover:bg-ink hover:text-bone"
              >
                Contact me
              </a>

            </div>
          </Motion.div>

          {/* Right-side information */}
          <Motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 25,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.4,
            }}
            className="absolute right-0 top-[23%] z-20 hidden text-right sm:block"
          >
            <p className="mv-eyebrow opacity-60">
              CURRENT FOCUS
            </p>

            <p className="mt-2 font-display text-xl tracking-tight">
              Software & AI
            </p>

            <p className="mt-7 font-display text-sm opacity-65">
              India · Available worldwide
            </p>
          </Motion.div>

          {/* Left bottom detail */}
          <div className="absolute bottom-[8%] left-0 hidden sm:block">
            <p className="mv-eyebrow opacity-60">
              MY APPROACH
            </p>

            <p className="mt-2 font-display text-lg">
              Think. Build. Improve.
            </p>
          </div>

        </div>

        {/* Bottom information and backdrop controls */}
        <div className="grid grid-cols-1 items-center gap-5 border-t border-current/20 py-6 sm:grid-cols-[1fr_auto_1fr]">

          <p className="mv-eyebrow text-[9px] leading-5 opacity-70">
            MOVE THE LIGHT
            <span className="mx-2 opacity-40">/</span>
            CLICK FOR A NEW BACKDROP
          </p>

          {/* Background palette */}
          <div
            className="flex items-center justify-center gap-3"
            role="group"
            aria-label="Choose background"
          >
            <span className="mv-eyebrow mr-1 text-[9px]">
              BACKDROP
            </span>

            {scenes.map((item, index) => (
              <button
                key={item.name}
                type="button"
                title={item.name}
                aria-label={`Change backdrop to ${item.name}`}
                aria-pressed={scene === index}
                onClick={() => setScene(index)}
                className={`h-6 w-6 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                  scene === index
                    ? "scale-110 border-current"
                    : "border-current/20"
                }`}
                style={{
                  backgroundColor: item.color,
                }}
              />
            ))}
          </div>

          <span className="mv-eyebrow text-right text-[9px] opacity-60">
            PORTFOLIO — 2026
          </span>

        </div>
      </div>
    </section>
  );
}
