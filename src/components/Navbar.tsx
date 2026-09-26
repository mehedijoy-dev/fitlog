"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="border-b border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#2a3620] text-[#ccff00]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-xs text-white/70">
          <Link href="/my-plan" className="flex items-center gap-1.5">
            <span>Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5">
            <span>Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/40 text-[11px] font-bold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-2 border-t border-white/10 px-4 py-2 sm:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${
                active ? "bg-[#2a3620] text-[#ccff00]" : "text-white/70"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
