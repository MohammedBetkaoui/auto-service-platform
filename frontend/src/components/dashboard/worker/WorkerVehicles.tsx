import { Plus, Edit2, Trash2, Car, CheckCircle, XCircle, Clock, Upload, X as XIcon } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Switch } from '../../ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useState, useRef } from 'react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface Vehicle {
  id: string;
  type: string;
  model: string;
  brand: string;
  year: number;
  licensePlate: string;
  status: 'approved' | 'pending' | 'rejected';
  available: boolean;
  image?: string;
  services: string[];
  lastService?: string;
}

interface VehicleFormData {
  type: string;
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  services: string[];
  image?: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: 'VEH-001',
    type: 'Camion de lavage',
    model: 'Sprinter',
    brand: 'Mercedes',
    year: 2022,
    licensePlate: '16-123-45',
    status: 'approved',
    available: true,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400',
    services: ['Lavage Premium', 'Détailing Intérieur'],
    lastService: '2025-10-18',
  },
  {
    id: 'VEH-002',
    type: 'Dépanneuse',
    model: 'Transit',
    brand: 'Ford',
    year: 2021,
    licensePlate: '16-789-12',
    status: 'approved',
    available: false,
    image: 'https://images.unsplash.com/photo-1581092918484-8313e1f77e5f?w=400',
    services: ['Assistance Routière'],
    lastService: '2025-10-19',
  },
  {
    id: 'VEH-003',
    type: 'Atelier mobile',
    model: 'Master',
    brand: 'Renault',
    year: 2023,
    licensePlate: '16-456-78',
    status: 'pending',
    available: false,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    services: ['Entretien Complet', 'Batterie & Électrique'],
  },
];

const availableServices = [
  'Lavage Premium',
  'Entretien Complet',
  'Assistance Routière',
  'Détailing Intérieur',
  'Batterie & Électrique',
  'Carburant Express'
];

