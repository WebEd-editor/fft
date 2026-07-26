import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getMessaging,
    getToken
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js";

const firebaseConfig = {

    apiKey: "...",

    authDomain: "...",

    projectId: "...",

    messagingSenderId: "...",

    appId: "..."

};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

Notification.requestPermission().then(async permission => {

    if(permission !== "granted") return;

    const token = await getToken(messaging,{
        vapidKey:"YOUR_VAPID_KEY"
    });

    console.log(token);

    // Backend
});