/* The CareTrove pin, lifted from the brand logo */
export default function BrandPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 30" aria-hidden className={className}>
      <path
        d="M13 1C6.9 1 2 5.8 2 11.7 2 19.6 13 29 13 29s11-9.4 11-17.3C24 5.8 19.1 1 13 1z"
        fill="#F15A25"
      />
      <circle cx="13" cy="11.4" r="4.2" fill="#ffffff" />
    </svg>
  );
}
