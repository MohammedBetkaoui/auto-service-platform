import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, User, Phone, Mail, Car, CheckCircle, Truck, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

interface OrderDetailsProps {
  orderId: string;
  userRole: 'client' | 'provider';
  onBack: () => void;
}

interface TrackingStep {
  id: string;
  label: string;
  description: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
}

export function OrderDetails({ orderId, userRole, onBack }: OrderDetailsProps) {
  const [trackingSteps] = useState<TrackingStep[]>([
    {
      id: '1',
      label: 'Commande créée',
      description: 'Votre demande a été enregistrée',
      time: '18 Oct 2025, 09:30',
      status: 'completed',
    },
    {
      id: '2',
      label: 'Prestataire assigné',
      description: 'Ahmed Belkacem a accepté votre commande',
      time: '18 Oct 2025, 09:45',
      status: 'completed',
    },
    {
      id: '3',
      label: 'En route',
      description: 'Le prestataire se dirige vers votre adresse',
      time: '18 Oct 2025, 10:15',
      status: 'current',
    },
    {
      id: '4',
      label: 'Service en cours',
      description: 'Le service est en cours de réalisation',
      time: 'En attente',
      status: 'pending',
    },
    {
      id: '5',
      label: 'Service terminé',
      description: 'Le service a été complété avec succès',
      time: 'En attente',
      status: 'pending',
    },
  ]);

  // Mock order data
  const order = {
    id: orderId,
    service: 'Lavage complet',
    status: 'in_progress',
    date: '18 Oct 2025',
    scheduledTime: '11:00',
    estimatedDuration: '45 min',
    amount: '1,200 DA',
    client: {
      name: 'Ahmed Benali',
      phone: '+213 555 123 456',
      email: 'ahmed.benali@example.com',
      address: 'Rue Didouche Mourad, Alger Centre, Alger',
    },
    provider: {
      name: 'Ahmed Belkacem',
      company: 'Auto Clean Pro',
      phone: '+213 555 789 012',
      email: 'contact@autocleanpro.dz',
      vehicle: 'Mercedes Sprinter (16-23456-16)',
      rating: 4.8,
    },
    vehicle: {
      brand: 'Renault',
      model: 'Clio 4',
      color: 'Blanc',
      plateNumber: '16-98765-16',
    },
    description: 'Lavage complet extérieur et intérieur avec polissage de carrosserie',
    payment: {
      method: 'Carte bancaire',
      status: 'paid',
    },
  };

  const currentStepIndex = trackingSteps.findIndex(step => step.status === 'current');
  const progress = ((currentStepIndex + 1) / trackingSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl text-[#1E1E1E]">Détails de la commande {order.id}</h2>
          <p className="text-gray-600 mt-1">{order.service}</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          En cours
        </Badge>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tracking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time Tracking */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-[#1E1E1E]">Suivi en temps réel</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">Progression</p>
                <p className="text-lg text-[#0077FF]">{Math.round(progress)}%</p>
              </div>
            </div>

            <Progress value={progress} className="mb-8 h-2" />

            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${step.status === 'completed' 
                          ? 'bg-green-100 text-green-600' 
                          : step.status === 'current'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                        }
                      `}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle size={20} />
                      ) : (
                        <div className={`w-3 h-3 rounded-full ${step.status === 'current' ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`} />
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-12 ${step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'}`} />
                    )}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`${step.status === 'pending' ? 'text-gray-400' : 'text-[#1E1E1E]'}`}>
                        {step.label}
                      </h4>
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                    <p className={`text-sm ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl text-[#1E1E1E] mb-6">Détails du service</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-[#1E1E1E]">{order.date}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heure prévue</p>
                  <p className="text-[#1E1E1E]">{order.scheduledTime} ({order.estimatedDuration})</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Adresse</p>
                  <p className="text-[#1E1E1E]">{order.client.address}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Montant</p>
                  <p className="text-[#1E1E1E]">{order.amount}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-[#1E1E1E] leading-relaxed">{order.description}</p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl text-[#1E1E1E] mb-6">Véhicule à traiter</h3>

            <div className="flex items-center gap-4 bg-[#F5F7FA] rounded-xl p-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Car className="text-[#0077FF]" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[#1E1E1E] mb-1">
                  {order.vehicle.brand} {order.vehicle.model}
                </p>
                <p className="text-sm text-gray-600">
                  {order.vehicle.color} • {order.vehicle.plateNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Provider Info (for clients) / Client Info (for providers) */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl text-[#1E1E1E] mb-6">
              {userRole === 'client' ? 'Prestataire' : 'Client'}
            </h3>

            {userRole === 'client' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={order.provider.name} />
                    <AvatarFallback className="bg-[#0077FF] text-white">
                      {order.provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[#1E1E1E]">{order.provider.name}</p>
                    <p className="text-sm text-gray-600">{order.provider.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm">{order.provider.rating}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${order.provider.phone}`} className="text-[#0077FF] hover:underline">
                      {order.provider.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${order.provider.email}`} className="text-[#0077FF] hover:underline">
                      {order.provider.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Truck size={16} className="text-gray-400" />
                    <span className="text-gray-600">{order.provider.vehicle}</span>
                  </div>
                </div>

                <Button className="w-full bg-[#0077FF] hover:bg-[#0066DD] text-white mt-4">
                  <Phone size={16} className="mr-2" />
                  Appeler le prestataire
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={order.client.name} />
                    <AvatarFallback className="bg-[#0077FF] text-white">
                      {order.client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[#1E1E1E]">{order.client.name}</p>
                    <p className="text-sm text-gray-600">Client</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${order.client.phone}`} className="text-[#0077FF] hover:underline">
                      {order.client.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${order.client.email}`} className="text-[#0077FF] hover:underline">
                      {order.client.email}
                    </a>
                  </div>
                </div>

                <Button className="w-full bg-[#0077FF] hover:bg-[#0066DD] text-white mt-4">
                  <Phone size={16} className="mr-2" />
                  Appeler le client
                </Button>
              </div>
            )}
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl text-[#1E1E1E] mb-6">Paiement</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Méthode</span>
                <span className="text-[#1E1E1E]">{order.payment.method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Statut</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Payé
                </Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Montant total</span>
                <span className="text-xl text-[#1E1E1E]">{order.amount}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {userRole === 'provider' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl text-[#1E1E1E] mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle size={16} className="mr-2" />
                  Marquer comme terminé
                </Button>
                <Button variant="outline" className="w-full">
                  Signaler un problème
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
