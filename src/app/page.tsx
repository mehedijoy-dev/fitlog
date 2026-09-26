import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-white/10 bg-[#111318] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#ccff00]">
                Workout Library
              </p>
              <h1 className="font-[var(--font-display)] text-3xl font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                Train with intent.
                <br />
                Log every set.
              </h1>
              <p className="mt-6 max-w-lg text-white/60">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                it into today&apos;s plan, and watch the week&apos;s work add
                up.
              </p>
              <a
                href="#library"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase text-black transition hover:brightness-95"
              >
                Browse Workouts
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-xs lg:max-w-[280px]">
              <Image
                src="/banner.png"
                alt="FitLog workout banner"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
