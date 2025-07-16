import React from "react";
import { cn } from "@/lib/utils";
import { useSimpleTranslate } from "@/hooks/use-simple-translate";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

/**
 * لوجو موقع السوكر هانتر - يتضمن رمز لبندقية تصويب على قميص لاعب كرة قدم
 */
export const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  withText = true,
}) => {
  const { t } = useSimpleTranslate();
  
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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", getSizeClass())}>
        {/* SVG لوجو السوكر هانتر */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          className={cn("text-primary", getSizeClass())}
        >
          {/* الدرع الخلفي */}
          <path
            d="M20,20 L100,20 Q110,20 110,30 L110,60 Q110,90 60,110 Q10,90 10,60 L10,30 Q10,20 20,20 Z"
            fill="#0c4a6e"
            fillOpacity="0.3"
            stroke="#0c4a6e"
            strokeWidth="3"
          />
          
          {/* الكرة - دائرة داخلية أكبر */}
          <circle
            cx="60"
            cy="70"
            r="30"
            fill="#0c4a6e"
            stroke="#000"
            strokeWidth="1"
          />
          
          {/* أقسام الكرة */}
          <path
            d="M60,40 L85,55 L77,90 L43,90 L35,55 Z"
            fill="white"
            stroke="#000"
            strokeWidth="1"
          />
          <path
            d="M35,55 L43,90 L35,80 L25,60 Z"
            fill="white"
            stroke="#000"
            strokeWidth="1"
          />
          <path
            d="M85,55 L77,90 L85,80 L95,60 Z"
            fill="white"
            stroke="#000"
            strokeWidth="1"
          />
          
          {/* قميص اللاعب */}
          <path 
            d="M40,30 L80,30 L75,60 L65,55 L60,70 L55,55 L45,60 Z" 
            fill="#f8fafc" 
            stroke="#000" 
            strokeWidth="1"
          />
          
          {/* بندقية التصويب */}
          <path 
            d="M20,50 L45,40 L43,45 L50,43 L50,47 L43,45 L45,50 Z" 
            fill="#15803d" 
            stroke="#000" 
            strokeWidth="1"
          />
          
          {/* دائرة التصويب */}
          <circle 
            cx="60" 
            cy="45" 
            r="10" 
            fill="none" 
            stroke="#f00" 
            strokeWidth="2"
            strokeDasharray="3,3"
          />
          
          {/* خطوط التصويب */}
          <line 
            x1="50" 
            y1="35" 
            x2="70" 
            y2="55" 
            stroke="#f00" 
            strokeWidth="1.5"
          />
          <line 
            x1="50" 
            y1="55" 
            x2="70" 
            y2="35" 
            stroke="#f00" 
            strokeWidth="1.5"
          />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col">
          <span className="bg-gradient-to-l from-sky-800 to-blue-950 bg-clip-text text-transparent font-bold text-xl">
            Soccer Hunter
          </span>
          <span className="text-xs text-gray-500 -mt-1">{t("tagline")}</span>
        </div>
      )}
    </div>
  );
};

export default Logo;