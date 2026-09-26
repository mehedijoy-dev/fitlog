import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition hover:border-[#ccff00]/50"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          style={{ objectPosition: "center 10%" }}
        />
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#ccff00] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-[var(--font-display)] text-sm font-bold uppercase leading-snug text-white">
          {workout.name}
        </h3>
        <p className="-mt-1 text-xs text-white/50">{workout.equipment}</p>

        <div className="mt-1.5 flex items-center gap-3 border-t border-white/10 pt-2 text-xs text-white/70">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-[#ccff00]" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} className="text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
