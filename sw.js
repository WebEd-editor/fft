importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAvmkr7PEQFrbwuqVCaxLDb_6inUfzpEzg",  
    authDomain: "fftpush-f29dd.firebaseapp.com",  
    projectId: "fftpush-f29dd",  
    messagingSenderId: "264854863203",
    appId: "1:264854863203:web:1852077458cf95e22c2756"  
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

    self.registration.showNotification(
        payload.notification.title,
        {
            body: payload.notification.body,
            icon: "file_00000000ab288207a1f3b3b381fb8c35.png"
        }
    );

});

const CACHE_NAME = "fft-v24";

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
