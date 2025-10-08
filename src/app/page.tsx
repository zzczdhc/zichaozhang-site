"use client";
import React, { useEffect, useState } from "react";

/* ------------------------------- Site Data -------------------------------- */
const SITE = {
  name: "Zichao Zhang",
  email: "z.zichao01@gmail.com",
  github: "https://github.com/zzczdhc",
  linkedin: "https://www.linkedin.com/in/zichao-zhang-5a8162245/",
  instagram: "https://www.instagram.com/zzczdhc/",
  x: "https://x.com/alexz3067865451?s=21",
  location: "New York, NY",
  heroPhoto: "/portrait_web.png", // 透明 PNG
};

/* ------------------------------ Projects Data ----------------------------- */
const PROJECTS = [
  {
    title: "Deepfake Facial Imagery Detection",
    description:
      "Detector using Error Level Analysis (ELA) and Grad-CAM interpretability with strong cross-dataset robustness.",
    details:
      "Developed augmentation and ELA pipeline to improve generalization; presented results to ~50 peers/faculty.",
    tags: ["Computer Vision", "Explainability"],
    image: "/deepfake.jpg",
    github: "https://github.com/zzczdhc/DS301-project-repo",
  },
  {
    title: "RAISE 2024 Finalist: Fear of AI Analysis",
    description:
      "NLP pipeline over 10k+ headlines with sentiment, emotion, and stance; selected as a national finalist.",
    details:
      "Data collection/cleaning, sentiment & emotion modeling, stance analysis, and reporting.",
    tags: ["NLP", "Competition"],
    image: "/raise.jpg",
    github: "https://github.com/zzczdhc/rutgers_project",
    artifact: "/raise_certificate.pdf",
  },
  {
    title: "Learning from 100 Images",
    description:
      "Data-efficient vision with explainability; compact CNN trained with condensation + augmentation.",
    details:
      "Strong accuracy from tiny data; reproducible CLI and visuals.",
    tags: ["Efficient ML", "PyTorch"],
    image: "/fewshot.jpg",
    github: "#",
  },
  {
    title: "Responsible AI Audit for Home Credit ADS",
    description:
      "Bias analysis + imputation/pruning pipeline; improved AUC while improving fairness.",
    details:
      "Audited 120+ features; designed mitigation strategies and evaluation.",
    tags: ["Responsible AI", "Tabular ML"],
    image: "/fairness.jpg",
    github: "#",
  },
];

/* ---------------------------------- News ---------------------------------- */
const NEWS = [
  { date: "2025-08", text: "Decided to stay at NYU to pursue the M.S. in Data Science (MSDS)." },
  { date: "2025-08", text: "Honored to serve as TA for Causal Inference (DS-UA 201) at NYU CDS." },
  { date: "2024-09", text: "Collaborating with Daniel Berenberg in Kyunghyun Cho’s group on TM-Vec; gave a short demo at NYU CDS." },
  { date: "2024-05", text: "Joined NYU Langone’s CN³ Lab to study interactions between visual cortex and hippocampus with ML." },
  { date: "2024-04", text: "Our team reached the finals at RAISE 2024 with an NLP pipeline analyzing AI headlines." },
];

/* --------------------------------- Icons ---------------------------------- */
const Icon = ({ children }: { children: React.ReactNode }) => (
  <span aria-hidden="true" className="block h-5 w-5">{children}</span>
);
const IconButton = ({ href, label, children }:{
  href:string; label:string; children:React.ReactNode;
}) => (
  <a
    href={href}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    aria-label={label}
    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
  >
    <span className="sr-only">{label}</span>
    <Icon>{children}</Icon>
  </a>
);

const MailSVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/>
    <path d="m22 8-8.97 5.61a2 2 0 0 1-2.06 0L2 8"/>
  </svg>
);
const GitHubSVG = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.34.73-4.04-1.4-4.04-1.4-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.71.08-.71 1.18.08 1.8 1.2 1.8 1.2 1.04 1.77 2.74 1.26 3.41.96.11-.76.41-1.26.74-1.55-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.36 1.24-3.19-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.22a11.5 11.5 0 0 1 6 0c2.28-1.54 3.3-1.22 3.3-1.22.66 1.64.25 2.86.12 3.16.77.83 1.24 1.9 1.24 3.19 0 4.58-2.81 5.59-5.49 5.89.42.36.79 1.06.79 2.14v3.17c0 .31.21.66.8.55A11.5 11.5 0 0 0 12 .5Z"/>
  </svg>
);
const LinkedInSVG = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8.5h4.9v14H.5v-14Zm7.5 0h4.7v1.9h.07c.65-1.23 2.24-2.52 4.62-2.52 4.95 0 5.86 3.26 5.86 7.5v7.12h-4.9v-6.31c0-1.51-.03-3.44-2.1-3.44-2.1 0-2.43 1.64-2.43 3.33v6.42H8v-14Z"/>
  </svg>
);
const InstagramSVG = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.8A4.2 4.2 0 1 0 16.2 12 4.2 4.2 0 0 0 12 7.8Zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1Zm-6.2 2.2A3 3 0 1 1 9 12a3 3 0 0 1 3-3Z"/>
  </svg>
);
const XSVG = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 2l8.5 10.2L3 22h3.2l6.9-8.2L19 22h2L12.8 11.7 21.5 2H18.3l-6.3 7.5L7 2H3z"/>
  </svg>
);

