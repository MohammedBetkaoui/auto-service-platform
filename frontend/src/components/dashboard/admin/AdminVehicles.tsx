import { Car, Search, CheckCircle, XCircle, Clock, Trash2, Eye } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { useState } from 'react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface AdminVehicle {
  id: string;
  type: string;
  model: string;
  brand: string;
  year: number;
  licensePlate: string;
  status: 'approved' | 'pending' | 'rejected';
  owner: {
    id: string;
    name: string;
    email: string;
  };
  image?: string;
  submittedDate: string;
}

const mockVehicles: AdminVehicle[] = [
  {
    id: 'VEH-001',
    type: 'Camion de lavage',
    model: 'Sprinter',
    brand: 'Mercedes',
    year: 2022,
    licensePlate: '16-123-45',
    status: 'approved',
    owner: {
      id: '2',
      name: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
    },
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400',
    submittedDate: '2024-11-25',
  },
  {
    id: 'VEH-002',
    type: 'Atelier mobile',
    model: 'Master',
    brand: 'Renault',
    year: 2023,
    licensePlate: '16-456-78',
    status: 'pending',
    owner: {
      id: '3',
      name: 'Karim Meziane',
      email: 'karim.meziane@email.com',
    },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    submittedDate: '2025-10-18',
  },
  {
    id: 'VEH-003',
    type: 'Dépanneuse',
    model: 'Transit',
    brand: 'Ford',
    year: 2021,
    licensePlate: '16-789-12',
    status: 'rejected',
    owner: {
      id: '4',
      name: 'Yacine Hamdi',
      email: 'yacine.hamdi@email.com',
    },
    image: 'https://images.unsplash.com/photo-1581092918484-8313e1f77e5f?w=400',
    submittedDate: '2025-10-10',
  },
];

export function AdminVehicles() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusConfig = (status: AdminVehicle['status']) => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          label: 'Approuvé',
          color: 'bg-green-500/10 text-green-500 border-green-500/20',
        };
      case 'pending':
        return {
          icon: Clock,
          label: 'En attente',
          color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        };
      case 'rejected':
        return {
          icon: XCircle,
          label: 'Rejeté',
          color: 'bg-red-500/10 text-red-500 border-red-500/20',
        };
    }
  };

  const approveVehicle = (vehicleId: string) => {
    setVehicles(vehicles.map(v => 
      v.id === vehicleId ? { ...v, status: 'approved' as const } : v
    ));
  };

  const rejectVehicle = (vehicleId: string) => {
    setVehicles(vehicles.map(v => 
      v.id === vehicleId ? { ...v, status: 'rejected' as const } : v
    ));
  };

  const deleteVehicle = (vehicleId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Gestion des Véhicules</h2>
        <p className="text-gray-400 text-sm">
          Approuvez ou rejetez les véhicules des prestataires
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: vehicles.length.toString(), icon: Car, color: 'from-blue-500 to-blue-600' },
          { label: 'Approuvés', value: vehicles.filter(v => v.status === 'approved').length.toString(), icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'En attente', value: vehicles.filter(v => v.status === 'pending').length.toString(), icon: Clock, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Rejetés', value: vehicles.filter(v => v.status === 'rejected').length.toString(), icon: XCircle, color: 'from-red-500 to-red-600' },
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
              placeholder="Rechercher par marque, modèle, plaque ou propriétaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1a1a1a] border-white/10 pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-[#1a1a1a] border-white/10">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvés</SelectItem>
              <SelectItem value="rejected">Rejetés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredVehicles.map((vehicle) => {
          const statusConfig = getStatusConfig(vehicle.status);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={vehicle.id} className="bg-[#0F0F0F] border-white/10 overflow-hidden hover:border-white/20 transition-all">
              <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Image */}
                {vehicle.image && (
                  <div className="relative w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={vehicle.image}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${statusConfig.color} flex items-center gap-1`}>
                      <StatusIcon size={14} />
                      {statusConfig.label}
                    </Badge>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-white mb-1">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-gray-400 text-sm">{vehicle.type}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Année:</span>
                      <span className="text-white ml-2">{vehicle.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Plaque:</span>
                      <span className="text-white ml-2">{vehicle.licensePlate}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1a1a1a] rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Propriétaire</p>
                    <p className="text-white text-sm">{vehicle.owner.name}</p>
                    <p className="text-gray-400 text-xs">{vehicle.owner.email}</p>
                  </div>

                  <div className="text-xs text-gray-400">
                    Soumis le {new Date(vehicle.submittedDate).toLocaleDateString('fr-FR')}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {vehicle.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => approveVehicle(vehicle.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle size={14} className="mr-2" />
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => rejectVehicle(vehicle.id)}
                          variant="outline"
                          className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10"
                        >
                          <XCircle size={14} className="mr-2" />
                          Rejeter
                        </Button>
                      </>
                    )}
                    {vehicle.status !== 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-white/10 hover:bg-white/5"
                      >
                        <Eye size={14} className="mr-2" />
                        Voir détails
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Aucun véhicule trouvé</p>
        </div>
      )}
    </div>
  );
}
