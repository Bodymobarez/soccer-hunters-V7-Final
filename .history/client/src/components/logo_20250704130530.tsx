import React from "react";
import { cn } from "@/lib/utils";
import { useSimpleTranslate } from "@/hooks/use-simple-translate";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

/**
 * لوجو موقع السوكر هانتر - يتضمن الدرع الأخضر مع كرة القدم وأوراق النخيل
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
        {/* SVG لوجو السوكر هانتر الجديد */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          className={cn("text-primary", getSizeClass())}
        >
          {/* الدرع الخارجي - إطار بيج */}
          <path
            d="M15,25 L105,25 Q115,25 115,35 L115,65 Q115,95 60,115 Q5,95 5,65 L5,35 Q5,25 15,25 Z"
            fill="#D4D4AA"
            stroke="#B8B894"
            strokeWidth="2"
          />
          
          {/* الدرع الداخلي الأخضر */}
          <path
            d="M20,30 L100,30 Q110,30 110,40 L110,65 Q110,90 60,110 Q10,90 10,65 L10,40 Q10,30 20,30 Z"
            fill="#22C55E"
            stroke="#16A34A"
            strokeWidth="2"
          />
          
          {/* الدرع الداخلي الأخضر الداكن */}
          <path
            d="M25,35 L95,35 Q105,35 105,45 L105,65 Q105,85 60,105 Q15,85 15,65 L15,45 Q15,35 25,35 Z"
            fill="#16A34A"
            stroke="#15803D"
            strokeWidth="1"
          />
          
          {/* أوراق النخيل اليسرى */}
          <path
            d="M25,45 Q30,35 35,40 Q40,45 35,50 Q30,55 25,50 Q20,45 25,40"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          <path
            d="M30,50 Q35,40 40,45 Q45,50 40,55 Q35,60 30,55 Q25,50 30,45"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          
          {/* أوراق النخيل اليمنى */}
          <path
            d="M95,45 Q90,35 85,40 Q80,45 85,50 Q90,55 95,50 Q100,45 95,40"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          <path
            d="M90,50 Q85,40 80,45 Q75,50 80,55 Q85,60 90,55 Q95,50 90,45"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          
          {/* كرة القدم */}
          <circle
            cx="60"
            cy="55"
            r="18"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          
          {/* أقسام كرة القدم */}
          <path
            d="M60,37 L75,47 L69,68 L51,68 L45,47 Z"
            fill="#D4D4AA"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <path
            d="M45,47 L51,68 L45,62 L42,52 Z"
            fill="#D4D4AA"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <path
            d="M75,47 L69,68 L75,62 L78,52 Z"
            fill="#D4D4AA"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <path
            d="M60,37 L45,47 L48,42 Z"
            fill="#D4D4AA"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <path
            d="M60,37 L75,47 L72,42 Z"
            fill="#D4D4AA"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          
          {/* النص "SOCCER" */}
          <text
            x="60"
            y="85"
            textAnchor="middle"
            fill="#D4D4AA"
            fontSize="8"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            SOCCER
          </text>
          
          {/* قاعدة الدرع */}
          <path
            d="M45,95 L75,95 L70,105 L50,105 Z"
            fill="#16A34A"
            stroke="#15803D"
            strokeWidth="1"
          />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col">
          <span className="bg-gradient-to-l from-green-600 to-green-800 bg-clip-text text-transparent font-bold text-xl">
            Soccer Hunters
          </span>
          <span className="text-xs text-gray-500 -mt-1">{t("tagline")}</span>
        </div>
      )}
    </div>
  );
};

export default Logo;