self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("Push event!! ", event.data.text());
    try {
      const data = event.data.json();
      const options = {
        body: data.message || data.body,
        icon: "/favicon.svg", // Fixed missing logo.png
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: "1",
          url: data.url || "/", // Support deep linking
        },
      };
      event.waitUntil(self.registration.showNotification(data.title || "Notification", options));
    } catch (e) {
      // Fallback if not JSON
      event.waitUntil(
        self.registration.showNotification("Notification", {
          body: event.data.text(),
          icon: "/favicon.svg",
        }),
      );
    }
  } else {
    console.log("Push event but no data");
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.tag);
  const targetUrl = event.notification.data?.url || "/";
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          // Use relative URL check or exact match
          if (client.url.includes(targetUrl) && "focus" in client) return client.focus();
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      }),
  );
});
