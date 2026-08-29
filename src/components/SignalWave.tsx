const WAVE_PATH =
  'M0 30 C 20 5, 40 5, 60 30 S 100 55, 120 30 S 160 5, 180 30 S 220 55, 240 30 S 280 5, 300 30 S 340 55, 360 30 S 400 5, 420 30 S 460 55, 480 30 S 520 5, 540 30 S 580 55, 600 30';

export default function SignalWave({
  color = 'var(--brand-blue-bright)',
  className = '',
  speed = 9,
}: {
  color?: string;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`signal-wave ${className}`} aria-hidden="true">
      <div
        className="signal-wave__track"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox="0 0 600 60"
            preserveAspectRatio="none"
            className="signal-wave__svg"
          >
            <path d={WAVE_PATH} fill="none" stroke={color} strokeWidth="2" />
          </svg>
        ))}
      </div>
    </div>
  );
}
