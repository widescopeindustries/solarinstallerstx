import { useState, useEffect } from 'react';
import { CheckCircle, Users, MapPin, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NotificationData {
  id: string;
  type: 'quote' | 'contact' | 'signup';
  city: string;
  timeAgo: string;
  icon: typeof CheckCircle;
  message: string;
}

const TEXAS_CITIES = [
  'Houston', 'Austin', 'Dallas', 'San Antonio', 'Fort Worth',
  'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Lubbock',
  'Laredo', 'Irving', 'Garland', 'Frisco', 'McKinney',
  'Amarillo', 'Grand Prairie', 'Brownsville', 'Killeen', 'Pasadena'
];

const NOTIFICATION_TEMPLATES = [
  { type: 'quote', message: 'requested a solar quote', icon: CheckCircle },
  { type: 'contact', message: 'contacted an installer', icon: Users },
  { type: 'signup', message: 'found a solar installer', icon: MapPin }
];

const generateRandomNotification = (): NotificationData => {
  const template = NOTIFICATION_TEMPLATES[Math.floor(Math.random() * NOTIFICATION_TEMPLATES.length)];
  const city = TEXAS_CITIES[Math.floor(Math.random() * TEXAS_CITIES.length)];
  const minutesAgo = Math.floor(Math.random() * 45) + 5; // 5-50 minutes ago

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: template.type as 'quote' | 'contact' | 'signup',
    city,
    timeAgo: minutesAgo < 60 ? `${minutesAgo} minutes ago` : '1 hour ago',
    icon: template.icon,
    message: template.message
  };
};

export const SocialProofNotification = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed
    const dismissed = sessionStorage.getItem('socialProofDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Generate initial pool of notifications
    const initialNotifications = Array.from({ length: 10 }, generateRandomNotification);
    setNotifications(initialNotifications);

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      showNextNotification(initialNotifications);
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const showNextNotification = (notificationPool: NotificationData[]) => {
    if (notificationPool.length === 0 || isDismissed) return;

    const [next, ...remaining] = notificationPool;
    setCurrentNotification(next);
    setIsVisible(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);

      // Show next notification after 15-30 seconds
      const nextDelay = Math.random() * 15000 + 15000;
      setTimeout(() => {
        // Generate new notification if pool is low
        const updatedPool = remaining.length < 3
          ? [...remaining, ...Array.from({ length: 5 }, generateRandomNotification)]
          : remaining;

        showNextNotification(updatedPool);
      }, nextDelay);
    }, 6000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('socialProofDismissed', 'true');
  };

  if (!currentNotification || !isVisible || isDismissed) return null;

  const Icon = currentNotification.icon;

  return (
    <div
      className={cn(
        'fixed bottom-20 left-4 z-30 animate-in slide-in-from-left duration-500',
        'md:bottom-6 md:left-6'
      )}
    >
      <Card className="bg-background/95 backdrop-blur shadow-lg border-l-4 border-l-primary max-w-sm">
        <div className="p-4 pr-10">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                Someone in <span className="font-bold">{currentNotification.city}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {currentNotification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentNotification.timeAgo}
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </Card>
    </div>
  );
};
