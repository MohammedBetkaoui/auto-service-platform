import { Plus, Edit, Trash2, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface Vehicle {
  id: string;
  type: string;
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  services: string[];
  status: 'active' | 'maintenance' | 'inactive';
  image?: string;
}

export function VehiclesManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      type: 'Camion lavage',
      brand: 'Mercedes',
      model: 'Sprinter',
      year: '2021',
      licensePlate: '16-123-45',
      services: ['Lavage complet', 'Lavage express', 'Cirage'],
      status: 'active',
    },
    {
      id: '2',
      type: 'Camion vidange',
      brand: 'Renault',
      model: 'Master',
      year: '2020',
      licensePlate: '16-678-90',
      services: ['Vidange d\'huile', 'Changement filtres'],
      status: 'active',
    },
    {
      id: '3',
      type: 'Atelier mobile',
      brand: 'Ford',
      model: 'Transit',
      year: '2019',
      licensePlate: '16-234-56',
      services: ['Réparation freins', 'Diagnostic'],
      status: 'maintenance',
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    type: '',
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    services: '',
  });

  const handleAddVehicle = () => {
    if (!newVehicle.type || !newVehicle.brand || !newVehicle.licensePlate) {
      return;
    }

    const vehicle: Vehicle = {
      id: String(vehicles.length + 1),
      type: newVehicle.type,
      brand: newVehicle.brand,
      model: newVehicle.model,
      year: newVehicle.year,
      licensePlate: newVehicle.licensePlate,
      services: newVehicle.services.split(',').map(s => s.trim()).filter(s => s),
      status: 'active',
    };

    setVehicles([...vehicles, vehicle]);
    setIsAddDialogOpen(false);
    setNewVehicle({
      type: '',
      brand: '',
      model: '',
      year: '',
      licensePlate: '',
      services: '',
    });
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'maintenance':
        return 'En maintenance';
      case 'inactive':
        return 'Inactif';
    }
  };

  const getStatusIcon = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'maintenance':
        return <XCircle size={16} className="text-yellow-600" />;
      case 'inactive':
        return <XCircle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl text-[#1E1E1E] mb-1">Gestion des véhicules</h2>
          <p className="text-gray-600">Gérez votre flotte de véhicules et services</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-xl gap-2">
              <Plus size={20} />
              Ajouter un véhicule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau véhicule</DialogTitle>
              <DialogDescription>
                Remplissez les informations du véhicule et les services proposés.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="type">Type de véhicule *</Label>
                <Select value={newVehicle.type} onValueChange={(value) => setNewVehicle({...newVehicle, type: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Camion lavage">Camion lavage</SelectItem>
                    <SelectItem value="Camion vidange">Camion vidange</SelectItem>
                    <SelectItem value="Atelier mobile">Atelier mobile</SelectItem>
                    <SelectItem value="Dépanneuse">Dépanneuse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Marque *</Label>
                  <Input
                    id="brand"
                    value={newVehicle.brand}
                    onChange={(e) => setNewVehicle({...newVehicle, brand: e.target.value})}
                    placeholder="Mercedes"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="model">Modèle</Label>
                  <Input
                    id="model"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                    placeholder="Sprinter"
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Année</Label>
                  <Input
                    id="year"
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})}
                    placeholder="2021"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="plate">Plaque *</Label>
                  <Input
                    id="plate"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                    placeholder="16-123-45"
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="services">Services proposés</Label>
                <Textarea
                  id="services"
                  value={newVehicle.services}
                  onChange={(e) => setNewVehicle({...newVehicle, services: e.target.value})}
                  placeholder="Lavage complet, Lavage express, Cirage"
                  className="mt-2"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">Séparez les services par des virgules</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddVehicle} className="bg-[#0077FF] hover:bg-[#0066DD] text-white">
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total véhicules</p>
          <p className="text-2xl text-[#1E1E1E]">{vehicles.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Actifs</p>
          <p className="text-2xl text-green-600">{vehicles.filter(v => v.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En maintenance</p>
          <p className="text-2xl text-yellow-600">{vehicles.filter(v => v.status === 'maintenance').length}</p>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Vehicle Image/Icon */}
            <div className="bg-gradient-to-br from-[#0077FF] to-[#0066DD] h-40 flex items-center justify-center">
              <Truck size={64} className="text-white opacity-90" />
            </div>

            {/* Vehicle Info */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg text-[#1E1E1E] mb-1">{vehicle.type}</h3>
                  <p className="text-sm text-gray-600">
                    {vehicle.brand} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
                  </p>
                </div>
                <Badge variant="outline" className={getStatusColor(vehicle.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(vehicle.status)}
                    {getStatusLabel(vehicle.status)}
                  </span>
                </Badge>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Plaque d'immatriculation</p>
                <p className="text-[#1E1E1E]">{vehicle.licensePlate}</p>
              </div>

              {vehicle.services.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Services proposés</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Edit size={16} />
                  Modifier
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {vehicles.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Truck size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl text-[#1E1E1E] mb-2">Aucun véhicule</h3>
          <p className="text-gray-600 mb-6">Commencez par ajouter votre premier véhicule</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#0077FF] hover:bg-[#0066DD] text-white">
            <Plus size={20} className="mr-2" />
            Ajouter un véhicule
          </Button>
        </div>
      )}
    </div>
  );
}
