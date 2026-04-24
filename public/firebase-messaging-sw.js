importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBuKjmuw3txn4AnW4pRj8xY9krYm4v9-Zk",
  authDomain: "user-a98e6.firebaseapp.com",
  projectId: "user-a98e6",
  storageBucket: "user-a98e6.firebasestorage.app",
  messagingSenderId: "828889782218",
  appId: "1:828889782218:web:fc8e7427298d9c62636133",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
