/* מקלט קרוב — מפה על כל המסך */
'use strict';

const $ = (id) => document.getElementById(id);
const els = {
  findBtn: $('findBtn'), findTx: $('findTx'),
  gpsDot: $('gpsDot'),
  search: $('search'), countLine: $('countLine'),
  carousel: $('carousel'),
  sheet: $('sheet'), sheetBg: $('sheetBg'), sheetBody: $('sheetBody'),
  toast: $('toast'), offlineBar: $('offlineBar'),
};

const state = {
  shelters: [],
  user: null,
  locating: false,
  filtered: [],
  map: null, markers: null, userMarker: null, accCircle: null,
};

const MAX_PINS = 60;

/* ---------- utils ---------- */
function haversine(a, b, c, d) {
  const R = 6371000, t = Math.PI / 180;
  const s1 = Math.sin(((c - a) * t) / 2) ** 2;
  const s2 = Math.cos(a * t) * Math.cos(c * t) * Math.sin(((d - b) * t) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s1 + s2));
}
function fmtDist(m) {
  if (m == null || !isFinite(m)) return '';
  if (m < 1000) return `${Math.round(m)} מ׳`;
  if (m < 10000) return `${(m / 1000).toFixed(1)} ק״מ`;
  return `${Math.round(m / 1000)} ק״מ`;
}
function walkMin(m) {
  if (m == null || !isFinite(m)) return '';
  const min = m / 83;
  if (min < 1) return 'דקה הליכה';
  if (min < 60) return `${Math.round(min)} דק׳ הליכה`;
  return `${(min / 60).toFixed(1)} שע׳ הליכה`;
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
let toastT;
function toast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.remove('hidden');
  clearTimeout(toastT);
  toastT = setTimeout(() => els.toast.classList.add('hidden'), 2600);
}
function gmapsUrl(s) { return `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`; }
function wazeUrl(s) { return `https://waze.com/ul?ll=${s.lat},${s.lng}&navigate=yes`; }
function title(s) { return `${s.name}${s.address ? ` · ${s.address}` : ''}`; }

/* ---------- data ---------- */
async function loadData() {
  try {
    const res = await fetch('./shelters.json');
    if (!res.ok) throw new Error('fetch failed');
    const gj = await res.json();
    state.shelters = (gj.features || []).map((f, i) => {
      const [lng, lat] = f.geometry?.coordinates || [];
      const p = f.properties || {};
      return { id: i, lat, lng, name: p.name || 'מקלט', address: p.address || '', city: p.set_name || '', status: p.status || '', notes: p.notes || '' };
    }).filter((s) => isFinite(s.lat) && isFinite(s.lng));
  } catch (e) {
    state.shelters = [];
    toast('⚠️ לא הצלחתי לטעון מקלטים — בדוק חיבור ורענן');
  }
  applyFilters();
}

/* ---------- filter + render ---------- */
function computeDistances() {
  if (!state.user) return;
  const { lat, lng } = state.user;
  for (const s of state.shelters) s._d = haversine(lat, lng, s.lat, s.lng);
}
function applyFilters() {
  computeDistances();
  const q = els.search.value.trim();
  let arr = state.shelters;
  if (q) arr = arr.filter((s) => `${s.address} ${s.city} ${s.name} ${s.notes}`.includes(q));
  arr = [...arr].sort((a, b) => {
    if (state.user) return (a._d ?? Infinity) - (b._d ?? Infinity);
    return `${a.city} ${a.address}`.localeCompare(`${b.city} ${b.address}`, 'he');
  });
  state.filtered = arr;
  render();
}

function distLine(s) {
  if (state.user && s._d != null) return `<b>${fmtDist(s._d)}</b> · ${walkMin(s._d)} · ${esc(s.city)}`;
  return esc(s.city);
}

function carouselHTML(s, rank) {
  return `
  <div class="c-card ${rank === 0 && state.user ? 'first' : ''}" data-focus="${s.id}">
    <span class="c-rank">${rank + 1}</span>
    <span class="c-main"><b>${esc(title(s))}</b><i>${distLine(s)}</i></span>
    <a class="c-nav" href="${gmapsUrl(s)}" target="_blank" rel="noopener" aria-label="נווט">🧭</a>
  </div>`;
}

function render() {
  const arr = state.filtered;
  els.carousel.innerHTML = arr.length
    ? arr.slice(0, 8).map((s, i) => carouselHTML(s, i)).join('')
    : `<div class="c-card"><span class="c-main"><b>לא נמצאו מקלטים</b><i>נסה חיפוש אחר או נקה סינון</i></span></div>`;
  const f = arr.length.toLocaleString('he-IL');
  els.countLine.textContent = state.user ? `${f} מקלטים · מהקרוב לרחוק` : `${f} מקלטים · לחץ ״קרוב אליי״ למיון`;
  scheduleMapRefresh();
}

