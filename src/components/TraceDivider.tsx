export default function TraceDivider({ label }: { label?: string }) {
  return (
    <div className="trace-divider">
      <svg
        viewBox="0 0 1180 40"
        preserveAspectRatio="none"
        className="trace-divider__svg"
        aria-hidden="true"
      >
        <path
          d="M0 20 H420 L450 6 H730 L760 20 H1180"
          fill="none"
          stroke="var(--line-bright)"
          strokeWidth="1.5"
        />
        <circle cx="450" cy="6" r="3" fill="var(--trace-teal)" />
        <circle cx="760" cy="20" r="3" fill="var(--trace-teal)" />
      </svg>
      {label && <span className="trace-divider__label">{label}</span>}
    </div>
  );
}
