/* Michigan mitten illustration carried over from the original CareTrove brand,
   recolored to the solid-orange pin system. */
export default function MichiganMap({ className }: { className?: string }) {
  const pin = (
    <>
      <path
        d="M13 1C6.9 1 2 5.8 2 11.7 2 19.6 13 29 13 29s11-9.4 11-17.3C24 5.8 19.1 1 13 1z"
        fill="#F37521"
      />
      <circle cx="13" cy="11.4" r="4.2" fill="#FAF6F0" />
    </>
  );
  return (
    <svg viewBox="0 0 200 250" aria-hidden className={className}>
      <path
        d="M62 18C48 40 36 70 32 102c-4 30 2 60 16 88 8 18 18 34 26 42h84c2-18 0-32-4-44-4-12-8-22-6-32 2-10 10-24 18-36 6-9 14-16 14-24 0-8-8-10-14-4-8 8-16 20-22 32-6 10-14 10-18 2-6-14-10-34-14-58C108 44 96 24 82 19c-6-3-14-4-20-1z"
        fill="none"
        stroke="#1c1917"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.35"
      />
      <path
        d="M58 148q34 14 56 34t14 24"
        fill="none"
        stroke="#1c1917"
        strokeWidth="1.1"
        strokeDasharray="2.5 4"
        opacity="0.3"
      />
      <g transform="translate(45 118)">{pin}</g>
      <g transform="translate(116.82 180.2) scale(0.86)">{pin}</g>
      <g transform="translate(142.82 168.2) scale(0.86)">{pin}</g>
    </svg>
  );
}
