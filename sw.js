/* ============================================================
   sw.js — o que faz o Liceu no bolso abrir no avião

   Gerado na compilação: a lista de arquivos abaixo é preenchida pelo
   vite.celular.config.js com tudo que a página precisa (o JS, o CSS e
   as fontes do KaTeX). Na instalação, tudo isso vai para o cache; daí
   em diante a página carrega do cache primeiro e a rede nem é
   consultada. Seus cartões não ficam aqui: eles estão no IndexedDB.
   ============================================================ */
const CACHE = "liceu-bolso-v20261114124340";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./assets/index-CgaYKyyi.js",
  "./assets/KaTeX_AMS-Regular-BQhdFMY1.woff2",
  "./assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2",
  "./assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2",
  "./assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2",
  "./assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2",
  "./assets/KaTeX_Main-Bold-Cx986IdX.woff2",
  "./assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2",
  "./assets/KaTeX_Main-Italic-NWA7e6Wa.woff2",
  "./assets/KaTeX_Main-Regular-B22Nviop.woff2",
  "./assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2",
  "./assets/KaTeX_Math-Italic-t53AETM-.woff2",
  "./assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2",
  "./assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2",
  "./assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2",
  "./assets/KaTeX_Script-Regular-D3wIWfF6.woff2",
  "./assets/KaTeX_Size1-Regular-mCD8mA8B.woff2",
  "./assets/KaTeX_Size2-Regular-Dy4dx90m.woff2",
  "./assets/KaTeX_Size3-Regular-gV2CO0n9.woff2",
  "./assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2",
  "./assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2",
  "./assets/index-CgeDNxYX.css",
  "./icone-180.png",
  "./icone-512.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  // Um arquivo por vez, de propósito: cache.addAll() é tudo-ou-nada, então um
  // único 404 deixaria o app sem nada no cache e sem abrir no avião. Assim, o
  // que der para guardar fica guardado.
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(ARQUIVOS.map((a) => cache.add(new Request(a, { cache: "reload" }))));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch { return; }
  if (url.origin !== self.location.origin) return;

  e.respondWith((async () => {
    const guardado = await caches.match(req, { ignoreSearch: true });
    if (guardado) return guardado;
    try {
      const resp = await fetch(req);
      if (resp && resp.ok && resp.type === "basic") {
        const cache = await caches.open(CACHE);
        cache.put(req, resp.clone());
      }
      return resp;
    } catch (err) {
      if (req.mode === "navigate") {
        const inicio = (await caches.match("./index.html", { ignoreSearch: true })) || (await caches.match("./"));
        if (inicio) return inicio;
      }
      return new Response("Sem conexão e sem cópia guardada.", { status: 504, statusText: "offline" });
    }
  })());
});
