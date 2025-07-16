import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSimpleTranslate } from "@/hooks/use-simple-translate";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

/**
 * لوجو موقع السوكر هانتر - الصورة الأصلية من public/soccer.png
 */
export const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  withText = true,
}) => {
  const { t } = useSimpleTranslate();
  const [imageError, setImageError] = useState(false);
  
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-12 w-12";
      case "lg":
        return "h-24 w-24";
      case "md":
      default:
        return "h-16 w-16";
    }
  };
  
  const getTextSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-lg md:text-xl";
      case "lg":
        return "text-2xl md:text-3xl";
      case "md":
      default:
        return "text-xl md:text-2xl";
    }
  };

  // لوجو احتياطي في حالة عدم وجود الصورة الأصلية
  const FallbackLogo = () => (
    <div className={cn("relative flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-lg", getSizeClass())}>
      <div className="text-white text-center">
        <div className="text-xs font-bold">⚽</div>
        <div className="text-[8px] font-bold leading-none">SH</div>
      </div>
    </div>
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", getSizeClass())}>
        {!imageError ? (
          <img
            src="/soccer.png"
            alt="Soccer Hunters Logo"
            className={cn("object-contain", getSizeClass())}
            style={{ 
              imageRendering: 'crisp-edges'
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <FallbackLogo />
        )}
      </div>
      
      {withText && (
        <div className="flex flex-col">
          <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent font-bold text-xl">
            Soccer Hunters
          </span>
          <span className="text-xs text-gray-500 -mt-1">{t("tagline")}</span>
        </div>
      )}
    </div>
  );
};

export default Logo;