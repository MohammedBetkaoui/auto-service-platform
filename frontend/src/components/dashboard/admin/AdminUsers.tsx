import { Users, Search, Filter, MoreVertical, Shield, Ban, Check, Trash2, Eye } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar } from '../../ui/avatar';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { useState } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  avatar: string;
  joinedDate: string;
  ordersCount?: number;
  rating?: number;
}

const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@email.com',
    role: 'client',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima',
    joinedDate: '2025-01-15',
    ordersCount: 24,
  },
  {
    id: '2',
    name: 'Ahmed Benali',
    email: 'ahmed.benali@email.com',
    role: 'provider',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
    joinedDate: '2024-11-20',
    rating: 4.9,
    ordersCount: 156,
  },
  {
    id: '3',
    name: 'Karim Meziane',
    email: 'karim.meziane@email.com',
    role: 'provider',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim',
    joinedDate: '2024-12-10',
    rating: 4.7,
    ordersCount: 89,
  },
  {
    id: '4',
    name: 'Sarah Larbi',
    email: 'sarah.larbi@email.com',
    role: 'client',
    status: 'banned',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    joinedDate: '2025-03-05',
    ordersCount: 3,
  },
];

export function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getRoleConfig = (role: AdminUser['role']) => {
    switch (role) {
      case 'client':
        return { label: 'Client', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
      case 'provider':
        return { label: 'Prestataire', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' };
      case 'admin':
        return { label: 'Admin', color: 'bg-red-500/10 text-red-500 border-red-500/20' };
    }
  };

  const getStatusConfig = (status: AdminUser['status']) => {
    switch (status) {
      case 'active':
        return { label: 'Actif', color: 'bg-green-500/10 text-green-500 border-green-500/20' };
      case 'inactive':
        return { label: 'Inactif', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' };
      case 'banned':
        return { label: 'Banni', color: 'bg-red-500/10 text-red-500 border-red-500/20' };
    }
  };

  const updateUserStatus = (userId: string, newStatus: AdminUser['status']) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
  };

  const deleteUser = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Gestion des Utilisateurs</h2>
        <p className="text-gray-400 text-sm">
          Gérez tous les utilisateurs de la plateforme
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: users.length.toString(), icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Clients', value: users.filter(u => u.role === 'client').length.toString(), icon: Users, color: 'from-green-500 to-green-600' },
          { label: 'Prestataires', value: users.filter(u => u.role === 'provider').length.toString(), icon: Shield, color: 'from-purple-500 to-purple-600' },
          { label: 'Actifs', value: users.filter(u => u.status === 'active').length.toString(), icon: Check, color: 'from-[#FF6B35] to-[#F7931E]' },
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-[#0F0F0F] border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-white text-2xl">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="bg-[#0F0F0F] border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1a1a1a] border-white/10 pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-[#1a1a1a] border-white/10">
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="client">Clients</SelectItem>
              <SelectItem value="provider">Prestataires</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-[#1a1a1a] border-white/10">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
              <SelectItem value="banned">Banni</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="bg-[#0F0F0F] border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-400">Utilisateur</TableHead>
              <TableHead className="text-gray-400">Rôle</TableHead>
              <TableHead className="text-gray-400">Statut</TableHead>
              <TableHead className="text-gray-400">Date d'inscription</TableHead>
              <TableHead className="text-gray-400">Commandes</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const roleConfig = getRoleConfig(user.role);
              const statusConfig = getStatusConfig(user.status);

              return (
                <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-white/10">
                        <img src={user.avatar} alt={user.name} />
                      </Avatar>
                      <div>
                        <p className="text-white">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleConfig.color}>{roleConfig.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(user.joinedDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {user.ordersCount || 0}
                    {user.rating && (
                      <span className="text-yellow-500 ml-2">★ {user.rating}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
                        <DropdownMenuItem className="text-gray-300 hover:text-white">
                          <Eye size={16} className="mr-2" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateUserStatus(user.id, 'active')}
                          className="text-green-500 hover:text-green-400"
                        >
                          <Check size={16} className="mr-2" />
                          Activer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateUserStatus(user.id, 'inactive')}
                          className="text-yellow-500 hover:text-yellow-400"
                        >
                          <Ban size={16} className="mr-2" />
                          Désactiver
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateUserStatus(user.id, 'banned')}
                          className="text-orange-500 hover:text-orange-400"
                        >
                          <Ban size={16} className="mr-2" />
                          Bannir
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteUser(user.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Aucun utilisateur trouvé</p>
        </div>
      )}
    </div>
  );
}
