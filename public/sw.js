self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("Push event!! ", event.data.text());
    try {
      const data = event.data.json();
      const options = {
        body: data.message || data.body,
        icon: "/logo.png", // Assuming you have a logo
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: "1",
        },
      };
      event.waitUntil(self.registration.showNotification(data.title || "Notification", options));
    } catch (e) {
      // Fallback if not JSON
      event.waitUntil(
        self.registration.showNotification("Notification", {
          body: event.data.text(),
          icon: "/logo.png",
        }),
      );
    }
  } else {
    console.log("Push event but no data");
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      }),
  );
});
