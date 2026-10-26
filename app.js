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
  const iEx = col('exercise_title'), iStart = col('start_time'), iType = col('set_type'), iReps = col('reps'), iIdx = col('set_index');
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
    sets.push({ dt, day: dayKey(dt), ex: (r[iEx] || '').trim(), type, w, reps: isNaN(reps) ? null : reps, idx: iIdx >= 0 ? +r[iIdx] || 0 : 0 });
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
    if (reps.length >= 2 && Math.min(...reps) >= hi) {
      status = 'ready'; next = Math.round((last.top + inc) * 10) / 10;
      note = `Every set at ${fmt(last.top)} kg hit ${hi}+ reps. Go to ${fmt(next)} kg.`;
    } else if (prior) {
      status = 'ready'; next = prior.top;
      const rr = prior.repsAtTop; const repTxt = rr.length > 1 ? rr.slice(0, -1).join(', ') + ' and ' + rr[rr.length - 1] : rr[0];
      note = `You did ${fmt(prior.top)} kg for ${repTxt} reps on ${shortDate(prior.day)}. Go back to ${fmt(prior.top)} kg.`;
    } else if (reps.length === 1 && sessions.length > 1) {
      status = 'building';
      note = `Only 1 set at ${fmt(last.top)} kg so far. Do all your sets there, then build to ${hi} reps.`;
    } else if (reps.filter(r => r >= hi).length >= Math.max(1, reps.length / 2) || (reps.length >= 2 && reps.reduce((a, b) => a + b, 0) / reps.length >= hi - 1.5)) {
      status = 'almost';
      note = `${shortBy} more rep${shortBy === 1 ? '' : 's'} to hit ${hi} on every set at ${fmt(last.top)} kg.`;
    } else {
      status = 'building';
      note = `${shortBy} more reps to hit ${hi} on every set at ${fmt(last.top)} kg.`;
    }
    // Stall check: same top weight 5+ sessions in a row, and the last 3 sessions no better than the one before them.
    const sameRun = (() => { let n = 0; for (let i = sessions.length - 1; i >= 0 && sessions[i].top === last.top; i--) n++; return n; })();
    const mean = s => s.repsAtTop.reduce((a, b) => a + b, 0) / s.repsAtTop.length;
    const n = sessions.length;
    const stalled = sameRun >= 5 && Math.max(...sessions.slice(n - 3).map(mean)) <= mean(sessions[n - 4]);
    if (status !== 'ready' && stalled) note += ` No progress for ${sameRun} sessions: do it first in the workout, or drop 10% and build back up.`;
    lifts.push({ ex, muscle: Object.entries(EX[ex][3]).sort((a, b) => b[1] - a[1])[0][0], lo, hi, inc, status, current: last.top, next, note, shortBy, stalled: status !== 'ready' && stalled, single: status === 'building' && reps.length === 1 && sessions.length > 1,
      last, active, sessions, history: sessions.map(s => [s.day, s.top]) });
  }
  const order = { ready: 0, almost: 1, building: 2 };
  lifts.sort((a, b) => order[a.status] - order[b.status] || a.ex.localeCompare(b.ex));
  return { latest, workouts, blockWorkouts, weeks, balance, lifts, uncounted: [...uncounted] };
}

/* ---------- Rendering ---------- */
let A = null, tab = 'next', liftFilter = 'all', openLift = null;
const STATUS = { ready: 'Move up', almost: 'Almost', building: 'Building' };

function weightFor(ex, fallback) {
  const l = A.lifts.find(x => x.ex === ex);
  if (l && l.active) return { text: `${fmt(l.status === 'ready' ? l.next : l.current)} kg`, lift: l };
  if (l) return { text: `${fmt(l.current)} kg`, lift: l };
  return { text: fallback || '—', lift: null };
}

function nextSession() {
  const now = new Date(); const today = now.getDay();
  const trainedToday = dayKey(A.latest) === dayKey(now);
  for (let k = trainedToday ? 1 : 0; k < 8; k++) {
    const d = (today + k) % 7; const p = PLAN.find(x => x.day === d);
    if (p) return { p, k };
  }
  return { p: PLAN[0], k: 0 };
}

