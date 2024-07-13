var cacheName = 'hello-pwa'; // v7
var filesToCache = [
  '/',
  '/index.html',
  '/jquery.min.js',
  '/vue.js',
  '/Cairo-Regular.ttf',
  '/favicon.ico',

  '/icons/2.png',
  '/icons/7.png',

  '/icons/bmark.png',
  
  '/icons/search.png',
  '/icons/bookmark.png',
  '/icons/structure.png',
  '/icons/uk.png',
  '/icons/font-up.png',
  '/icons/font-down.png',
  '/icons/go-to.png',
  '/icons/night.png',

  '/json/toc.json',
  '/json/verses2.json',
  '/json/first_letter.json',
  '/json/roots.json',
  '/json/rootwords.json'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {

  //Network first
    if (!e.request.headers.get("accept").includes("application/json")) {
    // if (e.request == '/' || e.request == '/index.html') {
    e.respondWith(
      fetch(e.request).catch(function() {
        return caches.match(e.request)
      })
    ); 
  }

  //Cache first
  else{
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }

});