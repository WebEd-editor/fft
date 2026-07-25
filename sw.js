const CACHE_NAME = "fft-v1";

const FILES = [
    "/fft/",
    "/fft/index.html",
    "/fft/style.css",
    "/fft/script.js",
    "/fft/manifest.json",
    "/fft/auth/login.html",
    "/fft/auth/signin.html",
    "/fft/form/form.js",
    "/fft/form/registration.html",
    "/fft/buycoin.html",
    "/fft/wallet.html"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES))
    );

    self.skipWaiting();

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })

            );

        })

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});
