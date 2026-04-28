'use client';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'listings', label: 'Featured Listings' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About Us' },
  { id: 'certs', label: 'Certifications' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'blog', label: 'Blog' },
  { id: 'footer', label: 'Contact' },
];

export default function SidebarNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sidebar-nav">
      {SECTIONS.map(({ id, label }, i) => (
        <div key={id}>
          {i > 0 && <div className="sidebar-dot"><div className="dot-line" /></div>}
          <div
            className={`sidebar-dot${active === id ? ' active' : ''}`}
            data-target={id}
            onClick={() => scrollTo(id)}
          >
            <div className="dot" />
            <span className="label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
