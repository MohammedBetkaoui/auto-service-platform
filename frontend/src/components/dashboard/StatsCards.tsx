import { Package, Clock, DollarSign, Wrench, Star, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

type UserRole = 'client' | 'provider' | 'admin';

interface StatsCardsProps {
  userRole: UserRole;
}

interface StatCard {
  title: string;
  value: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
}

export function StatsCards({ userRole }: StatsCardsProps) {
  const clientStats: StatCard[] = [
    {
      title: 'Commandes totales',
      value: '12',
      icon: Package,
      gradient: 'from-[#FF6B35]/20 to-[#F7931E]/20',
      iconColor: 'text-[#FF6B35]',
    },
    {
      title: 'En cours',
      value: '2',
      icon: Clock,
      gradient: 'from-orange-500/20 to-amber-500/20',
      iconColor: 'text-orange-400',
    },
    {
      title: 'Total dépensé',
      value: '15,450 DA',
      icon: DollarSign,
      gradient: 'from-[#28C76F]/20 to-[#22B55E]/20',
      iconColor: 'text-[#28C76F]',
    },
    {
      title: 'Dernier service',
      value: 'Lavage auto',
      icon: Wrench,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
    },
  ];

  const providerStats: StatCard[] = [
    {
      title: 'Services effectués',
      value: '47',
      icon: Wrench,
      gradient: 'from-[#FF6B35]/20 to-[#F7931E]/20',
      iconColor: 'text-[#FF6B35]',
    },
    {
      title: 'En attente',
      value: '5',
      icon: Calendar,
      gradient: 'from-orange-500/20 to-amber-500/20',
      iconColor: 'text-orange-400',
    },
    {
      title: 'Revenu total',
      value: '125,800 DA',
      icon: DollarSign,
      gradient: 'from-[#28C76F]/20 to-[#22B55E]/20',
      iconColor: 'text-[#28C76F]',
    },
    {
      title: 'Note moyenne',
      value: '4.8 ⭐',
      icon: Star,
      gradient: 'from-yellow-500/20 to-amber-500/20',
      iconColor: 'text-yellow-400',
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
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-[#FF6B35]/10 hover:border-white/20 transition-all group relative overflow-hidden"
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}></div>
            
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                <p className="text-3xl text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} border border-white/10`}
              >
                <Icon size={28} className={stat.iconColor} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
