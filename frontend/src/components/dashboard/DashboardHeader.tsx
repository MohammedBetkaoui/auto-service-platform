import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface DashboardHeaderProps {
  userName: string;
  userRole: 'client' | 'provider';
  notificationCount?: number;
}

export function DashboardHeader({ userName, userRole, notificationCount = 3 }: DashboardHeaderProps) {
  const handleLogout = () => {
    window.location.hash = '';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md ml-0 lg:ml-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-11 rounded-xl bg-[#F5F7FA] border-0 focus-visible:ring-[#0077FF]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Welcome Message - Hidden on mobile */}
          <div className="hidden md:block text-right mr-2">
            <p className="text-sm text-gray-600">Bienvenue,</p>
            <p className="text-[#1E1E1E]">{userName} 👋</p>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-gray-100"
          >
            <Bell size={20} className="text-gray-600" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full">
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-full hover:bg-gray-100">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-[#0077FF] text-white">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={16} className="text-gray-600 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-2">
                <p className="text-sm">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole === 'provider' ? 'Prestataire' : 'Client'}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
