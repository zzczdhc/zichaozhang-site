"use client";
import React, { useEffect, useState } from "react";

/* ----------------------------- Reveal (1s) -------------------------------- */
function Reveal({ children, className = "" }:{children:React.ReactNode; className?:string}) {
  const [show, setShow] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(el); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} transition-all duration-[1000ms] ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>{children}</div>
  );
}

/* --------------------------------- UI ------------------------------------ */
function Section({ id, title, children }:{ id?:string; title:string; children:React.ReactNode; }) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 md:px-8 pt-8 md:pt-10 pb-12">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-6">{title}</h2>
      </Reveal>
      <Reveal>
        <div className="max-w-3xl md:mx-0 mx-auto">
          {children}
        </div>
      </Reveal>
    </section>
  );
}
function RowCard({
  left,
  right,
  children,
  href,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}) {
  const base =
    "w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-5 md:p-6 mb-4 transition hover:shadow-md hover:-translate-y-[1px]";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`block group ${base}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
          <div className="text-lg font-medium text-gray-900">{left}</div>
          <div className="text-sm text-gray-500">{right}</div>
        </div>
        <div className="text-sm text-gray-700 mt-1">{children}</div>
      </a>
    );
  }
  return (
    <div className={base}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
        <div className="text-lg font-medium text-gray-900">{left}</div>
        <div className="text-sm text-gray-500">{right}</div>
      </div>
      <div className="text-sm text-gray-700 mt-1">{children}</div>
    </div>
  );
}

/* -------------------------------- Page ----------------------------------- */
export default function TeachingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Dark nav — EXACTLY matches the home page */}
      <header className="sticky top-0 z-30 bg-[#1d1d1f]/95 backdrop-blur">
        <nav className="max-w-5xl mx-auto px-6 md:px-8 h-10 md:h-[46px] flex items-center justify-between text-gray-300">
          <a href="/" className="inline-flex items-center gap-2">
            <img src="/zz_nav.png" alt="ZZ" className="h-6 w-6 md:h-7 md:w-7 opacity-80" />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="/#about" className="hover:text-white/90">About</a>
            <a href="/teaching" className="hover:text-white/90">Teaching</a>
            <a href="/#contact" className="hover:text-white/90">Contact</a>
            <a href="/cv" className="hover:text-white/90">CV</a>
          </div>
        </nav>
      </header>

      {/* Page title section (spacing & type consistent with home content) */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-4">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">Teaching</h1>
        </Reveal>
      </section>

      {/* Teaching content — same card styling and reveal animation */}
      <Section id="teaching" title="Current Appointment">
        <Reveal>
          <RowCard
            href="https://github.com/zzczdhc/DS-UA_201-Causal-Inference-Fall-2025"
            left={
              <>
                New York University — Center for Data Science
                <div className="text-sm text-gray-700">Section Leader</div>
              </>
            }
            right={"Fall 2025"}
          >
            <div className="text-sm text-gray-700">
              Section Leader for{" "}
              <span className="font-medium text-gray-900 underline decoration-transparent group-hover:underline">
                DS‑UA 201: Causal Inference
              </span>.
            </div>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>
                Support weekly sections and office hours; prepare examples and review materials.
              </li>
              <li>
                Maintain course repository and grading scripts; coordinate logistics with instructors.
              </li>
            </ul>
          </RowCard>
        </Reveal>
      </Section>

      {/* Footer — same as home */}
      <footer className="max-w-5xl mx-auto px-6 md:px-8 py-12 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {new Date().getFullYear()} Zichao Zhang</div>
          <div className="flex flex-wrap gap-3">
            <a href="/#about" className="hover:opacity-70">About</a>
            <a href="/#contact" className="hover:opacity-70">Contact</a>
            <a href="/teaching" className="hover:opacity-70">Teaching</a>
            <a href="/cv" className="hover:opacity-70">CV</a>
          </div>
        </div>
      </footer>
    </div>
  );
}