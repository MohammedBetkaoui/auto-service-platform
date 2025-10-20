import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
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
import { ProfileSettings } from './dashboard/ProfileSettings';
import { ClientOrders } from './dashboard/client/ClientOrders';
import { ClientReviews } from './dashboard/client/ClientReviews';
import { providerVehicles as ProviderVehicles } from './dashboard/provider/providerVehicles';
import { providerOrders as ProviderOrders } from './dashboard/provider/providerOrders';
import { AdminUsers } from './dashboard/admin/AdminUsers';
import { AdminVehicles } from './dashboard/admin/AdminVehicles';
import { Toaster } from './ui/sonner';

export function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.hash = 'login';
    }
  }, [isAuthenticated]);

  if (!user) {
    return null;
  }

  // Convert role for backward compatibility
  const userRole = user.role === 'provider' ? 'provider' : user.role;

  const renderContent = () => {
    // Client specific sections
    if (user.role === 'client') {
      switch (activeSection) {
        case 'dashboard':
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <StatsCards userRole={userRole} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <div className="lg:col-span-1 space-y-6">
                  <RecentNotifications />
                  <Feedbacks userRole={userRole} />
                </div>
              </div>
            </motion.div>
          );

        case 'orders':
          if (selectedOrderId) {
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <OrderDetails
                  orderId={selectedOrderId}
                  userRole={userRole}
                  onBack={() => setSelectedOrderId(null)}
                />
              </motion.div>
            );
          }
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ClientOrders />
            </motion.div>
          );

        case 'reviews':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ClientReviews />
            </motion.div>
          );

        case 'payments':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-white">Mes paiements</h2>
              <PaymentHistory userRole={userRole} />
            </motion.div>
          );

        case 'messages':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Messaging userRole={userRole} />
            </motion.div>
          );

        case 'profile':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProfileSettings userRole={userRole} />
            </motion.div>
          );
      }
    }

    // provider specific sections
    if (user.role === 'provider') {
      switch (activeSection) {
        case 'dashboard':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <StatsCards userRole={userRole} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <div className="lg:col-span-1 space-y-6">
                  <RecentNotifications />
                  <Feedbacks userRole={userRole} />
                </div>
              </div>
            </motion.div>
          );

        case 'orders':
          if (selectedOrderId) {
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <OrderDetails
                  orderId={selectedOrderId}
                  userRole={userRole}
                  onBack={() => setSelectedOrderId(null)}
                />
              </motion.div>
            );
          }
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProviderOrders />
            </motion.div>
          );

        case 'vehicles':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProviderVehicles />
            </motion.div>
          );

        case 'reviews':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-white">Avis & Feedbacks</h2>
              <Feedbacks userRole={userRole} />
            </motion.div>
          );

        case 'payments':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-white">Mes revenus</h2>
              <PaymentHistory userRole={userRole} />
            </motion.div>
          );

        case 'messages':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Messaging userRole={userRole} />
            </motion.div>
          );

        case 'profile':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProfileSettings userRole={userRole} />
            </motion.div>
          );
      }
    }

    // Admin specific sections
    if (user.role === 'admin') {
      switch (activeSection) {
        case 'dashboard':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <StatsCards userRole="client" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentOrders 
                  userRole="client"
                  onViewDetails={(orderId) => {
                    setSelectedOrderId(orderId);
                    setActiveSection('orders');
                  }}
                />
                <RecentNotifications />
              </div>
            </motion.div>
          );

        case 'users':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminUsers />
            </motion.div>
          );

        case 'vehicles':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AdminVehicles />
            </motion.div>
          );

        case 'orders':
          if (selectedOrderId) {
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <OrderDetails
                  orderId={selectedOrderId}
                  userRole="client"
                  onBack={() => setSelectedOrderId(null)}
                />
              </motion.div>
            );
          }
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-white">Toutes les commandes</h2>
              <RecentOrders 
                userRole="client"
                onViewDetails={(orderId) => setSelectedOrderId(orderId)}
              />
            </motion.div>
          );

        case 'profile':
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProfileSettings userRole="client" />
            </motion.div>
          );
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none"></div>
      
      {/* Gradient Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#F7931E]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Sidebar */}
      <Sidebar 
        userRole={userRole} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 relative">
        {/* Header */}
        <DashboardHeader 
          userName={user.name}
          userRole={userRole}
          notificationCount={3}
        />

        {/* Content */}
        <main className="p-6 lg:p-8">
          {renderContent()}
        </main>

        
      </div>
      
      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
