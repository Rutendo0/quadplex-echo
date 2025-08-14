import React from 'react';
import ashumiLogoImage from "@assets/screenshot-1755185861498_1755186818280.png";

interface AshumiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AshumiLogo: React.FC<AshumiLogoProps> = ({ 
  className = "", 
  size = "md"
}) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16",
    xl: "h-24"
  };

  return (
    <div className={`${className}`}>
      <img 
        src={ashumiLogoImage} 
        alt="Ashumi Estates" 
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </div>
  );
};

export default AshumiLogo;