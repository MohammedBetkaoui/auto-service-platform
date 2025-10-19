import { Download, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type UserRole = 'client' | 'provider' | 'admin';

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
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl text-white mb-1">{title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <TrendingUp size={16} className="text-[#28C76F]" />
            <span>+12% ce mois</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10">
          <Download size={16} />
          Télécharger
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total (5 mois)</p>
          <p className="text-2xl text-white">
            {totalAmount.toLocaleString()} DA
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Transactions</p>
          <p className="text-2xl text-white">
            {userRole === 'client' ? '12' : '47'}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#2a2a2a' }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#2a2a2a' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '12px',
                color: '#FFFFFF'
              }}
              formatter={(value) => [`${value} DA`, 'Montant']}
            />
            <Bar 
              dataKey="montant" 
              fill="url(#colorGradient)" 
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#F7931E" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