/* ---------- geolocation ---------- */
function setGpsUI(mode, text) {
  els.gpsDot.className = `gps-dot ${mode}`;
  els.gpsDot.parentElement.title = text; // הנקודה על הלוגו מחליפה טקסט סטטוס
}
function setBusy(busy) {
  els.findBtn.classList.toggle('busy', busy);
  els.findTx.textContent = busy ? 'מאתר…' : 'קרוב אליי';
}
function locate(highAccuracy = true, manual = false) {
  if (state.locating) return;
  if (!('geolocation' in navigator)) {
    setGpsUI('err', 'אין מיקום — חפש עיר');
    toast('הדפדפן לא תומך במיקום');
    return;
  }
  state.locating = true;
  setBusy(true);
  setGpsUI('wait', 'מאתר…');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      state.locating = false;
      setBusy(false);
      state.user = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy };
      onLocation(`±${Math.round(pos.coords.accuracy)} מ׳`, manual);
    },
    (err) => {
      state.locating = false;
      setBusy(false);
      const msgs = { 1: 'המיקום נדחה — חפש עיר', 2: 'המיקום לא זמין', 3: 'תם הזמן — לחץ שוב' };
      setGpsUI('err', msgs[err.code] || 'שגיאת מיקום');
      toast(msgs[err.code] || 'שגיאת מיקום');
      applyFilters();
    },
    { enableHighAccuracy: highAccuracy, timeout: 12000, maximumAge: 30000 }
  );
}
function onLocation(label, manual = false) {
  setGpsUI('ok', label);
  applyFilters();
  if (!state.map) return;
  if (manual) {
    if (state.user) state.map.setView([state.user.lat, state.user.lng], 15, { animate: true });
    refreshMapMarkers(false);
    if (state.filtered[0]) openSheet(state.filtered[0]);
  } else {
    if (state.user) state.map.setView([state.user.lat, state.user.lng], 14);
    refreshMapMarkers(false);
  }
}

/* ---------- map ---------- */
function ensureMap() {
  state.map = L.map('map', {
    zoomControl: false, attributionControl: false, // פינץ׳-זום במובייל, קרדיט בשורה הקטנה למטה
    fadeAnimation: false, markerZoomAnimation: false, preferCanvas: true,
  });
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, maxNativeZoom: 16, // מעבר ל־16 אין אריחים — מגדילים במקום לדרוש
  }).addTo(state.map);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, maxNativeZoom: 16 }).addTo(state.map);
  state.markers = L.layerGroup().addTo(state.map);
  state.map.fitBounds([[29.55, 34.25], [33.28, 35.9]]); // כל ישראל
  setTimeout(() => state.map.invalidateSize(), 200);
  window.addEventListener('resize', () => state.map.invalidateSize());
  window.addEventListener('orientationchange', () => setTimeout(() => state.map.invalidateSize(), 300));
}
function pinIcon(top) {
  return L.divIcon({ className: '', html: `<div class="shelter-pin ${top ? 'top' : ''}">${top ? '⭐' : '🛡️'}</div>`, iconSize: [32, 32], iconAnchor: [16, 16] });
}
let mapT;
function scheduleMapRefresh() {
  clearTimeout(mapT);
  mapT = setTimeout(() => refreshMapMarkers(false), 250);
}
function refreshMapMarkers(fit = false) {
  if (!state.map || !state.markers) return;
  state.markers.clearLayers();
  const arr = state.filtered.slice(0, MAX_PINS);
  const bounds = [];
  arr.forEach((s, i) => {
    const m = L.marker([s.lat, s.lng], { icon: pinIcon(i < 3 && state.user) });
    m.on('click', () => openSheet(s));
    state.markers.addLayer(m);
    bounds.push([s.lat, s.lng]);
  });
  if (state.user) {
    const { lat, lng, acc } = state.user;
    if (state.userMarker) { state.userMarker.remove(); state.accCircle?.remove(); }
    state.userMarker = L.marker([lat, lng], {
      icon: L.divIcon({ className: '', html: '<div class="user-pin"></div>', iconSize: [22, 22], iconAnchor: [11, 11] }),
    }).addTo(state.map);
    if (acc && acc < 2000) state.accCircle = L.circle([lat, lng], { radius: acc, color: '#38bdf8', weight: 1, fillOpacity: 0.08 }).addTo(state.map);
    bounds.push([lat, lng]);
  }
  if (fit && bounds.length) state.map.fitBounds(bounds, { padding: [60, 60], animate: false });
}
function focusShelter(s) {
  state.map.setView([s.lat, s.lng], 16, { animate: true });
  openSheet(s);
}

