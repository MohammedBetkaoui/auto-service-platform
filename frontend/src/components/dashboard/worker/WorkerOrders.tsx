import { Package, Clock, CheckCircle, MapPin, Phone, User, Calendar, DollarSign } from 'lucide-react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Avatar } from '../../ui/avatar';

interface providerOrder {
  id: string;
  service: string;
  client: {
    name: string;
    avatar: string;
    phone: string;
  };
  status: 'new' | 'accepted' | 'in-progress' | 'completed';
  date: string;
  time: string;
  price: number;
  location: string;
  address: string;
  vehicle?: string;
}

const mockOrders: providerOrder[] = [
  {
    id: 'ORD-W001',
    service: 'Lavage Premium',
    client: {
      name: 'Fatima Zahra',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima',
      phone: '+213 555 123 456',
    },
    status: 'new',
    date: '2025-10-20',
    time: '14:00',
    price: 2500,
    location: 'Alger Centre',
    address: 'Rue Didouche Mourad, Alger',
    vehicle: 'Toyota Corolla 2020',
  },
  {
    id: 'ORD-W002',
    service: 'Entretien Complet',
    client: {
      name: 'Mohammed Belkacem',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed',
      phone: '+213 555 789 012',
    },
    status: 'in-progress',
    date: '2025-10-19',
    time: '10:30',
    price: 8500,
    location: 'Bab Ezzouar',
    address: 'Cité 1024 logements, Bab Ezzouar',
    vehicle: 'Peugeot 308 2019',
  },
];

export function providerOrders() {
  const getStatusConfig = (status: providerOrder['status']) => {
    switch (status) {
      case 'new':
        return {
          icon: Package,
          label: 'Nouvelle',
          color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        };
      case 'accepted':
        return {
          icon: Clock,
          label: 'Acceptée',
          color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        };
      case 'in-progress':
        return {
          icon: Clock,
          label: 'En cours',
          color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
        };
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Terminée',
          color: 'bg-green-500/10 text-green-500 border-green-500/20',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Commandes Reçues</h2>
        <p className="text-gray-400 text-sm">
          Gérez vos demandes de service
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Nouvelles', value: '5', icon: Package, color: 'from-blue-500 to-blue-600' },
          { label: 'En cours', value: '3', icon: Clock, color: 'from-orange-500 to-orange-600' },
          { label: 'Complétées', value: '48', icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Revenus', value: '125K', icon: DollarSign, color: 'from-[#FF6B35] to-[#F7931E]' },
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
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left Section */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
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

                  {/* Client Info */}
                  <div className="flex items-center gap-3 p-4 bg-[#1a1a1a] rounded-lg">
                    <Avatar className="w-12 h-12 border-2 border-white/10">
                      <img src={order.client.avatar} alt={order.client.name} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white mb-1">{order.client.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone size={14} />
                        {order.client.phone}
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar size={16} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-400">Date & Heure</p>
                        <p className="text-white">
                          {new Date(order.date).toLocaleDateString('fr-FR')} à {order.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin size={16} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-400">Adresse</p>
                        <p className="text-white">{order.address}</p>
                      </div>
                    </div>
                  </div>

                  {order.vehicle && (
                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-400">Véhicule:</span>
                      <span className="text-white">{order.vehicle}</span>
                    </div>
                  )}
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col gap-3 lg:items-end lg:min-w-[200px]">
                  <div className="text-center lg:text-right">
                    <p className="text-gray-400 text-sm mb-1">Montant</p>
                    <p className="text-white text-2xl">{order.price.toLocaleString()} DA</p>
                  </div>

                  {order.status === 'new' && (
                    <div className="flex flex-col gap-2 w-full">
                      <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white w-full">
                        Accepter
                      </Button>
                      <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 w-full">
                        Refuser
                      </Button>
                    </div>
                  )}

                  {order.status === 'accepted' && (
                    <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white w-full">
                      Commencer
                    </Button>
                  )}

                  {order.status === 'in-progress' && (
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                      <CheckCircle size={18} className="mr-2" />
                      Terminer
                    </Button>
                  )}

                  <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5 w-full">
                    <MapPin size={16} className="mr-2" />
                    Itinéraire
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
