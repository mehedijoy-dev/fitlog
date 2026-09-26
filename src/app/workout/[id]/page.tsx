import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import DetailsActions from "@/components/DetailsActions";

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/10">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            style={{ objectPosition: "center 15%" }}
            priority
          />
        </div>

        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-white/60">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase tracking-wide text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 divide-y divide-white/10 rounded-lg border border-white/10 bg-white/[0.03]">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span className="uppercase tracking-wide text-white/50">
                  {spec.label}
                </span>
                <span className="font-semibold text-white">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-[var(--font-display)] text-lg font-bold uppercase tracking-tight text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-white/70">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-[#ccff00]">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <DetailsActions workout={workout} />
        </div>
      </div>
    </main>
  );
}
