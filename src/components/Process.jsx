
import { useEffect, useRef, useState } from "react";

import {
  motion as Motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

import "../styles/process.css";

const steps = [
  {
    number: "01",
    name: "Discover",
    when: "STAGE 01",
    what: "Understand the problem, intended users, goals and constraints before choosing a solution.",
  },
  {
    number: "02",
    name: "Plan",
    when: "STAGE 02",
    what: "Map user journeys, select the technology stack and outline the application architecture.",
  },
  {
    number: "03",
    name: "Build",
    when: "ITERATIONS",
    what: "Develop the interface, backend, APIs and integrations in manageable increments.",
  },
  {
    number: "04",
    name: "Test & Refine",
    when: "PRE-RELEASE",
    what: "Test important flows, fix edge cases, improve responsiveness and document the work.",
  },
];

const fields = [
  ["Project", "Portfolio / Digital products"],
  ["Approach", "Iterative development"],
  ["Focus", "Software engineering + AI"],
];

const pad = (number) => String(number).padStart(2, "0");

export default function Process() {
  const sectionRef = useRef(null);
  const sheetRef = useRef(null);
  const rowCenters = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const reduceMotion = useReducedMotion();

  // Read the actual centre of every row on initial layout and resize.
  useEffect(() => {
    const sheet = sheetRef.current;

    if (!sheet) return;

    const measure = () => {
      const rows = Array.from(
        sheet.querySelectorAll(".process-row")
      );

      rowCenters.current = rows.map(
        (row) => row.offsetTop + row.offsetHeight / 2
      );

      if (rowCenters.current.length) {
        sheet.style.setProperty(
          "--ly",
          `${rowCenters.current[0]}px`
        );
      }
    };

    measure();

    let observer;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(sheet);
    }

    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Scroll progress drives the spotlight and call-sheet status.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 25,
    mass: 0.4,
  });

  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      if (reduceMotion) return;

      const q = Math.max(0, Math.min(1, latest));
      const position = q * (steps.length - 1);

      const low = Math.floor(position);
      const high = Math.min(
        steps.length - 1,
        low + 1
      );

      const blend = position - low;

      const lowY = rowCenters.current[low];
      const highY = rowCenters.current[high];

      // Move the warm spotlight along the call sheet.
      if (
        sheetRef.current &&
        lowY !== undefined &&
        highY !== undefined
      ) {
        const y = lowY + (highY - lowY) * blend;

        sheetRef.current.style.setProperty(
          "--ly",
          `${y}px`
        );
      }

      sheetRef.current?.style.setProperty(
        "--q",
        q.toFixed(4)
      );

      const nextIndex = Math.round(position);

      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex
      );

      const percentage = Math.round(q * 100);

      setProgress((current) =>
        current === percentage ? current : percentage
      );
    }
  );

  // In reduced-motion mode, show the completed sheet without
  // requiring the visitor to scroll through an animation.
  const currentIndex = reduceMotion
    ? steps.length - 1
    : activeIndex;

  const currentStep = steps[currentIndex];
  const nextStep = steps[currentIndex + 1];

  const isComplete = reduceMotion || progress >= 99;

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`process-section ${
        reduceMotion ? "is-reduced" : ""
      }`}
    >
      <div className="mx-auto w-[90%] max-w-site py-24 md:py-32 lg:py-40">

        {/* Section heading */}
        <header className="process-header">
          <div>
            <p className="mv-eyebrow mb-6 text-[#B5A99A]">
              FRAME 04 — MY PROCESS
            </p>

            <Motion.h2
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 25 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{ duration: 0.85 }}
              className="max-w-[900px] font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.07em]"
            >
              One project,
              <br />
              <span className="text-brass">
                four stages
              </span>{" "}
              that matter.
            </Motion.h2>
          </div>
        </header>

        {/* Main composition */}
        <div className="process-grid">

          {/* LEFT: PAPER CALL SHEET */}
          <div className="process-desk">

            <div
              ref={sheetRef}
              className="process-sheet"
            >

              {/* Punch holes */}
              <div
                className="process-holes"
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              {/* Sheet heading */}
              <div className="process-sheet-head">

                <div>
                  <p className="process-sheet-title">
                    Project call sheet
                  </p>

                  <p className="process-sheet-subtitle">
                    From idea to implementation
                  </p>
                </div>

                <span className="process-sheet-number">
                  NO. 026
                </span>
              </div>

              {/* Sheet information */}
              <dl className="process-fields">
                {fields.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Column headings */}
              <div className="process-columns">
                <span />
                <span>Stage</span>
                <span>Timeline</span>
                <span>What happens</span>
              </div>

              {/* Timeline rows */}
              <ol className="process-rows">

                {steps.map((step, index) => {
                  const isActive = index === currentIndex;
                  const isDone = index <= currentIndex;

                  return (
                    <li
                      key={step.number}
                      className={`process-row ${
                        isActive ? "is-active" : ""
                      } ${isDone ? "is-done" : ""}`}
                    >
                      {/* Hand-drawn tick */}
                      <svg
                        className="process-tick"
                        viewBox="0 0 32 28"
                        aria-hidden="true"
                      >
                        <path
                          pathLength="1"
                          d="M3 15.5c2.6 1.7 5.2 4.6 7.6 8.6C14.4 14.8 20.6 7.6 29 3.2"
                        />
                      </svg>

                      <span className="process-row-number">
                        {pad(index + 1)}
                      </span>

                      <h3 className="process-row-name">
                        {step.name}
                      </h3>

                      {/* Split-flap timeline label */}
                      <span
                        className="process-when"
                        aria-label={step.when}
                      >
                        {Array.from(step.when).map(
                          (character, charIndex) =>
                            character === " " ? (
                              <i
                                key={charIndex}
                                className="process-space"
                                aria-hidden="true"
                              />
                            ) : (
                              <b
                                key={charIndex}
                                aria-hidden="true"
                                style={{
                                  animationDelay: `${
                                    charIndex * 35
                                  }ms`,
                                }}
                              >
                                {character}
                              </b>
                            )
                        )}
                      </span>

                      <p className="process-row-description">
                        {step.what}
                      </p>
                    </li>
                  );
                })}

              </ol>

              {/* Sheet footer */}
              <div className="process-sheet-footer">
                <p>
                  Good software gets better with every iteration.
                </p>

                <p className="process-signature">
                  Meer
                </p>
              </div>

              {/* Travelling warm spotlight */}
              <div
                className="process-lamp"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* RIGHT: LIVE STATUS PANEL */}
          <Motion.aside
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 25 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="process-status-panel"
            aria-label="Current development stage"
          >

            <p className="process-status-label">
              <span
                className={`process-record ${
                  isComplete ? "is-off" : ""
                }`}
              />

              {isComplete ? "COMPLETE" : "IN PROGRESS"}

              <span>
                {pad(currentIndex + 1)} / 04
              </span>
            </p>

            <div className="process-status-main">
              <p>STAGE {pad(currentIndex + 1)}</p>

              <h3>
                {currentStep.name}
                <span>.</span>
              </h3>

              <p>{currentStep.when}</p>
            </div>

            {/* Progress rail */}
            <div
              className="process-progress"
              aria-label={`${progress}% of the process section viewed`}
            >
              <div
                className="process-progress-fill"
                style={{
                  width: `${reduceMotion ? 100 : progress}%`,
                }}
              />

              {steps.map((step, index) => (
                <i
                  key={step.number}
                  className={
                    index <= currentIndex ? "is-active" : ""
                  }
                  style={{
                    left: `${(index / 3) * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Next step */}
            <div className="process-next">
              <span>
                {nextStep ? "UP NEXT" : "FINAL STAGE"}
              </span>

              <p>
                {nextStep
                  ? `${nextStep.name} · ${nextStep.when}`
                  : "Ready for the next iteration."}
              </p>
            </div>

            <div className="process-panel-footer">
              <span>PROJECT / MEER</span>
              <span>PROCESS 04</span>
            </div>
          </Motion.aside>

        </div>

        {/* Closing statement */}
        <div className="process-closing">
          <p>THINK CLEARLY · BUILD INTENTIONALLY</p>
          <span>One step at a time.</span>
        </div>
      </div>
    </section>
  );
}
