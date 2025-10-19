interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 24, className = '' }: LogoIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main car body */}
      <path 
        d="M38 32H10C7.79086 32 6 30.2091 6 28V18L10 12H38L42 18V28C42 30.2091 40.2091 32 38 32Z" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Windshield separator */}
      <path 
        d="M6 18H42" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      
      {/* Left wheel */}
      <circle 
        cx="14" 
        cy="32" 
        r="4" 
        fill="currentColor"
      />
      <circle 
        cx="14" 
        cy="32" 
        r="2" 
        fill="white" 
        opacity="0.3"
      />
      
      {/* Right wheel */}
      <circle 
        cx="34" 
        cy="32" 
        r="4" 
        fill="currentColor"
      />
      <circle 
        cx="34" 
        cy="32" 
        r="2" 
        fill="white" 
        opacity="0.3"
      />
      
      {/* Windshield details */}
      <path 
        d="M14 18L17 12" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <path 
        d="M34 18L31 12" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      
      {/* Door handle accents */}
      <path 
        d="M20 24H22" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M26 24H28" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Shine effect */}
      <path 
        d="M12 14L14 16" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        opacity="0.6"
      />
    </svg>
  );
}
