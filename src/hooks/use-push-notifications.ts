import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// URL-safe base64 to Uint8Array converter
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export function usePushNotifications(options?: { onTokenReceived?: (subscription: any) => void }) {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' ? Notification.permission : 'default'
  );

  useEffect(() => {
    // Check for existing subscription if permission is already granted
    if (permission === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub) {
            setSubscription(sub);
            // Optionally we can resend it to server just in case
            // options?.onTokenReceived?.(sub); 
          }
        });
      });
    }
  }, [permission]);

  const requestPermission = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      toast.error("Push notifications are not supported by this browser.");
      return null;
    }

    try {
      const currentPermission = await Notification.requestPermission();
      setPermission(currentPermission);

      if (currentPermission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        
        // Ensure VAPID key is available
        const publicVapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
        if (!publicVapidKey) {
          console.error("VAPID public key is missing from env");
          toast.error("Push notifications configuration is missing.");
          return null;
        }

        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        setSubscription(sub);
        
        if (options?.onTokenReceived) {
          options.onTokenReceived(sub);
        }
        
        toast.success('Notifications enabled!');
        return sub;
      } else {
        toast.error("Notification permission denied.");
        return null;
      }
    } catch (error) {
      console.error('Error subscribing for push notifications:', error);
      toast.error("Failed to enable notifications.");
      return null;
    }
  };

  return {
    subscription,
    permission,
    requestPermission,
  };
}
