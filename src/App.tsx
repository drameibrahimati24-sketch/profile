import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Check,
  Code2,
  Command,
  Github,
  GraduationCap,
  Layers3,
  Mail,
  Menu,
  Moon,
  Network,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

const profile = {
  name: "Drame Ibrahima",
  university: "Nusa Putra University",
  degree: "Bachelor's Degree Student",
  field: "Computer Science / Informatics",
  focus: "AI Engineering",
  email: "your.email@example.com",
};

const navigation = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Education & Experience", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const skillGroups = [
  {
    title: "AI & machine learning",
    number: "01",
    icon: BrainCircuit,
    skills: ["Machine Learning", "Deep Learning", "Artificial Intelligence"],
  },
  {
    title: "Programming",
    number: "02",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Web development",
    number: "03",
    icon: Layers3,
    skills: ["HTML", "CSS", "React"],
  },
  {
    title: "Tools & technologies",
    number: "04",
    icon: Command,
    skills: ["Git", "GitHub", "VS Code"],
  },
];

const projects = [
  {
    number: "01",
    category: "Artificial intelligence",
    title: "Intelligent systems",
    description:
      "An exploration of how AI can turn complex ideas into useful, human-centered solutions.",
    tags: ["Artificial Intelligence", "Python", "Editable sample"],
    icon: BrainCircuit,
    visual: "project-visual--network",
  },
  {
    number: "02",
    category: "Machine learning",
    title: "Learning from data",
    description:
      "A place for experiments in machine learning, thoughtful evaluation, and making data more meaningful.",
    tags: ["Machine Learning", "Data", "Editable sample"],
    icon: Network,
    visual: "project-visual--orbit",
  },
  {
    number: "03",
    category: "Web development",
    title: "Ideas into interfaces",
    description:
      "A modern web experience built to make technical ideas approachable, clear, and enjoyable to use.",
    tags: ["React", "TypeScript", "Editable sample"],
    icon: Code2,
    visual: "project-visual--grid",
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function NeuralVisual() {
  const nodes = [
    { x: 18, y: 30, className: "node--small" },
    { x: 31, y: 19, className: "" },
    { x: 32, y: 48, className: "node--small" },
    { x: 47, y: 31, className: "node--large" },
    { x: 47, y: 64, className: "" },
    { x: 61, y: 20, className: "node--small" },
    { x: 63, y: 47, className: "" },
    { x: 78, y: 35, className: "node--large" },
    { x: 76, y: 65, className: "node--small" },
    { x: 89, y: 52, className: "" },
  ];
  const edges = [
    [18, 30, 31, 19], [18, 30, 32, 48], [31, 19, 47, 31], [32, 48, 47, 31],
    [32, 48, 47, 64], [47, 31, 61, 20], [47, 31, 63, 47], [47, 64, 63, 47],
    [61, 20, 78, 35], [63, 47, 78, 35], [63, 47, 76, 65], [78, 35, 89, 52],
    [76, 65, 89, 52],
  ];
  return (
    <div className="neural-visual" aria-label="Abstract neural network illustration" role="img">
      <div className="visual-orbit visual-orbit--one" />
      <div className="visual-orbit visual-orbit--two" />
      <svg className="neural-lines" viewBox="0 0 100 85" aria-hidden="true">
        {edges.map(([x1, y1, x2, y2], index) => (
          <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </svg>
      <div className="visual-core"><Atom size={29} strokeWidth={1.25} /></div>
      {nodes.map((node, index) => (
        <span
          key={index}
          className={`neural-node ${node.className}`}
          style={{ left: `${node.x}%`, top: `${node.y}%`, animationDelay: `${index * -0.31}s` }}
        />
      ))}
      <div className="visual-label visual-label--top"><span className="status-dot" /> NEURAL SYSTEMS / 01</div>
      <div className="visual-label visual-label--bottom"><span>INPUT</span><i /><span>PROCESS</span><i /><span>INSIGHT</span></div>
      <span className="visual-coordinate">AI // 01</span>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
  );
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#080b14" : "#f4f6fb",
    );
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");
  const closeMenu = () => setMenuOpen(false);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get("subject")));
    const body = encodeURIComponent(
      `From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`,
    );
    setFormMessage("Your email app is opening with a draft. This site does not send or store messages.");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="site-shell min-h-screen">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${profile.name}, home`} onClick={closeMenu}>
          <span className="brand-mark">DI<span>.</span></span>
          <span className="brand-name">{profile.name}<small>AI ENGINEERING / PORTFOLIO</small></span>
        </a>
        <button
          className="menu-toggle icon-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <button
            className="theme-toggle icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="status-dot" /> COMPUTER SCIENCE STUDENT <span className="eyebrow-slash">/</span> {profile.focus.toUpperCase()}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Exploring intelligence.
              <span> Engineering <em>the future.</em></span>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
            >
              I’m <strong>{profile.name}</strong>, an aspiring AI Engineer exploring how intelligent systems and thoughtful software can make a meaningful difference.
            </motion.p>
            <motion.div
              className="hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.5 }}
            >
              <GraduationCap size={16} />
              <span>{profile.degree}<i>·</i>{profile.university}</span>
            </motion.div>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
            >
              <a className="button button-primary" href="#projects">Explore my projects <ArrowUpRight size={16} /></a>
              <a className="button button-secondary" href="#contact">Let’s connect <ArrowRight size={15} /></a>
            </motion.div>
            <motion.a className="scroll-cue" href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <span>SCROLL TO EXPLORE</span><ArrowDown size={14} />
            </motion.a>
          </div>
          <motion.div
            className="hero-art-wrap"
            initial={{ opacity: 0, scale: 0.96, x: 14 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <NeuralVisual />
            <div className="art-caption"><Sparkles size={14} /><span>Curiosity, connected.</span><span className="caption-index">FIG. 01</span></div>
          </motion.div>
          <div className="hero-index">01 <span>/</span> 05</div>
        </section>

        <section className="about section-wrap section-block" id="about">
          <Reveal className="section-heading">
            <p className="eyebrow section-kicker"><span>01</span> / A LITTLE ABOUT ME</p>
            <h2>Curiosity is where<br /><em>good questions begin.</em></h2>
          </Reveal>
          <div className="about-layout">
            <Reveal className="about-lead">
              <p className="lead-text">I’m a Computer Science student at Nusa Putra University, specializing in AI Engineering.</p>
              <p className="body-copy">My interests lie at the intersection of intelligent systems, software development, and emerging technologies. I enjoy exploring how artificial intelligence can transform ideas into meaningful solutions.</p>
              <p className="body-copy">I’m especially curious about machine learning, thoughtful engineering, and the many ways technology can help solve real problems.</p>
              <a className="text-link" href="#education">A little more about my path <ArrowDownRight size={16} /></a>
            </Reveal>
            <Reveal className="about-aside" delay={0.12}>
              <div className="about-aside-top"><span className="aside-symbol"><Atom size={21} /></span><span>THE INTERSECTION</span></div>
              <div className="intersection-row"><span>Artificial intelligence</span><span>01</span></div>
              <div className="intersection-row"><span>Software engineering</span><span>02</span></div>
              <div className="intersection-row"><span>Curiosity & discovery</span><span>03</span></div>
              <p>Learning by building, asking better questions, and staying open to what’s next.</p>
            </Reveal>
          </div>
        </section>

        <section className="education section-wrap section-block" id="education">
          <Reveal className="section-heading section-heading-row">
            <div>
              <p className="eyebrow section-kicker"><span>02</span> / THE LEARNING PATH</p>
              <h2>Grounded in learning.<br /><em>Looking ahead.</em></h2>
            </div>
            <p className="heading-note">A foundation in computer science, with room to keep exploring.</p>
          </Reveal>
          <div className="timeline">
            <Reveal className="timeline-entry">
              <div className="timeline-rail"><span className="timeline-dot" /><span className="timeline-line" /></div>
              <article className="education-card">
                <div className="education-card-top">
                  <span className="mini-label">EDUCATION <span>·</span> CURRENT</span>
                  <span className="edit-note">DATES EDITABLE</span>
                </div>
                <h3>Bachelor’s Degree</h3>
                <p className="institution">{profile.university}</p>
                <p className="body-copy">{profile.field}, specializing in <strong>{profile.focus}</strong>.</p>
                <div className="education-tags"><span>Computer Science</span><span>AI Engineering</span></div>
                <span className="date-placeholder">[ Add study dates ]</span>
              </article>
            </Reveal>
            <Reveal className="timeline-entry" delay={0.12}>
              <div className="timeline-rail"><span className="timeline-dot timeline-dot--violet" /><span className="timeline-line timeline-line--short" /></div>
              <article className="education-card projects-card">
                <div className="education-card-top"><span className="mini-label">EXPLORATION <span>·</span> IN PROGRESS</span><span className="edit-note">GROWING THROUGH PRACTICE</span></div>
                <h3>Academic & personal projects</h3>
                <p className="body-copy">A space for coursework, independent experiments, research interests, and future collaborations. No professional experience listed.</p>
                <a className="text-link" href="#projects">See project placeholders <ArrowUpRight size={15} /></a>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="skills section-wrap section-block">
          <Reveal className="section-heading section-heading-row">
            <div>
              <p className="eyebrow section-kicker"><span>03</span> / TOOLS I’M EXPLORING</p>
              <h2>Building blocks,<br /><em>still in progress.</em></h2>
            </div>
            <p className="heading-note">Areas of interest and sample technologies. No proficiency scores—just room to grow.</p>
          </Reveal>
          <div className="skill-grid">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} className="skill-card" delay={index * 0.08}>
                  <div className="skill-card-top"><span className="skill-icon"><Icon size={17} strokeWidth={1.7} /></span><span className="skill-number">{group.number}</span></div>
                  <h3>{group.title}</h3>
                  <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="projects section-wrap section-block" id="projects">
          <Reveal className="section-heading section-heading-row">
            <div>
              <p className="eyebrow section-kicker"><span>04</span> / SELECTED DIRECTIONS</p>
              <h2>Ideas worth<br /><em>making real.</em></h2>
            </div>
            <p className="heading-note">Editable project concepts—replace these with your own work and links.</p>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Reveal className="project-card" key={project.number} delay={index * 0.1}>
                  <div className={`project-visual ${project.visual}`}>
                    <span className="project-visual-index">{project.number} / PROJECT</span>
                    <Icon className="project-visual-icon" size={40} strokeWidth={1.1} />
                    <span className="visual-orbit-mark" />
                    <span className="visual-cross visual-cross--one">+</span>
                    <span className="visual-cross visual-cross--two">+</span>
                    <span className="visual-coordinate project-coordinate">CONCEPT — EDIT ME</span>
                  </div>
                  <div className="project-content">
                    <p className="mini-label">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="body-copy">{project.description}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="project-links"><span><Github size={14} /> Add repository URL</span><span className="link-placeholder">Demo link to be added</span></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="project-footnote"><span className="status-dot" /> These are editable sample entries, not claims of completed work.</Reveal>
        </section>

        <section className="contact section-wrap section-block" id="contact">
          <Reveal className="section-heading">
            <p className="eyebrow section-kicker"><span>05</span> / OPEN TO CONVERSATION</p>
            <h2>Let’s build something<br /><em>meaningful.</em></h2>
          </Reveal>
          <div className="contact-layout">
            <Reveal className="contact-intro">
              <p className="lead-text">Have an idea, a question, or a shared curiosity about AI?</p>
              <p className="body-copy">I’d love to hear from you. Reach out to say hello, exchange ideas, or explore a project together.</p>
              <a className="email-card" href={`mailto:${profile.email}`}>
                <span className="email-icon"><Mail size={18} /></span>
                <span><small>EMAIL ME</small><strong>{profile.email}</strong></span>
                <ArrowUpRight size={16} />
              </a>
              <p className="edit-note contact-edit">Replace the sample email and social links with your own.</p>
              <div className="social-placeholders">
                <span><Github size={15} /> GitHub <small>ADD PROFILE LINK</small></span>
                <span><Network size={15} /> LinkedIn <small>ADD PROFILE LINK</small></span>
              </div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.14}>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-heading"><span>WRITE A NOTE</span><span className="form-required">* REQUIRED</span></div>
                <div className="form-row">
                  <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={100} /></label>
                  <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
                </div>
                <label>Subject<input name="subject" type="text" placeholder="What’s on your mind?" required maxLength={150} /></label>
                <label>Message<textarea name="message" rows={5} placeholder="A little context goes a long way..." required minLength={10} maxLength={3000} /></label>
                <div className="form-bottom">
                  <p>This opens your email app. No message is sent or stored here.</p>
                  <button className="button button-primary" type="submit">Open email draft <Send size={15} /></button>
                </div>
                {formMessage && <p className="form-status" role="status"><Check size={15} />{formMessage}</p>}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">DI<span>.</span></span></a>
        <p>Curious by nature. Building toward what’s next.</p>
        <a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={14} /></a>
        <span className="footer-copy">© {new Date().getFullYear()} {profile.name}</span>
      </footer>
    </div>
  );
}

export default App;
