/* Service Worker — מקלט קרוב */
const CACHE = 'miklat-karov-v8';
const SHELL = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      // shelters.json גדול (3MB) — ננסה לשמור, לא נכשל אם אין מקום
      for (const u of SHELL) {
        try { await cache.add(u); } catch {}
      }
      try { await cache.add('./shelters.json'); } catch {}
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // רק GET מאותו מקור
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // shelters.json: cache-first (מהיר + אופליין)
  if (url.pathname.endsWith('shelters.json')) {
    e.respondWith(
      caches.match(e.request).then(
        (hit) => hit || fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return res;
        })
      )
    );
    return;
  }

  // app shell: stale-while-revalidate
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const net = fetch(e.request).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    }).then(async (res) => {
      if (res) return res;
      // fallback לניווטים: index
      if (e.request.mode === 'navigate') {
        const idx = await caches.match('./index.html');
        if (idx) return idx;
      }
      throw new Error('offline');
    })
  );
});