/* One badge per lift: what to do, in two or three words. */
function badge(l) {
  if (l.status === 'ready') return `<span class="badge up">↑ ${fmt(l.next)} kg</span>`;
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
  h += '<span class="lab">kg</span>';
  for (let i = 0; i < cols; i++) h += `<span class="w">${i < sets.length ? fmt(sets[i][0]) : ''}</span>`;
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
  const { p, k } = nextSession();
  const when = k === 0 ? 'Today' : k === 1 ? 'Tomorrow' : DAYNAME[p.day];
  const ready = A.lifts.filter(l => l.active && l.status === 'ready');
  const under = A.balance.filter(b => b.avg < b.target);
  let h = `<div class="tiles">
    <div class="card tile"><div class="big">${ready.length}</div><div class="lbl">lifts ready to move up</div></div>
    <div class="card tile"><div class="big">${under.length}</div><div class="lbl">muscle groups under target</div></div>
  </div>`;
  h += `<div class="sec-head"><h2>${when} · ${esc(p.session)}</h2><span class="small">${p.items.reduce((a, i) => a + i[1], 0)} sets</span></div>${legend()}`;
  for (const [ex, n, reps, tag, fb] of p.items) {
    const w = weightFor(ex, fb); const l = w.lift;
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
    <text x="${(pts[pts.length - 1][0] + 6).toFixed(1)}" y="${(pts[pts.length - 1][1] + 4).toFixed(1)}" font-size="11" fill="var(--fg)">${fmt(last[1])}</text>
    <text x="${(pts[0][0] - 6).toFixed(1)}" y="${(pts[0][1] + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--muted)">${fmt(hist[0][1])}</text>
  </svg>`;
}

function renderLifts() {
  const list = A.lifts.filter(l => l.active && (liftFilter === 'all' || l.status === liftFilter));
  let h = `<div class="chips" role="group" aria-label="Filter">`;
  for (const [k, lab] of [['all', 'All'], ['ready', 'Move up'], ['almost', 'Almost'], ['building', 'Building']])
    h += `<button type="button" data-filter="${k}" aria-pressed="${liftFilter === k}">${lab}</button>`;
  h += `</div>${legend()}`;
  if (!list.length) h += '<p class="note">Nothing here.</p>';
  for (const l of list) {
    h += `<div class="card xc lift${openLift === l.ex ? ' open' : ''}" data-lift="${esc(l.ex)}">
      <div class="xc-top"><div class="ex">${esc(l.ex)}</div>${badge(l)}</div>
      <div class="today"><span class="today-kg">${fmt(l.current)} kg</span><span class="today-x">${esc(l.muscle)} · ${l.lo}–${l.hi} reps</span></div>
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
  let h = `<h2>Your balanced week</h2><p class="note">Upper / lower, each muscle twice a week. Weights update every time you import.</p>`;
  for (const d of PLAN) {
    h += `<div class="card"><div class="dayhead"><b>${DAYNAME[d.day]} · ${esc(d.session)}</b><span class="small" style="margin:0">${d.items.reduce((a, i) => a + i[1], 0)} sets</span></div>`;
    for (const [ex, n, reps, tag, fb] of d.items) {
      const w = weightFor(ex, fb); const up = w.lift && w.lift.active && w.lift.status === 'ready';
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
  return `<div class="empty"><h2>Import your workouts</h2>
    <p class="note">Everything stays on this phone.</p>
    <ol><li>In Hevy: <b>Profile → Settings → Export &amp; Import Data → Export Workouts</b>.</li>
    <li>Share the file to <b>Lift Coach</b>, or save it and tap <b>Import CSV</b> here.</li></ol>
    <div><button class="btn primary" type="button" data-import>Import CSV</button></div></div>`;
}

function render() {
  const main = $('#main');
  $('#tabs').hidden = !A;
  if (!A) { main.innerHTML = emptyView(); $('#sub').textContent = 'No workouts imported yet'; return; }
  $('#sub').textContent = `Data to ${A.latest.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · ${A.blockWorkouts} recent workouts`;
  main.innerHTML = tab === 'next' ? renderNext() : tab === 'lifts' ? renderLifts() : tab === 'balance' ? renderBalance() : renderPlan();
  document.querySelectorAll('#tabs [data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === tab));
}

function load(text, quiet) {
  try {
    A = analyse(text);
    if (!store.set('hevy_csv', text) && !quiet) toast('Imported, but this phone would not save it for next time.');
    else if (!quiet) toast(`Imported ${A.workouts} workouts`);
    render();
    return true;
  } catch (e) { toast(e.message || 'Could not read that file.'); return false; }
}

/* ---------- Events ---------- */
$('#importBtn').addEventListener('click', () => $('#file').click());
$('#file').addEventListener('change', async e => { const f = e.target.files[0]; if (f) load(await f.text()); e.target.value = ''; });
$('#main').addEventListener('click', e => {
  if (e.target.closest('[data-import]')) return $('#file').click();
  const f = e.target.closest('[data-filter]'); if (f) { liftFilter = f.dataset.filter; return render(); }
  const l = e.target.closest('[data-lift]'); if (l) { openLift = openLift === l.dataset.lift ? null : l.dataset.lift; render(); }
});
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
