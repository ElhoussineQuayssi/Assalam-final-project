"use client"

import React, { useEffect, useRef, useState } from "react";

/**
 * Unified Timeline Component
 * Matches the design system with Moroccan cultural colors and responsive design
 */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

export function Timeline({ children, className = "" }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Setup IntersectionObserver to reveal items
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = (containerRef.current?.querySelectorAll("[data-timeline-item]")) || [];
    itemRefs.current = Array.from(els);

    const io = new IntersectionObserver(
      (entries) => {
        let visible = 0;
        entries.forEach((e) => {
          const id = e.target.getAttribute("data-timeline-id");
          if (e.isIntersecting) {
            e.target.classList.add("tl-inview");
            visible++;
          } else {
            e.target.classList.remove("tl-inview");
          }
        });
        // Count elements currently with class
        visible = containerRef.current.querySelectorAll(".tl-inview").length;
        setVisibleCount(visible);
      },
      { threshold: 0.28 }
    );

    Array.from(els).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [children]);

  // Keyboard navigation (Up/Down)
  useEffect(() => {
    if (!containerRef.current) return;
    const handleKey = (e) => {
      if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
      const focusable = Array.from(containerRef.current.querySelectorAll("[data-timeline-item]"));
      const idx = focusable.indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        const next = focusable[Math.min(focusable.length - 1, Math.max(0, idx + 1))];
        next?.focus();
      } else {
        const prev = focusable[Math.max(0, idx - 1)];
        prev?.focus();
      }
    };
    containerRef.current.addEventListener("keydown", handleKey);
    return () => containerRef.current?.removeEventListener("keydown", handleKey);
  }, []);

  // Progress calc
  const total = React.Children.count(children) || 1;
  const progress = Math.round((visibleCount / total) * 100);

  return (
    <section
      ref={containerRef}
      aria-label="Timeline"
      className={`relative ${className}`}
    >
      {/* Desktop vertical indicator (left) */}
      <div className="hidden md:flex md:flex-col items-center absolute -left-12 top-0 h-full w-10">
        <div className="relative w-1 h-full bg-gray-200 rounded-full">
          <div
            aria-hidden
            style={{
              height: `${progress}%`,
              transition: reduced ? "none" : "height 450ms ease-out",
              background: "linear-gradient(180deg, #1e40af, #64748b)",
            }}
            className="absolute left-0 top-0 w-1 rounded-full"
          />
        </div>
        <div className="mt-2 text-xs text-gray-500">{progress}%</div>
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden mb-6">
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            style={{
              width: `${progress}%`,
              transition: reduced ? "none" : "width 450ms ease-out",
              background: "linear-gradient(90deg, #1e40af, #64748b)",
            }}
            className="h-full rounded-full"
          />
        </div>
      </div>

      <ol className="relative border-l-2 border-gray-200">
        {React.Children.map(children, (child, idx) => {
          if (!React.isValidElement(child)) return null;
          // Clone TimelineItem to inject props: data attributes and tabindex
          const id = child.props.id ?? `tl-${idx}`;
          return React.cloneElement(child, {
            "data-timeline-item": true,
            "data-timeline-id": id,
            tabIndex: 0, // make focusable
          });
        })}
      </ol>
    </section>
  );
}

export function TimelineItem({ children, className = "", ...rest }) {
  return (
    <li
      {...rest}
      className={`mb-10 ml-6 relative outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg ${className}`}
    >
      {/* dot */}
      <span
        className="absolute w-4 h-4 rounded-full -left-2 top-1 border-4 border-white bg-blue-600 transform transition-transform duration-400 hover:scale-110"
        aria-hidden
      />
      <div className="tl-item-content">{children}</div>
    </li>
  );
}

export function TimelineTime({ children }) {
  return (
    <time className="mb-1 text-sm font-normal leading-none text-gray-500">
      {children}
    </time>
  );
}

export function TimelineContent({ children }) {
  return <div className="mt-2 text-gray-900">{children}</div>;
}

export function TimelineTitle({ children }) {
  return <h3 className="text-lg font-semibold text-gray-900">{children}</h3>;
}

export function TimelineDescription({ children }) {
  return <p className="text-base font-normal text-gray-600">{children}</p>;
}
