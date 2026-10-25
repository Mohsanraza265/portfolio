import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { request } from './api';
import profile from './images/profile.png';
import { projectImage } from './projectImages';
gsap.registerPlugin(ScrollTrigger);
const categories = ['All', 'React / Next.js', 'WordPress', 'Webflow', 'Vue.js'];

export default function Portfolio() {
  const [data, setData] = useState(null); const [filter, setFilter] = useState('All'); const root = useRef();
  useEffect(() => { request('/portfolio').then(setData).catch(() => setData({ skills: [], experience: [], projects: [], settings: {} })); }, []);
  useLayoutEffect(() => {
    if (!data || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: 'power3.out' } });
      hero.from('.hero-eyebrow', { autoAlpha: 0, y: 14, duration: .4 })
        .from('.hero-copy > *', { autoAlpha: 0, y: 42, duration: .8, stagger: .12 }, '-=.05')
        .from('.hero-portrait', { autoAlpha: 0, scale: .86, y: 28, duration: .9 }, '-=.7')
        .from('.hero-stat', { autoAlpha: 0, x: 24, duration: .65 }, '-=.62');
      gsap.to('.hero-portrait', { y: -10, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.9 });
      gsap.utils.toArray('.reveal').forEach((section) => gsap.from(section, { autoAlpha: 0, y: 44, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 86%', end: 'bottom 14%', toggleActions: 'play reverse play reverse' } }));
      gsap.utils.toArray('.skill-group').forEach((item) => gsap.from(item, { autoAlpha: 0, y: 22, duration: .45, scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play reverse play reverse' } }));
      gsap.utils.toArray('.job').forEach((item) => gsap.from(item, { autoAlpha: 0, x: -25, duration: .5, scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play reverse play reverse' } }));
      gsap.to('.orb-one', { y: -32, x: 20, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root); return () => ctx.revert();
  }, [data]);
  const projects = useMemo(() => (data?.projects || []).filter((project) => filter === 'All' || project.category === filter), [data, filter]);
  const grouped = useMemo(() => (data?.skills || []).reduce((all, skill) => ({ ...all, [skill.category]: [...(all[skill.category] || []), skill] }), {}), [data]);
  useLayoutEffect(() => { if (!data || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const ctx = gsap.context(() => { gsap.from('.project', { autoAlpha: 0, y: 28, duration: .55, stagger: .11, scrollTrigger: { trigger: '.project-grid', start: 'top 86%', toggleActions: 'play reverse play reverse' } }); requestAnimationFrame(() => ScrollTrigger.refresh()); }, root); return () => ctx.revert(); }, [data, filter]);
  if (!data) return <div className="loader">MR</div>;
  const { settings = {} } = data;
  return <main ref={root}>
    <nav className="nav"><a className="brand" href="#top">MR<span>.</span></a><div className="navlinks"><a href="#about">About</a><a href="#skills">Expertise</a><a href="#experience">Experience</a><a href="#projects">Work</a></div><a className="nav-cta" href="#contact">Let’s talk ↗</a></nav>
    <section id="top" className="hero section"><div className="orb orb-one" /><div className="hero-eyebrow eyebrow">AVAILABLE FOR SELECT PROJECTS</div><div className="hero-grid"><div className="hero-copy"><p className="overline">{settings.headline}</p><h1>Interfaces with<br /><em>intention.</em></h1><p className="lede">{settings.intro}</p><div className="actions"><a className="button" href="#projects">Explore selected work ↓</a><a className="text-link" href={settings.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div><div className="hero-portrait"><div className="portrait-glow" /><img src={profile} alt="Mohsan Raza" /></div><div className="hero-stat"><span className="stat-line" /><strong>04+</strong><p>years creating thoughtful web experiences across product, marketing, and commerce.</p></div></div></section>
    <section id="about" className="section about reveal"><p className="overline">01 / PROFILE</p><h2>A detail-led frontend partner for brands that care about how the web <em>feels.</em></h2><p>I combine clean engineering with a sharp eye for interaction, performance, and the journey between them. From flexible CMS builds to product interfaces, every decision is made to earn attention and make the next step feel obvious.</p></section>
    <section id="skills" className="section reveal"><div className="section-head"><p className="overline">02 / CAPABILITIES</p><h2>Tools, taste &amp; <em>technical range.</em></h2></div><div className="skill-grid">{Object.entries(grouped).map(([title, items]) => <article className="skill-group" key={title}><h3>{title}</h3><div>{items.sort((a, b) => a.order - b.order).map((skill) => <span key={skill.id}>{skill.name}</span>)}</div></article>)}</div></section>
    <section id="experience" className="section reveal"><div className="section-head"><p className="overline">03 / EXPERIENCE</p><h2>Building from the <em>inside out.</em></h2></div><div className="timeline">{data.experience.sort((a, b) => a.order - b.order).map((job) => <article className="job" key={job.id}><div className="job-meta"><span>{job.date}</span><strong>{job.company}</strong></div><div><h3>{job.title}</h3><ul>{job.responsibilities.map((line, index) => <li key={index}>{line}</li>)}</ul></div></article>)}</div></section>
    <section id="projects" className="section projects reveal"><div className="section-head"><p className="overline">04 / SELECTED WORK</p><h2>A few things I’ve helped <em>bring to life.</em></h2></div><div className="filters">{categories.map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div><div className="project-grid">{projects.map((project) => <article className="project" key={project.id}><div className="project-image"><img src={projectImage(project.image)} alt={project.title} /><span>{project.category}</span></div><div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map((tech) => <i key={tech}>{tech}</i>)}</div><div className="project-links">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live site ↗</a>}{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}</div></div></article>)}</div>{!projects.length && <p className="empty">No published projects in this category yet.</p>}</section>
    <section id="contact" className="contact section reveal"><p className="overline">05 / CONTACT</p><h2>Have a good problem?<br /><em>Let’s solve it.</em></h2><a className="contact-email" href={`mailto:${settings.email}`}>{settings.email} <span>↗</span></a><div className="contact-bottom"><span>© {new Date().getFullYear()} {settings.name}</span><a href={settings.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></section>
  </main>;
}
