"use client";
import React from "react";

/* ----------------------------- Reveal (1s) ------------------------------- */
function Reveal({ children, className = "" }:{ children: React.ReactNode; className?: string }) {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
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

/* ------------------------------ Data blocks ------------------------------- */
const EDUCATION = [
  {
    school: "New York University — Center for Data Science",
    program: "M.S. in Data Science (MSDS)",
    details: "Focus: machine learning and data-centric systems.",
    time: "Sep 2025 – May 2027 (Expected)",
  },
  {
    school: "New York University — College of Arts & Science",
    program: "B.A., Joint Major in Data Science & Computer Science; Minor in Business Studies",
    details: "Dean’s List; Founder’s Day Award.",
    time: "Sep 2021 – May 2025",
  },
];

const EXPERIENCE = [
  {
    org: "Qihoo 360",
    role: "Data Analyst Intern",
    time: "Dates / Location",
    bullets: [
      "Collaborated with faculty to design an end-to-end AI/ML course pipeline (curriculum, datasets, capstone project, auto-grading), reducing instructor setup time by ~30% and enabling 100% grading uptime during pilot.",
      "Benchmarked and optimized a GPU-backed Jupyter/LLM environment (scikit-learn, XGBoost), creating pre-launch checklists and resource guidelines to ensure stable performance.",
    ],
  },
];

const RESEARCH = [
  {
    org: "NYU Langone — CN³ Lab",
    role: "Research Assistant",
    time: "May 2024 – May 2025",
    bullets: [
      "Adapted Neural Data Transformer-2 (NDT-2) and Pi-VAE to decode ~330 CA1/VISp neurons to movie frames, reducing MAE by 12% (CA1) / 23% (VISp) vs. spline tuning curves.",
      "Pre‑processed and aligned 54k spike events with 1,800 s video stimuli; implemented Bayesian Monte Carlo decoder and 10‑fold CV to confirm robustness.",
    ],
  },
  {
    org: "NYU CDS — Kyunghyun Cho’s group",
    role: "Undergraduate Researcher",
    time: "Sep 2024 – May 2025",
    bullets: [
      "Built a unified Python library extending TM-Vec for protein homology, streamlining data pipelines, training, and benchmarking across 380K sequences; fine-tuned 1.2 B-parameter protein LLMs on NYU Greene HPC, reducing MAE by ~9× (to 0.003).",
      "Visualized 2048‑D embeddings with PCA and t‑SNE, revealing distinct alpha, beta, alpha/beta clusters.",
    ],
  },
];

const CERTS = [
  { title: "Machine Learning Specialization — Stanford Online & Coursera", link: "/ml_specialization.pdf" },
  { title: "Deep Learning Specialization — DeepLearning.AI (Coursera)", link: "/dl_specialization.pdf" },
  { title: "Google Data Analytics Professional Certificate — Google", link: "/google_data_analytics.pdf" },
];

/* --------------------------------- UI ------------------------------------- */
function Section({ id, title, children }:{ id?:string; title:string; children:React.ReactNode; }) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 md:px-8 py-12">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-6">{title}</h2>
      </Reveal>
      <Reveal>{children}</Reveal>
    </section>
  );
}
function RowCard({ left, right, children }:{ left:React.ReactNode; right:React.ReactNode; children:React.ReactNode; }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
        <div className="text-lg font-medium text-gray-900">{left}</div>
        <div className="text-sm text-gray-500">{right}</div>
      </div>
      <div className="text-sm text-gray-700 mt-1">{children}</div>
    </div>
  );
}

/* -------------------------------- Page ------------------------------------ */
export default function CVPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
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

      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-10 md:pt-14">
        <Reveal>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">Curriculum Vitae</h1>
            <a href="/cv.pdf" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Download PDF</a>
          </div>
        </Reveal>
      </section>

      <Section id="education" title="Education">
        {EDUCATION.map((e) => (
          <Reveal key={e.school + e.program}>
            <RowCard left={<>{e.school}<div className="text-sm text-gray-700">{e.program}</div></>} right={e.time}>
              <div className="mt-2 text-sm text-gray-600">{e.details}</div>
            </RowCard>
          </Reveal>
        ))}
      </Section>

      <Section id="exp" title="Professional Experience">
        {EXPERIENCE.map((x, i) => (
          <Reveal key={i}>
            <RowCard left={<>{x.org}<div className="text-sm text-gray-700">{x.role}</div></>} right={x.time}>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </RowCard>
          </Reveal>
        ))}
      </Section>

      <Section id="research" title="Research Experience">
        {RESEARCH.map((x, i) => (
          <Reveal key={i}>
            <RowCard left={<>{x.org}<div className="text-sm text-gray-700">{x.role}</div></>} right={x.time}>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </RowCard>
          </Reveal>
        ))}
      </Section>

      <Section id="certs" title="Certificates">
        <div className="grid sm:grid-cols-2 gap-4">
          {CERTS.map((c) => (
            <Reveal key={c.title}>
              <a href={c.link} target="_blank" rel="noreferrer" className="block rounded-2xl border border-gray-200 bg-white shadow-sm p-5 hover:bg-gray-50">
                <div className="text-lg md:text-xl font-medium text-gray-900">{c.title}</div>
                <div className="text-xs text-gray-500 mt-1">Click to view</div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

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