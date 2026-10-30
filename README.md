# OneRepMaximus

An installable phone app (PWA) for logging your workouts. It shows:

- **Next** – your next planned session with today's weights, including move-ups
- **Lifts** – every recent lift: ready to move up, almost, or building, with its weight history
- **Balance** – hard sets per week for each muscle group against a target
- **Plan** – a balanced 4-day upper/lower week

All the maths runs on the phone. Your workout data is never uploaded anywhere; it is kept in the browser's storage on your device.

## Logging a workout
On **Next**, tap **Start Upper A** (or pick another session). Each exercise comes prefilled with today's weight and target reps. Type or adjust weight and reps, tick each set (this starts the rest timer), and tap **Finish workout**. Tap a set number to mark it as a warm-up. A workout in progress survives closing the app.

Menu → **Workout log** lists logged workouts to edit or delete. Menu → **Back up log** saves a CSV; importing that file restores it.

## Hevy history (optional)
In Hevy: Profile → Settings → Export & Import Data → Export Workouts, then share the CSV to OneRepMaximus or use **Import CSV**. Hevy history and logged workouts are combined; a day that has a logged workout ignores Hevy sets for that day.

## Rules
Double progression: when every working set at your top weight reaches the top of the exercise's rep range, add the smallest step (2 kg dumbbells, 2.5 kg barbell, one pin on a machine). Exercise rep ranges, muscle mapping and the weekly plan are at the top of `app.js`.
