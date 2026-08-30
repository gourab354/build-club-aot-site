import TraceDivider from './TraceDivider';
import SignalWave from './SignalWave';
import Reveal, { RevealStagger, RevealItem } from './Reveal';

const MENTORS = [
  {
    initials: 'PG',
    name: 'Pankaj Gogoi',
    role: 'Head of Operations',
    org: 'IIMCIP-TIC',
    image: '/pankaj.jpg',
    linkedin: 'https://www.linkedin.com/in/pankajgogoi/',
  },
  {
    initials: 'SR',
    name: 'Sankha Ray',
    role: 'Manager, Projects & Operations',
    org: 'IIMCIP-TIC',
    image: '/sankha.jpg',
    linkedin: 'https://www.linkedin.com/in/sankha-ray-9b161423/',
  },
  {
    initials: 'PD',
    name: 'Pragyan Sen Deka',
    role: 'Associate',
    org: 'IIMCIP-TIC',
    image: '/pragyan.jpg',
    linkedin: 'https://www.linkedin.com/in/pragyan-sen-deka-608a74219/',
  },
  {
    initials: 'AB',
    name: 'Aparup Banerjee',
    role: 'Associate',
    org: 'IIMCIP-TIC',
    image: '/aparup.jpg',
    linkedin: 'https://www.linkedin.com/in/aparup-banerjee-4aa69727b/',
  },
];

const TEAM = [
  {
    initials: 'AP',
    name: 'Archisman Pal',
    role: 'Secretary',
    image: '/archisman.jpg',
    linkedin: 'https://www.linkedin.com/in/archisman-pal-32554632a/',
  },
  {
    initials: 'SS',
    name: 'Swastik Saha',
    role: 'Secretary',
    image: '/swastik.jpg',
    linkedin: 'https://www.linkedin.com/in/swastik-saha-aot/',
  },
  {
    initials: 'GD',
    name: 'Gourab Dutta',
    role: 'Vice Secretary',
    image: '/gourab.jpg',
    linkedin: 'https://www.linkedin.com/in/gourabdutta354/',
  },
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
            Meet the experienced mentors and dedicated core team driving our mission forward.
          </p>
        </Reveal>

        <h3 className="group-label">IIMCIP-TIC &amp; faculty mentors</h3>
        <RevealStagger className="people-grid">
          {MENTORS.map((m) => {
            const cardContent = (
              <>
                <div className="person-card__avatar">
                  {m.image && (
                    <img
                      src={m.image}
                      alt={m.name}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.style.display = 'flex';
                      }}
                    />
                  )}
                  <span
                    style={{
                      display: m.image ? 'none' : 'flex',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {m.initials}
                  </span>
                </div>
                <h4>{m.name}</h4>
                <p className="person-card__role">{m.role}</p>
                <p className="person-card__org">{m.org}</p>
              </>
            );

            return (
              <RevealItem key={m.name} className="person-card">
                {m.linkedin ? (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="person-card__link">
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </RevealItem>
            );
          })}
        </RevealStagger>

        <h3 className="group-label">Core student team</h3>
        <RevealStagger className="people-grid">
          {TEAM.map((m, i) => {
            const cardContent = (
              <>
                <div className="person-card__avatar">
                  {m.image && (
                    <img
                      src={m.image}
                      alt={m.name}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.style.display = 'flex';
                      }}
                    />
                  )}
                  <span
                    style={{
                      display: m.image ? 'none' : 'flex',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {m.initials}
                  </span>
                </div>
                <h4>{m.name}</h4>
                <p className="person-card__role">{m.role}</p>
              </>
            );

            return (
              <RevealItem key={i} className="person-card person-card--dim">
                {m.linkedin ? (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="person-card__link">
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
      <TraceDivider />
    </section>
  );
}
