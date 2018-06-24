importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox is loaded 🎉`);
} else {
  console.log(`Workbox didn't load 😬`);
}

workbox.setConfig({
  debug: false
});

// Want offline analytics for your offline PWA
// workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  new RegExp("https://fonts.gstatic.com/(.*)"),
  workbox.strategies.cacheFirst({
    cacheName: "google-font",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

workbox.routing.registerRoute(
  /.*\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 Days
      })
    ]
  })
);

workbox.routing.registerRoute(
  /.*\.(?:woff2)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "font-cache"
  })
);

workbox.routing.registerRoute(
  /.*\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "static-resources"
  })
);

workbox.routing.registerRoute(
  /.*(?:gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "gstatic-cache"
  })
);
