'use strict';

/* ---------- Exercise library: [repLow, repHigh, increment kg, {muscle: share}] ---------- */
const EX = {
  'Bench Press (Barbell)':            [6, 10, 2.5, { Chest: 1, Triceps: .5, Shoulders: .5 }],
  'Incline Bench Press (Dumbbell)':   [8, 12, 2,   { Chest: 1, Shoulders: .5, Triceps: .5 }],
  'Incline Bench Press (Barbell)':    [6, 10, 2.5, { Chest: 1, Shoulders: .5, Triceps: .5 }],
  'Bench Press (Dumbbell)':           [8, 12, 2,   { Chest: 1, Triceps: .5 }],
  'Floor Press (Dumbbell)':           [8, 12, 2,   { Chest: 1, Triceps: .5 }],
  'Chest Press (Machine)':            [8, 12, 7,   { Chest: 1, Triceps: .5 }],
  'Incline Chest Fly (Dumbbell)':     [12, 15, 2,  { Chest: 1 }],
  'Butterfly (Pec Deck)':             [12, 15, 4.5,{ Chest: 1 }],
  'Cable Fly Crossovers':             [12, 15, 2.5,{ Chest: 1 }],
  'Chest Dip':                        [8, 12, 0,   { Chest: 1, Triceps: .5 }],
  'Push Up':                          [10, 20, 0,  { Chest: 1, Triceps: .5 }],
  'Push Up - Close Grip':             [10, 20, 0,  { Triceps: 1, Chest: .5 }],
  'Diamond Push Up':                  [10, 20, 0,  { Triceps: 1, Chest: .5 }],
  'Incline Push Ups':                 [10, 20, 0,  { Chest: 1, Triceps: .5 }],
  'Bent Over Row (Barbell)':          [6, 10, 2.5, { Back: 1, Biceps: .5 }],
  'Bent Over Row (Dumbbell)':         [8, 12, 2,   { Back: 1, Biceps: .5 }],
  'Seated Row (Machine)':             [8, 12, 7,   { Back: 1, Biceps: .5 }],
  'Lat Pulldown (Cable)':             [8, 12, 7,   { Back: 1, Biceps: .5 }],
  'Pull Up':                          [5, 10, 0,   { Back: 1, Biceps: .5 }],
  'Shrug (Dumbbell)':                 [12, 15, 2,  { Back: 1 }],
  'Face Pull':                        [12, 15, 2.3,{ Shoulders: 1, Back: .5 }],
  'Rear Delt Reverse Fly (Dumbbell)': [12, 15, 2,  { Shoulders: 1 }],
  'Upright Row (Dumbbell)':           [8, 12, 2,   { Shoulders: 1, Back: .5 }],
  'Shoulder Press (Dumbbell)':        [8, 12, 2,   { Shoulders: 1, Triceps: .5 }],
  'Overhead Press (Dumbbell)':        [8, 12, 2,   { Shoulders: 1, Triceps: .5 }],
  'Seated Shoulder Press (Machine)':  [8, 12, 4,   { Shoulders: 1, Triceps: .5 }],
  'Lateral Raise (Dumbbell)':         [12, 15, 2,  { Shoulders: 1 }],
  'Bicep Curl (Dumbbell)':            [8, 12, 2,   { Biceps: 1 }],
  'Hammer Curl (Dumbbell)':           [8, 12, 2,   { Biceps: 1 }],
  'Cross Body Hammer Curl':           [8, 12, 2,   { Biceps: 1 }],
  'EZ Bar Biceps Curl':               [8, 12, 2.5, { Biceps: 1 }],
  'Preacher Curl (Barbell)':          [8, 12, 2.5, { Biceps: 1 }],
  'Triceps Extension (Dumbbell)':     [10, 15, 2,  { Triceps: 1 }],
  'Triceps Pushdown':                 [10, 15, 4.5,{ Triceps: 1 }],
  'Triceps Rope Pushdown':            [10, 15, 4.5,{ Triceps: 1 }],
  'Skullcrusher (Dumbbell)':          [8, 12, 2,   { Triceps: 1 }],
  'Squat (Barbell)':                  [6, 10, 2.5, { Quads: 1, Glutes: .5 }],
  'Leg Press (Machine)':              [8, 12, 7,   { Quads: 1, Glutes: .5 }],
  'Leg Press Horizontal (Machine)':   [8, 12, 7,   { Quads: 1, Glutes: .5 }],
  'Leg Extension (Machine)':          [12, 15, 7,  { Quads: 1 }],
  'Lunge':                            [8, 12, 2,   { Quads: 1, Glutes: .5 }],
  'Squat (Bodyweight)':               [12, 20, 0,  { Quads: 1, Glutes: .5 }],
  'Lying Leg Curl (Machine)':         [12, 15, 4.5,{ Hamstrings: 1 }],
  'Seated Leg Curl (Machine)':        [12, 15, 4.5,{ Hamstrings: 1 }],
  'Romanian Deadlift (Dumbbell)':     [8, 12, 2,   { Hamstrings: 1, Glutes: .5 }],
  'Romanian Deadlift (Barbell)':      [6, 10, 2.5, { Hamstrings: 1, Glutes: .5 }],
  'Hip Thrust':                       [8, 12, 2.5, { Glutes: 1 }],
  'Hip Thrust (Barbell)':             [8, 12, 2.5, { Glutes: 1 }],
  'Back Extension (Machine)':         [10, 15, 7,  { Glutes: 1, Hamstrings: .5 }],
  'Standing Calf Raise (Machine)':    [15, 20, 5,  { Calves: 1 }],
  'Single Leg Standing Calf Raise':   [12, 20, 2,  { Calves: 1 }],
};
const CORE = new Set(['Plank', 'Crunch', 'Lying Leg Raise', 'Lying Knee Raise', 'Heel Taps', 'Sit Up',
  'Sit Up (Weighted)', 'Reverse Crunch', 'Elbow to Knee', 'Side Bend (Dumbbell)', 'Russian Twist (Weighted)', 'V Up']);
const GROUPS = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core'];
const TARGET = { Chest: 10, Back: 10, Shoulders: 10, Quads: 10, Hamstrings: 10, Glutes: 10, Biceps: 6, Triceps: 6, Calves: 6, Core: 6 };

/* ---------- The balanced week (day: 0 = Sunday) ---------- */
const PLAN = [
  { day: 1, session: 'Upper A', items: [
    ['Bench Press (Barbell)', 3, '6–10'], ['Bent Over Row (Barbell)', 3, '6–10'], ['Shoulder Press (Dumbbell)', 3, '8–12'],
    ['Lat Pulldown (Cable)', 3, '8–12'], ['Chest Press (Machine)', 2, '8–12'], ['EZ Bar Biceps Curl', 2, '8–12'],
    ['Triceps Rope Pushdown', 2, '10–15']] },
  { day: 3, session: 'Lower A', items: [
    ['Squat (Barbell)', 3, '6–10', 'Do it first'], ['Romanian Deadlift (Dumbbell)', 3, '8–12', 'New', '~10 kg each'],
    ['Lying Leg Curl (Machine)', 3, '12–15'], ['Leg Extension (Machine)', 2, '12–15'],
    ['Standing Calf Raise (Machine)', 3, '15–20'], ['Plank', 3, '60–75 s', '', 'Bodyweight']] },
  { day: 5, session: 'Upper B', items: [
    ['Incline Bench Press (Dumbbell)', 3, '8–12'], ['Seated Row (Machine)', 3, '8–12', 'Back in'], ['Butterfly (Pec Deck)', 2, '12–15'],
    ['Lateral Raise (Dumbbell)', 3, '12–15'], ['Face Pull', 2, '12–15'], ['Cross Body Hammer Curl', 2, '8–12'],
    ['Triceps Pushdown', 2, '10–15']] },
  { day: 0, session: 'Lower B', items: [
    ['Leg Press (Machine)', 3, '8–12'], ['Hip Thrust', 3, '8–12', 'New load', '20 kg bar'],
    ['Lying Leg Curl (Machine)', 3, '12–15'], ['Lunge', 2, '8–12 / leg', 'Back in', 'Bodyweight'],
    ['Back Extension (Machine)', 2, '10–15', 'Back in'], ['Standing Calf Raise (Machine)', 3, '15–20'],
    ['Lying Leg Raise', 3, '8–12', '', 'Bodyweight']] },
];
const DAYNAME = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/* ---------- Helpers ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const fmt = x => (Math.round(x * 10) / 10).toString();
const pad = n => String(n).padStart(2, '0');
const dayKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const shortDate = k => fromKey(k).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
};
let S = { style: 'rep', next: 'rotation', units: 'kg' };
try { Object.assign(S, JSON.parse(store.get('lc_settings') || '{}')); } catch (e) { /* defaults */ }
const wv = kg => S.units === 'lb' ? Math.round(kg * 2.20462 * 2) / 2 : kg;
const W = kg => `${fmt(wv(kg))} ${S.units}`;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600); }

