import Image from "next/image";

/* The official CareTrove leaf pin */
export default function BrandPin({ className }: { className?: string }) {
  return (
    <Image
      src="/pin.svg"
      alt=""
      width={141}
      height={220}
      aria-hidden
      className={className}
    />
  );
}
