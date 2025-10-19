import { Package, Clock, CheckCircle, XCircle, Star, MessageSquare, Calendar, MapPin } from 'lucide-react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Avatar } from '../../ui/avatar';

interface Order {
  id: string;
  service: string;
  worker: {
    name: string;
    avatar: string;
    rating: number;
  };
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  price: number;
  location: string;
  canReview: boolean;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    service: 'Lavage Premium',
    worker: {
      name: 'Ahmed Benali',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
      rating: 4.9,
    },
    status: 'completed',
    date: '2025-10-15',
    price: 2500,
    location: 'Alger Centre',
    canReview: true,
  },
  {
    id: 'ORD-002',
    service: 'Entretien Complet',
    worker: {
      name: 'Karim Meziane',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim',
      rating: 4.7,
    },
    status: 'in-progress',
    date: '2025-10-19',
    price: 8500,
    location: 'Bab Ezzouar',
    canReview: false,
  },
  {
    id: 'ORD-003',
    service: 'Assistance Routière',
    worker: {
      name: 'Yacine Hamdi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yacine',
      rating: 5.0,
    },
    status: 'pending',
    date: '2025-10-20',
    price: 3500,
    location: 'Hydra',
    canReview: false,
  },
];

export function ClientOrders() {
  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          label: 'En attente',
          color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        };
      case 'in-progress':
        return {
          icon: Package,
          label: 'En cours',
          color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Terminé',
          color: 'bg-green-500/10 text-green-500 border-green-500/20',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          label: 'Annulé',
          color: 'bg-red-500/10 text-red-500 border-red-500/20',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Mes Commandes</h2>
          <p className="text-gray-400 text-sm">
            Suivez l'état de vos commandes et laissez des avis
          </p>
        </div>
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white">
          Nouvelle Commande
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: '12', icon: Package, color: 'from-blue-500 to-blue-600' },
          { label: 'En cours', value: '1', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Terminées', value: '10', icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Annulées', value: '1', icon: XCircle, color: 'from-red-500 to-red-600' },
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-[#0F0F0F] border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-white text-2xl">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {mockOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={order.id} className="bg-[#0F0F0F] border-white/10 p-6 hover:border-white/20 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white">{order.service}</h3>
                        <Badge className={`${statusConfig.color} flex items-center gap-1`}>
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">Commande #{order.id}</p>
                    </div>
                  </div>

                  {/* Worker Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10 border-2 border-white/10">
                      <img src={order.worker.avatar} alt={order.worker.name} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white text-sm">{order.worker.name}</p>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-400 text-sm">{order.worker.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {order.location}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 md:items-end">
                  <p className="text-white text-xl mb-2">{order.price.toLocaleString()} DA</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white hover:bg-white/5"
                    >
                      <MessageSquare size={16} className="mr-2" />
                      Message
                    </Button>
                    {order.canReview && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white"
                      >
                        <Star size={16} className="mr-2" />
                        Laisser un avis
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
