
import { motion as Motion, useReducedMotion } from "framer-motion";
import "../styles/footer.css";

const footerLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Selected work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="site-footer">

      <div className="mx-auto w-[90%] max-w-site">

        {/* Top line */}
        <div className="footer-topline">
          <span className="mv-eyebrow">
            FRAME 06 — END CREDITS
          </span>

          <span className="mv-eyebrow">
            MEER / PORTFOLIO {year}
          </span>
        </div>

        {/* Main closing statement */}
        <div className="footer-main">

          <div className="footer-message">
            <p className="mv-eyebrow footer-kicker">
              THANKS FOR MAKING IT THIS FAR
            </p>

            <Motion.h2
              initial={
                reduceMotion ? false : { opacity: 0, y: 35 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{ duration: 0.85 }}
              className="footer-heading"
            >
              The next idea
              <br />
              starts <span>somewhere.</span>
            </Motion.h2>

            <p className="footer-description">
              Built with curiosity, shaped through experimentation,
              and improved one iteration at a time.
            </p>

            <a href="#contact" className="footer-contact-link">
              HAVE SOMETHING IN MIND?
              <span>LET'S TALK ↗</span>
            </a>
          </div>

          {/* Oversized wordmark */}
          <Motion.div
            initial={
              reduceMotion ? false : { opacity: 0, scale: 0.96 }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="footer-wordmark"
            aria-label="Meer"
          >
            MEER<span>.</span>
          </Motion.div>
        </div>

        {/* Navigation and social links */}
        <div className="footer-middle">

          <div className="footer-brand-note">
            <span className="footer-brand-icon">M.</span>

            <div>
              <strong>MEER</strong>
              <p>Software Engineer & AI Developer</p>
            </div>
          </div>

          <nav className="footer-navigation" aria-label="Footer navigation">
            <p className="mv-eyebrow">EXPLORE</p>

            <div>
              {footerLinks.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="footer-socials">
            <p className="mv-eyebrow">ELSEWHERE</p>

            <a
              href="https://github.com/Meer06h"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a href="#contact">
              Get in touch ↗
            </a>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="footer-bottom">

          <p>
            © {year} MEER. ALL RIGHTS RESERVED.
          </p>

          <p>
            DESIGNED WITH INTENTION. BUILT WITH CODE.
          </p>

          <a href="#home" className="footer-back-top">
            BACK TO TOP <span>↑</span>
          </a>

        </div>

      </div>
    </footer>
  );
}
