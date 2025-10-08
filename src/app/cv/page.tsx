"use client";
import React from "react";

/* ------------------------------- Data ------------------------------------- */
const EDUCATION = [
  {
    school: "New York University — Center for Data Science",
    program: "M.S. in Data Science (MSDS)",
    details: "Focus: machine learning and data-centric systems.",
    time: "Sep 2025 – May 2027 (Expected)",
  },
  {
    school: "New York University — College of Arts & Science",
    program:
      "B.A., Joint Major in Data Science & Computer Science; Minor in Business Studies",
    details: "Dean’s List; Founder’s Day Award.",
    time: "Sep 2021 – May 2025",
  },
];

const CERTS = [
  {
    title: "Machine Learning Specialization — Stanford Online & Coursera",
    image: "/ml_specialization.pdf",
  },
  {
    title: "Deep Learning Specialization — DeepLearning.AI",
    image: "/dl_specialization.pdf",
  },
  {
    title: "Google Data Analytics Professional Certificate — Google",
    image: "/google_data_analytics.pdf",
  },
];

/* ---------------------------- UI helpers ---------------------------------- */
function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">{children}</div>;
}
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[1000ms] ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */
export default function CVPage() {
  const [open, setOpen] = React.useState<null | { title: string; image?: string }>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f7] to-white text-gray-800">
      {/* Apple-like dark nav with ZZ icon */}
      <header className="sticky top-0 z-30 bg-[#1d1d1f]/95 backdrop-blur">
        <nav className="max-w-5xl mx-auto px-6 md:px-8 h-10 md:h-11.5 flex items-center justify-between text-gray-300">
          <a href="/" className="inline-flex items-center gap-2">
            <img src="/zz_white_180.png" alt="ZZ" className="h-4 w-4 md:h-5 md:w-5 opacity-80" />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="/" className="hover:text-white/90">Home</a>
            <a href="/cv" className="hover:text-white/90">CV</a>
          </div>
        </nav>
      </header>

      {/* Title + Download */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-10 md:pt-16">
        <Reveal className="flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Curriculum Vitae</h1>
          <a href="/cv.pdf" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            Download PDF
          </a>
        </Reveal>
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

      {/* Certificates */}
      <Section id="certs" title="Certificates">
        <Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {CERTS.map((c) => (
              <Card key={c.title}>
                <button onClick={() => setOpen(c)} className="w-full text-left p-5 hover:bg-gray-50 rounded-2xl">
                  <div className="text-lg md:text-xl font-medium text-gray-900">{c.title}</div>
                  <div className="text-xs text-gray-500 mt-1">Click to view</div>
                </button>
              </Card>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 md:px-8 py-12 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {new Date().getFullYear()} Zichao Zhang</div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="hover:opacity-70">Home</a>
            <a href="#" className="hover:opacity-70">Top</a>
          </div>
        </div>
      </footer>

      {/* Modal for certificate preview */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(null)} />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">{open.title}</h3>
              <button onClick={() => setOpen(null)} className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">Close</button>
            </div>
            <div className="p-5">
              {open.image?.toLowerCase().endsWith(".pdf") ? (
                <iframe src={open.image} className="w-full h-[70vh] rounded-xl border border-gray-200" />
              ) : (
                <img src={open.image} alt="Certificate" className="w-full rounded-xl border border-gray-200" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}