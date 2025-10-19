import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface PageLoaderProps {
  onLoadComplete: () => void;
}

export function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = 100 / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadComplete, 500);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
        >
          {/* Gradient Background Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#FF6B35]/20 via-[#F7931E]/20 to-[#FF6B35]/20 rounded-full blur-[120px]"
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo with Pulsing Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full blur-3xl"
              />
              
              {/* Logo */}
              <div className="relative">
                <Logo variant="default" size="xl" className="drop-shadow-2xl" />
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-white mb-2 tracking-wide">
                Chargement en cours
              </h2>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center justify-center gap-1"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="text-gray-400"
                >
                  •
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="text-gray-400"
                >
                  •
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="text-gray-400"
                >
                  •
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-64 md:w-80"
            >
              {/* Progress Container */}
              <div className="relative">
                {/* Background */}
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  {/* Progress Fill */}
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full relative"
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>

                {/* Progress Percentage */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2"
                >
                  <span className="text-sm text-transparent bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text font-medium">
                    {Math.round(progress)}%
                  </span>
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center text-xs text-gray-500 mt-6"
              >
                Votre solution automobile mobile en Algérie
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top Left Glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-20 -left-20 w-64 h-64 bg-[#FF6B35]/20 rounded-full blur-[100px]"
            />

            {/* Bottom Right Glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F7931E]/20 rounded-full blur-[100px]"
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
                className="absolute w-1 h-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full"
              />
            ))}
          </div>

          {/* Bottom Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-2 h-2 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full" />
              <span className="text-xs text-gray-400">AutoServe DZ</span>
              <div className="w-2 h-2 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
