
import { motion as Motion, useReducedMotion } from "framer-motion";
import "../styles/resume.css";

export default function Resume() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="resume" className="resume-section">
      <div className="mx-auto w-[90%] max-w-site py-24 md:py-32 lg:py-40">

        {/* Section heading */}
        <header className="resume-header">
          <div className="resume-overline">
            <span className="mv-eyebrow">
              CURRICULUM VITAE
            </span>

            <span className="resume-overline-line" />

            <span className="mv-eyebrow">
              PDF / 02 PAGES
            </span>
          </div>

          <Motion.h2
            initial={
              reduceMotion ? false : { opacity: 0, y: 25 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85 }}
            className="resume-heading"
          >
            The person behind
            <br />
            <span>the work.</span>
          </Motion.h2>

          <p className="resume-intro-copy">
            A closer look at my education, technical skills,
            selected projects and the experiences that have
            shaped my journey in software engineering and AI.
          </p>
        </header>

        {/* Resume composition */}
        <div className="resume-layout">

          {/* Visual resume preview */}
          <Motion.div
            initial={
              reduceMotion ? false : { opacity: 0, y: 35, rotate: -2 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: -1.2,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="resume-paper"
            role="img"
            aria-label="Visual preview of Meer Humayu's two-page resume"
          >
            <div className="resume-paper-top">
              <span>CURRICULUM VITAE</span>
              <span>2026 / MH</span>
            </div>

            <div className="resume-paper-content">
              <h3>Meer Humayu</h3>

              <p className="resume-paper-role">
                SOFTWARE ENGINEER & AI DEVELOPER
              </p>

              <div className="resume-paper-rule" />

              <div className="resume-paper-section">
                <span>01 / EDUCATION</span>
                <i className="resume-line resume-line-long" />
                <i className="resume-line resume-line-medium" />
              </div>

              <div className="resume-paper-section">
                <span>02 / PROJECTS</span>
                <i className="resume-line resume-line-long" />
                <i className="resume-line resume-line-medium" />
                <i className="resume-line resume-line-short" />
              </div>

              <div className="resume-paper-section">
                <span>03 / TECHNICAL SKILLS</span>
                <i className="resume-line resume-line-long" />
                <i className="resume-line resume-line-long" />
                <i className="resume-line resume-line-medium" />
              </div>

              <div className="resume-paper-section">
                <span>04 / EXPERIENCE & HACKATHONS</span>
                <i className="resume-line resume-line-long" />
                <i className="resume-line resume-line-medium" />
              </div>
            </div>

            <div className="resume-paper-bottom">
              <span>MEER / PORTFOLIO</span>
              <span>DOCUMENT 01 — 02</span>
            </div>

            <span className="resume-paper-stamp">
              PDF
            </span>
          </Motion.div>

          {/* Information and actions */}
          <Motion.div
            initial={
              reduceMotion ? false : { opacity: 0, x: 30 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="resume-details"
          >
            <p className="mv-eyebrow resume-details-label">
              THE FULL PROFILE
            </p>

            <h3>
              Everything that
              <br />
              doesn't fit on
              <br />
              <span>the homepage.</span>
            </h3>

            <p className="resume-details-copy">
              Explore my background in computer science,
              full-stack development, AI/ML experiments,
              project work, technical skills, hackathons
              and certifications.
            </p>

            <div className="resume-highlights">
              <div>
                <span>01</span>
                <p>Education & coursework</p>
              </div>

              <div>
                <span>02</span>
                <p>Projects & technical stack</p>
              </div>

              <div>
                <span>03</span>
                <p>Hackathons & certifications</p>
              </div>
            </div>

            <div className="resume-actions">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-action resume-action-primary"
              >
                VIEW RESUME <span>↗</span>
              </a>

              <a
                href="/resume.pdf"
                download="Meer-Humayu-Resume.pdf"
                className="resume-action resume-action-secondary"
              >
                DOWNLOAD PDF <span>↓</span>
              </a>
            </div>

            <p className="resume-file-note">
              PDF DOCUMENT <span>·</span> 2 PAGES
            </p>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
