import { motion } from 'framer-motion';
import TraceDivider from './TraceDivider';
import SignalWave from './SignalWave';
import { RevealStagger, RevealItem } from './Reveal';

import secureTerminal from '../assets/projects/secure-terminal.jpg';
import fpvDrone from '../assets/projects/fpv-drone.jpg';
import matrixTetris from '../assets/projects/matrix-tetris.jpg';
import cratusBabyDoll from '../assets/projects/cratus-baby-doll.jpg';
import sonarRadar from '../assets/projects/sonar-radar.jpg';
import spectrumAnalyzer from '../assets/projects/spectrum-analyzer.jpg';
import chainTorque from '../assets/projects/chaintorque.jpg';
import autopilotDetector from '../assets/projects/autopilot-detector.jpg';

const PROJECTS = [
  {
    id: 'PRJ-01',
    title: 'Secure Terminal',
    tags: ['OLED', 'NeoPixel', 'Rotary Input'],
    body: 'A touch-armed access terminal — rotary input, OLED status readout, and a NeoPixel ring for live feedback.',
    status: 'Prototype',
    image: secureTerminal,
  },
  {
    id: 'PRJ-02',
    title: 'FPV Racer',
    tags: ['Flight Controller', 'FPV'],
    body: 'A self-built FPV racing quadcopter — frame, ESCs, and flight controller tuned and assembled from scratch.',
    status: 'Flying',
    image: fpvDrone,
  },
  {
    id: 'PRJ-03',
    title: 'Matrix Tetris',
    tags: ['MAX7219', 'Dot-Matrix', 'Game'],
    body: 'Full Tetris, playable on a chained MAX7219 LED dot-matrix display with breadboard button controls.',
    status: 'Shipped',
    image: matrixTetris,
  },
  {
    id: 'PRJ-04',
    title: 'Cratus: Baby Doll',
    tags: ['Combat Robot', 'Welded Chassis'],
    body: 'A welded-steel combat robot built for the arena — spike weapon, reinforced wheels, hand-painted livery.',
    status: 'Battle-tested',
    image: cratusBabyDoll,
  },
  {
    id: 'PRJ-05',
    title: 'Sonar Radar',
    tags: ['HC-SR04', 'Ultrasonic', 'Live Viz'],
    body: 'An ultrasonic sweep radar with a live sweeping display, plotting distance and angle in real time.',
    status: 'Prototype',
    image: sonarRadar,
  },
  {
    id: 'PRJ-06',
    title: 'Spectrum Analyzer',
    tags: ['I2S Mic', 'DSP', 'Live Plot'],
    body: 'Real-time audio analyzer splitting incoming sound into bass, mid, and high bands over a live serial plot.',
    status: 'Prototype',
    image: spectrumAnalyzer,
  },
  {
    id: 'PRJ-07',
    title: 'ChainTorque',
    tags: ['WebGL', 'React', 'Web3'],
    body: 'A browser-based 3D CAD viewer for engine components, with on-chain verified ownership of models.',
    status: 'In progress',
    image: chainTorque,
  },
  {
    id: 'PRJ-08',
    title: 'Autopilot',
    tags: ['Dashboard', 'Analytics'],
    body: 'A focus-tracking dashboard that scores cognitive drift in real time and nudges you back on task.',
    status: 'In progress',
    image: autopilotDetector,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <SignalWave color="var(--led-amber)" className="section-wave" speed={9} />
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">What we've built</div>
          <h2>Gadgets on the bench</h2>
          <p className="section-head__body">
            A running log of what the club has actually shipped — hardware,
            firmware, and the odd web dashboard along the way.
          </p>
        </div>

        <RevealStagger className="project-grid">
          {PROJECTS.map((p) => (
            <RevealItem key={p.id}>
              <motion.article
                className="project-card"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className="project-card__glow" />
                <div className="project-card__top">
                  <span className="project-card__id">{p.id}</span>
                  <span className="project-card__status">{p.status}</span>
                </div>
                <div className="project-card__media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <h3>{p.title}</h3>
                <p className="project-card__body">{p.body}</p>
                <div className="project-card__tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
      <TraceDivider />
    </section>
  );
}
