
import { useRef, useState } from "react";

import {
  AnimatePresence,
  motion as Motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import { projects } from "../data/projects";
import "../styles/work.css";

function ProjectThumbnail({ project }) {
  return (
    <div className={`work-thumb-art work-thumb-art--${project.visual}`}>
      <span className="work-thumb-mark">{project.mark}</span>
      <span className="work-thumb-name">{project.name}</span>
      <span className="work-thumb-number">{project.number}</span>
    </div>
  );
}

function ProjectArtwork({ project }) {
  return (
    <div
      className={`project-art project-art--${project.visual}`}
      aria-label={`${project.name} visual preview`}
    >
      <div className="project-art-top">
        <span>MEER / PROJECT ARCHIVE</span>
        <span>{project.number} — 05</span>
      </div>

      {project.visual === "kaamgar" && (
        <div className="art-kaamgar">
          <aside>
            <b>K.</b>
            <span>Overview</span>
            <span>Workers</span>
            <span>History</span>
            <span>Services</span>
          </aside>

          <div className="kaamgar-content">
            <p>COMMUNITY NETWORK</p>
            <h3>Work, with a history.</h3>
            <div className="kaamgar-stats">
              <div><b>01</b><span>PROFILE</span></div>
              <div><b>02</b><span>VERIFIED WORK</span></div>
              <div><b>03</b><span>COMMUNITY</span></div>
            </div>
            <div className="kaamgar-lines">
              <i /><i /><i /><i />
            </div>
          </div>
        </div>
      )}

      {project.visual === "heritage" && (
        <div className="art-heritage">
          <span className="heritage-small">ARCHIVES / INDIA</span>
          <h3>Stories carved<br />in stone.</h3>
          <div className="heritage-arches">
            {[1, 2, 3, 4].map((item) => (
              <i key={item} />
            ))}
          </div>
          <span className="heritage-caption">
            ARCHITECTURE · MEMORY · PLACE
          </span>
        </div>
      )}

      {project.visual === "synapse" && (
        <div className="art-synapse">
          <div className="synapse-heading">
            <span>✳ SYNAPSE</span>
            <span>YOUR STUDY SPACE</span>
          </div>
          <div className="synapse-glow" />
          <div className="synapse-chat">
            <p>YOU · STUDENT</p>
            <div className="synapse-message">
              Help me understand this concept.
            </div>
            <p>SYNAPSE · AI STUDY PARTNER</p>
            <div className="synapse-answer">
              Let's break it down, one idea at a time.
              <div><i /><i /><i /></div>
            </div>
          </div>
        </div>
      )}

      {project.visual === "property" && (
        <div className="art-property">
          <span className="property-label">PROPERTY / 004</span>
          <h3>Spaces.<br />Records.<br />Possibilities.</h3>
          <div className="property-plan">
            <i /><i /><i /><i /><i /><i />
          </div>
          <span className="property-foot">REAL ESTATE MANAGEMENT SYSTEM</span>
        </div>
      )}

      {project.visual === "expense" && (
        <div className="art-expense">
          <div className="expense-head">
            <span>PERSONAL FINANCE</span>
            <span>MONTHLY OVERVIEW</span>
          </div>
          <h3>Make every<br />number count.</h3>
          <div className="expense-chart">
            {[42, 76, 54, 88, 62, 96, 69, 48].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="expense-foot">
            TRACK · ORGANIZE · UNDERSTAND
          </div>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const active = projects[activeIndex];

  // Desktop scroll selects the project being presented.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (
      typeof window === "undefined" ||
      window.innerWidth < 1100 ||
      reduceMotion
    ) {
      return;
    }

    const index = Math.min(
      projects.length - 1,
      Math.round(latest * (projects.length - 1))
    );

    setActiveIndex(index);
  });

  const selectProject = (index) => {
    setActiveIndex(index);

    // On desktop, clicking a frame also moves to its scroll position.
    if (window.innerWidth >= 1100 && sectionRef.current) {
      const section = sectionRef.current;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const available = section.offsetHeight - window.innerHeight;

      const target =
        top + (index / Math.max(1, projects.length - 1)) * available;

      window.scrollTo({
        top: target,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-section"
      style={{ "--project-count": projects.length }}
    >
      <div className="work-sticky">
        <div className="work-grid">

          {/* LEFT: CONTACT SHEET */}
          <div className="work-sheet">

            <div className="work-sheet-head">
              <span>CONTACT SHEET</span>
              <span>ROLL 01</span>
            </div>

            <div className="work-film">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`work-frame ${
                    activeIndex === index ? "is-active" : ""
                  }`}
                >
                  <div className="work-lane">
                    <span>{project.number}</span>
                    <div className="work-holes">
                      <i /><i /><i />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="work-thumb"
                    aria-pressed={activeIndex === index}
                    aria-label={`Select ${project.name}`}
                    onClick={() => selectProject(index)}
                  >
                    <ProjectThumbnail project={project} />
                  </button>

                  <div className="work-lane work-lane-right">
                    <div className="work-holes">
                      <i /><i /><i />
                    </div>
                    <span>MV</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="work-sheet-foot">
              <span>35 MM · COLOUR</span>
              <span>{projects.length} FRAMES</span>
            </div>
          </div>

          {/* RIGHT: SECTION HEADING */}
          <header className="work-heading">
            <div>
              <p className="mv-eyebrow text-[#F2923A]">
                FRAME 02 — SELECTED WORK
              </p>

              <h2>
                Work I'm <em>proud</em> of.
              </h2>
            </div>

            <p>
              A collection of things I've explored,
              designed and built.
            </p>
          </header>

          {/* RIGHT: SELECTED PROJECT */}
          <div className="work-main">

            <div className="work-showcase">
              <AnimatePresence mode="wait" initial={false}>
                <Motion.div
                  key={active.id}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 1.035, y: 12 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, scale: 0.985 }
                  }
                  transition={{ duration: 0.55 }}
                  className="work-feature"
                >
                  <ProjectArtwork project={active} />

                  <span className="work-feature-label">
                    EXPOSURE {active.number} / {String(projects.length).padStart(2, "0")}
                  </span>
                </Motion.div>
              </AnimatePresence>

              <div className="work-rail">
                <p>
                  <b>{active.number}</b>
                  <span> / {String(projects.length).padStart(2, "0")}</span>
                </p>

                <div className="work-rail-ticks">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      aria-label={`Go to project ${project.number}`}
                      aria-pressed={activeIndex === index}
                      onClick={() => selectProject(index)}
                      className={activeIndex === index ? "is-active" : ""}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="work-info">
              <div className="work-info-main">
                <p className="work-project-category">
                  {active.category} · {active.period}
                </p>

                <h3>{active.name}</h3>

                <p className="work-project-description">
                  {active.description}
                </p>

                <div className="work-stack">
                  {active.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="work-info-side">
                <span className="work-role-label">ROLE</span>
                <p>{active.role}</p>

                <span className="work-role-label">PROJECT FOCUS</span>
                <p>{active.outcome}</p>

                <a href="#contact">
                  Discuss this project <span>↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
