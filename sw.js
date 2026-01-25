const CACHE = "predenuncias-v18";

const ASSETS = [
  "./",
  "./index.html",
  "./global_es.html",
  "./global_en_ui.html",
  "./Registro odt-roa.html",
  "./denunciante_patrimonio.html",   // tu “otro html” (o el que sea)
  "./denunciante.html",
  "./denunciante_patrimonio.html",
  "./denunciante_hurto_rvi.html",
  "./denunciante_robo_fuerza.html",
  "./denunciante_lesiones.html",
  "./denunciante_amenazas.html",
  "./firebase.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => k !== CACHE && caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ❌ No tocar Firebase, Auth, Firestore, CDN
  if (
    req.url.includes("firebase") ||
    req.url.includes("googleapis") ||
    req.url.includes("gstatic") ||
    req.method !== "GET"
  ) {
    return;
  }

  event.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});
