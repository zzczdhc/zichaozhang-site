"use client";
import React, { useEffect, useState } from "react";

// --- Quick start ------------------------------------------------------------
// 1) Drop these into your /public folder:
//    - portrait_web.jpg  (hero)
//    - avatar512.jpg     (favicon)
//    - og_image.jpg      (social preview)
//    - Optional project thumbs: tmvec.jpg, deepfake.jpg, examprep.jpg, ssd.jpg
//    - Optional cert images: cert_dl.jpg, cert_ml.jpg
// 2) Deploy with Vercel/Netlify. Point domain to zichaozhang.com.
// 3) Edit the data objects below.

const SITE = {
  name: "Zichao (Alex) Zhang",
  tagline: "MS student @ NYU · Data Science / ML",
  seeking: "Actively seeking Summer 2026 internships in Data Science / ML / AI.",
  email: "z.zichao01@gmail.com",
  github: "https://github.com/zzczdhc",
  linkedin: "https://www.linkedin.com/in/zichao-zhang-5a8162245/",
  instagram: "", // optional, e.g. "https://instagram.com/yourhandle"
  resumeUrl: "#", // TODO: replace with your resume/CV PDF link
  location: "New York, NY",
  heroPhoto: "/portrait_web.jpg",
  ogImage: "/og_image.jpg",
};

const EDUCATION = [
  {
    school: "New York University",
    program: "M.S. (in progress)",
    details: "Graduate studies in data science / computer science with focus on ML & AI.",
    time: "2025 — present",
  },
  {
    school: "New York University",
    program: "B.A. in Data Science & Computer Applications",
    details: "Interdisciplinary AI/ML projects; teaching & research involvement.",
    time: "2019 — 2025",
  },
];

// If you add screenshots into /public, reference them in `image`.
const PROJECTS = [
  {
    title: "TM‑Vec: Protein ML Toolkit",
    description:
      "Unified Python library for training/benchmarking TM‑Vec‑like models; talk/demo delivered at NYU CDS.",
    details:
      "Built modular training/benchmarking utilities, streamlined configs & logging, and improved eval reproducibility.",
    tags: ["Protein ML", "PyTorch", "Benchmarking"],
    image: "/tmvec.jpg", // optional
    github: "#",
  },
  {
    title: "Deepfake Detection System",
    description:
      "Mobile‑friendly pipeline addressing dataset dependency with augmentation + ELA; strong performance on SD/GAN.",
    details:
      "Trained DenseNet/MobileNet; Grad‑CAM analysis for explainability; cross‑dataset robustness study.",
    tags: ["Computer Vision", "Mobile", "Model Explainability"],
    image: "/deepfake.jpg",
    github: "#",
  },
  {
    title: "ExamPrep AI App",
    description:
      "GPT‑powered answer checking & question generation for GRE/SAT/TOEFL/LSAT with >200 beta users.",
    details:
      "OCR → retrieval → GPT pipeline; analytics and A/B tests planned for next release.",
    tags: ["Product", "LLM", "iOS/Web"],
    image: "/examprep.jpg",
    github: "#",
  },
  {
    title: "SSD Failure Prediction",
    description:
      "Large‑scale cloud SSD telemetry; built robust predictors (XGBoost/LightGBM) with strong AUC.",
    details:
      "Time‑series cleaning, feature engineering, and thresholding for early‑warning maintenance.",
    tags: ["Time‑series", "XGBoost", "MLOps"],
    image: "/ssd.jpg",
    github: "#",
  },
];

// Certificates become clickable tiles that open a modal with the screenshot
const CERTS = [
  {
    title: "Deep Learning Specialization — Stanford Online / Coursera",
    image: "/cert_dl.jpg", // add your screenshot file
  },
  {
    title: "Machine Learning Specialization — Stanford Online / Coursera",
    image: "/cert_ml.jpg",
  },
];

const NEWS = [
  { date: "2025‑08", text: "Started my Master’s at NYU; continuing research and teaching involvement." },
  { date: "2024‑11", text: "Collaborated with Dan on TM‑Vec and gave a short talk/demo at NYU CDS (slides coming soon)." },
  { date: "2024‑09", text: "Joined NYU CN3 Lab to work on neural decoding (Pi‑VAE / representation learning)." },
  { date: "2024‑04", text: "Our team made the finals (3rd place) at RAISE 2024 analyzing AI news with NLP." },
];

// --- Icons (inline SVG for portability) ------------------------------------
const Icon = ({ children }: { children: React.ReactNode }) => (
  <span aria-hidden="true" className="block h-5 w-5">{children}</span>
);

const IconButton = ({ href, label, children }) => (
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

// --- Modal -----------------------------------------------------------------
function useEsc(handler) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handler();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

function Modal({ open, onClose, title, children }) {
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

// --- UI helpers -------------------------------------------------------------
function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/60 backdrop-blur px-3 py-1 text-sm text-gray-700">
      {children}
    </span>
  );
}

