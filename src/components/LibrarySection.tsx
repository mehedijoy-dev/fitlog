"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Workout } from "@/lib/types";
import WorkoutCard from "@/components/WorkoutCard";

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [query, setQuery] = useState("");

  const filtered = workouts.filter((w) => {
    const q = query.toLowerCase();
    return (
      w.name.toLowerCase().includes(q) ||
      w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-[var(--font-display)] text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
            The Library
          </h2>
          <p className="mt-2 text-white/50">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag..."
            className="w-full rounded-lg border border-white/15 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-[#ccff00]/50 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-white/50">
          No workouts match your search.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
