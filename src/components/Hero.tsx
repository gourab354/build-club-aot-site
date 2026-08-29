import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const STATS = [
  { value: 'AOT × IIMCIP-TIC', label: 'PARTNERSHIP' },
  { value: '2026', label: 'FOUNDED' },
  { value: '4+', label: 'AWARDS WON' },
  { value: 'Idea → PCB', label: 'FROM IDEA TO GADGET' },
];

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__scrim" />
      <div className="container hero__content">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            className="eyebrow"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            IIMCIP–TIC × ACADEMY OF TECHNOLOGY
          </motion.div>

          <motion.img
            src={logo}
            alt="Build Club AOT"
            className="hero__logo"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          />

          <motion.h1
            className="hero__headline"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            We make, we innovate,
            <br />
            we <span className="grad">build the thing</span>
            <span className="hero__cursor">_</span>
          </motion.h1>

          <motion.p
            className="hero__sub"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            A student-run hardware &amp; electronics club at Academy of
            Technology, mentored by IIMCIP–Technology and Innovation
            Council. From breadboard sketch to working gadget — sensors,
            microcontrollers, and a lot of solder smoke.
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <motion.a
              href="#join"
              className="btn btn--primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Join the club
            </motion.a>
            <motion.a
              href="#projects"
              className="btn btn--ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              See what we've built
            </motion.a>
          </motion.div>

          <motion.dl
            className="hero__stats"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll-cue" aria-label="Scroll to about section">
        <span />
      </a>
    </section>
  );
}
