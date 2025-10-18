import { Package, Clock, DollarSign, Wrench, Star, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

type UserRole = 'client' | 'provider';

interface StatsCardsProps {
  userRole: UserRole;
}

interface StatCard {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

export function StatsCards({ userRole }: StatsCardsProps) {
  const clientStats: StatCard[] = [
    {
      title: 'Commandes totales',
      value: '12',
      icon: Package,
      color: '#0077FF',
      bgColor: '#E6F2FF',
    },
    {
      title: 'En cours',
      value: '2',
      icon: Clock,
      color: '#FFA726',
      bgColor: '#FFF3E0',
    },
    {
      title: 'Total dépensé',
      value: '15,450 DA',
      icon: DollarSign,
      color: '#28C76F',
      bgColor: '#E8F8F0',
    },
    {
      title: 'Dernier service',
      value: 'Lavage auto',
      icon: Wrench,
      color: '#9C27B0',
      bgColor: '#F3E5F5',
    },
  ];

  const providerStats: StatCard[] = [
    {
      title: 'Services effectués',
      value: '47',
      icon: Wrench,
      color: '#0077FF',
      bgColor: '#E6F2FF',
    },
    {
      title: 'En attente',
      value: '5',
      icon: Calendar,
      color: '#FFA726',
      bgColor: '#FFF3E0',
    },
    {
      title: 'Revenu total',
      value: '125,800 DA',
      icon: DollarSign,
      color: '#28C76F',
      bgColor: '#E8F8F0',
    },
    {
      title: 'Note moyenne',
      value: '4.8 ⭐',
      icon: Star,
      color: '#FFD700',
      bgColor: '#FFFBEA',
    },
  ];

  const stats = userRole === 'client' ? clientStats : providerStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                <p className="text-2xl text-[#1E1E1E] mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.bgColor }}
              >
                <Icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
