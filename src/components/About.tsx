import TraceDivider from './TraceDivider';
import SignalWave from './SignalWave';
import Reveal, { RevealStagger, RevealItem } from './Reveal';

const PILLARS = [
  {
    tag: 'R01',
    title: 'Product & prototyping',
    body: 'From a napkin sketch to a working enclosure — we design, wire, code, and iterate until it actually works on the desk in front of us.',
  },
  {
    tag: 'R02',
    title: 'Mentorship that ships',
    body: 'IIMCIP-TIC mentors sit with us through the build, not just the pitch — reviewing prototypes, unblocking hard problems, and pushing scope down to something shippable.',
  },
  {
    tag: 'R03',
    title: 'Kits & resources',
    body: 'Starter component kits, lab access, and a growing shelf of sensors, boards, and tools so an idea never dies for lack of a part.',
  },
  {
    tag: 'R04',
    title: 'Incubation pathway',
    body: 'The strongest builds get a path forward — hackathon entries, demo days, and support toward AOT\u2019s incubator and IIMCIP-TIC\u2019s network.',
  },
];

export default function About() {
  return (
    <section id="about" className="about">
      <SignalWave color="var(--brand-blue-bright)" className="section-wave" speed={10} />
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Who we are</div>
          <h2>
            A build-first club, backed by an
            <br />
            institute-grade innovation council.
          </h2>
          <p className="section-head__body">
            Build Club AOT is a collaborative initiative between Academy of
            Technology and IIMCIP–Technology and Innovation Council, set up
            under the IIM Calcutta Innovation Park. The brief is simple:
            fewer slide decks, more working circuits — while mentors from
            IIMCIP-TIC and AOT faculty guide the path from concept to
            prototype to (eventually) incubation.
          </p>
        </Reveal>

        <RevealStagger className="pillars">
          {PILLARS.map((p) => (
            <RevealItem key={p.tag} className="pillar-card">
              <span className="pillar-card__tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
      <TraceDivider />
    </section>
  );
}