export function WorkerVehicles() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<VehicleFormData>({
    type: '',
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    services: [],
    image: undefined,
  });

  const resetForm = () => {
    setFormData({
      type: '',
      brand: '',
      model: '',
      year: '',
      licensePlate: '',
      services: [],
      image: undefined,
    });
    setImagePreview(null);
    setEditingVehicle(null);
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year.toString(),
      licensePlate: vehicle.licensePlate,
      services: vehicle.services,
      image: vehicle.image,
    });
    setImagePreview(vehicle.image || null);
    setDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = () => {
    if (editingVehicle) {
      // Update existing vehicle
      setVehicles(vehicles.map(v =>
        v.id === editingVehicle.id
          ? {
              ...v,
              type: formData.type,
              brand: formData.brand,
              model: formData.model,
              year: parseInt(formData.year),
              licensePlate: formData.licensePlate,
              services: formData.services,
              image: formData.image,
            }
          : v
      ));
    } else {
      // Add new vehicle
      const newVehicle: Vehicle = {
        id: `VEH-${String(vehicles.length + 1).padStart(3, '0')}`,
        type: formData.type,
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        licensePlate: formData.licensePlate,
        status: 'pending',
        available: false,
        services: formData.services,
        image: formData.image,
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setDialogOpen(false);
    resetForm();
  };

  const deleteVehicle = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const toggleAvailability = (id: string) => {
    setVehicles(vehicles.map(v => 
      v.id === id ? { ...v, available: !v.available } : v
    ));
  };

  const getStatusConfig = (status: Vehicle['status']) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-2">Mes Véhicules</h2>
          <p className="text-gray-400 text-sm">
            Gérez votre flotte de véhicules professionnels
          </p>
        </div>
        <Button 
          onClick={openAddDialog}
          className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white"
        >
          <Plus size={18} className="mr-2" />
          Ajouter un véhicule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: vehicles.length.toString(), icon: Car, color: 'from-blue-500 to-blue-600' },
          { label: 'Disponibles', value: vehicles.filter(v => v.available).length.toString(), icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Approuvés', value: vehicles.filter(v => v.status === 'approved').length.toString(), icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'En attente', value: vehicles.filter(v => v.status === 'pending').length.toString(), icon: Clock, color: 'from-yellow-500 to-yellow-600' },
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

      {/* Vehicles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => {
          const statusConfig = getStatusConfig(vehicle.status);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={vehicle.id} className="bg-[#0F0F0F] border-white/10 overflow-hidden hover:border-white/20 transition-all group">
              {/* Image */}
              {vehicle.image && (
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 right-3 ${statusConfig.color} flex items-center gap-1`}>
                    <StatusIcon size={14} />
                    {statusConfig.label}
                  </Badge>
                </div>
              )}

              <div className="p-4">
                {/* Vehicle Info */}
                <div className="mb-3">
                  <h3 className="text-white mb-1">{vehicle.brand} {vehicle.model}</h3>
                  <p className="text-gray-400 text-sm">{vehicle.type}</p>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Année:</span>
                    <span className="text-white">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Plaque:</span>
                    <span className="text-white">{vehicle.licensePlate}</span>
                  </div>
                  {vehicle.lastService && (
                    <div className="flex justify-between text-gray-400">
                      <span>Dernier service:</span>
                      <span className="text-white">{new Date(vehicle.lastService).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="text-gray-400 text-xs mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.services.slice(0, 2).map((service) => (
                      <Badge key={service} variant="outline" className="text-xs border-white/10 text-gray-300">
                        {service}
                      </Badge>
                    ))}
                    {vehicle.services.length > 2 && (
                      <Badge variant="outline" className="text-xs border-white/10 text-gray-300">
                        +{vehicle.services.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Availability Toggle */}
                {vehicle.status === 'approved' && (
                  <div className="flex items-center justify-between mb-4 p-3 bg-[#1a1a1a] rounded-lg">
                    <span className="text-sm text-gray-300">Disponible</span>
                    <Switch
                      checked={vehicle.available}
                      onCheckedChange={() => toggleAvailability(vehicle.id)}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-white/10 hover:bg-white/5"
                    onClick={() => openEditDialog(vehicle)}
                  >
                    <Edit2 size={14} className="mr-2" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                    onClick={() => deleteVehicle(vehicle.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Vehicle Dialog */}
  <Dialog open={dialogOpen} onOpenChange={(open: boolean) => {
        setDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="bg-[#0F0F0F] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? 'Modifier le véhicule' : 'Ajouter un nouveau véhicule'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingVehicle 
                ? 'Modifiez les informations de votre véhicule professionnel.'
                : 'Ajoutez un nouveau véhicule à votre flotte professionnelle.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Image Upload */}
            <div>
              <Label className="mb-2 block">Photo du véhicule</Label>
              <div className="space-y-3">
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, image: undefined });
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                    >
                      <XIcon size={16} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/20 transition-colors bg-[#1a1a1a]"
                  >
                    <Upload size={40} className="text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm">Cliquez pour ajouter une photo</p>
                    <p className="text-gray-500 text-xs mt-1">PNG, JPG jusqu'à 10MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Type and Brand */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type de véhicule</Label>
                <Select value={formData.type} onValueChange={(value: string) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-[#1a1a1a] border-white/10">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Camion de lavage">Camion de lavage</SelectItem>
                    <SelectItem value="Dépanneuse">Dépanneuse</SelectItem>
                    <SelectItem value="Atelier mobile">Atelier mobile</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Marque</Label>
                <Input 
                  className="bg-[#1a1a1a] border-white/10" 
                  placeholder="Mercedes" 
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
            </div>

            {/* Model and Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Modèle</Label>
                <Input 
                  className="bg-[#1a1a1a] border-white/10" 
                  placeholder="Sprinter" 
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div>
                <Label>Année</Label>
                <Input 
                  type="number" 
                  className="bg-[#1a1a1a] border-white/10" 
                  placeholder="2023" 
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
            </div>

            {/* License Plate */}
            <div>
              <Label>Plaque d'immatriculation</Label>
              <Input 
                className="bg-[#1a1a1a] border-white/10" 
                placeholder="16-123-45" 
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
              />
            </div>

            {/* Services */}
            <div>
              <Label className="mb-3 block">Services proposés</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableServices.map((service) => (
                  <label 
                    key={service} 
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.services.includes(service)
                        ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border-[#FF6B35]/30'
                        : 'bg-[#1a1a1a] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                    />
                    <span className="text-sm text-gray-300">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setDialogOpen(false)} 
                className="border-white/10"
              >
                Annuler
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white"
                onClick={handleSubmit}
              >
                {editingVehicle ? 'Enregistrer les modifications' : 'Ajouter le véhicule'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