/* ---------- sheet ---------- */
function openSheet(s) {
  const card = $('sheetCard');
  card.style.transition = '';
  card.style.transform = '';
  const hasD = state.user && s._d != null;
  els.sheetBody.innerHTML = `
    <h3>${esc(title(s))}</h3>
    <p class="sheet-city">${esc(s.city)}${s.status ? ` · ${esc(s.status)}` : ''}</p>
    <p class="sh-dist"><span id="shDist">${hasD ? fmtDist(s._d) : '—'}</span></p>
    <p class="sh-walk" id="shWalk">${hasD ? `${walkMin(s._d)} · ברגל` : 'פתח מיקום למרחק חי'}</p>
    ${s.notes ? `<p class="sheet-notes">📝 ${esc(s.notes)}</p>` : ''}
    <div class="sheet-nav">
      <a href="${gmapsUrl(s)}" target="_blank" rel="noopener" class="g">🧭 נווט עכשיו</a>
      <a href="${wazeUrl(s)}" target="_blank" rel="noopener" class="w">🚗 פתח ב-Waze</a>
    </div>
    <button type="button" id="sheetShare" class="sheet-share">📤 שתף מקלט</button>
    <button type="button" id="sheetClose" class="sheet-close">סגור ✕</button>`;
  els.sheet.classList.remove('hidden');
  $('sheetClose').onclick = closeSheet;
  $('sheetShare').onclick = () => shareShelter(s);
  startLive(s);
}
function closeSheet() {
  stopLive();
  els.sheet.classList.add('hidden');
  const card = $('sheetCard');
  card.style.transition = '';
  card.style.transform = '';
}

/* מרחק חי בזמן שהשיט פתוח — עוקב אחרי ההליכה למקלט */
function startLive(s) {
  stopLive();
  if (!('geolocation' in navigator)) return;
  state.sheetS = s;
  try {
    state.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        state.user = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy };
        const d = haversine(state.user.lat, state.user.lng, s.lat, s.lng);
        s._d = d;
        setGpsUI('ok', `±${Math.round(pos.coords.accuracy)} מ׳`);
        if (state.sheetS !== s || els.sheet.classList.contains('hidden')) return;
        const de = $('shDist'), we = $('shWalk'), lb = $('liveBadge');
        if (!de) return;
        if (Math.abs((state.lastLiveD ?? Infinity) - d) < 5 && state.lastLiveD != null) return; // לא מרצד על מטרים בודדים
        state.lastLiveD = d;
        de.textContent = fmtDist(d);
        if (we) we.textContent = `${walkMin(d)} · ברגל`;
        if (lb) lb.classList.remove('hidden');
      },
      () => { },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 4000 }
    );
  } catch { /* אין מיקום — נשארים עם המרחק הסטטי */ }
}
function stopLive() {
  if (state.watchId != null) {
    try { navigator.geolocation.clearWatch(state.watchId); } catch { }
  }
  state.watchId = null;
  state.sheetS = null;
  state.lastLiveD = null;
}

/* גרירת האצבע מטה לסגירה */
function enableSheetDrag() {
  const card = $('sheetCard');
  const grab = card.querySelector('.grabber');
  let startY = null, dy = 0;
  grab.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; dy = 0; card.style.transition = ''; }, { passive: true });
  grab.addEventListener('touchmove', (e) => {
    if (startY == null) return;
    dy = e.touches[0].clientY - startY;
    if (dy > 0) card.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  grab.addEventListener('touchend', () => {
    card.style.transition = 'transform .2s ease';
    if (dy > 110) closeSheet();
    else card.style.transform = '';
    startY = null; dy = 0;
  });
}
function shareShelter(s) {
  const text = `🛡️ מקלט: ${title(s)}, ${s.city}`;
  const url = gmapsUrl(s);
  if (navigator.share) navigator.share({ title: 'מקלט קרוב', text, url }).catch(() => { });
  else navigator.clipboard?.writeText(`${text} ${url}`).then(() => toast('הקישור הועתק ✅')).catch(() => toast(text));
}

/* ---------- events ---------- */
let searchT;
els.search.addEventListener('input', () => { clearTimeout(searchT); searchT = setTimeout(applyFilters, 180); });
els.findBtn.addEventListener('click', () => locate(true, true));

function shelterById(id) {
  const s = state.shelters[parseInt(id, 10)];
  if (s && state.user) s._d = haversine(state.user.lat, state.user.lng, s.lat, s.lng);
  return s;
}
els.carousel.addEventListener('click', (e) => {
  if (e.target.closest('a')) return;
  const card = e.target.closest('[data-focus]');
  if (!card) return;
  const s = shelterById(card.dataset.focus);
  if (s) focusShelter(s);
});

els.sheetBg.addEventListener('click', closeSheet);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

/* offline */
function syncOffline() { els.offlineBar.classList.toggle('hidden', navigator.onLine); }
window.addEventListener('online', () => { syncOffline(); toast('🌐 החיבור חזר'); });
window.addEventListener('offline', syncOffline);
syncOffline();

/* ---------- boot ---------- */
enableSheetDrag();
ensureMap();
loadData().then(() => {
  if ('geolocation' in navigator && location.protocol !== 'file:') locate(false, false);
});
