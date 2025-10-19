import { Eye } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'in_progress';
type UserRole = 'client' | 'provider' | 'admin';

interface Order {
  id: string;
  service: string;
  date: string;
  status: OrderStatus;
  amount: string;
  client?: string;
}

interface RecentOrdersProps {
  userRole: UserRole;
  onViewDetails?: (orderId: string) => void;
}

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'completed':
      return 'bg-[#28C76F]/10 text-[#28C76F] border-[#28C76F]/20';
    case 'cancelled':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'in_progress':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  }
};

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'completed':
      return 'Terminé';
    case 'cancelled':
      return 'Annulé';
    case 'in_progress':
      return 'En cours';
  }
};

export function RecentOrders({ userRole, onViewDetails }: RecentOrdersProps) {
  const clientOrders: Order[] = [
    {
      id: '#2451',
      service: 'Lavage complet',
      date: '18 Oct 2025',
      status: 'in_progress',
      amount: '1,200 DA',
    },
    {
      id: '#2450',
      service: 'Vidange d\'huile',
      date: '15 Oct 2025',
      status: 'completed',
      amount: '3,500 DA',
    },
    {
      id: '#2448',
      service: 'Réparation freins',
      date: '10 Oct 2025',
      status: 'completed',
      amount: '8,000 DA',
    },
    {
      id: '#2445',
      service: 'Lavage express',
      date: '5 Oct 2025',
      status: 'cancelled',
      amount: '800 DA',
    },
  ];

  const providerOrders: Order[] = [
    {
      id: '#2451',
      service: 'Lavage complet',
      client: 'Ahmed Benali',
      date: '18 Oct 2025',
      status: 'in_progress',
      amount: '1,200 DA',
    },
    {
      id: '#2450',
      service: 'Vidange d\'huile',
      client: 'Fatima Meziane',
      date: '15 Oct 2025',
      status: 'pending',
      amount: '3,500 DA',
    },
    {
      id: '#2448',
      service: 'Réparation freins',
      client: 'Karim Saidi',
      date: '10 Oct 2025',
      status: 'completed',
      amount: '8,000 DA',
    },
    {
      id: '#2447',
      service: 'Lavage express',
      client: 'Amina Lahouel',
      date: '8 Oct 2025',
      status: 'completed',
      amount: '800 DA',
    },
  ];

  const orders = userRole === 'client' ? clientOrders : providerOrders;

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Commandes récentes</h2>
        <Button variant="ghost" className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:bg-white/5">
          Voir tout
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 hover:bg-white/5 border-b border-white/10">
              <TableHead className="text-gray-300">Commande</TableHead>
              <TableHead className="text-gray-300">Service</TableHead>
              {userRole === 'provider' && <TableHead className="text-gray-300">Client</TableHead>}
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Statut</TableHead>
              <TableHead className="text-gray-300">Montant</TableHead>
              <TableHead className="text-right text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-b border-white/5 hover:bg-white/5">
                <TableCell>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">{order.id}</span>
                </TableCell>
                <TableCell className="text-white">{order.service}</TableCell>
                {userRole === 'provider' && <TableCell className="text-gray-300">{order.client}</TableCell>}
                <TableCell className="text-gray-400">{order.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">{order.amount}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:bg-white/5"
                    onClick={() => onViewDetails?.(order.id)}
                  >
                    <Eye size={16} className="mr-1 text-[#FF6B35]" />
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-sm mb-1">{order.id}</p>
                <p className="text-white">{order.service}</p>
                {userRole === 'provider' && order.client && (
                  <p className="text-sm text-gray-400 mt-1">{order.client}</p>
                )}
              </div>
              <Badge variant="outline" className={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-400">{order.date}</span>
              <span className="text-white">{order.amount}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border-[#FF6B35]/20 text-[#FF6B35] hover:bg-gradient-to-r hover:from-[#FF6B35]/20 hover:to-[#F7931E]/20"
              onClick={() => onViewDetails?.(order.id)}
            >
              <Eye size={16} className="mr-2" />
              Voir détails
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
