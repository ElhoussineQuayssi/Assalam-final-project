"use client"
import React, { useEffect, useRef, useState } from "react";

/**
 * Timeline, TimelineItem, etc.
 * - Use : <Timeline><TimelineItem>...</TimelineItem></Timeline>
 * - Each TimelineItem must accept prop `id` (unique) for keyboard nav.
 */

/* Hook utilitaire pour reduced motion */
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
        <div className="relative w-1 h-full bg-[var(--border)] rounded">
          <div
            aria-hidden
            style={{
              height: `${progress}%`,
              transition: reduced ? "none" : "height 450ms ease-out",
              background: "linear-gradient(180deg,var(--color-primary),var(--color-secondary))",
            }}
            className="absolute left-0 top-0 w-1 rounded"
          />
        </div>
        <div className="mt-2 text-xs text-[var(--muted)]">{progress}%</div>
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden mb-4">
        <div className="bg-[var(--border)] rounded-full h-2 overflow-hidden">
          <div
            style={{
              width: `${progress}%`,
              transition: reduced ? "none" : "width 450ms ease-out",
              background: "linear-gradient(90deg,var(--color-primary),var(--color-secondary))",
            }}
            className="h-full"
          />
        </div>
      </div>

      <ol className="relative border-l border-[var(--border)]">
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

/* TimelineItem expects children markup with TimelineTime/Title/Description or any content */
export function TimelineItem({ children, className = "", ...rest }) {
  return (
    <li
      {...rest}
      className={`mb-10 ml-6 relative outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-secondary)] rounded ${className}`}
    >
      {/* dot */}
      <span
        className="absolute w-3 h-3 rounded-full -left-1.5 top-1 border border-white transform transition-transform duration-400"
        style={{
          background: "var(--color-primary)",
        }}
        aria-hidden
      />
      <div className="tl-item-content">{children}</div>
    </li>
  );
}

export function TimelineTime({ children }) {
  return (
    <time className="mb-1 text-sm font-normal leading-none text-[var(--muted)]">
      {children}
    </time>
  );
}

export function TimelineContent({ children }) {
  return <div className="mt-2 text-[var(--text)]">{children}</div>;
}

export function TimelineTitle({ children }) {
  return <h3 className="text-lg font-semibold text-[var(--text)]">{children}</h3>;
}

export function TimelineDescription({ children }) {
  return <p className="text-base font-normal text-[var(--muted)]">{children}</p>;
}
