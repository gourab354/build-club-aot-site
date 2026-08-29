import TraceDivider from './TraceDivider';
import SignalWave from './SignalWave';
import Reveal, { RevealStagger, RevealItem } from './Reveal';

const MENTORS = [
  {
    initials: 'SR',
    name: 'Sankha Ray',
    role: 'Manager, Projects & Operations',
    org: 'IIMCIP-TIC',
  },
  {
    initials: 'PD',
    name: 'Pragyan Sen Deka',
    role: 'Associate',
    org: 'IIMCIP-TIC',
  },
  {
    initials: 'AB',
    name: 'Aparup Banerjee',
    role: 'Associate',
    org: 'IIMCIP-TIC',
  },
  {
    initials: 'PG',
    name: 'Dr. Partha Ghosh',
    role: 'Faculty Mentor',
    org: 'Academy of Technology',
  },
];

const TEAM = [
  { initials: 'YOU', name: 'Your name here', role: 'Core team' },
  { initials: '?', name: 'Add teammate', role: 'Core team' },
  { initials: '?', name: 'Add teammate', role: 'Core team' },
  { initials: '?', name: 'Add teammate', role: 'Core team' },
];

export default function Mentors() {
  return (
    <section id="mentors" className="mentors">
      <SignalWave color="var(--led-pink)" className="section-wave" speed={11} />
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Guidance</div>
          <h2>Mentors &amp; the core team</h2>
          <p className="section-head__body">
            Placeholder roster — swap in real names, roles, and photos any
            time.
          </p>
        </Reveal>

        <h3 className="group-label">IIMCIP-TIC &amp; faculty mentors</h3>
        <RevealStagger className="people-grid">
          {MENTORS.map((m) => (
            <RevealItem key={m.name} className="person-card">
              <div className="person-card__avatar">{m.initials}</div>
              <h4>{m.name}</h4>
              <p className="person-card__role">{m.role}</p>
              <p className="person-card__org">{m.org}</p>
            </RevealItem>
          ))}
        </RevealStagger>

        <h3 className="group-label">Core student team</h3>
        <RevealStagger className="people-grid">
          {TEAM.map((m, i) => (
            <RevealItem key={i} className="person-card person-card--dim">
              <div className="person-card__avatar">{m.initials}</div>
              <h4>{m.name}</h4>
              <p className="person-card__role">{m.role}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
      <TraceDivider />
    </section>
  );
}
