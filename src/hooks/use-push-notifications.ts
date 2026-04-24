import { useState, useEffect } from 'react';
import { messaging, requestNotificationPermission } from '@/lib/firebase';
import { onMessage } from 'firebase/messaging';
import { toast } from 'sonner';

export function usePushNotifications() {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' ? Notification.permission : 'default'
  );

  const requestPermission = async (onTokenReceived?: (token: string) => void) => {
    const newToken = await requestNotificationPermission();
    if (newToken) {
      setToken(newToken);
      setPermission('granted');
      console.log('FCM Token:', newToken);
      if (onTokenReceived) {
        onTokenReceived(newToken);
      }
      toast.success('Notifications enabled!');
      return newToken;
    } else {
      setPermission(Notification.permission);
      return null;
    }
  };

  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        toast(payload.notification?.title || 'New Notification', {
          description: payload.notification?.body,
        });
      });

      return () => unsubscribe();
    }
  }, []);

  return {
    token,
    permission,
    requestPermission,
  };
}