function parseCSV(text) {
  const rows = []; let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.length > 1 || (r[0] || '').trim());
}

const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
function parseDate(s) {
  s = (s || '').trim();
  let m = s.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}),? (\d{4}),? (\d{1,2}):(\d{2})\s*([AP]M)?/i);
  if (m) { let h = +m[4]; if (m[6]) { const pm = /p/i.test(m[6]); h = (h % 12) + (pm ? 12 : 0); } return new Date(+m[3], MON[m[1].toLowerCase()], +m[2], h, +m[5]); }
  m = s.match(/^(\d{1,2}) ([A-Za-z]{3})[a-z]*\.? (\d{4}),? (\d{1,2}):(\d{2})\s*([AP]M)?/i);
  if (m) { let h = +m[4]; if (m[6]) { const pm = /p/i.test(m[6]); h = (h % 12) + (pm ? 12 : 0); } return new Date(+m[3], MON[m[2].toLowerCase()], +m[1], h, +m[5]); }
  const d = new Date(s); return isNaN(d) ? null : d;
}

/* ---------- Analysis ---------- */
function analyse(text) {
  const rows = parseCSV(text);
  if (rows.length < 2) throw new Error('That file has no rows.');
  const head = rows[0].map(h => h.trim().toLowerCase());
  const col = n => head.indexOf(n);
  const iEx = col('exercise_title'), iStart = col('start_time'), iType = col('set_type'), iReps = col('reps'), iIdx = col('set_index'), iTitle = col('title');
  let iKg = col('weight_kg'), lbs = false;
  if (iKg < 0 && col('weight_lbs') >= 0) { iKg = col('weight_lbs'); lbs = true; }
  if (iEx < 0 || iStart < 0) throw new Error("This doesn't look like a Hevy workouts export.");

  const sets = [];
  for (const r of rows.slice(1)) {
    const dt = parseDate(r[iStart]); if (!dt) continue;
    const type = iType >= 0 ? (r[iType] || 'normal').toLowerCase() : 'normal';
    let w = r[iKg] === '' || r[iKg] == null ? null : parseFloat(r[iKg]);
    if (w != null && lbs) w = w * 0.45359237;
    if (w != null && isNaN(w)) w = null;
    const reps = r[iReps] === '' || r[iReps] == null ? null : parseInt(r[iReps], 10);
    sets.push({ title: iTitle >= 0 ? (r[iTitle] || '').trim() : '', dt, day: dayKey(dt), ex: (r[iEx] || '').trim(), type, w, reps: isNaN(reps) ? null : reps, idx: iIdx >= 0 ? +r[iIdx] || 0 : 0 });
  }
  if (!sets.length) throw new Error('No sets could be read from that file.');
  const latest = new Date(Math.max(...sets.map(s => s.dt)));
  const workouts = new Set(sets.map(s => +s.dt)).size;
  // Only the current block of training: last 120 days before the latest workout.
  const since = new Date(latest); since.setDate(since.getDate() - 120);
  const work = sets.filter(s => s.dt >= since && s.type !== 'warmup' && s.type !== 'warm up');
  const blockWorkouts = new Set(work.map(s => +s.dt)).size;

  // Weekly volume: last 4 Monday-start weeks ending with the latest workout's week.
  const monday = d => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
  const lastMon = monday(latest);
  const weeks = [3, 2, 1, 0].map(k => { const x = new Date(lastMon); x.setDate(x.getDate() - 7 * k); return x; });
  const vol = Object.fromEntries(GROUPS.map(g => [g, [0, 0, 0, 0]]));
  const uncounted = new Set();
  for (const s of work) {
    const wi = weeks.findIndex((w, i) => s.dt >= w && (i === 3 || s.dt < weeks[i + 1]));
    if (wi < 0 || s.ex === 'Warm Up') continue;
    if (EX[s.ex]) for (const [m, f] of Object.entries(EX[s.ex][3])) vol[m][wi] += f;
    else if (CORE.has(s.ex)) vol.Core[wi] += 1;
    else if (!/run|treadmill|walk|cycl|bike|row(ing)? machine|warm/i.test(s.ex)) uncounted.add(s.ex);
  }

  // Planned volume.
  const planned = Object.fromEntries(GROUPS.map(g => [g, 0]));
  for (const d of PLAN) for (const [ex, n] of d.items) {
    if (EX[ex]) for (const [m, f] of Object.entries(EX[ex][3])) planned[m] += n * f;
    else if (CORE.has(ex)) planned.Core += n;
  }
  const balance = GROUPS.map(g => ({ group: g, weeks: vol[g], avg: vol[g].reduce((a, b) => a + b, 0) / 4, target: TARGET[g], planned: planned[g] }));

  // Progression per exercise.
  // 12-week series for the Progress tab.
  const W12 = Array.from({ length: 12 }, (_, k) => { const x = new Date(lastMon); x.setDate(x.getDate() - 7 * (11 - k)); return x; });
  const wkOf = dt => { for (let i = 11; i >= 0; i--) if (dt >= W12[i]) { const e = new Date(W12[i]); e.setDate(e.getDate() + 7); return dt < e ? i : -1; } return -1; };
  const vol12 = Object.fromEntries(GROUPS.map(g => [g, Array(12).fill(0)]));
  const ses12 = Array.from({ length: 12 }, () => new Set());
  const mses12 = Object.fromEntries(GROUPS.map(g => [g, Array.from({ length: 12 }, () => new Set())]));
  for (const s of sets) {
    if (s.type === 'warmup' || s.type === 'warm up' || s.ex === 'Warm Up') continue;
    const wi = wkOf(s.dt); if (wi < 0) continue;
    ses12[wi].add(+s.dt);
    if (EX[s.ex]) for (const [m, f] of Object.entries(EX[s.ex][3])) { vol12[m][wi] += f; if (f === 1) mses12[m][wi].add(+s.dt); }
    else if (CORE.has(s.ex)) { vol12.Core[wi] += 1; mses12.Core[wi].add(+s.dt); }
  }
  const moves = [];
  const byEx = {};
  for (const s of work) if (EX[s.ex] && s.w != null && s.w > 0 && s.reps != null) (byEx[s.ex] = byEx[s.ex] || []).push(s);
  const activeCut = new Date(latest); activeCut.setDate(activeCut.getDate() - 28);
  const lifts = [];
  for (const [ex, list] of Object.entries(byEx)) {
    const [lo, hi, inc] = EX[ex];
    const days = {};
    for (const s of list.sort((a, b) => a.dt - b.dt || a.idx - b.idx)) (days[s.day] = days[s.day] || []).push(s);
    const sessions = Object.entries(days).map(([day, ss]) => {
      const top = Math.max(...ss.map(s => s.w));
      return { day, top, repsAtTop: ss.filter(s => s.w === top).map(s => s.reps), sets: ss.map(s => [s.w, s.reps]) };
    });
    const last = sessions[sessions.length - 1];
    const active = fromKey(last.day) >= new Date(activeCut.getFullYear(), activeCut.getMonth(), activeCut.getDate());
    const reps = last.repsAtTop;
    let status, next = last.top, note;
    const shortBy = reps.reduce((a, r) => a + Math.max(0, hi - r), 0);
    // A heavier weight you handled for full working sets in the last 6 weeks.
    const sixWk = new Date(fromKey(last.day)); sixWk.setDate(sixWk.getDate() - 42);
    const prior = sessions.slice(0, -1).filter(s => fromKey(s.day) >= sixWk && s.top > last.top && Math.min(...s.repsAtTop) >= lo)
      .sort((a, b) => b.top - a.top)[0];
    if (inc === 0) continue;
    // Estimated 1-rep max (Epley) from the best set each session.
    const e1rm = Object.entries(days).map(([day, ss]) => [day, Math.round(Math.max(...ss.map(s => s.w * (1 + Math.min(s.reps, 15) / 30))) * 10) / 10]);
    // Weight increases: a new heaviest weight done for 2+ sets.
    let best = 0;
    sessions.forEach((s, i) => {
      if (s.repsAtTop.length < 2 || s.top <= best) return;
      if (best > 0 && s.top - best >= 1) {
        const below = sessions.slice(0, i).map(p => p.top).filter(w => w < s.top);
        moves.push({ day: s.day, ex, from: below.length ? Math.max(...below) : best, to: s.top });
      }
      best = s.top;
    });
    if (reps.length >= 2 && Math.min(...reps) >= hi) {
      status = 'ready'; next = Math.round((last.top + inc) * 10) / 10;
      note = `Every set at ${W(last.top)} hit ${hi}+ reps. Go to ${W(next)}.`;
    } else if (prior) {
      status = 'ready'; next = prior.top;
      const rr = prior.repsAtTop; const repTxt = rr.length > 1 ? rr.slice(0, -1).join(', ') + ' and ' + rr[rr.length - 1] : rr[0];
      note = `You did ${W(prior.top)} for ${repTxt} reps on ${shortDate(prior.day)}. Go back to ${W(prior.top)}.`;
    } else if (reps.length === 1 && sessions.length > 1) {
      status = 'building';
      note = `Only 1 set at ${W(last.top)} so far. Do all your sets there, then build to ${hi} reps.`;
    } else if (reps.filter(r => r >= hi).length >= Math.max(1, reps.length / 2) || (reps.length >= 2 && reps.reduce((a, b) => a + b, 0) / reps.length >= hi - 1.5)) {
      status = 'almost';
      note = `${shortBy} more rep${shortBy === 1 ? '' : 's'} to hit ${hi} on every set at ${W(last.top)}.`;
    } else {
      status = 'building';
      note = `${shortBy} more reps to hit ${hi} on every set at ${W(last.top)}.`;
    }
    // Stall check: same top weight 5+ sessions in a row, and the last 3 sessions no better than the one before them.
    const sameRun = (() => { let n = 0; for (let i = sessions.length - 1; i >= 0 && sessions[i].top === last.top; i--) n++; return n; })();
    const mean = s => s.repsAtTop.reduce((a, b) => a + b, 0) / s.repsAtTop.length;
    const n = sessions.length;
    const stalled = sameRun >= 5 && Math.max(...sessions.slice(n - 3).map(mean)) <= mean(sessions[n - 4]);
    if (status !== 'ready' && stalled) note += ` No progress for ${sameRun} sessions: do it first in the workout, or drop 10% and build back up.`;
    lifts.push({ ex, muscle: Object.entries(EX[ex][3]).sort((a, b) => b[1] - a[1])[0][0], lo, hi, inc, status, current: last.top, next, note, e1rm, shortBy, stalled: status !== 'ready' && stalled, single: status === 'building' && reps.length === 1 && sessions.length > 1,
      last, active, sessions, history: sessions.map(s => [s.day, s.top]) });
  }
  const order = { ready: 0, almost: 1, building: 2 };
  lifts.sort((a, b) => order[a.status] - order[b.status] || a.ex.localeCompare(b.ex));
  moves.sort((a, b) => b.day.localeCompare(a.day) || a.ex.localeCompare(b.ex));
  const progress = { weeks: W12, vol: vol12, sessions: ses12.map(x => x.size), musSessions: Object.fromEntries(GROUPS.map(g => [g, mses12[g].map(x => x.size)])), moves };
  const byW = new Map();
  for (const s of sets) { if (!byW.has(+s.dt)) byW.set(+s.dt, { dt: s.dt, title: s.title, exs: new Set() }); byW.get(+s.dt).exs.add(s.ex); }
  const recent = [...byW.values()].sort((a, b) => b.dt - a.dt).slice(0, 12);
  return { latest, workouts, blockWorkouts, weeks, balance, lifts, progress, recent, uncounted: [...uncounted] };
}

