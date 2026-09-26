import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-[var(--font-display)] text-7xl font-bold text-[#ccff00]">
        404
      </p>
      <h1 className="mt-4 font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight text-white">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-sm text-white/50">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black transition hover:brightness-95"
      >
        <Home size={16} strokeWidth={2.5} />
        Back to Home
      </Link>
    </main>
  );
}
