"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { Workout } from "@/lib/types";

export interface PlanItem extends Workout {
  done?: boolean;
}

interface PlanContextValue {
  plan: PlanItem[];
  saved: PlanItem[];
  addToPlan: (w: Workout) => void;
  addToSaved: (w: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isPlanFull: boolean;
  hydrated: boolean;
}

const PLAN_CAP = 5;
const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // App load hoile localStorage theke data niye asha
  useEffect(() => {
    try {
      const p = localStorage.getItem(PLAN_KEY);
      const s = localStorage.getItem(SAVED_KEY);
      if (p) setPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
    } catch {
      // corrupted storage hoile ignore
    }
    setHydrated(true);
  }, []);

  // plan change hoile localStorage e save kora
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    } catch {}
  }, [plan, hydrated]);

  // saved change hoile localStorage e save kora
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {}
  }, [saved, hydrated]);

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  const addToPlan = (w: Workout) => {
    if (isInPlan(w.id)) {
      toast("Already in today's plan.");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      toast.error("Today's plan is full (5 lifts max).");
      return;
    }
    setPlan((prev) => [...prev, { ...w, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (w: Workout) => {
    if (isInSaved(w.id)) {
      toast("Already saved.");
      return;
    }
    setSaved((prev) => [...prev, { ...w }]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from saved");
  };

  const markDone = (id: number) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w)),
    );
    toast.success("Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
        isInPlan,
        isInSaved,
        isPlanFull: plan.length >= PLAN_CAP,
        hydrated,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