/* ---------- Rendering ---------- */
let A = null, tab = 'next', liftFilter = 'all', openLift = null;
const STATUS = { ready: 'Move up', almost: 'Almost', building: 'Building' };

function weightFor(ex, fallback) {
  const l = A.lifts.find(x => x.ex === ex);
  if (l && l.active && usesPrilepin(l)) return { text: W(prilepin(l).next), lift: l };
  if (l && l.active) return { text: `${W(l.status === 'ready' ? l.next : l.current)}`, lift: l };
  if (l) return { text: `${W(l.current)}`, lift: l };
  return { text: fallback || '—', lift: null };
}

function nextSession() {
  if (S.next === 'rotation') {
    for (const w of A.recent) {
      const i = PLAN.findIndex(p => p.session.toLowerCase() === w.title.toLowerCase() ||
        p.items.filter(it => w.exs.has(it[0])).length >= Math.ceil(p.items.length * 0.6));
      if (i >= 0) return { p: PLAN[(i + 1) % PLAN.length], when: 'Next session' };
    }
    return { p: PLAN[0], when: 'Next session' };
  }
  const now = new Date(); const today = now.getDay();
  const trainedToday = dayKey(A.latest) === dayKey(now);
  for (let k = trainedToday ? 1 : 0; k < 8; k++) {
    const d = (today + k) % 7; const p = PLAN.find(x => x.day === d);
    if (p) return { p, when: k === 0 ? 'Today' : k === 1 ? 'Tomorrow' : DAYNAME[p.day] };
  }
  return { p: PLAN[0], when: 'Next session' };
}
const isUp = l => l.active && (usesPrilepin(l) ? prilepin(l).next > l.current : l.status === 'ready');

/* One badge per lift: what to do, in two or three words. */
function badge(l) {
  if (l.status === 'ready') return `<span class="badge up">↑ ${W(l.next)}</span>`;
  if (l.stalled) return `<span class="badge stall">Stalled</span>`;
  if (l.single) return `<span class="badge neutral">New weight</span>`;
  return `<span class="badge ${l.status === 'almost' ? 'close' : 'neutral'}">${l.shortBy} rep${l.shortBy === 1 ? '' : 's'} to go</span>`;
}

/* Sets grid: set numbers across the top, weight and reps aligned underneath.
   Reps: green = hit the rep target, red = missed it, grey = lighter set below the working weight. */
