import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import Reveal from './Reveal';
import SignalWave from './SignalWave';

export default function Join() {
  return (
    <section id="join" className="join">
      <SignalWave color="var(--trace-teal)" className="section-wave" speed={10} />
      <div className="container join__inner">
        <Reveal>
          <div className="eyebrow">Get involved</div>
          <h2>
            Got an idea that needs
            <br />
            a breadboard and a deadline?
          </h2>
          <p className="join__body">
            We're always looking for first-years and seniors alike who'd
            rather build the thing than talk about it. No prior hardware
            experience required — just curiosity and a willingness to
            desolder something at 11pm.
          </p>
          <div className="hero__actions">
            <motion.a
              href="mailto:buildclub@aot.edu.in"
              className="btn btn--primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Email the club
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/company/buildclub-aot/"
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Follow on LinkedIn
            </motion.a>
          </div>
        </Reveal>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <img src={logo} alt="Build Club AOT" className="footer__logo" />
          <p className="footer__tag">
            AOT × IIMCIP-TIC — Academy of Technology, Adisaptagram
          </p>
          <p className="footer__copy">
            © {new Date().getFullYear()} Build Club AOT. Built by the club,
            for the club.
          </p>
        </div>
      </footer>
    </section>
  );
}
