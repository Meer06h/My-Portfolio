
import { useRef, useState } from "react";

import {
  motion as Motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import "../styles/intro.css";

const facts = [
  {
    number: "01",
    label: "BACKGROUND",
    value: "Computer Science student",
  },
  {
    number: "02",
    label: "CURRENT FOCUS",
    value: "Software Engineering & AI",
  },
  {
    number: "03",
    label: "CURRENT BUILD",
    value: "Kaamgar & AI experiments",
  },
];

export default function Intro() {
  const sectionRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Scroll progress controls the photographic development.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const development = useTransform(
    scrollYProgress,
    [0.16, 0.56],
    [0, 1],
    { clamp: true }
  );

  useMotionValueEvent(development, "change", (latest) => {
    setProgress(Math.round(latest * 100));
  });

  // Respect reduced-motion preferences.
  const amount = reduceMotion ? 100 : progress;

  const revealLine = Math.min(
    100,
    Math.max(0, amount * 1.3 - 15)
  );

  const revealStart = Math.max(0, revealLine - 16);

  const developing = amount < 100;

  const progressStyle = {
    "--dev-line": `${revealLine}%`,
    "--dev-start": `${revealStart}%`,
    "--dev": amount / 100,
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-bone py-24 text-ink md:py-32 lg:py-40"
    >
      <div className="mx-auto grid w-[90%] max-w-site grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-20">

        {/* LEFT: INTRODUCTION */}
        <Motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 30 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85 }}
          onViewportEnter={() => setRevealed(true)}
          className="flex flex-col items-start gap-8"
        >
          {/* Editorial label */}
          <div className="flex w-full items-center gap-5">
            <span className="mv-eyebrow whitespace-nowrap text-stone">
              FRAME 01 — ABOUT
            </span>

            <span className="h-px flex-1 bg-fog" />

            <span className="mv-eyebrow whitespace-nowrap text-stone">
              INTRODUCTION
            </span>
          </div>

          {/* Main statement */}
          <h2 className="max-w-[760px] font-display text-[clamp(2.2rem,4.2vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.065em]">
            I'm Meer. I build software, explore artificial
            intelligence, and turn complex ideas into{" "}

            <span
              className={`intro-highlight ${
                revealed ? "is-revealed" : ""
              }`}
            >
              useful digital experiences.
            </span>
          </h2>

          {/* Supporting story */}
          <div className="flex max-w-[650px] flex-col gap-5">
            <p className="text-base leading-8 text-[#625B53] sm:text-lg sm:leading-9">
              I'm a computer science student drawn to the
              intersection of software engineering and
              artificial intelligence. I enjoy taking a
              problem apart, understanding what matters,
              and building something useful from it.
            </p>

            <p className="text-sm leading-8 text-stone sm:text-base">
              From full-stack ideas to AI-powered
              experiments, I care about thoughtful
              interfaces, clear implementation, and
              technology that solves real problems.
            </p>
          </div>

          {/* Facts */}
          <ul className="grid w-full max-w-[680px] grid-cols-1 border-t border-fog sm:grid-cols-3">
            {facts.map((fact, index) => (
              <li
                key={fact.number}
                className={`flex flex-row gap-4 py-5 sm:flex-col sm:gap-3 ${
                  index > 0
                    ? "border-t border-fog sm:border-l sm:border-t-0 sm:pl-5"
                    : "sm:pr-5"
                }`}
              >
                <span className="font-mono text-xs text-stone">
                  {fact.number}
                </span>

                <div className="flex flex-1 flex-col gap-2">
                  <span className="font-mono text-[9px] tracking-[0.13em] text-stone">
                    {fact.label}
                  </span>

                  <span className="text-xs font-medium leading-6 tracking-wide text-ink">
                    {fact.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex w-full flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-4 bg-ink px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-bone transition-all duration-300 hover:bg-brass hover:text-ink"
            >
              Explore my work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-ink/25 px-6 py-4 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 hover:border-brass hover:bg-brass"
            >
              Let's connect
            </a>
          </div>
        </Motion.div>

        {/* RIGHT: DEVELOPING PHOTO */}
        <Motion.figure
          initial={
            reduceMotion ? false : { opacity: 0, y: 35 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 1,
            delay: 0.15,
          }}
          className="order-first mx-auto flex w-full max-w-[560px] flex-col gap-4 lg:order-none lg:justify-self-end"
        >
          <div className="intro-tray">

            {/* Safelight */}
            <div className="intro-lamp">
              <span
                className="intro-lamp-dot"
                style={{
                  backgroundColor: developing
                    ? "#FF3B2F"
                    : "#FFF1DA",
                  boxShadow: developing
                    ? "0 0 14px 4px rgba(255,59,47,0.65)"
                    : "0 0 14px 4px rgba(255,226,180,0.55)",
                }}
              />
              {developing ? "SAFELIGHT" : "STUDIO LIGHT"}
            </div>

            {/* Developing bath */}
            <div className="intro-bath">
              <span className="intro-sheen" />
            </div>

            {/* White photographic print */}
            <div className="intro-print">
              <div
                className="intro-photo"
                style={progressStyle}
              >

                {/* Negative */}
                <img
                  src="/images/intro-placeholder.svg"
                  alt=""
                  aria-hidden="true"
                  className="intro-negative"
                  style={{
                    opacity: 1 - (amount / 100) * 0.9,
                  }}
                  draggable="false"
                />

                {/* Developed positive */}
                <img
                  src="/images/intro-placeholder.svg"
                  alt="Illustrative software workspace placeholder"
                  className="intro-positive"
                  style={{
                    clipPath: `inset(0 0 ${
                      100 - revealLine
                    }% 0)`,
                    filter: `grayscale(${
                      1 - amount / 100
                    }) contrast(${
                      0.72 + (amount / 100) * 0.3
                    }) brightness(${
                      0.72 + (amount / 100) * 0.3
                    }) sepia(${
                      (1 - amount / 100) * 0.5
                    })`,
                  }}
                  draggable="false"
                />

                {/* Red safelight overlay */}
                <span
                  className="intro-safe"
                  style={{
                    opacity: (1 - amount / 100) * 0.62,
                  }}
                />

                {/* Developing light line */}
                <span
                  className="intro-wave"
                  style={{
                    top: `${revealLine}%`,
                    opacity: (1 - amount / 100) * 0.9,
                  }}
                />

                {/* Hover reflection */}
                <span className="intro-glint" />
              </div>
            </div>

            {/* Tray glow */}
            <span
              className="intro-glow"
              style={{
                opacity: (1 - amount / 100) * 0.85,
              }}
            />
          </div>

          {/* Print caption */}
          <figcaption className="intro-caption">
            <span>
              FRAME 01 · WORKSPACE STUDY
            </span>

            <span className="whitespace-nowrap">
              {developing ? "DEVELOPING" : "FIXED"}{" "}
              <strong>
                {amount}%
              </strong>
            </span>

            <span className="intro-progress-bar" />
          </figcaption>
        </Motion.figure>

      </div>
    </section>
  );
}
