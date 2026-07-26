import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getMessaging,
    getToken
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js";

const firebaseConfig = {

    apiKey: "AIzaSyAvmkr7PEQFrbwuqVCaxLDb_6inUfzpEzg",

    authDomain: "fftpush-f29dd.firebaseapp.com",

    projectId: "fftpush-f29dd",

    messagingSenderId: "264854863203",

    appId: "1:264854863203:web:1852077458cf95e22c2756"

};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

Notification.requestPermission().then(async permission => {

    if(permission !== "granted") return;

    const token = await getToken(messaging,{
        vapidKey:"BKcukkx3kuvqZhIBDpHfNY0Cl74VJaqzCzfk6iOaLy97D2FsH4qHIp9vfOQdfP-X6k3ZT7ep8EOJ9oVMZ1HPBEY"
    });

    console.log(token);

    // Backend
});