function setGrid(l, label) {
  const sets = l.last.sets;
  const cols = Math.max(3, sets.length);
  let h = `<div class="sets-head"><span>${esc(label)}</span><span>target ${l.hi}</span></div>
    <div class="sets" style="grid-template-columns: 2.4rem repeat(${cols}, minmax(0, 1fr))">
    <span class="lab"></span>`;
  for (let i = 0; i < cols; i++) h += `<span class="hd">${i < sets.length ? i + 1 : ''}</span>`;
  h += `<span class="lab">${S.units}</span>`;
  for (let i = 0; i < cols; i++) h += `<span class="w">${i < sets.length ? fmt(wv(sets[i][0])) : ''}</span>`;
  h += '<span class="lab">reps</span>';
  for (let i = 0; i < cols; i++) {
    if (i >= sets.length) { h += '<span></span>'; continue; }
    const [w, r] = sets[i];
    const cls = w < l.current ? 'ramp' : r >= l.hi ? 'hit' : 'miss';
    const lab = cls === 'ramp' ? 'lighter set' : cls === 'hit' ? 'hit target' : 'missed target';
    h += `<span class="rep ${cls}" aria-label="${r} reps, ${lab}">${r}</span>`;
  }
  return h + '</div>';
}

function legend() {
  return `<div class="key"><span><i class="dot hit"></i>Hit target</span><span><i class="dot miss"></i>Missed</span><span><i class="dot ramp"></i>Lighter set</span></div>`;
}

function renderNext() {
  const { p, when } = nextSession();
  const ready = A.lifts.filter(isUp);
  const under = A.balance.filter(b => b.avg < b.target);
  let h = `<div class="tiles">
    <div class="card tile"><div class="big">${ready.length}</div><div class="lbl">lifts ready to move up</div></div>
    <div class="card tile"><div class="big">${under.length}</div><div class="lbl">muscle groups under target</div></div>
  </div>`;
  h += `<div class="sec-head"><h2>${when} · ${esc(p.session)}</h2><span class="small">${p.items.reduce((a, i) => a + i[1], 0)} sets</span></div>${legend()}`;
  if (p.items.some(it => { const l = A.lifts.find(x => x.ex === it[0]); return l && l.active && usesPrilepin(l); })) h += pLegend();
  for (const [ex, n, reps, tag, fb] of p.items) {
    const w = weightFor(ex, fb); const l = w.lift;
    if (l && l.active && usesPrilepin(l)) { h += pTile(l); continue; }
    const goal = l ? (l.status === 'ready' ? `${l.lo}–${l.hi}` : `${l.hi}`) : reps;
    h += `<div class="card xc"><div class="xc-top"><div class="ex">${esc(ex)}</div>${l && l.active ? badge(l) : tag ? `<span class="badge neutral">${esc(tag)}</span>` : ''}</div>
      <div class="today"><span class="today-kg">${esc(w.text)}</span><span class="today-x">${n} × ${esc(goal)}</span></div>
      ${l ? setGrid(l, `Last · ${shortDate(l.last.day)}`) : ''}</div>`;
  }
  return h;
}

