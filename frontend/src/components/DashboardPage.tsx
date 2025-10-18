import { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from './dashboard/Sidebar';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { StatsCards } from './dashboard/StatsCards';
import { RecentOrders } from './dashboard/RecentOrders';
import { RecentNotifications } from './dashboard/RecentNotifications';
import { PaymentHistory } from './dashboard/PaymentHistory';
import { Feedbacks } from './dashboard/Feedbacks';
import { VehicleManagement } from './dashboard/VehicleManagement';
import { OrderDetails } from './dashboard/OrderDetails';
import { Messaging } from './dashboard/Messaging';

type UserRole = 'client' | 'provider';

export function DashboardPage() {
  // This would come from authentication in a real app
  const [userRole] = useState<UserRole>('client'); // Change to 'provider' to see provider view
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Mock user data - would come from API
  const userName = userRole === 'client' ? 'Ahmed Benali' : 'Karim Auto Service';

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <StatsCards userRole={userRole} />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                <RecentOrders 
                  userRole={userRole}
                  onViewDetails={(orderId) => {
                    setSelectedOrderId(orderId);
                    setActiveSection('orders');
                  }}
                />
                <PaymentHistory userRole={userRole} />
              </div>

              {/* Right Column - 1/3 width */}
              <div className="lg:col-span-1 space-y-6">
                <RecentNotifications />
                <Feedbacks userRole={userRole} />
              </div>
            </div>
          </motion.div>
        );

      case 'services':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-2xl text-[#1E1E1E] mb-4">
              {userRole === 'provider' ? 'Mes services' : 'Services disponibles'}
            </h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </motion.div>
        );

      case 'orders':
        if (selectedOrderId) {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <OrderDetails
                orderId={selectedOrderId}
                userRole={userRole}
                onBack={() => setSelectedOrderId(null)}
              />
            </motion.div>
          );
        }
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl text-[#1E1E1E]">Mes commandes</h2>
            <RecentOrders 
              userRole={userRole}
              onViewDetails={(orderId) => setSelectedOrderId(orderId)}
            />
          </motion.div>
        );

      case 'payments':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl text-[#1E1E1E]">
              {userRole === 'provider' ? 'Mes revenus' : 'Mes paiements'}
            </h2>
            <PaymentHistory userRole={userRole} />
          </motion.div>
        );

      case 'vehicles':
        return userRole === 'provider' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <VehicleManagement />
          </motion.div>
        ) : null;

      case 'reviews':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl text-[#1E1E1E]">Avis & Feedbacks</h2>
            <Feedbacks userRole={userRole} />
          </motion.div>
        );

      case 'messages':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Messaging userRole={userRole} />
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl text-[#1E1E1E]">Notifications</h2>
            <RecentNotifications />
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-2xl text-[#1E1E1E] mb-4">Mon profil</h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-2xl text-[#1E1E1E] mb-4">Paramètres</h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar 
        userRole={userRole} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Header */}
        <DashboardHeader 
          userName={userName}
          userRole={userRole}
          notificationCount={3}
        />

        {/* Content */}
        <main className="p-6 lg:p-8">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="px-6 lg:px-8 py-6 text-center text-sm text-gray-500 border-t border-gray-200">
          <p>© 2025 AutoServe DZ. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
}
