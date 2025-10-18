import { Download, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type UserRole = 'client' | 'provider';

interface PaymentHistoryProps {
  userRole: UserRole;
}

export function PaymentHistory({ userRole }: PaymentHistoryProps) {
  const clientData = [
    { month: 'Juin', montant: 2400 },
    { month: 'Juil', montant: 3200 },
    { month: 'Août', montant: 1800 },
    { month: 'Sept', montant: 4100 },
    { month: 'Oct', montant: 3500 },
  ];

  const providerData = [
    { month: 'Juin', montant: 18500 },
    { month: 'Juil', montant: 24200 },
    { month: 'Août', montant: 21800 },
    { month: 'Sept', montant: 28400 },
    { month: 'Oct', montant: 32100 },
  ];

  const data = userRole === 'client' ? clientData : providerData;
  const totalAmount = data.reduce((sum, item) => sum + item.montant, 0);
  const title = userRole === 'client' ? 'Historique de paiement' : 'Revenus mensuels';

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl text-[#1E1E1E] mb-1">{title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp size={16} className="text-green-600" />
            <span>+12% ce mois</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download size={16} />
          Télécharger
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F5F7FA] rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Total (5 mois)</p>
          <p className="text-xl text-[#1E1E1E]">
            {totalAmount.toLocaleString()} DA
          </p>
        </div>
        <div className="bg-[#F5F7FA] rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Transactions</p>
          <p className="text-xl text-[#1E1E1E]">
            {userRole === 'client' ? '12' : '47'}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E1E1E', 
                border: 'none', 
                borderRadius: '8px',
                color: '#FFFFFF'
              }}
              formatter={(value) => [`${value} DA`, 'Montant']}
            />
            <Bar 
              dataKey="montant" 
              fill="#0077FF" 
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
