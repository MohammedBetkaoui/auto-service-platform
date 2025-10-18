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
  Truck
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

type UserRole = 'client' | 'provider';

interface SidebarProps {
  userRole: UserRole;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ userRole, activeSection, onSectionChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { 
      id: 'services', 
      label: userRole === 'provider' ? 'Mes services' : 'Services disponibles', 
      icon: Wrench 
    },
    { id: 'orders', label: 'Mes commandes', icon: Package },
    ...(userRole === 'provider' ? [{ id: 'vehicles', label: 'Mes véhicules', icon: Truck }] : []),
    { id: 'payments', label: 'Paiements', icon: CreditCard },
    { id: 'reviews', label: 'Avis & Feedbacks', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const handleLogout = () => {
    window.location.hash = '';
  };

  const MenuContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-[#0077FF] text-xl">A</span>
          </div>
          <span className="text-xl text-white tracking-tight">
            AutoServe <span className="opacity-90">DZ</span>
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${isActive 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/20">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-xl"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-xl shadow-lg"
          size="icon"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0077FF] flex flex-col z-40
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <MenuContent />
      </aside>
    </>
  );
}
