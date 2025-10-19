import { 
  Home, 
  Wrench, 
  Package, 
  CreditCard, 
  Star, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  MessageSquare,
  Truck,
  Users,
  Car,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Logo } from '../Logo';
import { useAuth } from '../../contexts/AuthContext';

type UserRole = 'client' | 'provider' | 'admin';

interface SidebarProps {
  userRole: UserRole;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ userRole, activeSection, onSectionChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const getMenuItems = () => {
    if (userRole === 'admin') {
      return [
        { id: 'dashboard', label: 'Tableau de bord', icon: Home },
        { id: 'users', label: 'Gestion Utilisateurs', icon: Users },
        { id: 'vehicles', label: 'Gestion Véhicules', icon: Car },
        { id: 'orders', label: 'Toutes les commandes', icon: Package },
        { id: 'profile', label: 'Profil', icon: User },
      ];
    }

    if (userRole === 'provider') {
      return [
        { id: 'dashboard', label: 'Tableau de bord', icon: Home },
        { id: 'orders', label: 'Commandes reçues', icon: Package },
        { id: 'vehicles', label: 'Mes véhicules', icon: Truck },
        { id: 'payments', label: 'Mes revenus', icon: CreditCard },
        { id: 'reviews', label: 'Avis & Feedbacks', icon: Star },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'profile', label: 'Profil', icon: User },
      ];
    }

    // Client
    return [
      { id: 'dashboard', label: 'Tableau de bord', icon: Home },
      { id: 'orders', label: 'Mes commandes', icon: Package },
      { id: 'payments', label: 'Paiements', icon: CreditCard },
      { id: 'reviews', label: 'Mes avis', icon: Star },
      { id: 'messages', label: 'Messages', icon: MessageSquare },
      { id: 'profile', label: 'Profil', icon: User },
    ];
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
  };

  const getRoleBadge = () => {
    switch (userRole) {
      case 'admin':
        return (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <Shield size={16} className="text-red-500" />
            <span className="text-red-500 text-sm">Admin</span>
          </div>
        );
      case 'provider':
        return (
          <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <Truck size={16} className="text-purple-500" />
            <span className="text-purple-500 text-sm">Prestataire</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <User size={16} className="text-blue-500" />
            <span className="text-blue-500 text-sm">Client</span>
          </div>
        );
    }
  };

  const MenuContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Logo size="md" showTagline={false} className="mb-3" />
        {getRoleBadge()}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white shadow-lg shadow-[#FF6B35]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon 
                size={20} 
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                }`}
              />
              <span className="text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-white/10 text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 transition-all"
        >
          <LogOut size={18} className="mr-2" />
          Déconnexion
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#0F0F0F] border border-white/10 rounded-xl text-white hover:bg-white/5 transition-all"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0F0F0F] border-r border-white/10 flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <MenuContent />
      </aside>
    </>
  );
}
