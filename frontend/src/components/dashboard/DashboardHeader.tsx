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
  userRole: 'client' | 'provider' | 'admin';
  notificationCount?: number;
}

export function DashboardHeader({ userName, userRole, notificationCount = 3 }: DashboardHeaderProps) {
  const handleLogout = () => {
    window.location.hash = '';
  };

  return (
    <header className="bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md ml-0 lg:ml-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-11 rounded-xl bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B35]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Welcome Message - Hidden on mobile */}
          <div className="hidden md:block text-right mr-2">
            <p className="text-sm text-gray-400">Bienvenue,</p>
            <p className="text-white">{userName} 👋</p>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-white/5 text-gray-300 hover:text-white"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-xs rounded-full border-2 border-[#0A0A0A]">
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-full hover:bg-white/5">
                <Avatar className="h-9 w-9 ring-2 ring-[#FF6B35]/20">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#1a1a1a] border-white/10">
              <div className="px-2 py-2">
                <p className="text-sm text-white">{userName}</p>
                <p className="text-xs text-gray-400 capitalize">{userRole === 'provider' ? 'Prestataire' : 'Client'}</p>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/5">
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/5">
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/20 hover:bg-red-500/20 cursor-pointer font-medium"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