/* ----------------------------- Reveal (1s) -------------------------------- */
function Reveal({ children, className = "" }:{children:React.ReactNode; className?:string}) {
  const [show, setShow] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
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

/* ---------------------------------- UI ------------------------------------ */
function Section({ id, title, children }:{
  id?:string; title:string; children:React.ReactNode;
}) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-6">{title}</h2>
      {children}
    </section>
  );
}
function Card({ children, onClick, clickable=false }:{
  children:React.ReactNode; onClick?:()=>void; clickable?:boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow md:transition-all md:duration-300 ${
        clickable ? "cursor-pointer hover:-translate-y-0.5" : ""
      }`}
      onClick={onClick}
      role={clickable ? "button" : undefined}
    >
      {children}
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */
export default function Page() {
  const [openProject, setOpenProject] = useState<any>(null);

  const socials = [
    { label: "Email", href: `mailto:${SITE.email}`, icon: MailSVG },
    { label: "GitHub", href: SITE.github, icon: GitHubSVG },
    { label: "LinkedIn", href: SITE.linkedin, icon: LinkedInSVG },
    { label: "X", href: SITE.x, icon: XSVG },
    { label: "Instagram", href: SITE.instagram, icon: InstagramSVG },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* 深灰 Apple 风格导航 */}
      <header className="sticky top-0 z-30 bg-[#1d1d1f]/95 backdrop-blur">
        <nav className="max-w-5xl mx-auto px-6 md:px-8 h-10 md:h-11.5 flex items-center justify-between text-gray-300">
          <a href="/" className="inline-flex items-center gap-2">
            <img src="/zz_white_180.png" alt="ZZ" className="h-4 w-4 md:h-5 md:w-5 opacity-80" />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#news" className="hover:text-white/90">News</a>
            <a href="#contact" className="hover:text-white/90">Contact</a>
            <a href="/cv" className="hover:text-white/90">CV</a>
          </div>
        </nav>
      </header>

      {/* Hero：**纯浅灰色块**，底部不留 padding，底边贴住照片下沿；下面正文是白底 */}
      <section className="relative overflow-hidden bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 pt-4 md:pt-8 pb-1 grid md:grid-cols-2 gap-10 items-center">
          {/* 左：标题 + 身份 */}
          <Reveal className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
              Zichao Zhang
            </h1>
            <p className="mt-3 text-[17px] text-gray-700">
              CFA Candidate · MSDS Student @ NYU
            </p>
            <p className="text-[15px] text-gray-600">Data Science · Machine Learning</p>
          </Reveal>

          {/* 右：透明 PNG 头像（无卡片/无边框） */}
          <Reveal className="md:justify-self-end w-full flex justify-end">
            <img
              src={SITE.heroPhoto}
              alt="Portrait of Zichao Zhang"
              className="w-full max-w-md md:max-w-lg object-contain select-none pointer-events-none -mt-4 md:-mt-6"
              loading="eager"
            />
          </Reveal>
        </div>
      </section>

      {/* 正文开始（白底）。为避免“顶到一起”，给一点上边距 */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-4 md:pt-5 pb-5">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 text-[15px] leading-7 text-gray-800">
            <div className="space-y-4">
              <p>
                I’m an NYU MS in Data Science student focused on machine learning and
                data-centric systems. I earned my B.A. at NYU with a joint major in Data
                Science & Computer Science and a minor in Business Studies.
              </p>
              <p>
                I work with <span className="font-medium">Daniel Berenberg</span> in{" "}
                <span className="font-medium">Kyunghyun Cho’s group</span> on TM-Vec—tools
                and benchmarks for protein remote homology detection and structural
                alignment using deep learning. My work centers on extending the Python
                library (training/benchmarking utilities, data pipelines, and new features).
              </p>
            </div>
            <div className="space-y-4">
              <p>
                At NYU Langone’s <span className="font-medium">CN³ Lab</span>, I combine
                large-scale data analysis, ML modeling, and systems engineering to study
                interactions between the visual cortex and hippocampus.
              </p>
              <p>
                I’m currently seeking <span className="font-medium">Summer 2026</span> Data
                Science / ML internships.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Projects */}
      <Section id="projects" title="Selected Projects">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <Card key={p.title} clickable onClick={() => setOpenProject(p)}>
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    className="w-full h-44 object-cover rounded-t-2xl border-b border-gray-200"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-700">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs rounded-full bg-gray-100 text-gray-700 px-2.5 py-1 border border-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* News */}
      <Section id="news" title="News">
        <Reveal>
          <Card>
            <div className="p-6">
              <ul className="space-y-4">
                {NEWS.map((n, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 text-xs font-medium text-gray-500 w-20 shrink-0">
                      {n.date}
                    </div>
                    <div className="text-sm text-gray-800">{n.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <Card>
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-700">
                I’m open to collaborations and internship opportunities for Summer 2026.
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Based in {SITE.location}. Best way to reach me is email.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <IconButton key={s.label} href={s.href} label={s.label}>
                  {s.icon}
                </IconButton>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 md:px-8 py-12 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {new Date().getFullYear()} {SITE.name}</div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="hover:opacity-70">Home</a>
            <a href="#projects" className="hover:opacity-70">Projects</a>
            <a href="#news" className="hover:opacity-70">News</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
            <a href="/cv" className="hover:opacity-70">CV</a>
          </div>
        </div>
      </footer>

      {/* Project modal */}
      <Modal open={!!openProject} onClose={() => setOpenProject(null)} title={openProject?.title}>
        {openProject && (
          <div className="space-y-4 text-sm text-gray-800">
            {openProject.image && (
              <img src={openProject.image} alt="" className="w-full rounded-xl border border-gray-200" />
            )}
            <p className="leading-6">{openProject.details || openProject.description}</p>
            <div className="flex flex-wrap gap-3">
              {openProject.github && (
                <a
                  href={openProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  View on GitHub →
                </a>
              )}
              {openProject.artifact && (
                <a
                  href={openProject.artifact}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  View certificate →
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* -------------------------------- Modal ----------------------------------- */
function useEsc(handler: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handler();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}
function Modal({ open, onClose, title, children }:{
  open:boolean; onClose:()=>void; title?:string; children:React.ReactNode;
}) {
  useEsc(onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">✕</button>
          </div>
          <div className="p-6 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}