function spark(hist) {
  const W = 320, H = 90, m = { l: 30, r: 34, t: 10, b: 18 };
  const xs = hist.map(h => +fromKey(h[0])), ys = hist.map(h => h[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs) || x0 + 1;
  const y1 = Math.max(...ys) * 1.1, y0 = 0;
  const X = v => m.l + (x1 === x0 ? (W - m.l - m.r) / 2 : (v - x0) / (x1 - x0) * (W - m.l - m.r));
  const Y = v => H - m.b - (v - y0) / (y1 - y0) * (H - m.t - m.b);
  const pts = hist.map((h, i) => [X(xs[i]), Y(ys[i])]);
  const last = hist[hist.length - 1];
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="Heaviest set per session">
    <line x1="${m.l}" x2="${W - m.r}" y1="${H - m.b}" y2="${H - m.b}" stroke="var(--line)"/>
    <text x="${m.l}" y="${H - 4}" font-size="10" fill="var(--muted)">${esc(shortDate(hist[0][0]))}</text>
    <text x="${W - m.r}" y="${H - 4}" text-anchor="end" font-size="10" fill="var(--muted)">${esc(shortDate(last[0]))}</text>
    <polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="var(--accent)"/>`).join('')}
    <text x="${(pts[pts.length - 1][0] + 6).toFixed(1)}" y="${(pts[pts.length - 1][1] + 4).toFixed(1)}" font-size="11" fill="var(--fg)">${fmt(wv(last[1]))}</text>
    <text x="${(pts[0][0] - 6).toFixed(1)}" y="${(pts[0][1] + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--muted)">${fmt(wv(hist[0][1]))}</text>
  </svg>`;
}

function renderLifts() {
  const list = A.lifts.filter(l => l.active && (liftFilter === 'all' || l.status === liftFilter));
  let h = `<div class="chips" role="group" aria-label="Filter">`;
  for (const [k, lab] of [['all', 'All'], ['ready', 'Move up'], ['almost', 'Almost'], ['building', 'Building']])
    h += `<button type="button" data-filter="${k}" aria-pressed="${liftFilter === k}">${lab}</button>`;
  h += `</div>${legend()}`;
  if (!list.length) h += '<p class="note">Nothing here.</p>';
  if (list.some(usesPrilepin)) h += pLegend();
  for (const l of list) {
    if (usesPrilepin(l)) { h += pTile(l, { expandable: true }); continue; }
    h += `<div class="card xc lift${openLift === l.ex ? ' open' : ''}" data-lift="${esc(l.ex)}">
      <div class="xc-top"><div class="ex">${esc(l.ex)}</div>${badge(l)}</div>
      <div class="today"><span class="today-kg">${W(l.current)}</span><span class="today-x">${esc(l.muscle)} · ${l.lo}–${l.hi} reps</span></div>
      ${setGrid(l, `Last · ${shortDate(l.last.day)}`)}
      <div class="detail">${l.history.length > 1 ? spark(l.history) : ''}<div class="small">${esc(l.note)}</div></div>
      <div class="more" aria-hidden="true">${openLift === l.ex ? 'Less' : 'History'}</div></div>`;
  }
  return h;
}

function renderBalance() {
  const max = Math.max(...A.balance.map(b => Math.max(b.avg, b.target, b.planned))) * 1.05;
  const pct = v => `${(v / max * 100).toFixed(1)}%`;
  const wk = A.weeks.map(w => w.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
  let h = `<h2>Muscle balance</h2><p class="note">Average hard sets per week, ${esc(wk[0])} to now. A secondary muscle counts as half a set (bench press = 1 chest, ½ triceps, ½ shoulders).</p>
  <div class="card"><div class="legend"><span><span class="sw" style="background:var(--bad)"></span>Under target</span><span><span class="sw" style="background:var(--bar)"></span>On target or over</span>
  <span><span class="sw" style="background:var(--fg);width:2px;height:12px;opacity:.7"></span>Target</span><span><span class="sw" style="border:2px solid var(--plan);border-radius:50%;width:10px;height:10px"></span>New plan</span></div>`;
  for (const b of A.balance) {
    h += `<div class="bal-row"><div class="name">${b.group}</div><div class="track">
      <div class="bar${b.avg < b.target ? ' under' : ''}" style="width:${pct(b.avg)}"></div>
      <div class="tgt" style="left:${pct(b.target)}"></div><div class="pl" style="left:${pct(b.planned)}"></div></div>
      <div class="val">${fmt(b.avg)}</div></div>`;
  }
  h += `</div><div class="card"><div class="small" style="margin-top:0">Week by week</div><table class="plan">`;
  h += `<tr><td></td>${wk.map(w => `<td class="r small" style="margin:0">${esc(w)}</td>`).join('')}</tr>`;
  for (const b of A.balance) h += `<tr><td>${b.group}</td>${b.weeks.map(v => `<td class="r">${fmt(v)}</td>`).join('')}</tr>`;
  h += `</table></div><p class="note">Targets: 10 sets/week for chest, back, shoulders, quads, hamstrings, glutes; 6 for biceps, triceps, calves and core, which also get work from presses and rows.</p>`;
  if (A.uncounted.length) h += `<p class="note">Not counted (not in the exercise list yet): ${esc(A.uncounted.join(', '))}.</p>`;
  return h;
}

function renderPlan() {
  let h = `<h2>Your balanced week</h2><p class="note">Upper / lower, each muscle twice a week${S.next === 'rotation' ? ', done in order' : ''}. Weights update every time you import.</p>`;
  for (const d of PLAN) {
    const isNext = nextSession().p === d;
    h += `<div class="card"><div class="dayhead"><b>${S.next === 'rotation' ? '' : `${DAYNAME[d.day]} · `}${esc(d.session)}${isNext ? ' <span class="pill ready">Next</span>' : ''}</b><span class="small" style="margin:0">${d.items.reduce((a, i) => a + i[1], 0)} sets</span></div>`;
    for (const [ex, n, reps, tag, fb] of d.items) {
      const w = weightFor(ex, fb); const up = w.lift && isUp(w.lift);
      h += `<div class="pl-item"><div class="grow"><div>${esc(ex)}</div>
        <div class="small" style="margin-top:2px">${n} × ${esc(reps)}${up ? ' <span class="pill ready">↑ Move up</span>' : tag ? ` <span class="pill new">${esc(tag)}</span>` : ''}</div></div>
        <div class="kg">${esc(w.text)}</div></div>`;
    }
    h += '</div>';
  }
  h += `<h2>How moving up works</h2><div class="card"><ul class="rules">
    <li>Each lift has a rep range. Keep the weight and add reps session by session.</li>
    <li>When <b>every</b> working set hits the top of the range, add the smallest step: 2 kg dumbbells, 2.5 kg barbell, one pin on a machine.</li>
    <li>Reps drop to the bottom of the range at the new weight. That's normal; build back up.</li>
    <li>Leave 1–2 reps in reserve. If a lift stalls for 3+ sessions, drop 10% and build back up.</li>
    <li>Log warm-ups as warm-up sets in Hevy so they stay out of the numbers.</li></ul></div>`;
  return h;
}

function emptyView() {
  return `<div class="empty"><img class="stack logo-light" src="assets/logo-stacked-on-light.svg" alt="OneRepMax"><img class="stack logo-dark" src="assets/logo-stacked-on-dark.svg" alt=""><h2>Import your workouts</h2>
    <p class="note">Everything stays on this phone.</p>
    <ol><li>In Hevy: <b>Profile → Settings → Export &amp; Import Data → Export Workouts</b>.</li>
    <li>Share the file to <b>OneRepMax</b>, or save it and tap <b>Import CSV</b> here.</li></ol>
    <div><button class="btn primary" type="button" data-import>Import CSV</button></div></div>`;
}


/* ---------- Progress tab ---------- */
let progMuscle = 'All', progLift = null;
const PRIMARY = ex => EX[ex] ? Object.entries(EX[ex][3]).filter(([, f]) => f === 1).map(([m]) => m) : CORE.has(ex) ? ['Core'] : [];
const wkLabel = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const chartW = () => Math.max(260, Math.min(640, $('#main').clientWidth) - 30);

function textW(s, size) { return String(s).length * size * 0.58; }

/* Line chart of [Date, value] points. */
function lineChart(pts, unit) {
  const W = chartW(), H = 170, m = { t: 14, r: 10, b: 22, l: 10 };
  const vals = pts.map(p => p[1]);
  let lo = Math.min(...vals), hi = Math.max(...vals);
  const padV = Math.max(2, (hi - lo) * 0.15); lo = Math.max(0, lo - padV); hi = hi + padV;
  const ticks = [lo, (lo + hi) / 2, hi].map(v => Math.round(v));
  m.l = Math.max(...ticks.map(t => textW(t, 10))) + 8;
  const x0 = +pts[0][0], x1 = +pts[pts.length - 1][0];
  const lastLab = `${fmt(vals[vals.length - 1])}`;
  m.r = textW(lastLab, 11) + 10;
  const X = d => m.l + (x1 === x0 ? (W - m.l - m.r) / 2 : (d - x0) / (x1 - x0) * (W - m.l - m.r));
  const Y = v => H - m.b - (v - lo) / (hi - lo) * (H - m.t - m.b);
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(unit)} over time">`;
  for (const t of ticks) s += `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(t).toFixed(1)}" y2="${Y(t).toFixed(1)}" stroke="var(--line)"/>
    <text x="${m.l - 6}" y="${(Y(t) + 3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="var(--muted)">${t}</text>`;
  s += `<text x="${m.l}" y="${H - 5}" font-size="10" fill="var(--muted)">${esc(wkLabel(pts[0][0]))}</text>
    <text x="${W - m.r}" y="${H - 5}" text-anchor="end" font-size="10" fill="var(--muted)">${esc(wkLabel(pts[pts.length - 1][0]))}</text>`;
  s += `<polyline points="${pts.map(p => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--brand-text)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  pts.forEach((p, i) => { s += `<circle cx="${X(p[0]).toFixed(1)}" cy="${Y(p[1]).toFixed(1)}" r="${i === pts.length - 1 ? 4.5 : 3}" fill="var(--brand-text)"/>`; });
  const lp = pts[pts.length - 1];
  s += `<text x="${(X(lp[0]) + 8).toFixed(1)}" y="${(Y(lp[1]) + 4).toFixed(1)}" font-size="11" font-weight="700" fill="var(--fg)">${esc(lastLab)}</text>`;
  return s + '</svg>';
}

/* Bar chart over the 12 weeks. opts: target (dashed line), hitColor rule. */
function barChart(values, weeks, opts = {}) {
  const W = chartW(), H = opts.h || 150, m = { t: 16, r: 4, b: 22, l: 4 };
  const max = Math.max(1, ...values, opts.target || 0) * 1.08;
  const n = values.length, gap = 4, bw = (W - m.l - m.r - gap * (n - 1)) / n;
  const Y = v => H - m.b - v / max * (H - m.t - m.b);
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${esc(opts.label || 'Weekly values')}">`;
  s += `<line x1="${m.l}" x2="${W - m.r}" y1="${H - m.b}" y2="${H - m.b}" stroke="var(--line)"/>`;
  if (opts.target != null) s += `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(opts.target).toFixed(1)}" y2="${Y(opts.target).toFixed(1)}" stroke="var(--fg)" stroke-opacity=".45" stroke-dasharray="4 4"/>`;
  values.forEach((v, i) => {
    const x = m.l + i * (bw + gap), y = Y(v), h = H - m.b - y;
    const fill = opts.target == null ? 'var(--brand-text)' : v >= opts.target ? 'var(--accent)' : 'var(--bar)';
    if (v > 0) s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, h).toFixed(1)}" rx="${Math.min(4, bw / 2)}" fill="${fill}"/>`;
    if (v > 0 && bw >= 16) s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" text-anchor="middle" font-size="10" fill="var(--muted)" paint-order="stroke" stroke="var(--panel)" stroke-width="3">${fmt(v)}</text>`;
    if (i % 3 === (n - 1) % 3) s += `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--muted)">${esc(wkLabel(weeks[i]))}</text>`;
  });
  return s + '</svg>';
}

/* Tiny 12-bar strip for the All-muscles overview. */
function miniBars(values, target) {
  const W = 132, H = 26, n = values.length, gap = 2, bw = (W - gap * (n - 1)) / n;
  const max = Math.max(1, ...values, target) * 1.05;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">`;
  values.forEach((v, i) => {
    const h = v / max * H;
    s += `<rect x="${(i * (bw + gap)).toFixed(1)}" y="${(H - Math.max(1.5, h)).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1.5, h).toFixed(1)}" rx="1.5" fill="${v >= target ? 'var(--accent)' : v > 0 ? 'var(--bar)' : 'var(--line)'}"/>`;
  });
  const ty = H - target / max * H;
  return s + `<line x1="0" x2="${W}" y1="${ty.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="var(--fg)" stroke-opacity=".5" stroke-dasharray="2 2"/></svg>`;
}

