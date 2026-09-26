"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight text-white">
        Something Went Wrong
      </p>
      <p className="mt-2 max-w-sm text-white/50">
        We couldn&apos;t load the workout data right now. This is usually
        temporary — please try again in a moment.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black transition hover:brightness-95"
      >
        <RefreshCcw size={16} strokeWidth={2.5} />
        Try Again
      </button>
    </main>
  );
}
