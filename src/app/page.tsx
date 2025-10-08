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
  name: "Zichao Zhang",
  tagline: "MS student @ NYU · Data Science / ML",
  seeking: "Actively seeking Summer 2026 internships in Data Science / ML / AI.",
  email: "z.zichao01@gmail.com",
  github: "https://github.com/zzczdhc",
  linkedin: "https://www.linkedin.com/in/zichao-zhang-5a8162245/",
  instagram: "",
  resumeUrl: "#",
  location: "New York, NY",
  heroPhoto: "/portrait_web.jpg",
  ogImage: "/og_image.jpg",
};

const EDUCATION = [
  {
    school: "New York University — Center for Data Science",
    program: "M.S. in Data Science",
    details: "Graduate study focused on machine learning and data-centric systems.",
    time: "Sep 2025 – May 2027 (Expected)",
  },
  {
    school: "New York University — College of Arts & Science",
    program: "B.A. — Joint Major in Data Science & Computer Science; Minor in Business Studies",
    details: "Dean’s List; Founder’s Day Award.",
    time: "Sep 2021 – May 2025",
  },
];

// If you add screenshots into /public, reference them in `image`.
const PROJECTS = [
  {
    title: "Deepfake Facial Imagery Detection",
    description: "Detector using Error Level Analysis (ELA) and Grad‑CAM interpretability with strong cross‑dataset robustness.",
    details: "Developed augmentation and ELA pipeline to improve generalization; presented results to ~50 peers/faculty.",
    tags: ["Computer Vision", "Explainability"],
    image: "/deepfake.jpg",
    github: "https://github.com/zzczdhc/DS301-project-repo",
  },
  {
    title: "RAISE 2024 Finalist: Fear of AI Analysis",
    description: "NLP pipeline over 10k+ headlines with sentiment, emotion, and stance analysis; recognized as a national finalist.",
    details: "Built collection/cleaning, sentiment & emotion modeling, stance analysis, and reporting.",
    tags: ["NLP", "Competition"],
    image: "/raise.jpg",
    github: "https://github.com/zzczdhc/rutgers_project",
    artifact: "/raise_certificate.pdf", // optional: shows a second link in modal
  },
  {
    title: "Learning from 100 Images",
    description: "Data‑efficient vision with explainability; compact CNN trained with condensation + augmentation.",
    details: "Achieved strong accuracy on tiny data; built reproducible CLI and visual summaries.",
    tags: ["Efficient ML", "PyTorch"],
    image: "/fewshot.jpg",
    github: "#",
  },
  {
    title: "Responsible AI Audit for Home Credit ADS",
    description: "Bias analysis + imputation/pruning pipeline; large AUC gains with fairness improvements.",
    details: "Audited 120+ features; designed mitigation strategies and evaluation.",
    tags: ["Responsible AI", "Tabular ML"],
    image: "/fairness.jpg",
    github: "#",
  },
];

// Certificates become clickable tiles that open a modal with the screenshot
const CERTS = [
  {
    title: "Machine Learning Specialization — Andrew Ng (Coursera)",
    image: "/ml_specialization.pdf", // you can also use a JPG/PNG screenshot
  },
  {
    title: "Deep Learning Specialization — DeepLearning.AI / Coursera",
    image: "/dl_specialization.pdf",
  },
];

const NEWS = [
  { date: "2025‑08", text: "Decided to stay at NYU to pursue the M.S. in Data Science (MSDS)." },
  { date: "2025‑08", text: "Honored to join the teaching team as a TA for Causal Inference (DS‑UA 201) at NYU CDS." },
  { date: "2024‑11", text: "Collaborating with Daniel Berenberg in Kyunghyun Cho’s group on TM‑Vec; gave a short talk/demo at NYU CDS." },
  { date: "2024‑09", text: "Joined NYU Langone’s CN³ Lab to explore interactions between the visual cortex and hippocampus with ML." },
  { date: "2024‑04", text: "Our team reached the finals at RAISE 2024 with an NLP pipeline analyzing AI headlines." },
];

// --- Icons (inline SVG for portability) ------------------------------------
const Icon = ({ children, label }) => (
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

// --- Reveal / Scroll-in -----------------------------------------------------
function Reveal({ children, className = "" }) {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );
}

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
            <a href="#education" className="hover:opacity-70">Education</a>
            <a href="#projects" className="hover:opacity-70">Projects</a>
            <a href="#news" className="hover:opacity-70">News</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f7] to-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8 pt-10 md:pt-16 pb-4 md:pb-8 grid md:grid-cols-2 gap-10 items-start">
          {/* Left: name + intro paragraphs */}
          <Reveal className="space-y-4 pt-4 md:pt-6">
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-gray-900 md:whitespace-nowrap">{SITE.name}</h1>
            <p className="text-lg text-gray-700">{SITE.tagline}</p>
            <div className="text-[15px] leading-7 text-gray-700 space-y-3">
              <p>
                I’m an NYU MS in Data Science student focused on machine learning and data‑centric systems. I earned my B.A. at NYU with a joint major in Data Science & Computer Science and a minor in Business Studies.
              </p>
              <p>
                I work with <span className="font-medium">Daniel Berenberg</span> in <span className="font-medium">Kyunghyun Cho</span>’s group on TM‑Vec—tools and benchmarks for protein remote homology detection and structural alignment using deep learning. My role centers on extending the Python library (training/benchmarking utilities, data pipelines, and new features).
              </p>
              <p>
                At NYU Langone’s <span className="font-medium">CN³ Lab</span>, I combine large‑scale data analysis, ML modeling, and systems engineering to study interactions between the visual cortex and hippocampus.
              </p>
              <p>
                I’m currently seeking <span className="font-medium">Summer 2026</span> Data Science / ML internships.
              </p>
            </div>
          </Reveal>

          {/* Right: portrait card */}
          <Reveal className="md:justify-self-end w-full flex justify-end">
            <div className="relative bg-white rounded-[28px] shadow-lg border border-gray-200 overflow-hidden w-full max-w-md">
              <img src={SITE.heroPhoto} alt="Portrait of Zichao Zhang in NYU regalia" className="w-full h-full object-cover" loading="eager" />
            </div>
          </Reveal>
        </div>
      </section>

      

      {/* Education */}
      <Section id="education" title="Education">
        <Reveal>
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
        </Reveal>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Selected Projects">
        <Reveal>
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
        </Reveal>

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
      <Section id="news" title="News">
        <Reveal>
          <Card>
            <div className="p-6">
              <ul className="space-y-4">
                {NEWS.map((n, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 text-xs font-medium text-gray-500 w-20 shrink-0">{n.date}</div>
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
            <div className="flex flex-wrap gap-3">
              {openProject.github && (
                <a href={openProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">View on GitHub →</a>
              )}
              {openProject.artifact && (
                <a href={openProject.artifact} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">View certificate →</a>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Certificate modal */}
      <Modal open={!!openCert} onClose={() => setOpenCert(null)} title={openCert?.title}>
        {openCert && (
          <div className="space-y-4">
            {openCert.image ? (
              openCert.image.toLowerCase().endsWith('.pdf') ? (
                <iframe src={openCert.image} className="w-full h-[70vh] rounded-xl border border-gray-200" />
              ) : (
                <img src={openCert.image} alt="Certificate" className="w-full rounded-xl border border-gray-200" />
              )
            ) : (
              <p className="text-sm text-gray-700">Add a screenshot/PDF path in CERTS to display it here.</p>
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
