
import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "../styles/contact.css";

// Add your real email address before publishing.
const EMAIL = "meerhumayu6@gmail.com";

// Add your LinkedIn profile URL when ready.
const LINKEDIN_URL = "https://linkedin.com/in/meer-humayu";

const PROJECT_TYPES = [
  "Frontend Development",
  "Backend & APIs",
  "AI & RAG",
  "Full-stack",
  "Other",
];

const BUDGETS = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000+",
  "Not decided yet",
];

const TIMELINES = [
  "As soon as possible",
  "2–4 weeks",
  "1–3 months",
  "Flexible",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  company: "",
  website: "",
  budget: "",
  timeline: "",
  types: [],
  message: "",
};

const emailIsConfigured =
  EMAIL.trim() !== "" && EMAIL !== "your-email@example.com";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function TapeCard({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`contact-note-card ${className}`}
    >
      <i className="contact-tape" aria-hidden="true" />
      {children}
    </Motion.div>
  );
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const formRef = useRef(null);
  const copyTimer = useRef(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [zone, setZone] = useState("IST");

  // India local clock.
  
useEffect(() => {
  const updateClock = () => {
    try {
      const now = new Date();

      setClock(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now)
      );

      setZone("IST");
    } catch {
      setClock("--:--:--");
      setZone("IST");
    }
  };

  updateClock();

  const timer = window.setInterval(updateClock, 1000);

  return () => window.clearInterval(timer);
}, []);



        
  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  const errors = {
    name: form.name.trim() ? "" : "Please add your name.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
      ? ""
      : "Please add a valid email address.",
    message:
      form.message.trim().length >= 12
        ? ""
        : "Please tell me a little more about your project.",
  };

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setNotice("");
  };

  const toggleProjectType = (type) => {
    setForm((current) => ({
      ...current,
      types: current.types.includes(type)
        ? current.types.filter((item) => item !== type)
        : [...current.types, type],
    }));
  };

  const handleCopyEmail = async () => {
    if (!emailIsConfigured) {
      setNotice("Add your email address in Contact.jsx first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(copyTimer.current);

      copyTimer.current = window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setNotice("Email copying is unavailable. Use the email link instead.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempted(true);
    setNotice("");

    const firstError = Object.keys(errors).find((key) => errors[key]);

    if (firstError) {
      formRef.current
        ?.querySelector(`[name="${firstError}"]`)
        ?.focus();
      return;
    }

    if (!emailIsConfigured) {
      setNotice("Replace the placeholder email in Contact.jsx before submitting.");
      return;
    }

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      form.website && `Website: ${form.website}`,
      form.budget && `Budget: ${form.budget}`,
      form.timeline && `Timeline: ${form.timeline}`,
      form.types.length && `Project type: ${form.types.join(", ")}`,
      "",
      "Project brief:",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = encodeURIComponent(`Portfolio enquiry — ${form.name}`);
    const encodedBody = encodeURIComponent(body);

    // This prepares an email draft. The visitor must press Send
    // in their mail application to actually send the message.
    window.location.href =
      `mailto:${EMAIL}?subject=${subject}&body=${encodedBody}`;

    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setAttempted(false);
    setSubmitted(false);
    setNotice("");

    window.setTimeout(() => {
      formRef.current?.querySelector('[name="name"]')?.focus();
    }, 60);
  };

  const linkedinAvailable = Boolean(LINKEDIN_URL.trim());

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* Heading */}
        <header className="contact-header">
          <p className="mv-eyebrow contact-eyebrow">
            FRAME 05 — CONTACT / TAKE 01
          </p>

          <div className="contact-title-row">
            <Motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9 }}
              className="contact-heading"
            >
              Let&apos;s make
              <br />
              something <span>good.</span>
            </Motion.h2>

            <p className="contact-lead">
              Have an idea, an opportunity, or a problem worth
              solving? Tell me what you&apos;re working on.
              I&apos;d like to hear about it.
            </p>
          </div>
        </header>

        {/* Main two-column contact composition */}
        <div className="contact-grid">

          {/* LEFT — Booking sheet */}
          <div className="contact-main">

            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <Motion.div
                  key="success"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="contact-success"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-clap" aria-hidden="true">
                    <i />
                  </div>

                  <div className="contact-success-board">
                    <p className="contact-form-eyebrow">
                      TAKE 01 — DRAFT PREPARED
                    </p>

                    <h3>
                      Got it. <span>Thank you.</span>
                    </h3>

                    <p className="contact-success-copy">
                      Your email application should open with your
                      project brief filled in. Press Send there to
                      complete the message.
                    </p>

                    <div className="contact-success-data">
                      <div>
                        <span>NAME</span>
                        <b>{form.name}</b>
                      </div>
                      <div>
                        <span>PROJECT</span>
                        <b>{form.types[0] || "General enquiry"}</b>
                      </div>
                      <div>
                        <span>TAKE</span>
                        <b>01</b>
                      </div>
                      <div>
                        <span>DATE</span>
                        <b>{new Date().toLocaleDateString("en-IN")}</b>
                      </div>
                    </div>

                    <div className="contact-success-actions">
                      <a href="#work" className="contact-submit-button">
                        SEE MY WORK <Arrow />
                      </a>

                      <button
                        type="button"
                        className="contact-again"
                        onClick={resetForm}
                      >
                        SEND ANOTHER
                      </button>
                    </div>
                  </div>
                </Motion.div>
              ) : (
                <Motion.form
                  key="form"
                  ref={formRef}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="contact-booking-sheet"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="contact-sheet-header">
                    <span>
                      <i />
                      BOOKING SHEET
                    </span>
                    <span>NO. 0142</span>
                    <span>* REQUIRED</span>
                  </div>

                  <div className="contact-form-fields">

                    <div className={`contact-field ${attempted && errors.name ? "is-error" : ""}`}>
                      <label htmlFor="contact-name">
                        <span>01</span> YOUR NAME *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        aria-invalid={attempted && Boolean(errors.name)}
                      />
                      {attempted && errors.name && (
                        <small>{errors.name}</small>
                      )}
                    </div>

                    <div className={`contact-field ${attempted && errors.email ? "is-error" : ""}`}>
                      <label htmlFor="contact-email">
                        <span>02</span> EMAIL *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        aria-invalid={attempted && Boolean(errors.email)}
                      />
                      {attempted && errors.email && (
                        <small>{errors.email}</small>
                      )}
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-company">
                        <span>03</span> COMPANY
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Company or organisation"
                        value={form.company}
                        onChange={(e) => updateField("company", e.target.value)}
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-website">
                        <span>04</span> WEBSITE
                      </label>
                      <input
                        id="contact-website"
                        name="website"
                        type="url"
                        placeholder="https://"
                        value={form.website}
                        onChange={(e) => updateField("website", e.target.value)}
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-budget">
                        <span>05</span> BUDGET
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={form.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                      >
                        <option value="">Choose one</option>
                        {BUDGETS.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-timeline">
                        <span>06</span> TIMELINE
                      </label>
                      <select
                        id="contact-timeline"
                        name="timeline"
                        value={form.timeline}
                        onChange={(e) => updateField("timeline", e.target.value)}
                      >
                        <option value="">Choose one</option>
                        {TIMELINES.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <fieldset className="contact-type-field">
                      <legend>07 — WHAT DO YOU NEED?</legend>

                      <div className="contact-type-chips">
                        {PROJECT_TYPES.map((type) => {
                          const selected = form.types.includes(type);

                          return (
                            <label
                              key={type}
                              className={selected ? "is-selected" : ""}
                            >
                              <input
                                type="checkbox"
                                name="types"
                                value={type}
                                checked={selected}
                                onChange={() => toggleProjectType(type)}
                              />
                              <span className="contact-chip-check">✓</span>
                              {type}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className={`contact-field contact-message-field ${attempted && errors.message ? "is-error" : ""}`}>
                      <label htmlFor="contact-message">
                        <span>08</span> THE BRIEF *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="5"
                        placeholder="What are you making, who is it for, and what does done look like?"
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        aria-invalid={attempted && Boolean(errors.message)}
                      />
                      {attempted && errors.message && (
                        <small>{errors.message}</small>
                      )}
                    </div>
                  </div>

                  <div className="contact-form-footer">
                    <p className="contact-form-notice" role="status" aria-live="polite">
                      {notice || (attempted ? "Please check the highlighted fields." : "")}
                    </p>

                    <div className="contact-send-row">
                      <p>
                        Your details are used only to reply to your enquiry.
                      </p>

                      <button type="submit" className="contact-submit-button">
                        SEND THE BRIEF <Arrow />
                      </button>
                    </div>
                  </div>
                </Motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — Taped studio notes */}
          <aside className="contact-aside" aria-label="Contact information">

            <TapeCard className="contact-status-card" delay={0}>
              <p className="contact-card-label">STATUS</p>

              <div className="contact-status-content">
                <span className="contact-on-air">OPEN</span>
                <div>
                  <span>AVAILABLE FOR</span>
                  <b>Opportunities & conversations</b>
                </div>
              </div>
            </TapeCard>

            <TapeCard className="contact-email-card" delay={0.1}>
              <p className="contact-card-label">EMAIL</p>

              <a
                className="contact-card-email"
                href={emailIsConfigured ? `mailto:${EMAIL}` : "#contact"}
              >
                {emailIsConfigured ? EMAIL : "Add your email address"}
              </a>

              <button
                type="button"
                className={`contact-copy-button ${copied ? "is-copied" : ""}`}
                onClick={handleCopyEmail}
                disabled={!emailIsConfigured}
              >
                {copied ? "COPIED ✓" : "COPY EMAIL"}
              </button>
            </TapeCard>

            <TapeCard className="contact-clock-card" delay={0.2}>
              <p className="contact-card-label">LOCAL TIME · INDIA</p>

              <p className="contact-live-clock">
                {clock}
                <span>{zone}</span>
              </p>

              <p className="contact-clock-caption">
                ASIA / KOLKATA
              </p>
            </TapeCard>

            <TapeCard className="contact-social-card" delay={0.3}>
              <p className="contact-card-label">ELSEWHERE</p>

              <ul>
                <li>
                  <a href="https://github.com/Meer06h" target="_blank" rel="noreferrer">
                    <span>GitHub</span>
                    <Arrow />
                  </a>
                </li>

                <li>
                  {linkedinAvailable ? (
                    <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                      <span>LinkedIn</span>
                      <Arrow />
                    </a>
                  ) : (
                    <span className="contact-social-pending">
                      LinkedIn — profile link to be added
                    </span>
                  )}
                </li>
              </ul>
            </TapeCard>

            <TapeCard className="contact-call-card" delay={0.4}>
              <p className="contact-call-note">
                Rather talk? Start with a short introduction.
              </p>

              <a
                className="contact-call-button"
                href={
                  emailIsConfigured
                    ? `mailto:${EMAIL}?subject=${encodeURIComponent("Intro call")}`
                    : "#contact"
                }
              >
                REQUEST AN INTRO CALL <Arrow />
              </a>
            </TapeCard>

          </aside>
        </div>
      </div>
    </section>
  );
}
