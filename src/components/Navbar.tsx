import { useState } from 'react';
import logo from '../assets/logo.png';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#mentors', label: 'Mentors' },
  { href: '#projects', label: 'Projects' },
  { href: '#events', label: 'Events' },
  { href: '#join', label: 'Join' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="Build Club AOT logo" />
        </a>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#join" className="navbar__cta" onClick={() => setOpen(false)}>
            Join the club
          </a>
        </nav>

        <button
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
