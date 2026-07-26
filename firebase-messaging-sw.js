importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js");

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
            icon: "/icon-192.png"
        }
    );
});