function renderProgress() {
  const P = A.progress, mus = progMuscle;
  let h = `<div class="chips" role="group" aria-label="Muscle group">`;
  for (const g of ['All', ...GROUPS]) h += `<button type="button" data-muscle="${g}" aria-pressed="${mus === g}">${g}</button>`;
  h += '</div>';

  // 1. Strength
  const lifts = A.lifts.filter(l => l.e1rm.length >= 2 && (mus === 'All' || PRIMARY(l.ex).includes(mus)))
    .sort((a, b) => b.e1rm.length - a.e1rm.length || a.ex.localeCompare(b.ex));
  h += `<div class="sec-head"><h2>Strength</h2><span class="small">est. 1-rep max</span></div><div class="card">`;
  if (!lifts.length) h += `<p class="note" style="margin:0">No weighted lifts with 2+ sessions${mus === 'All' ? '' : ` for ${mus.toLowerCase()}`} yet.</p>`;
  else {
    if (!lifts.some(l => l.ex === progLift)) progLift = lifts[0].ex;
    const l = lifts.find(x => x.ex === progLift);
    const pts = l.e1rm.map(([d, v]) => [fromKey(d), wv(v)]);
    const first = pts[0][1], last = pts[pts.length - 1][1], ch = (last - first) / first;
    h += `<select id="liftSel" class="sel" aria-label="Lift">${lifts.map(x => `<option${x.ex === progLift ? ' selected' : ''}>${esc(x.ex)}</option>`).join('')}</select>
      <div class="stat-row"><span class="stat">${fmt(last)} ${S.units}</span>
      <span class="delta ${ch >= 0 ? 'pos' : 'neg'}">${ch >= 0 ? '▲' : '▼'} ${Math.abs(Math.round(ch * 100))}%</span>
      <span class="small" style="margin:0">since ${esc(wkLabel(pts[0][0]))}</span></div>${lineChart(pts, 'Estimated 1-rep max')}`;
  }
  h += '</div>';

  // 2. Weekly sets
  h += `<div class="sec-head"><h2>Weekly sets</h2><span class="small">last 12 weeks</span></div><div class="card">`;
  if (mus === 'All') {
    h += `<div class="key" style="margin-bottom:6px"><span><i class="dot" style="background:var(--accent)"></i>On target</span><span><i class="dot" style="background:var(--bar)"></i>Under</span><span>- - target</span></div>`;
    for (const g of GROUPS) {
      const v = P.vol[g], last4 = v.slice(-4).reduce((a, b) => a + b, 0) / 4;
      h += `<button type="button" class="mrow" data-muscle="${g}"><span class="mname">${g}</span>${miniBars(v, TARGET[g])}<span class="mval ${last4 >= TARGET[g] ? 'pos' : 'neg'}">${fmt(last4)}</span></button>`;
    }
    h += `<p class="small">Right-hand number: average over the last 4 weeks. Tap a muscle for detail.</p>`;
  } else {
    const v = P.vol[mus], last4 = v.slice(-4).reduce((a, b) => a + b, 0) / 4;
    h += `<div class="stat-row"><span class="stat">${fmt(last4)}</span><span class="small" style="margin:0">sets/week, last 4 weeks · target ${TARGET[mus]}</span></div>
      ${barChart(v, P.weeks, { target: TARGET[mus], label: `${mus} sets per week` })}`;
  }
  h += '</div>';

  // 3. Move-ups
  const moves = P.moves.filter(mv => mus === 'All' || PRIMARY(mv.ex).includes(mus));
  const now = A.latest, thisMonth = moves.filter(mv => { const d = fromKey(mv.day); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).length;
  h += `<div class="sec-head"><h2>Weight increases</h2><span class="small">${thisMonth} in ${now.toLocaleDateString('en-GB', { month: 'long' })}</span></div><div class="card">`;
  if (!moves.length) h += `<p class="note" style="margin:0">None yet${mus === 'All' ? '' : ` for ${mus.toLowerCase()}`}.</p>`;
  for (const mv of moves.slice(0, 12)) h += `<div class="mv"><span class="mv-d">${esc(shortDate(mv.day))}</span><span class="mv-e">${esc(mv.ex)}</span><span class="kg">${fmt(wv(mv.from))}<span class="arrow">→</span>${fmt(wv(mv.to))}</span></div>`;
  if (moves.length > 12) h += `<p class="small">+ ${moves.length - 12} earlier</p>`;
  h += '</div>';

  // 4. Consistency
  const ses = mus === 'All' ? P.sessions : P.musSessions[mus];
  const avg = ses.slice(-4).reduce((a, b) => a + b, 0) / 4;
  h += `<div class="sec-head"><h2>Consistency</h2><span class="small">${mus === 'All' ? 'workouts' : `workouts with ${mus.toLowerCase()}`} per week</span></div>
    <div class="card"><div class="stat-row"><span class="stat">${fmt(avg)}</span><span class="small" style="margin:0">per week, last 4 weeks</span></div>
    ${barChart(ses, P.weeks, { label: 'Workouts per week', h: 120 })}</div>`;
  return h;
}

/* ---------- Prilepin (barbell lifts) ---------- */
const PRILEPIN_LIFTS = new Set(['Bench Press (Barbell)', 'Incline Bench Press (Barbell)', 'Bent Over Row (Barbell)', 'Squat (Barbell)',
  'Romanian Deadlift (Barbell)', 'Deadlift (Barbell)', 'Overhead Press (Barbell)', 'Hip Thrust (Barbell)']);
const ZONES = [
  { lo: 0,   hi: .70, name: '55–65%', reps: [3, 6], total: [18, 30], opt: 24, rx: [4, 6], seg: [55, 65] },
  { lo: .70, hi: .80, name: '70–80%', reps: [3, 6], total: [12, 24], opt: 18, rx: [3, 6], seg: [70, 80] },
  { lo: .80, hi: .90, name: '80–90%', reps: [2, 4], total: [10, 20], opt: 15, rx: [5, 3], seg: [80, 90] },
  { lo: .90, hi: 9,   name: '90%+',   reps: [1, 2], total: [4, 10],  opt: 4,  rx: [2, 2], seg: [90, 100] },
];
const zoneOf = p => ZONES.find(z => p >= z.lo && p < z.hi);
const usesPrilepin = l => S.style === 'prilepin' && l && PRILEPIN_LIFTS.has(l.ex);

/* Training max = best estimated 1RM in the last 6 weeks. Next weight: +1 step after a clean
   Prilepin session at the optimal total; pulled up to ~77% if lighter than 75%; never auto into 90%+. */
function prilepin(l) {
  if (l._p) return l._p;
  const cut = fromKey(l.last.day); cut.setDate(cut.getDate() - 42);
  let tm = 0;
  for (const s of l.sessions) if (fromKey(s.day) >= cut) for (const [w, r] of s.sets) tm = Math.max(tm, w * (1 + Math.min(r, 12) / 30));
  const cur = l.current, curPct = cur / tm, step = l.inc || 2.5;
  const lz = zoneOf(curPct);
  const top = l.last.sets.filter(s => s[0] === cur);
  const clean = top.length > 0 && top.every(([, r]) => r >= lz.reps[0] && r <= lz.reps[1]);
  const total = top.reduce((a, s) => a + s[1], 0);
  let next = cur;
  if (clean && total >= lz.opt) next = cur + step;
  else if (curPct < 0.75) next = Math.max(cur, Math.round(0.77 * tm / step) * step);
  if (next / tm >= 0.9 && next > cur) next = cur;
  const pct = next / tm, zone = zoneOf(pct);
  const zoneReps = l.last.sets.filter(([w]) => zoneOf(w / tm) === zone).reduce((a, s) => a + s[1], 0);
  return (l._p = { tm, cur, curPct, next, pct, zone, zoneReps });
}

const pos = p => `${Math.max(0, Math.min(100, (p * 100 - 50) * 2)).toFixed(1)}%`;

function pTile(l, opts = {}) {
  const P = prilepin(l), z = P.zone;
  const pc = v => `${Math.round(v * 100)}%`;
  const moved = P.next !== P.cur;
  let h = `<div class="card xc ptile${opts.expandable ? ' lift' : ''}${opts.expandable && openLift === l.ex ? ' open' : ''}"${opts.expandable ? ` data-lift="${esc(l.ex)}"` : ''}>
    <div class="xc-top"><div class="ex">${esc(l.ex)}</div><span class="badge zone">${z.name}</span></div>
    <div class="phero"><div><div class="today-kg">${W(P.next)}</div><div class="small" style="margin-top:2px">${pc(P.pct)} of 1RM · est. ${W(Math.round(P.tm * 10) / 10)}</div></div>
      <div style="text-align:right"><div class="prx">${z.rx[0] * z.rx[1]} reps</div><div class="small" style="margin-top:2px">${z.rx[0]} × ${z.rx[1]} · optimal</div></div></div>
    <div><div class="plab"><span>Intensity</span><span class="pval" style="color:var(--zone)">${pc(P.pct)}${moved ? ` <span style="color:var(--accent)">${P.next > P.cur ? '↑' : '↓'} from ${pc(P.curPct)}</span>` : ''}</span></div>
      <div class="pscale" role="img" aria-label="Intensity ${pc(P.pct)}, zone ${z.name}">`;
  for (const zz of ZONES) h += `<div class="pseg${zz === z ? ' on' : ''}" style="left:calc(${pos(zz.seg[0] / 100)} + 1px);width:calc(${pos(zz.seg[1] / 100)} - ${pos(zz.seg[0] / 100)} - 2px)"></div>`;
  if (moved) h += `<div class="pmark" style="left:${pos(P.curPct)};opacity:.35"></div>`;
  h += `<div class="pmark" style="left:${pos(P.pct)}"></div></div>
      <div class="pticks">${[55, 65, 70, 80, 90].map(t => `<span style="left:${pos(t / 100)}">${t}</span>`).join('')}<span style="left:97%">100</span></div></div>`;
  // Reps in zone, last time
  const max = z.total[1] * 1.25, pp = v => `${Math.min(100, v / max * 100).toFixed(1)}%`;
  const st = P.zoneReps < z.total[0] ? 'bad' : P.zoneReps > z.total[1] ? 'warn' : 'accent';
  h += `<div><div class="plab"><span>Reps in zone · last time</span><span class="pval" style="color:var(--${st})">${P.zoneReps} of ${z.total[0]}–${z.total[1]}</span></div>
      <div class="pmeter" role="img" aria-label="${P.zoneReps} reps in zone last time; range ${z.total[0]} to ${z.total[1]}, optimal ${z.opt}">
        <div class="pband" style="left:${pp(z.total[0])};width:calc(${pp(z.total[1])} - ${pp(z.total[0])})"></div>
        <div class="pfill" style="width:${pp(P.zoneReps)};background:var(--${st})"></div>
        <div class="popt" style="left:${pp(z.opt)}"></div></div>
      <div class="pticks"><span style="left:${pp(z.total[0])}">${z.total[0]}</span><span style="left:${pp(z.opt)}">${z.opt}</span><span style="left:${pp(z.total[1])}">${z.total[1]}</span></div></div>`;
  // Sets grid: last session, its weights, and next session's target
  const sets = l.last.sets, cols = Math.max(3, sets.length, z.rx[0]);
  h += `<div class="sets" style="grid-template-columns: 2.6rem repeat(${cols}, minmax(0, 1fr))"><span class="lab"></span>`;
  for (let i = 0; i < cols; i++) h += `<span class="hd">${i + 1}</span>`;
  h += `<span class="lab">${esc(shortDate(l.last.day))}</span>`;
  for (let i = 0; i < cols; i++) {
    if (i >= sets.length) { h += '<span></span>'; continue; }
    const [w, r] = sets[i];
    const cls = zoneOf(w / P.tm) !== z ? 'ramp' : r < z.reps[0] ? 'miss' : r > z.reps[1] ? 'over' : 'hit';
    h += `<span class="rep ${cls}" aria-label="${r} reps, ${{ ramp: 'lighter set', miss: 'under zone', over: 'over zone', hit: 'in zone' }[cls]}">${r}</span>`;
  }
  h += `<span class="lab">${S.units}</span>`;
  for (let i = 0; i < cols; i++) h += `<span class="w">${i < sets.length ? fmt(wv(sets[i][0])) : ''}</span>`;
  h += '<span class="lab">Next</span>';
  for (let i = 0; i < cols; i++) h += i < z.rx[0] ? `<span class="rep plan">${z.rx[1]}</span>` : '<span></span>';
  h += '</div>';
  if (opts.expandable) h += `<div class="detail">${l.history.length > 1 ? spark(l.history) : ''}<div class="small">Prilepin zone ${z.name}: ${z.reps[0]}–${z.reps[1]} reps per set, ${z.total[0]}–${z.total[1]} in total, ${z.opt} optimal.</div></div>
    <div class="more" aria-hidden="true">${openLift === l.ex ? 'Less' : 'History'}</div>`;
  return h + '</div>';
}

function pLegend() {
  return `<div class="key"><span><i class="dot hit"></i>In zone</span><span><i class="dot over"></i>Over zone</span><span><i class="dot miss"></i>Under</span><span><i class="dot ramp"></i>Lighter</span><span><i class="dot plan"></i>Next</span></div>`;
}

/* ---------- Menu ---------- */
function renderMenu() {
  const imp = store.get('lc_imported_at');
  const impTxt = imp ? `Hevy CSV · last import ${new Date(imp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : 'Hevy CSV export';
  const seg = (key, opts, label) => `<div class="mseg" role="group" aria-label="${label}">${opts.map(([v, t]) => `<button type="button" data-set="${key}" data-val="${v}" aria-pressed="${S[key] === v}">${t}</button>`).join('')}</div>`;
  $('#drawer').innerHTML = `
    <div class="dhead"><b>Menu</b><button type="button" class="iconbtn" data-act="close" aria-label="Close menu"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="dscroll">
    <div class="grp">Data</div>
    <button type="button" class="mitem" data-act="import"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span><span class="mt">Import workouts</span><span class="ms">${esc(impTxt)}</span></span></button>
    <button type="button" class="mitem" data-act="howto" aria-expanded="false"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg><span><span class="mt">How to export from Hevy</span><span class="ms">Profile › Settings › Export data</span></span></button>
    <ol class="howto" id="howto" hidden><li>In Hevy, open <b>Profile</b> → ⚙ <b>Settings</b>.</li><li>Tap <b>Export &amp; Import Data</b> → <b>Export Workouts</b>.</li><li>Share the file to <b>OneRepMax</b>, or save it and use <b>Import workouts</b>.</li></ol>
    <div class="grp">Training</div>
    <div class="mrowx"><div class="mt">Barbell lifts</div>${seg('style', [['rep', 'Rep targets'], ['prilepin', 'Prilepin']], 'Progression style for barbell lifts')}<div class="ms">Accessories always use rep targets.</div></div>
    <button type="button" class="mitem" data-act="chart"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 9v11"/></svg><span style="flex:1"><span class="mt">Prilepin chart</span><span class="ms">Zones, reps per set and how to read a tile</span></span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
    <div class="mrowx"><div class="mt">Next session</div>${seg('next', [['rotation', 'In rotation'], ['weekday', 'By weekday']], 'How the next session is chosen')}
      <div class="ms">${S.next === 'rotation' ? 'Follows your last workout. Name Hevy workouts Upper A, Lower A, Upper B, Lower B to keep it in step.' : 'Mon Upper A · Wed Lower A · Fri Upper B · Sun Lower B'}</div></div>
    <div class="mrowx"><div class="mt">Units</div>${seg('units', [['kg', 'kg'], ['lb', 'lb']], 'Weight units')}</div>
    </div>
    <button type="button" class="mitem danger" data-act="clear"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg><span class="mt" id="clearLbl">Clear data on this phone</span></button>
    <div class="dfoot">OneRepMax · your data stays on this phone</div>`;
}

function openMenu(open) {
  const d = $('#drawer'), s = $('#scrim');
  if (open) { renderMenu(); d.hidden = false; s.hidden = false; requestAnimationFrame(() => { d.classList.add('open'); s.classList.add('open'); }); $('#drawer [data-act="close"]').focus(); }
  else { d.classList.remove('open'); s.classList.remove('open'); setTimeout(() => { d.hidden = true; s.hidden = true; }, 200); $('#menuBtn').focus(); }
}

function saveSettings() { store.set('lc_settings', JSON.stringify(S)); }

let prevTab = 'next';
function renderChart() {
  const who = z => (A ? A.lifts.filter(l => l.active && PRILEPIN_LIFTS.has(l.ex) && prilepin(l).zone === z).map(l => l.ex.replace(' (Barbell)', '')) : []);
  let h = `<button type="button" class="back" data-back><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>Back</button>
    <h2>Prilepin's chart</h2><p class="note">How many reps to do in a session, based on how heavy the weight is.</p>
    <div class="zt"><div class="zr zh"><span class="zz">% of 1RM</span><span>Reps / set</span><span>Optimal</span><span>Range</span></div>`;
  for (const z of ZONES) {
    const w = who(z);
    h += `<div class="zr${w.length ? ' hl' : ''}"><span class="zz">${z.name}</span><span>${z.reps[0]}–${z.reps[1]}</span><span>${z.opt}</span><span>${z.total[0]}–${z.total[1]}</span>${w.length ? `<span class="zw">${esc(w.join(' · '))}</span>` : ''}</div>`;
  }
  h += `</div><p class="small">Highlighted zones show where your barbell lifts sit for their next session.</p>
    <h2>Reading a tile</h2><div class="card">
    <div class="how"><div class="how-v"><div class="pscale" style="width:100%"><div class="pseg on" style="left:30%;width:28%"></div><div class="pmark" style="left:52%"></div></div></div>
      <p><b>Intensity.</b> Your weight as a % of estimated 1-rep max, and the zone it falls in.</p></div>
    <div class="how"><div class="how-v"><div class="pmeter" style="width:100%"><div class="pband" style="left:40%;width:40%"></div><div class="pfill" style="width:62%;background:var(--accent)"></div><div class="popt" style="left:60%"></div></div></div>
      <p><b>Reps in zone.</b> Total reps last time against the zone's range. The tick is the optimal total.</p></div>
    <div class="how"><div class="how-v" style="display:flex;gap:4px"><span class="rep hit" style="flex:1;text-align:center">5</span><span class="rep over" style="flex:1;text-align:center">8</span><span class="rep plan" style="flex:1;text-align:center">6</span></div>
      <p><b>Sets.</b> Green: reps inside the zone's per-set range. Amber: more than the zone calls for. Red: fewer. Dashed: next session's target.</p></div>
    </div>
    <h2>How weights move</h2><div class="card"><ul class="rules">
    <li>Your estimated max is the best from the last 6 weeks.</li>
    <li>Hit the optimal total with every set inside the zone's rep range, and the weight goes up one step.</li>
    <li>Below 75% of your max, the weight is pulled up to about 77%.</li>
    <li>The app never moves you into the 90%+ zone on its own.</li></ul></div>`;
  return h;
}

function render() {
  const main = $('#main');
  $('#tabs').hidden = !A;
  if (tab === 'chart') { main.innerHTML = renderChart(); $('#tabs').hidden = !A; document.querySelectorAll('#tabs [data-tab]').forEach(b => b.setAttribute('aria-selected', 'false')); return; }
  if (!A) { main.innerHTML = emptyView(); $('#sub').textContent = 'No workouts imported yet'; return; }
  $('#sub').textContent = `Data to ${A.latest.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · ${A.blockWorkouts} recent workouts`;
  main.innerHTML = tab === 'next' ? renderNext() : tab === 'lifts' ? renderLifts() : tab === 'balance' ? renderBalance() : tab === 'progress' ? renderProgress() : renderPlan();
  document.querySelectorAll('#tabs [data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === tab));
}

function load(text, quiet) {
  try {
    A = analyse(text);
    if (!store.set('hevy_csv', text) && !quiet) toast('Imported, but this phone would not save it for next time.');
    else if (!quiet) { store.set('lc_imported_at', new Date().toISOString()); toast(`Imported ${A.workouts} workouts`); }
    render();
    return true;
  } catch (e) { toast(e.message || 'Could not read that file.'); return false; }
}

/* ---------- Events ---------- */
$('#menuBtn').addEventListener('click', () => openMenu(true));
$('#scrim').addEventListener('click', () => openMenu(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#drawer').hidden) openMenu(false); });
let clearArm = 0;
$('#drawer').addEventListener('click', e => {
  const s = e.target.closest('[data-set]');
  if (s) {
    const k = s.dataset.set, v = s.dataset.val; if (S[k] === v) return;
    S[k] = v; saveSettings();
    if (k === 'units' && A) { const csv = store.get('hevy_csv'); if (csv) A = analyse(csv); }
    renderMenu(); render(); return;
  }
  const a = e.target.closest('[data-act]'); if (!a) return;
  const act = a.dataset.act;
  if (act === 'close') return openMenu(false);
  if (act === 'chart') { if (tab !== 'chart') prevTab = tab; tab = 'chart'; openMenu(false); render(); window.scrollTo(0, 0); return; }
  if (act === 'import') { openMenu(false); return $('#file').click(); }
  if (act === 'howto') { const h = $('#howto'); h.hidden = !h.hidden; a.setAttribute('aria-expanded', String(!h.hidden)); return; }
  if (act === 'clear') {
    if (Date.now() - clearArm > 4000) { clearArm = Date.now(); $('#clearLbl').textContent = 'Tap again to clear all data'; setTimeout(() => { const c = $('#clearLbl'); if (c) c.textContent = 'Clear data on this phone'; }, 4000); return; }
    try { localStorage.removeItem('hevy_csv'); localStorage.removeItem('lc_imported_at'); } catch (err) { /* nothing stored */ }
    A = null; clearArm = 0; openMenu(false); render(); toast('Workout data cleared from this phone');
  }
});
$('#file').addEventListener('change', async e => { const f = e.target.files[0]; if (f) load(await f.text()); e.target.value = ''; });
$('#main').addEventListener('click', e => {
  if (e.target.closest('[data-import]')) return $('#file').click();
  if (e.target.closest('[data-back]')) { tab = prevTab; render(); window.scrollTo(0, 0); return; }
  const mu = e.target.closest('[data-muscle]'); if (mu) { progMuscle = mu.dataset.muscle; return render(); }
  const f = e.target.closest('[data-filter]'); if (f) { liftFilter = f.dataset.filter; return render(); }
  const l = e.target.closest('[data-lift]'); if (l) { openLift = openLift === l.dataset.lift ? null : l.dataset.lift; render(); }
});
$('#main').addEventListener('change', e => { if (e.target.id === 'liftSel') { progLift = e.target.value; render(); } });
let rsz; window.addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(() => { if (A && tab === 'progress') render(); }, 150); });
$('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { tab = b.dataset.tab; render(); window.scrollTo(0, 0); } });

/* ---------- Start ---------- */
(async () => {
  const params = new URLSearchParams(location.search);
  if (params.has('shared') && 'caches' in window) {
    try {
      const c = await caches.open('lift-coach-shared'); const r = await c.match('shared.csv');
      if (r) { load(await r.text()); await c.delete('shared.csv'); }
    } catch (e) { /* fall through to saved data */ }
    history.replaceState(null, '', location.pathname);
  }
  if (!A) { const saved = store.get('hevy_csv'); if (saved) load(saved, true); }
  render();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
