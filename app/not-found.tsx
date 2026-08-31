import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70dvh] max-w-[1400px] flex-col items-center justify-center px-5 text-center">
        <Image src="/icon.svg" alt="" width={44} height={52} aria-hidden />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          This page took a wrong turn.
        </h1>
        <p className="mt-2 max-w-[38ch] text-[15px] text-stone-500">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-xl bg-ink px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-stone-700"
        >
          Back to CareTrove
        </Link>
      </main>
      <Footer />
    </>
  );
}
