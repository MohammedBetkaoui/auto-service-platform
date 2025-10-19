import { motion } from 'motion/react';

interface NotificationBadgeProps {
  count?: number;
  showDot?: boolean;
}

export function NotificationBadge({ count = 0, showDot = false }: NotificationBadgeProps) {
  if (!showDot && count === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 flex items-center justify-center"
    >
      {showDot ? (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7931E]"></span>
        </span>
      ) : (
        <span className="flex items-center justify-center min-w-[18px] h-[18px] text-[10px] bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-full px-1 shadow-lg shadow-[#FF6B35]/50">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </motion.div>
  );
}
