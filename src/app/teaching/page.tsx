"use client";
import React, { useEffect } from "react";

/* ----------------------------- Data ----------------------------- */
const APPT = {
  org: "New York University — Center for Data Science",
  time: "Fall 2025",
  courseLine: "Section Leader for DS-UA 201: Causal Inference.",
  bullets: [
    "Support weekly sections and office hours; prepare examples and review materials.",
    "Maintain course repository and grading scripts; coordinate logistics with instructors.",
  ],
  link: "https://github.com/zzczdhc/DS-UA_201-Causal-Inference-Fall-2025",
};
const NAV_ICON = "/zz_nav.png";

/* --------------------------- Animation -------------------------- */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(el); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[1000ms] ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* ----------------------------- Page ----------------------------- */
export default function TeachingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* dark nav：高度/图标与主站一致 */}
      <header className="sticky top-0 z-30 bg-[#1d1d1f]/95 backdrop-blur">
        <nav className="max-w-5xl mx-auto px-6 md:px-8 h-10 md:h-[46px] flex items-center justify-between text-gray-300">
          <a href="/" className="inline-flex items-center gap-2">
            <img src={NAV_ICON} alt="ZZ" className="h-6 w-6 md:h-7 md:w-7 opacity-80" />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="/#about" className="hover:text-white/90">About</a>
            <a href="/teaching" className="text-white">Teaching</a>
            <a href="/#contact" className="hover:text-white/90">Contact</a>
            <a href="/cv" className="hover:text-white/90">CV</a>
          </div>
        </nav>
      </header>

      {/* Title */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-10 md:pt-14">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">Teaching</h1>
        </Reveal>
      </section>

      {/* Current Appointment（标题更靠近上一行 + 有动画） */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-3">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-4">
            Current Appointment
          </h2>
        </Reveal>

        {/* 整卡片可点击 → GitHub 课程仓库 */}
        <Reveal>
          <a href={APPT.link} target="_blank" rel="noreferrer" className="block">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-7 hover:shadow transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900">{APPT.org}</h3>
                <span className="text-sm text-gray-500">{APPT.time}</span>
              </div>

              {/* ✅ 移除了那条独立的“Section Leader”行，仅保留更具体的课程行 */}
              <p className="mt-2 text-gray-700">{APPT.courseLine}</p>

              <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-800">
                {APPT.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>

              <div className="mt-4 text-sm text-blue-600">View course materials →</div>
            </div>
          </a>
        </Reveal>
      </section>

      <footer className="max-w-5xl mx-auto px-6 md:px-8 py-12 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {new Date().getFullYear()} Zichao Zhang</div>
          <div className="flex flex-wrap gap-3">
            <a href="/#about" className="hover:opacity-70">About</a>
            <a href="/#contact" className="hover:opacity-70">Contact</a>
            <a href="/cv" className="hover:opacity-70">CV</a>
          </div>
        </div>
      </footer>
    </div>
  );
}