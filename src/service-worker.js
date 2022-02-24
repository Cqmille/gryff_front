// Version faite maison

/*

self.addEventListener('install', (event) => { // on écoute l'evenement install du sw
    console.log('installation de sw')
        event.waitUntil( //s'assure que tous les evenement se charge dans le cache avant d'envoyer la suite
        caches.open("cache01").then((cache) => {
            return cache.addAll(["/", "/index.html"]); // charge dans le cache tes fichiers ( ! ne pas oublier le / avant le n
        })
    );
    }) /*
    self.addEventListener('activate', (event) => { // on écoute l'évenement activate du sw
        console.log('activation de sw')
    })
    self.addEventListener("fetch", (event) => {
        console.log("event fetch", event.request.url);
    /*if (!navigator.onLine) { // si on est offline
    event.respondWith(new Response("plus de connnection.. mode dégradé"));
    }*/
    //stratégie cache first and then network   
/*    event.respondWith(// si on est offline ça charge tous ce qui est dans le cache
    caches.match(event.request).then((res) => {
    return res;
    })
    );
    });

*/


// Version avec le module workbox-sw.js

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
  );
  
  if (workbox) {
    console.log(`Workbox is loaded`);
  } else {
    console.log(`Boo! Workbox didn't load`);
  }

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new workbox.strategies.NetworkFirst({
      // Use a custom cache name.
      cacheName: 'css-cache',
    }),
  );

  workbox.routing.registerRoute(
    // Cache CSS files.
    /\.html$/,
    // Use cache but update in the background.
    new workbox.strategies.NetworkFirst({
      // Use a custom cache name.
      cacheName: 'html-cache',
    }),
  );