import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, User, Lock, Bell, Globe, Save, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useConfirmDialog } from '../ConfirmDialog';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

type UserRole = 'client' | 'provider' | 'admin';

interface ProfileSettingsProps {
  userRole: UserRole;
}

export function ProfileSettings({ userRole }: ProfileSettingsProps) {
  const { showConfirm, ConfirmDialog } = useConfirmDialog();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: userRole === 'client' ? 'Ahmed Benali' : 'Karim Auto Service',
    email: 'ahmed.benali@example.com',
    phone: '0555 123 456',
    address: '15 Rue Didouche Mourad, Alger',
    city: 'Alger',
    bio: userRole === 'provider' ? 'Service professionnel de lavage automobile mobile. Plus de 10 ans d\'expérience.' : '',
    // Provider specific
    companyName: 'Karim Auto Service',
    siret: '123 456 789 00012',
    serviceArea: 'Alger, Blida, Tipaza',
  });

  const [notifications, setNotifications] = useState({
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
    orderUpdates: true,
    promotions: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSave = () => {
    showConfirm({
      title: 'Enregistrer les modifications',
      description: 'Voulez-vous enregistrer les modifications apportées à votre profil ?',
      confirmText: 'Enregistrer',
      cancelText: 'Annuler',
      type: 'success',
      onConfirm: () => {
        setIsEditing(false);
        toast.success('Profil mis à jour avec succès');
        console.log('Profile saved:', profileData);
      },
    });
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    showConfirm({
      title: 'Changer le mot de passe',
      description: 'Êtes-vous sûr de vouloir changer votre mot de passe ?',
      confirmText: 'Confirmer',
      cancelText: 'Annuler',
      type: 'warning',
      onConfirm: () => {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        toast.success('Mot de passe modifié avec succès');
      },
    });
  };

  const handleLogoutDevice = (deviceName: string) => {
    showConfirm({
      title: 'Déconnecter l\'appareil',
      description: `Voulez-vous déconnecter ${deviceName} ? Vous devrez vous reconnecter sur cet appareil.`,
      confirmText: 'Déconnecter',
      cancelText: 'Annuler',
      type: 'warning',
      onConfirm: () => {
        toast.success(`${deviceName} déconnecté avec succès`);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Mon profil</h1>
          <p className="text-gray-400">Gérez vos informations personnelles et préférences</p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl shadow-lg shadow-[#FF6B35]/30"
          >
            <Edit2 size={18} className="mr-2" />
            Modifier
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="rounded-xl bg-transparent border-white/20 text-white hover:bg-white/5"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#28C76F] to-[#22B55E] hover:from-[#22B55E] hover:to-[#28C76F] text-white rounded-xl shadow-lg shadow-[#28C76F]/30"
            >
              <Save size={18} className="mr-2" />
              Enregistrer
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger 
            value="profile" 
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#F7931E] data-[state=active]:text-white text-gray-400"
          >
            <User size={18} className="mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#F7931E] data-[state=active]:text-white text-gray-400"
          >
            <Lock size={18} className="mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#F7931E] data-[state=active]:text-white text-gray-400"
          >
            <Bell size={18} className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#F7931E] data-[state=active]:text-white text-gray-400"
          >
            <Globe size={18} className="mr-2" />
            Préférences
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl text-white mb-6">Photo de profil</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-[#FF6B35]/20">
                  <AvatarImage src="" alt={profileData.fullName} />
                  <AvatarFallback className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white text-2xl">
                    {profileData.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <div>
                <h3 className="text-white text-lg mb-1">{profileData.fullName}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  {userRole === 'provider' ? 'Prestataire de services' : 'Client'}
                </p>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl">
                      Changer la photo
                    </Button>
                    <Button size="sm" variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl">
                      Supprimer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl text-white mb-6">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-white mb-2 block">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    disabled={!isEditing}
                    className="pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="city" className="text-white mb-2 block">Ville</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none" size={20} />
                  <Select value={profileData.city} onValueChange={(value: string) => setProfileData({ ...profileData, city: value })} disabled={!isEditing}>
                    <SelectTrigger className="pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alger">Alger</SelectItem>
                      <SelectItem value="Oran">Oran</SelectItem>
                      <SelectItem value="Constantine">Constantine</SelectItem>
                      <SelectItem value="Annaba">Annaba</SelectItem>
                      <SelectItem value="Blida">Blida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-white mb-2 block">Adresse</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Provider Specific Info */}
          {userRole === 'provider' && (
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
              <h2 className="text-xl text-white mb-6">Informations professionnelles</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="companyName" className="text-white mb-2 block">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    value={profileData.companyName}
                    onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                    disabled={!isEditing}
                    className="rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label htmlFor="siret" className="text-white mb-2 block">SIRET / NIF</Label>
                  <Input
                    id="siret"
                    value={profileData.siret}
                    onChange={(e) => setProfileData({ ...profileData, siret: e.target.value })}
                    disabled={!isEditing}
                    className="rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceArea" className="text-white mb-2 block">Zone de service</Label>
                  <Input
                    id="serviceArea"
                    value={profileData.serviceArea}
                    onChange={(e) => setProfileData({ ...profileData, serviceArea: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Ex: Alger, Blida, Tipaza"
                    className="rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-white mb-2 block">Description du service</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className="rounded-xl bg-[#0a0a0a] border-white/10 text-white disabled:opacity-70"
                  />
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl text-white mb-6">Changer le mot de passe</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <Label htmlFor="currentPassword" className="text-white mb-2 block">Mot de passe actuel</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="rounded-xl bg-[#0a0a0a] border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-white mb-2 block">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="rounded-xl bg-[#0a0a0a] border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-white mb-2 block">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="rounded-xl bg-[#0a0a0a] border-white/10 text-white"
                />
              </div>

              <Button 
                onClick={handleChangePassword}
                className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl"
              >
                Mettre à jour le mot de passe
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl text-white mb-4">Sessions actives</h2>
            <p className="text-gray-400 mb-6">Gérez vos sessions actives et déconnectez-vous des appareils que vous n'utilisez plus.</p>
            
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white">Windows - Chrome</p>
                  <p className="text-sm text-gray-400">Dernière activité: Maintenant</p>
                </div>
                <span className="text-[#28C76F] text-sm bg-[#28C76F]/10 px-3 py-1 rounded-full border border-[#28C76F]/20">Appareil actuel</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white">iPhone - Safari</p>
                  <p className="text-sm text-gray-400">Dernière activité: Il y a 2 heures</p>
                </div>
                <Button 
                  onClick={() => handleLogoutDevice('iPhone - Safari')}
                  size="sm" 
                  variant="outline" 
                  className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl"
                >
                  Déconnecter
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl text-white mb-6">Préférences de notifications</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Notifications par email</p>
                  <p className="text-sm text-gray-400">Recevez des mises à jour par email</p>
                </div>
                  <Switch
                    checked={notifications.emailNotif}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, emailNotif: checked })}
                  />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Notifications SMS</p>
                  <p className="text-sm text-gray-400">Recevez des SMS pour les mises à jour importantes</p>
                </div>
                  <Switch
                    checked={notifications.smsNotif}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, smsNotif: checked })}
                  />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Notifications push</p>
                  <p className="text-sm text-gray-400">Recevez des notifications push dans votre navigateur</p>
                </div>
                  <Switch
                    checked={notifications.pushNotif}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, pushNotif: checked })}
                  />
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white mb-1">Mises à jour de commandes</p>
                  <p className="text-sm text-gray-400">Notifications sur l'état de vos commandes</p>
                </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, orderUpdates: checked })}
                  />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white mb-1">Promotions et offres</p>
                  <p className="text-sm text-gray-400">Recevez des offres spéciales et promotions</p>
                </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, promotions: checked })}
                  />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl text-white mb-6">Préférences générales</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="language" className="text-white mb-2 block">Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger className="rounded-xl bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone" className="text-white mb-2 block">Fuseau horaire</Label>
                <Select defaultValue="gmt1">
                  <SelectTrigger className="rounded-xl bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmt1">GMT+1 (Alger)</SelectItem>
                    <SelectItem value="gmt0">GMT+0 (Londres)</SelectItem>
                    <SelectItem value="gmt2">GMT+2 (Le Caire)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currency" className="text-white mb-2 block">Devise</Label>
                <Select defaultValue="dzd">
                  <SelectTrigger className="rounded-xl bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dzd">DZD (Dinar Algérien)</SelectItem>
                    <SelectItem value="eur">EUR (Euro)</SelectItem>
                    <SelectItem value="usd">USD (Dollar US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-red-500/20 rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl text-red-400 mb-4">Zone de danger</h2>
            <p className="text-gray-400 mb-6">Ces actions sont irréversibles. Veuillez procéder avec prudence.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Désactiver le compte</p>
                  <p className="text-sm text-gray-400">Votre compte sera temporairement désactivé</p>
                </div>
                <Button variant="outline" className="bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20 rounded-xl">
                  Désactiver
                </Button>
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">Supprimer le compte</p>
                  <p className="text-sm text-gray-400">Suppression définitive de toutes vos données</p>
                </div>
                <Button variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl">
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Confirm Dialog */}
      <ConfirmDialog />
    </div>
  );
}
