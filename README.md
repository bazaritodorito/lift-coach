# OneRepMax

An installable phone app (PWA) that reads a Hevy workouts export and shows:

- **Next** – your next planned session with today's weights, including move-ups
- **Lifts** – every recent lift: ready to move up, almost, or building, with its weight history
- **Balance** – hard sets per week for each muscle group against a target
- **Plan** – a balanced 4-day upper/lower week

All the maths runs on the phone. Your workout data is never uploaded anywhere; it is kept in the browser's storage on your device.

## Updating your data
In Hevy: Profile → Settings → Export & Import Data → Export Workouts. Then share the CSV to OneRepMax, or tap **Import CSV** in the app.

## Rules
Double progression: when every working set at your top weight reaches the top of the exercise's rep range, add the smallest step (2 kg dumbbells, 2.5 kg barbell, one pin on a machine). Exercise rep ranges, muscle mapping and the weekly plan are at the top of `app.js`.
