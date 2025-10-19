import { motion } from 'motion/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { AlertTriangle, Trash2, Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export type ConfirmDialogType = 'danger' | 'warning' | 'info' | 'success';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmDialogType;
  isLoading?: boolean;
}

const typeConfig = {
  danger: {
    icon: Trash2,
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
    confirmBg: 'bg-red-500 hover:bg-red-600',
    borderColor: 'border-red-500/20',
    glowColor: 'from-red-500/20 to-red-600/20',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
    confirmBg: 'bg-yellow-500 hover:bg-yellow-600',
    borderColor: 'border-yellow-500/20',
    glowColor: 'from-yellow-500/20 to-yellow-600/20',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    confirmBg: 'bg-blue-500 hover:bg-blue-600',
    borderColor: 'border-blue-500/20',
    glowColor: 'from-blue-500/20 to-blue-600/20',
  },
  success: {
    icon: CheckCircle,
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    confirmBg: 'bg-green-500 hover:bg-green-600',
    borderColor: 'border-green-500/20',
    glowColor: 'from-green-500/20 to-green-600/20',
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'warning',
  isLoading = false,
}: ConfirmDialogProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#1a1a1a] border-white/10 max-w-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Icon Header */}
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className={`w-16 h-16 rounded-full ${config.iconBg} flex items-center justify-center relative`}
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.glowColor} blur-xl`}
              />
              
              <Icon className={`${config.iconColor} relative z-10`} size={32} />
            </motion.div>
          </div>

          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-center text-xl">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-center mt-2">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6 flex-col sm:flex-row gap-3">
            <AlertDialogCancel
              disabled={isLoading}
              className="bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 transition-all duration-200 w-full sm:w-auto"
            >
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              disabled={isLoading}
              className={`${config.confirmBg} text-white hover:shadow-lg transition-all duration-200 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Chargement...</span>
                </div>
              ) : (
                confirmText
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Hook helper pour utiliser facilement le ConfirmDialog
export function useConfirmDialog() {
  const [dialogState, setDialogState] = React.useState<{
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmDialogType;
    onConfirm: () => void | Promise<void>;
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const showConfirm = (options: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmDialogType;
    onConfirm: () => void | Promise<void>;
  }) => {
    setDialogState({
      open: true,
      ...options,
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await dialogState.onConfirm();
      setDialogState({ ...dialogState, open: false });
    } catch (error) {
      console.error('Confirmation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      open={dialogState.open}
      onOpenChange={(open) => setDialogState({ ...dialogState, open })}
      onConfirm={handleConfirm}
      title={dialogState.title}
      description={dialogState.description}
      confirmText={dialogState.confirmText}
      cancelText={dialogState.cancelText}
      type={dialogState.type}
      isLoading={isLoading}
    />
  );

  return {
    showConfirm,
    ConfirmDialog: ConfirmDialogComponent,
  };
}

// Import React for the hook
import React from 'react';
