"use client";

import { Plus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

export default function DetailsActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isPlanFull, isInPlan } = usePlan();

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={isPlanFull && !isInPlan(workout.id)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-2.5 text-sm font-bold uppercase text-black transition-all hover:scale-[1.02] hover:brightness-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        <Plus size={16} strokeWidth={2.5} />
        Add to today&apos;s plan
      </button>
      <button
        onClick={() => addToSaved(workout)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-bold uppercase text-white transition-all hover:scale-[1.02] hover:border-white hover:bg-white/10 active:scale-[0.98]"
      >
        <Bookmark size={16} strokeWidth={2.5} />
        Save for later
      </button>
    </div>
  );
}
