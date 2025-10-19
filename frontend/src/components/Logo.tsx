import { LogoIcon as LogoSVG } from './LogoIcon';

interface LogoProps {
  variant?: 'default' | 'icon-only' | 'text-only' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export function Logo({ 
  variant = 'default', 
  size = 'md', 
  showTagline = true,
  className = '' 
}: LogoProps) {
  
  // Size configurations
  const sizes = {
    sm: {
      iconContainer: 'w-9 h-9',
      icon: 18,
      textMain: 'text-base',
      textDZ: 'text-base',
      tagline: 'text-[9px]',
    },
    md: {
      iconContainer: 'w-12 h-12',
      icon: 22,
      textMain: 'text-xl',
      textDZ: 'text-xl',
      tagline: 'text-[10px]',
    },
    lg: {
      iconContainer: 'w-16 h-16',
      icon: 28,
      textMain: 'text-3xl',
      textDZ: 'text-3xl',
      tagline: 'text-xs',
    },
    xl: {
      iconContainer: 'w-24 h-24',
      icon: 40,
      textMain: 'text-5xl',
      textDZ: 'text-5xl',
      tagline: 'text-sm',
    },
  };

  const currentSize = sizes[size];

  // Icon component
  const LogoIconContainer = () => (
    <div className={`${currentSize.iconContainer} bg-gradient-to-br from-[#FF6B35] via-[#F7931E] to-[#FF6B35] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF6B35]/30 relative overflow-hidden group transition-all duration-300 hover:shadow-[#FF6B35]/50 hover:scale-105`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7931E] via-[#FF6B35] to-[#F7931E] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-full top-0 block h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 group-hover:animate-shine"></div>
      </div>
      
      {/* Logo content */}
      <div className="relative z-10 flex items-center justify-center">
        <LogoSVG size={currentSize.icon * 1.8} className="text-white" />
      </div>
    </div>
  );

  // Text component
  const LogoText = () => (
    <div className="flex flex-col">
      <div className={`${currentSize.textMain} tracking-tight flex items-center gap-1`}>
        <span className="text-white font-semibold">AutoServe</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] font-bold">DZ</span>
      </div>
      {showTagline && (
        <span className={`${currentSize.tagline} text-gray-400 -mt-1 tracking-wide uppercase`}>
          Services Automobiles Pro
        </span>
      )}
    </div>
  );

  // Render based on variant
  if (variant === 'icon-only') {
    return (
      <div className={className}>
        <LogoIconContainer />
      </div>
    );
  }

  if (variant === 'text-only') {
    return (
      <div className={className}>
        <LogoText />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <LogoIconContainer />
        <div className={`${currentSize.textMain} tracking-tight flex items-center gap-1`}>
          <span className="text-white font-semibold">AutoServe</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] font-bold">DZ</span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIconContainer />
      <LogoText />
    </div>
  );
}

// Animation CSS to be added to globals.css
export const logoAnimationStyles = `
@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

.animate-shine {
  animation: shine 1.5s ease-in-out;
}
`;
