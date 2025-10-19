import { useState } from 'react';
import { Plus, Truck, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useConfirmDialog } from '../ConfirmDialog';
import { toast } from 'sonner';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface Vehicle {
  id: string;
  name: string;
  type: 'lavage' | 'vidange' | 'mecanique' | 'remorquage';
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  status: 'active' | 'maintenance' | 'inactive';
  services: string[];
  description: string;
}

const vehicleTypes = {
  lavage: { label: 'Camion de lavage', icon: '🚿', color: 'bg-blue-100 text-blue-800' },
  vidange: { label: 'Camion vidange', icon: '🛢️', color: 'bg-orange-100 text-orange-800' },
  mecanique: { label: 'Atelier mobile', icon: '🔧', color: 'bg-purple-100 text-purple-800' },
  remorquage: { label: 'Dépanneuse', icon: '🚚', color: 'bg-green-100 text-green-800' },
};

export function VehicleManagement() {
  const { showConfirm, ConfirmDialog } = useConfirmDialog();
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Camion Lavage Pro 1',
      type: 'lavage',
      brand: 'Mercedes',
      model: 'Sprinter',
      year: 2022,
      plateNumber: '16-23456-16',
      status: 'active',
      services: ['Lavage complet', 'Lavage express', 'Nettoyage intérieur'],
      description: 'Camion équipé pour lavage haute pression et nettoyage complet',
    },
    {
      id: '2',
      name: 'Atelier Mobile 1',
      type: 'mecanique',
      brand: 'Iveco',
      model: 'Daily',
      year: 2021,
      plateNumber: '16-78901-16',
      status: 'active',
      services: ['Réparation freins', 'Vidange moteur', 'Diagnostic électronique'],
      description: 'Atelier mobile complet avec tous les outils nécessaires',
    },
    {
      id: '3',
      name: 'Camion Lavage Pro 2',
      type: 'lavage',
      brand: 'Ford',
      model: 'Transit',
      year: 2020,
      plateNumber: '16-45678-16',
      status: 'maintenance',
      services: ['Lavage complet', 'Lavage express'],
      description: 'En maintenance préventive',
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'lavage' as Vehicle['type'],
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    plateNumber: '',
    status: 'active' as Vehicle['status'],
    services: '',
    description: '',
  });

  const handleAddVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      ...formData,
      services: formData.services.split(',').map(s => s.trim()),
    };
    setVehicles([...vehicles, newVehicle]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      plateNumber: vehicle.plateNumber,
      status: vehicle.status,
      services: vehicle.services.join(', '),
      description: vehicle.description,
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateVehicle = () => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id 
          ? { ...editingVehicle, ...formData, services: formData.services.split(',').map(s => s.trim()) }
          : v
      ));
      setIsAddDialogOpen(false);
      setEditingVehicle(null);
      resetForm();
    }
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    showConfirm({
      title: 'Supprimer le véhicule',
      description: `Êtes-vous sûr de vouloir supprimer ${vehicle.name} (${vehicle.plateNumber}) ? Cette action est irréversible.`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      type: 'danger',
      onConfirm: () => {
        setVehicles(vehicles.filter(v => v.id !== vehicle.id));
        toast.success('Véhicule supprimé avec succès');
      },
    });
  };

  const handleEditWithConfirm = (vehicle: Vehicle) => {
    showConfirm({
      title: 'Modifier le véhicule',
      description: `Voulez-vous modifier les informations de ${vehicle.name} ?`,
      confirmText: 'Modifier',
      cancelText: 'Annuler',
      type: 'info',
      onConfirm: () => {
        handleEditVehicle(vehicle);
      },
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'lavage',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      plateNumber: '',
      status: 'active',
      services: '',
      description: '',
    });
    setEditingVehicle(null);
  };

  const getStatusBadge = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle size={14} className="mr-1" /> Actif</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">En maintenance</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200"><XCircle size={14} className="mr-1" /> Inactif</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#1E1E1E]">Gestion des véhicules</h2>
          <p className="text-gray-600 mt-1">Gérez votre flotte de véhicules de service</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open: boolean) => {
          setIsAddDialogOpen(open);
          if (!open) {
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#0077FF] hover:bg-[#0066DD] text-white gap-2">
              <Plus size={20} />
              Ajouter un véhicule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVehicle ? 'Modifier le véhicule' : 'Ajouter un nouveau véhicule'}</DialogTitle>
              <DialogDescription>
                Remplissez les informations du véhicule de service
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du véhicule *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Camion Lavage Pro 1"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type de service *</Label>
                  <Select value={formData.type} onValueChange={(value: string) => setFormData({ ...formData, type: value as Vehicle['type'] })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(vehicleTypes).map(([key, { label, icon }]) => (
                        <SelectItem key={key} value={key}>
                          {icon} {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Marque *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Mercedes"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="model">Modèle *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="Sprinter"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year">Année *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="plateNumber">Immatriculation *</Label>
                  <Input
                    id="plateNumber"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    placeholder="16-23456-16"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value: string) => setFormData({ ...formData, status: value as Vehicle['status'] })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="maintenance">En maintenance</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="services">Services proposés (séparés par virgule) *</Label>
                <Input
                  id="services"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  placeholder="Lavage complet, Lavage express, Nettoyage intérieur"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez les équipements et spécificités du véhicule..."
                  className="mt-2"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}>
                Annuler
              </Button>
              <Button 
                className="bg-[#0077FF] hover:bg-[#0066DD] text-white"
                onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
              >
                {editingVehicle ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Véhicules actifs</p>
          <p className="text-2xl text-[#1E1E1E] mt-1">
            {vehicles.filter(v => v.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">En maintenance</p>
          <p className="text-2xl text-[#1E1E1E] mt-1">
            {vehicles.filter(v => v.status === 'maintenance').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Total véhicules</p>
          <p className="text-2xl text-[#1E1E1E] mt-1">{vehicles.length}</p>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicles.map((vehicle) => {
          const typeInfo = vehicleTypes[vehicle.type];
          return (
            <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F7FA] rounded-xl flex items-center justify-center text-2xl">
                    {typeInfo.icon}
                  </div>
                  <div>
                    <h3 className="text-lg text-[#1E1E1E] mb-1">{vehicle.name}</h3>
                    <p className="text-sm text-gray-600">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
                  </div>
                </div>
                {getStatusBadge(vehicle.status)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className={typeInfo.color}>
                    {typeInfo.label}
                  </Badge>
                  <span className="text-gray-600">• {vehicle.plateNumber}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Services proposés :</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.services.map((service, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {vehicle.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {vehicle.description}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleEditWithConfirm(vehicle)}
                >
                  <Edit size={16} />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700 border-red-200"
                  onClick={() => handleDeleteVehicle(vehicle)}
                >
                  <Trash2 size={16} />
                  Supprimer
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {vehicles.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Truck size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl text-[#1E1E1E] mb-2">Aucun véhicule enregistré</h3>
          <p className="text-gray-600 mb-6">Commencez par ajouter votre premier véhicule de service</p>
          <Button
            className="bg-[#0077FF] hover:bg-[#0066DD] text-white gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={20} />
            Ajouter un véhicule
          </Button>
        </div>
      )}
      
      {/* Confirm Dialog */}
      <ConfirmDialog />
    </div>
  );
}
