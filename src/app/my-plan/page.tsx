"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Check, X, Clock, Flame, Star } from "lucide-react";
import { usePlan, PlanItem } from "@/context/PlanContext";
import { SortKey } from "@/lib/types";

type Tab = "plan" | "saved";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone, hydrated } =
    usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [sortOpen, setSortOpen] = useState(false);

  const activeList = tab === "plan" ? plan : saved;
  const sortedList = [...activeList].sort((a, b) => b[sortKey] - a[sortKey]);

  const totalMinutes = activeList.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = activeList.reduce(
    (sum, w) => sum + w.caloriesBurned,
    0,
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-[var(--font-display)] text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-white/50">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/50">
            Exercises
          </p>
          <p className="mt-1 text-2xl font-bold text-[#ccff00]">
            {activeList.length}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/50">
            Minutes
          </p>
          <p className="mt-1 text-2xl font-bold text-white">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/50">
            Calories
          </p>
          <p className="mt-1 text-2xl font-bold text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
          <button
            onClick={() => setTab("plan")}
            className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-semibold transition ${
              tab === "plan"
                ? "bg-white text-black"
                : "text-white/50 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-semibold transition ${
              tab === "saved"
                ? "bg-white text-black"
                : "text-white/50 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">Sort By</span>
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-sm text-white"
            >
              {sortOptions.find((o) => o.key === sortKey)?.label}
              <ChevronDown size={14} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-white/10 bg-[#111318] p-1 shadow-lg">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSortKey(opt.key);
                      setSortOpen(false);
                    }}
                    className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-white hover:bg-white/10"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {!hydrated ? (
          <p className="py-10 text-center text-white/50">Loading workouts…</p>
        ) : sortedList.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/20 bg-white/[0.02] px-6 py-16 text-center">
            <h3 className="font-[var(--font-display)] text-lg font-bold uppercase text-white">
              Nothing Here Yet
            </h3>
            <p className="mt-2 text-sm text-white/50">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center rounded-lg bg-[#ccff00] px-5 py-2.5 text-sm font-bold uppercase text-black transition hover:brightness-95"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedList.map((item) => (
              <PlanRow
                key={item.id}
                item={item}
                tab={tab}
                onRemove={() =>
                  tab === "plan"
                    ? removeFromPlan(item.id)
                    : removeFromSaved(item.id)
                }
                onMarkDone={() => markDone(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function PlanRow({
  item,
  tab,
  onRemove,
  onMarkDone,
}: {
  item: PlanItem;
  tab: Tab;
  onRemove: () => void;
  onMarkDone: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            style={{ objectPosition: "center 15%" }}
          />
        </div>
        <div>
          <h3 className="font-[var(--font-display)] text-sm font-bold uppercase text-white">
            {item.name}
          </h3>
          <p className="text-xs text-white/50">{item.equipment}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-[#ccff00]" />
              {item.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={12} className="text-[#ccff00]" />
              {item.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-[#ccff00]" />
              {item.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${item.id}`}
          className="cursor-pointer whitespace-nowrap rounded-lg border border-white/30 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={onMarkDone}
            className={`flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              item.done
                ? "bg-white/10 text-white/50"
                : "bg-[#ccff00] text-black hover:brightness-95"
            }`}
          >
            <Check size={13} strokeWidth={3} />
            {item.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          className="cursor-pointer rounded-lg p-1.5 text-white/50 transition hover:text-white"
          aria-label="Remove"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
