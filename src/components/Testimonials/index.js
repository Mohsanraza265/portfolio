
import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

// IMPORTANT:
// Replace these placeholders with exact, verified client reviews.
// Do not publish the placeholder entries as genuine testimonials.

const testimonials = [
  {
    quote: "He did a great job developing our learning platform. He paid attention to the details, understood what we were trying to achieve, and made sure the videos and visual content came together smoothly. He was responsive to feedback and genuinely cared about delivering quality work.",
    name: "Ajitesh Sharma",
    role: "co-founder",
    company: "Arkire",
    project: "Educational Learning Platform",
  },
  {
    quote: "Working with him was a great experience. He took our vision for the advertising and marketplace platform and turned it into a functional, well-structured website. What stood out most was his ability to find practical solutions, manage complex features, and keep the development process on track. The end product was exactly what we needed.",
    name: "Albert Smith",
    role: "lawyer",
    company: "Beastlyads",
    project: "Advertising & Marketplace Platform",
  },
  {
    quote: "Mohsan did a good job improving a site.",
    name: "Muhammad Saleh",
    role: "HR Manager (IRS)",
    company: "IRS Global",
    project: "Marketing site",
  },
];

const Arrow = ({ direction = "right" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{
      transform: direction === "left" ? "rotate(180deg)" : "none",
    }}
  >
    <path d="M4 12h16M13 5l7 7-7 7" />
  </svg>
);

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const directionRef = useRef(1);
  const startX = useRef(null);
  const initialized = useRef(false);

  const total = testimonials.length;

  const goTo = useCallback(
    (index) => {
      if (index === active) return;

      directionRef.current =
        index > active ? 1 : -1;

      setActive((index + total) % total);
    },
    [active, total]
  );

  const next = () => {
    directionRef.current = 1;
    setActive((current) => (current + 1) % total);
  };

  const prev = () => {
    directionRef.current = -1;
    setActive((current) => (current - 1 + total) % total);
  };

  // Entrance animation
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tm-heading",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Slide transition
  useEffect(() => {
    if (!cardRef.current) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) return;

    const firstRender = !initialized.current;
    initialized.current = true;

    const animation = gsap.fromTo(
      cardRef.current,
      {
        opacity: firstRender ? 1 : 0,
        x: firstRender ? 0 : directionRef.current * 45,
        filter: firstRender ? "blur(0px)" : "blur(5px)",
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: firstRender ? 0 : 0.65,
        ease: "power3.out",
        overwrite: "auto",
      }
    );

    return () => animation.kill();
  }, [active]);

  // Swipe controls
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX.current = e.clientX;
  };

  const onPointerUp = (e) => {
    if (startX.current === null) return;

    const distance = e.clientX - startX.current;
    startX.current = null;

    if (Math.abs(distance) > 55) {
      if (distance < 0) next();
      else prev();
    }
  };

  const item = testimonials[active];

  return (
    <section
      className="tm-section"
      id="testimonials"
      ref={sectionRef}
      aria-label="Client testimonials"
    >
      <div className="tm-container">
        <div className="tm-heading">
          <div className="tm-eyebrow">
            <span>05 / CLIENT FEEDBACK</span>
            <span className="tm-heading-line" />
            <span>WORDS THAT MATTER</span>
          </div>

          <h2>
            Good work. <br />
            <em>Better relationships.</em>
          </h2>

          <p>
            Feedback from the people and teams I've worked with.
          </p>
        </div>

        <div
          className="tm-card"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            startX.current = null;
          }}
        >
          <div className="tm-card-inner" ref={cardRef}>
            <div className="tm-card-top">
              <span className="tm-card-label">
                CLIENT WORDS / {String(active + 1).padStart(2, "0")}
              </span>

              <span className="tm-quote-symbol" aria-hidden="true">
                &ldquo;
              </span>
            </div>

            <blockquote className="tm-quote">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <div className="tm-card-bottom">
              <div className="tm-author">
                <span className="tm-author-mark">
                  {item.name.charAt(0)}
                </span>

                <div className="tm-author-info">
                  <strong>{item.name}</strong>
                  <span>
                    {item.role} · {item.company}
                  </span>
                </div>
              </div>

              <div className="tm-project">
                <span>PROJECT</span>
                <strong>{item.project}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="tm-controls">
          <div className="tm-progress" aria-label="Select a testimonial">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                type="button"
                className={`tm-progress-item ${
                  index === active ? "is-active" : ""
                }`}
                onClick={() => goTo(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>

          <div className="tm-navigation">
            <span className="tm-counter">
              {String(active + 1).padStart(2, "0")}
              <span> / </span>
              {String(total).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="tm-arrow"
              aria-label="Previous testimonial"
              onClick={prev}
            >
              <Arrow direction="left" />
            </button>

            <button
              type="button"
              className="tm-arrow tm-arrow-next"
              aria-label="Next testimonial"
              onClick={next}
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
