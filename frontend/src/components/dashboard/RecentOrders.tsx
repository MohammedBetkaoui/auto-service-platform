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
type UserRole = 'client' | 'provider';

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
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
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
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-[#1E1E1E]">Commandes récentes</h2>
        <Button variant="ghost" className="text-[#0077FF] hover:text-[#0066DD]">
          Voir tout
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Service</TableHead>
              {userRole === 'provider' && <TableHead>Client</TableHead>}
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <span className="text-[#0077FF]">{order.id}</span>
                </TableCell>
                <TableCell>{order.service}</TableCell>
                {userRole === 'provider' && <TableCell>{order.client}</TableCell>}
                <TableCell className="text-gray-600">{order.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[#0077FF] hover:text-[#0066DD]"
                    onClick={() => onViewDetails?.(order.id)}
                  >
                    <Eye size={16} className="mr-1" />
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
          <div key={order.id} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[#0077FF] text-sm mb-1">{order.id}</p>
                <p className="text-[#1E1E1E]">{order.service}</p>
                {userRole === 'provider' && order.client && (
                  <p className="text-sm text-gray-600 mt-1">{order.client}</p>
                )}
              </div>
              <Badge variant="outline" className={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{order.date}</span>
              <span className="text-[#1E1E1E]">{order.amount}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 text-[#0077FF] border-[#0077FF]"
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
