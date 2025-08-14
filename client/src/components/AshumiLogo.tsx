import React from 'react';

interface AshumiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const AshumiLogo: React.FC<AshumiLogoProps> = ({ 
  className = "", 
  size = "md", 
  showText = true 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl", 
    xl: "text-4xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Ashumi Estates Icon - flowing river forming 'ae' */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg 
          viewBox="0 0 100 60" 
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* River flow forming 'a' and 'e' */}
          <path 
            d="M8 45 C8 25, 25 15, 40 25 C40 15, 50 8, 65 15 C80 22, 92 35, 92 45 C92 52, 85 55, 75 50 C70 47, 65 40, 65 35 C65 42, 55 48, 45 45 C35 42, 25 50, 15 45 C10 42, 8 40, 8 45 Z"
            fill="hsl(var(--ashumi-black-90))"
            className="drop-shadow-sm"
          />
          <path 
            d="M45 35 C50 32, 58 30, 65 35 C72 40, 75 45, 70 48 C65 45, 60 40, 58 35"
            fill="hsl(var(--ashumi-black-90))"
          />
          {/* Subtle highlight for depth */}
          <path 
            d="M12 40 C20 35, 30 38, 38 42 C45 38, 55 35, 68 40"
            stroke="hsl(var(--ashumi-black-70))" 
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span 
            className={`${textSizeClasses[size]} font-light tracking-wider`}
            style={{ color: 'hsl(var(--ashumi-black-90))' }}
          >
            ASHUMI
          </span>
          <span 
            className={`${textSizeClasses[size]} font-light tracking-wider`}
            style={{ color: 'hsl(var(--ashumi-black-70))' }}
          >
            ESTATES
          </span>
        </div>
      )}
    </div>
  );
};

export default AshumiLogo;