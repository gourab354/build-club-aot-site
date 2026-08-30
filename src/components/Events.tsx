import TraceDivider from './TraceDivider';
import SignalWave from './SignalWave';
import Reveal, { RevealStagger, RevealItem } from './Reveal';

const EVENTS = [
  { id: 'EV-01', title: 'Kickstart Workshop', date: 'Apr 2026', big: true, image: '/kickstart.jpg' },
  { id: 'EV-02', title: 'Workshop 1', date: 'TBA', image: '/workshop1.jpg' },
  { id: 'EV-03', title: 'Demo Day', date: 'TBA', image: '/demo-day.jpeg' },
  { id: 'EV-04', title: 'Event 2', date: 'TBA', image: '/event2.JPG' },
];

export default function Events() {
  return (
    <section id="events" className="events">
      <SignalWave color="var(--led-violet)" className="section-wave" speed={12} />
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Gallery</div>
          <h2>Workshops, builds &amp; demo days</h2>
          <p className="section-head__body">
            Placeholder gallery — drop in photos from the Kickstart Workshop
            and future events any time.
          </p>
        </Reveal>

        <RevealStagger className="event-grid">
          {EVENTS.map((e) => (
            <RevealItem
              key={e.id}
              className={`event-tile ${e.big ? 'event-tile--big' : ''}`}
            >
              {e.image ? (
                <img
                  src={e.image}
                  alt={e.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                  onError={(err) => {
                    err.currentTarget.style.display = 'none';
                    const next = err.currentTarget.nextElementSibling as HTMLElement;
                    if (next) next.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="event-tile__placeholder"
                style={{ display: e.image ? 'none' : 'flex' }}
              >
                <span>{e.id}</span>
              </div>
              <div className="event-tile__meta">
                <p className="event-tile__title">{e.title}</p>
                <p className="event-tile__date">{e.date}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
      <TraceDivider />
    </section>
  );
}
