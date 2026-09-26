export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
      <p className="text-sm text-white/50">Loading workouts…</p>
    </div>
  );
}
