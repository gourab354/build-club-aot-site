import TraceDivider from './TraceDivider';
import SignalWave from './SignalWave';
import Reveal, { RevealStagger, RevealItem } from './Reveal';

const EVENTS = [
  { id: 'EV-01', title: 'Kickstart Workshop', date: 'Apr 2026', big: true },
  { id: 'EV-02', title: 'Add event photo', date: 'TBA' },
  { id: 'EV-03', title: 'Add event photo', date: 'TBA' },
  { id: 'EV-04', title: 'Add event photo', date: 'TBA' },
  { id: 'EV-05', title: 'Add event photo', date: 'TBA' },
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
              <div className="event-tile__placeholder">
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
