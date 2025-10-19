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
      return <CheckCircle size={20} className="text-[#28C76F]" />;
    case 'pending':
      return <Clock size={20} className="text-yellow-400" />;
    case 'error':
      return <XCircle size={20} className="text-red-400" />;
    case 'info':
      return <AlertCircle size={20} className="text-blue-400" />;
  }
};

const getNotificationBg = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'bg-[#28C76F]/10 border-[#28C76F]/20';
    case 'pending':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'error':
      return 'bg-red-500/10 border-red-500/20';
    case 'info':
      return 'bg-blue-500/10 border-blue-500/20';
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
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Notifications récentes</h2>
        <Button variant="ghost" className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:bg-white/5">
          Tout voir
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${getNotificationBg(notification.type)} border rounded-xl p-4 transition-all hover:bg-white/5 cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
              <ArrowRight size={16} className="flex-shrink-0 text-gray-500 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
