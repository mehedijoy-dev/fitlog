# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve workouts, dive into detailed instructions and specs for each lift, and build your daily training plan — all tracked live and saved locally in your browser.

## Live Link

https://fitlog-eight-henna.vercel.app/

## Technologies Used

- **Next.js (App Router)** — routing, server components, and data fetching
- **TypeScript** — type-safe components and API layer
- **Tailwind CSS** — styling and full responsiveness
- **Lucide React** — icon set used across the UI
- **React Hot Toast** — toast notifications for user actions
- **FitLog REST API** — workout data source (`https://api.abcz.workers.dev/api/fitlog`)

## Features

1. **Responsive Workout Library** — Browse all 12 workouts in a responsive 3-column grid (desktop) that collapses gracefully on tablet and mobile.
2. **Detailed Workout Pages** — Each workout has its own detail page with a key specs panel, step-by-step instructions, and category tags.
3. **Today's Plan & Saved Lists** — Add workouts to a 5-item daily plan or save them for later, both persisted in `localStorage` so they survive a page reload.
4. **Live Metrics & Sorting** — The My Plan page shows live exercise/minute/calorie totals and lets you sort the current list by Duration, Calories, or Rating.
5. **Mark as Done & Remove** — Track progress on planned workouts with a one-click "Mark as Done" toggle and remove items instantly with toast feedback.
6. **Toast Notifications** — Every add, save, remove, and done action gives instant visual feedback via toast messages.
7. **Custom 404 Page** — Any unknown route gracefully falls back to a branded not-found page.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
