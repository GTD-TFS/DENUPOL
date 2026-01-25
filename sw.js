// sw.js — PWA ACTUALIZABLE (NO SE QUEDA ANTIGUA EN iOS)

const CACHE = "predenuncias-v22";

const ASSETS = [
  "./",
  "./index.html",
  "./global_es.html",
  "./global_en_ui.html",
  "./Registro odt-roa.html",
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

/* ============================
   INSTALL
   ============================ */
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(
        ASSETS.map(url => new Request(url, { cache: "reload" }))
      )
    )
  );
});

/* ============================
   ACTIVATE
   ============================ */
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map(k => (k !== CACHE ? caches.delete(k) : null))
    );
    await self.clients.claim();
  })());
});

/* ============================
   FETCH
   ============================ */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // No interceptar nada sensible
  if (
    req.method !== "GET" ||
    req.url.includes("firebase") ||
    req.url.includes("googleapis") ||
    req.url.includes("gstatic")
  ) {
    return;
  }

  // ============================
  // HTML / navegación → NETWORK FIRST
  // ============================
  if (
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html")
  ) {
    event.respondWith((async () => {
      try {
        const net = await fetch(req);

        const cache = await caches.open(CACHE);
        cache.put(req, net.clone());

        return net;
      } catch (e) {
        return (
          (await caches.match(req)) ||
          (await caches.match("./index.html"))
        );
      }
    })());
    return;
  }

  // ============================
  // RESTO → CACHE FIRST
  // ============================
  event.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});
