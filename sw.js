
/*self.addEventListener("push", event => {

    const data = event.data.json();

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/fft/file_00000000ab288207a1f3b3b381fb8c35.png",
            badge: "/fft/file_00000000ab288207a1f3b3b381fb8c35.png"
        })
    );

});*/

self.addEventListener("push", event => {

    const data = event.data.json();

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/fft/file_00000000ab288207a1f3b3b381fb8c35.png",
            badge: "/fft/file_00000000ab288207a1f3b3b381fb8c35.png",
            actions: data.actions,
            data: {
                url: data.url
            }
        })
    );

});

self.addEventListener("notificationclick", event => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true })
            .then(clientList => {
                for (const client of clientList) {
                    if (client.url.includes("/fft/")) {
                        return client.focus();
                    }
                }
                return clients.openWindow("/fft/");
            })
    );
});

/*self.addEventListener("notificationclick", event => {

    event.notification.close();

    event.waitUntil(
        clients.openWindow("/fft")
    );

});*/

const CACHE_NAME = "fft-v2.5.4";

const FILES = [
    "/fft/",
    "/fft/index.html",
    "/fft/style.css",
    "/fft/script.js",
    "/fft/manifest.json",
    "/fft/auth/login.html",
    "/fft/auth/signup.html",
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
