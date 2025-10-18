import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

type UserRole = 'client' | 'provider' | 'admin';

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.emailOrPhone || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo: accept any email/password and redirect to dashboard
      // In production, validate credentials with backend
      if (formData.emailOrPhone && formData.password) {
        window.location.hash = 'dashboard';
      } else {
        setError('Email ou mot de passe incorrect');
      }
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Handle Google OAuth
    console.log('Google login clicked');
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'client':
        return 'Client';
      case 'provider':
        return 'Prestataire';
      case 'admin':
        return 'Administrateur';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0077FF] rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">A</span>
              </div>
              <span className="text-xl text-[#0077FF] tracking-tight">
                AutoServe <span className="text-[#1E1E1E]">DZ</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl text-[#1E1E1E] mb-3">
              Bienvenue sur AutoServe DZ
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Connectez-vous pour accéder à vos services auto, où que vous soyez 🚗
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Role Selector */}
            <div className="mb-6">
              <Label className="mb-3 block text-center">Type de compte</Label>
              <Tabs
                value={selectedRole}
                onValueChange={(value: string) => setSelectedRole(value as UserRole)}
              >
                <TabsList className="grid w-full grid-cols-3 bg-[#F5F7FA]">
                  <TabsTrigger value="client" className="data-[state=active]:bg-[#0077FF] data-[state=active]:text-white">
                    Client
                  </TabsTrigger>
                  <TabsTrigger value="provider" className="data-[state=active]:bg-[#0077FF] data-[state=active]:text-white">
                    Prestataire
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-[#0077FF] data-[state=active]:text-white">
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </motion.div>
              )}

              {/* Email/Phone Input */}
              <div>
                <Label htmlFor="emailOrPhone">Email ou numéro de téléphone *</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="emailOrPhone"
                    type="text"
                    placeholder="exemple@email.com ou 0555123456"
                    value={formData.emailOrPhone}
                    onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
                    className="pl-11 rounded-xl h-12"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <a
                    href="#forgot-password"
                    className="text-sm text-[#0077FF] hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Entrez votre mot de passe"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-11 pr-11 rounded-xl h-12"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked: boolean | 'indeterminate' | undefined) =>
                    setRememberMe(checked === true)
                  }
                />
                <Label htmlFor="rememberMe" className="cursor-pointer text-sm">
                  Se souvenir de moi
                </Label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-xl h-12 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl h-12 border-gray-300 hover:bg-gray-50"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuer avec Google
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Pas encore de compte ?{' '}
                <a
                  href="#register"
                  className="text-[#0077FF] hover:underline"
                >
                  Créer un compte maintenant
                </a>
              </p>
            </div>
          </div>

          {/* Support Link */}
          <div className="mt-6 text-center">
            <a
              href="#support"
              className="text-sm text-gray-500 hover:text-[#0077FF] transition-colors"
            >
              Besoin d'assistance ? Contactez le support
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 AutoServe DZ. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