function Card({ children, onClick, clickable=false }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow md:transition-all md:duration-300 ${clickable ? "cursor-pointer hover:-translate-y-0.5" : ""}`}
      onClick={onClick}
      role={clickable ? "button" : undefined}
    >
      {children}
    </div>
  );
}

// --- Page ------------------------------------------------------------------
export default function Portfolio() {
  const [openProject, setOpenProject] = useState(null);
  const [openCert, setOpenCert] = useState(null);

  const socials = [
    { label: "Email", href: `mailto:${SITE.email}`, icon: MailSVG },
    { label: "GitHub", href: SITE.github, icon: GitHubSVG },
    { label: "LinkedIn", href: SITE.linkedin, icon: LinkedInSVG },
  ];
  if (SITE.instagram) socials.push({ label: "Instagram", href: SITE.instagram, icon: InstagramSVG });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 text-gray-800">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-200">
        <nav className="max-w-5xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <a href="#home" className="font-medium tracking-tight">{SITE.name}</a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#education" className="hover:opacity-70">Education</a>
            <a href="#projects" className="hover:opacity-70">Projects</a>
            <a href="#news" className="hover:opacity-70">News</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f7] to-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8 pt-14 pb-6 md:pt-20 md:pb-10 grid md:grid-cols-2 gap-10 items-end">
          {/* Left: name + tagline + seeking pill */}
          <div className="pb-6">
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-gray-900">{SITE.name}</h1>
            <p className="mt-3 text-xl text-gray-700">{SITE.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>{SITE.seeking}</Pill>
            </div>
            {/* Icons intentionally removed in hero per request */}
          </div>

          {/* Right: large rounded portrait card */}
          <div className="md:justify-self-end w-full flex justify-end">
            <div className="relative bg-white rounded-[28px] shadow-lg border border-gray-200 overflow-hidden w-full max-w-md">
              <img
                src={SITE.heroPhoto}
                alt="Portrait of Zichao Zhang in NYU regalia"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About">
        <Card>
          <div className="p-6 md:p-8 text-[15px] leading-7 text-gray-700">
            <p>
              I’m an NYU MS student focused on machine learning and data science. I enjoy building practical AI systems—ranging from protein ML tooling and neural decoding research to real‑world apps like an AI‑powered exam prep tool. I value clarity, rigor, and human‑centered design.
            </p>
          </div>
        </Card>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((e) => (
            <Card key={e.school + e.program}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{e.school}</h3>
                  <span className="text-sm text-gray-500">{e.time}</span>
                </div>
                <p className="mt-1 text-sm text-gray-700">{e.program}</p>
                <p className="mt-3 text-sm text-gray-600">{e.details}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Selected Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <Card key={p.title} clickable onClick={() => setOpenProject(p)}>
              {p.image && (
                <img src={p.image} alt="" className="w-full h-44 object-cover rounded-t-2xl border-b border-gray-200" />
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs rounded-full bg-gray-100 text-gray-700 px-2.5 py-1 border border-gray-200">{t}</span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Certificates</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {CERTS.map((c) => (
              <Card key={c.title} clickable onClick={() => setOpenCert(c)}>
                <div className="p-5">
                  <div className="text-lg md:text-xl font-medium text-gray-900">{c.title}</div>
                  <div className="text-xs text-gray-500 mt-1">Click to view</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* News */}
      <Section id="news" title="News / Milestones">
        <Card>
          <div className="p-6">
            <ul className="space-y-4">
              {NEWS.map((n, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 text-xs font-medium text-gray-500 w-16 shrink-0">{n.date}</div>
                  <div className="text-sm text-gray-800">{n.text}</div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-6">This section highlights milestones & talks. Papers welcome in the future ✨</p>
          </div>
        </Card>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <Card>
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-700">I’m open to collaborations and internship opportunities for Summer 2026.</p>
              <p className="text-sm text-gray-700 mt-1">Based in {SITE.location}. Best way to reach me is email.</p>
            </div>
            <div className="flex items-center gap-2">
              {socials.map(s => (
                <IconButton key={s.label} href={s.href} label={s.label}>{s.icon}</IconButton>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      <footer className="max-w-5xl mx-auto px-6 md:px-8 py-12 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {new Date().getFullYear()} {SITE.name}</div>
          <div className="flex flex-wrap gap-3">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#projects" className="hover:opacity-70">Projects</a>
            <a href="#news" className="hover:opacity-70">News</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
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
            {openProject.github && (
              <a href={openProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                View on GitHub →
              </a>
            )}
          </div>
        )}
      </Modal>

      {/* Certificate modal */}
      <Modal open={!!openCert} onClose={() => setOpenCert(null)} title={openCert?.title}>
        {openCert && (
          <div className="space-y-4">
            {openCert.image ? (
              <img src={openCert.image} alt="Certificate" className="w-full rounded-xl border border-gray-200" />
            ) : (
              <p className="text-sm text-gray-700">Add a screenshot image path in CERTS to display it here.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

// --- Optional SEO tags (if exporting a full HTML shell):
// <meta property="og:title" content="Zichao Zhang" />
// <meta property="og:description" content="MS student @ NYU · Data Science / ML" />
// <meta property="og:image" content="/og_image.jpg" />
// <link rel="icon" href="/avatar512.jpg" />

