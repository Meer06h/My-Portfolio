
import { useEffect, useRef, useState } from "react";

import {
  motion as Motion,
  useReducedMotion,
} from "framer-motion";

import { services } from "../data/services";
import "../styles/services.css";

export default function Services() {
  const sectionRef = useRef(null);
  const pointerActive = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const active = services[activeIndex];

  // Select the service closest to the centre of the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section || reduceMotion) return;

    const rows = section.querySelectorAll(".service-row");

    const observer = new IntersectionObserver(
      (entries) => {
        if (pointerActive.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          const index = Number(
            visible[0].target.getAttribute("data-index")
          );

          if (Number.isInteger(index)) {
            setActiveIndex(index);
          }
        }
      },
      {
        root: null,
        rootMargin: "-38% 0px -38% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, [reduceMotion]);

  const selectService = (index) => {
    pointerActive.current = true;
    setActiveIndex(index);
  };

  const releasePointer = () => {
    pointerActive.current = false;
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-section relative bg-bone text-ink"
    >
      <div className="mx-auto w-[90%] max-w-site py-24 md:py-32 lg:py-40">

        {/* Section heading */}
        <header className="services-header mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">

          <div className="max-w-[760px]">
            <p className="mv-eyebrow mb-6 text-stone">
              FRAME 03 — WHAT I BUILD
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
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.07em]"
            >
              What I can <span className="text-brass">build.</span>
            </Motion.h2>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 border border-ink/25 px-5 py-4 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 hover:border-brass hover:bg-brass"
          >
            Let's collaborate
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </header>

        {/* Main layout */}
        <div className="services-grid grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)] lg:gap-20">

          {/* LEFT: Service list */}
          <ol className="services-list order-2 m-0 list-none border-t border-fog p-0 lg:order-1">

            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <Motion.li
                  key={service.id}
                  data-index={index}
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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                  }}
                  className={`service-row ${
                    isActive ? "is-active" : ""
                  }`}
                  style={{
  "--service-color": service.color,
}}
                  onMouseEnter={() => selectService(index)}
                  onMouseLeave={releasePointer}
                >

                  {/* Metadata */}
                  <div className="service-meta">
                    <span>{service.number}</span>

                    <span
                      className="service-color"
                      style={{
                        backgroundColor: service.color,
                      }}
                    />

                    <span>
                      {service.deliverables.length} SPECIALTIES
                    </span>
                  </div>

                  {/* Selectable service heading */}
                  <button
                    type="button"
                    className="service-heading"
                    aria-pressed={isActive}
                    onClick={() => selectService(index)}
                    onFocus={() => selectService(index)}
                    onBlur={releasePointer}
                  >
                    <h3>{service.title}</h3>

                    <span className="service-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </button>

                  {/* Description */}
                  <p className="service-description">
                    {service.description}
                  </p>

                  {/* Active service details */}
                  <div
                    className={`service-details ${
                      isActive ? "is-open" : ""
                    }`}
                    aria-hidden={!isActive}
                  >
                    <p>{service.details}</p>

                    <ul className="service-tags">
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                </Motion.li>
              );
            })}
          </ol>

          {/* RIGHT: Sticky studio photograph */}
          <div className="services-photo-wrap order-1 lg:order-2">

            <div className="services-photo">

              {/* Existing workspace placeholder */}
              <img
                src="/images/intro-placeholder.svg"
                alt="Illustrative workspace photograph placeholder"
                loading="lazy"
                draggable="false"
              />

              {/* Coloured lighting gels */}
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`service-gel ${
                    activeIndex === index ? "is-active" : ""
                  }`}
                  style={{
                    backgroundColor: service.color,
                    transform: `translateX(${
                      (index - activeIndex) * 105
                    }%)`,
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Studio lighting */}
              <div className="service-key-light" />

              {/* Film holder */}
              <div className="service-frame-corners">
                <i />
                <i />
                <i />
                <i />
              </div>

              {/* Active service label */}
              <div className="service-photo-label">
                <span>
                  GEL {active.number} · {active.hex}
                </span>

                <span>STUDIO / MEER</span>
              </div>

              {/* Bottom status */}
              <div className="service-photo-status">
                <span
                  style={{
                    backgroundColor: active.color,
                  }}
                />

                {active.title}
              </div>
            </div>

            {/* Caption */}
            <p className="service-photo-caption">
              PLATE 03 · WORKSPACE STUDY · COLOUR EXPERIMENT
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
