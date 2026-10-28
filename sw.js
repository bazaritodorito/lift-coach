const VERSION = 'onerepmax-v11';
const SHELL = ['./', 'index.html', 'app.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'assets/logo-horizontal-on-dark.svg', 'assets/logo-horizontal-on-light.svg',
  'assets/logo-stacked-on-dark.svg', 'assets/logo-stacked-on-light.svg',
  'assets/fonts/barlow-condensed-latin-500-normal.woff2', 'assets/fonts/barlow-condensed-latin-600-normal.woff2',
  'assets/fonts/barlow-condensed-latin-700-normal.woff2', 'assets/fonts/barlow-condensed-latin-800-italic.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== VERSION && k !== 'lift-coach-shared').map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Android share sheet: Hevy CSV shared to the app arrives here.
  if (e.request.method === 'POST' && url.pathname.endsWith('/share')) {
    e.respondWith((async () => {
      try {
        const form = await e.request.formData();
        const file = form.get('file');
        if (file && file.text) {
          const c = await caches.open('lift-coach-shared');
          await c.put('shared.csv', new Response(await file.text()));
        }
      } catch (err) { /* ignore and open the app anyway */ }
      return Response.redirect(new URL('./?shared=1', self.registration.scope).href, 303);
    })());
    return;
  }
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Network first so updates arrive, cache as fallback so it works offline.
  // Always revalidate with the server so a new version shows up on the next open (Pages caches files for 10 min).
  const fresh = e.request.mode === 'navigate' ? new Request(e.request.url, { cache: 'no-cache' }) : new Request(e.request, { cache: 'no-cache' });
  e.respondWith(fetch(fresh).then(res => {
    const copy = res.clone();
    caches.open(VERSION).then(c => c.put(e.request, copy));
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
});
