import { CheckCircle, Clock, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

type NotificationType = 'success' | 'pending' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  time: string;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} className="text-green-600" />;
    case 'pending':
      return <Clock size={20} className="text-yellow-600" />;
    case 'error':
      return <XCircle size={20} className="text-red-600" />;
    case 'info':
      return <AlertCircle size={20} className="text-blue-600" />;
  }
};

const getNotificationBg = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'bg-green-50';
    case 'pending':
      return 'bg-yellow-50';
    case 'error':
      return 'bg-red-50';
    case 'info':
      return 'bg-blue-50';
  }
};

export function RecentNotifications() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      message: 'Votre commande #2451 a été acceptée par Ahmed Belkacem 🚚',
      time: 'il y a 10 min',
    },
    {
      id: '2',
      type: 'info',
      message: 'Nouveau service disponible dans votre zone : Réparation express',
      time: 'il y a 2h',
    },
    {
      id: '3',
      type: 'pending',
      message: 'Votre paiement de 3,500 DA est en cours de traitement',
      time: 'il y a 5h',
    },
    {
      id: '4',
      type: 'success',
      message: 'Vous avez reçu un nouvel avis 5 étoiles ⭐',
      time: 'Hier',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-[#1E1E1E]">Notifications récentes</h2>
        <Button variant="ghost" className="text-[#0077FF] hover:text-[#0066DD]">
          Tout voir
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${getNotificationBg(notification.type)} rounded-xl p-4 transition-all hover:shadow-sm cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1E1E1E] leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              <ArrowRight size={16} className="flex-shrink-0 text-gray-400 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
