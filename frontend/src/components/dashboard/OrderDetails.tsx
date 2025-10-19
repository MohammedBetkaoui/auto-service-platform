import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, User, Phone, Mail, Car, CheckCircle, Truck, Package, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';

interface OrderDetailsProps {
  orderId: string;
  userRole: 'client' | 'provider' | 'admin';
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl hover:bg-white/5 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl text-white">Détails de la commande #{order.id}</h2>
          <p className="text-gray-400 mt-1">{order.service}</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-1">
          En cours
        </Badge>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tracking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time Tracking */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#F7931E] flex items-center justify-center">
                  <Truck size={18} className="text-white" />
                </div>
                Suivi en temps réel
              </h3>
              <div className="text-right bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                <p className="text-sm text-gray-400">Progression</p>
                <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>

            <div className="relative mb-8">
              <Progress value={progress} className="h-2.5 bg-white/5" />
              <div 
                className="absolute top-0 left-0 h-2.5 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] transition-all duration-500"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-[#FF6B35]/50" />
              </div>
            </div>

            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all
                        ${step.status === 'completed' 
                          ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/50 text-green-400' 
                          : step.status === 'current'
                          ? 'bg-gradient-to-r from-[#FF6B35]/20 to-[#F7931E]/20 border-[#FF6B35] text-[#FF6B35]'
                          : 'bg-white/5 border-white/10 text-gray-500'
                        }
                      `}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle size={22} />
                      ) : step.status === 'current' ? (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E]"
                        />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-500" />
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-16 ${step.status === 'completed' ? 'bg-gradient-to-b from-green-500/50 to-green-600/30' : 'bg-white/10'}`} />
                    )}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`${step.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>
                        {step.label}
                      </h4>
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                    <p className={`text-sm ${step.status === 'pending' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Service Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <h3 className="text-xl text-white mb-6">Détails du service</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <Calendar className="text-blue-400" size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Date</p>
                  <p className="text-white">{order.date}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                  <Clock className="text-purple-400" size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Heure prévue</p>
                  <p className="text-white">{order.scheduledTime} <span className="text-gray-400">({order.estimatedDuration})</span></p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-500/20">
                  <MapPin className="text-green-400" size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Adresse</p>
                  <p className="text-white">{order.client.address}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35]/20 to-[#F7931E]/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#FF6B35]/30">
                  <Package className="text-[#FF6B35]" size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Montant</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-lg">{order.amount}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6 bg-white/10" />

            <div>
              <p className="text-sm text-gray-400 mb-3">Description</p>
              <p className="text-white leading-relaxed bg-white/5 rounded-xl p-4 border border-white/10">{order.description}</p>
            </div>
          </motion.div>

          {/* Vehicle Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <h3 className="text-xl text-white mb-6">Véhicule à traiter</h3>

            <div className="flex items-center gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="w-14 h-14 bg-gradient-to-r from-[#FF6B35]/20 to-[#F7931E]/20 rounded-xl flex items-center justify-center border border-[#FF6B35]/30">
                <Car className="text-[#FF6B35]" size={28} />
              </div>
              <div className="flex-1">
                <p className="text-white mb-1.5">
                  {order.vehicle.brand} {order.vehicle.model}
                </p>
                <p className="text-sm text-gray-400">
                  {order.vehicle.color} • <span className="text-[#FF6B35]">{order.vehicle.plateNumber}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Provider Info (for clients) / Client Info (for providers) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <h3 className="text-xl text-white mb-6">
              {userRole === 'client' ? 'Prestataire' : 'Client'}
            </h3>

            {userRole === 'client' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-[#FF6B35]/30">
                    <AvatarImage src="" alt={order.provider.name} />
                    <AvatarFallback className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-lg">
                      {order.provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white">{order.provider.name}</p>
                    <p className="text-sm text-gray-400">{order.provider.company}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-yellow-500">{order.provider.rating}</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <a 
                    href={`tel:${order.provider.phone}`}
                    className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                  >
                    <Phone size={18} className="text-gray-400 group-hover:text-[#FF6B35] transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{order.provider.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${order.provider.email}`}
                    className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                  >
                    <Mail size={18} className="text-gray-400 group-hover:text-[#FF6B35] transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{order.provider.email}</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-white/5 border border-white/10">
                    <Truck size={18} className="text-gray-400" />
                    <span className="text-gray-300">{order.provider.vehicle}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white mt-4 rounded-xl shadow-lg shadow-[#FF6B35]/30">
                  <Phone size={18} className="mr-2" />
                  Appeler le prestataire
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-[#FF6B35]/30">
                    <AvatarImage src="" alt={order.client.name} />
                    <AvatarFallback className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-lg">
                      {order.client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white">{order.client.name}</p>
                    <p className="text-sm text-gray-400">Client</p>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <a 
                    href={`tel:${order.client.phone}`}
                    className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                  >
                    <Phone size={18} className="text-gray-400 group-hover:text-[#FF6B35] transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{order.client.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${order.client.email}`}
                    className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                  >
                    <Mail size={18} className="text-gray-400 group-hover:text-[#FF6B35] transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{order.client.email}</span>
                  </a>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white mt-4 rounded-xl shadow-lg shadow-[#FF6B35]/30">
                  <Phone size={18} className="mr-2" />
                  Appeler le client
                </Button>
              </div>
            )}
          </motion.div>

          {/* Payment Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <h3 className="text-xl text-white mb-6">Paiement</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400">Méthode</span>
                <span className="text-white">{order.payment.method}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400">Statut</span>
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30">
                  Payé
                </Badge>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/30">
                <span className="text-gray-300">Montant total</span>
                <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">{order.amount}</span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          {userRole === 'provider' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6"
            >
              <h3 className="text-xl text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg shadow-green-500/30">
                  <CheckCircle size={18} className="mr-2" />
                  Marquer comme terminé
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/5 rounded-xl"
                >
                  Signaler un problème
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
