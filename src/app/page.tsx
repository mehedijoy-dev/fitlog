import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

export default async function Home() {
  const workouts = await getWorkouts();

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

            <div className="group relative mx-auto aspect-square w-full max-w-[300px] cursor-pointer sm:max-w-sm lg:max-w-[340px]">
              <Image
                src="/banner.png"
                alt="FitLog workout banner"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </section>
      </div>

      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          The Library
        </h2>
        <p className="mt-2 text-white/50">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}
