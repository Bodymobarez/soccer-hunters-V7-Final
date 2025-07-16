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
            d="M15,20 L105,20 Q115,20 115,30 L115,60 Q115,90 60,115 Q5,90 5,60 L5,30 Q5,20 15,20 Z"
            fill="#E8E2B7"
            stroke="#D4D4AA"
            strokeWidth="3"
          />
          
          {/* الدرع الداخلي الأخضر الفاتح */}
          <path
            d="M20,25 L100,25 Q110,25 110,35 L110,60 Q110,85 60,110 Q10,85 10,60 L10,35 Q10,25 20,25 Z"
            fill="#22C55E"
            stroke="#16A34A"
            strokeWidth="2"
          />
          
          {/* الدرع الداخلي الأخضر الداكن */}
          <path
            d="M25,30 L95,30 Q105,30 105,40 L105,60 Q105,80 60,105 Q15,80 15,60 L15,40 Q15,30 25,30 Z"
            fill="#16A34A"
            stroke="#15803D"
            strokeWidth="1"
          />
          
          {/* أوراق النخيل اليسرى العلوية */}
          <path
            d="M25,40 Q35,25 45,35 Q50,40 45,45 Q35,50 30,45 Q20,40 25,35"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          {/* أوراق النخيل اليسرى السفلية */}
          <path
            d="M30,45 Q40,30 50,40 Q55,45 50,50 Q40,55 35,50 Q25,45 30,40"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          
          {/* أوراق النخيل اليمنى العلوية */}
          <path
            d="M95,40 Q85,25 75,35 Q70,40 75,45 Q85,50 90,45 Q100,40 95,35"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          {/* أوراق النخيل اليمنى السفلية */}
          <path
            d="M90,45 Q80,30 70,40 Q65,45 70,50 Q80,55 85,50 Q95,45 90,40"
            fill="#FFFFFF"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
          
          {/* كرة القدم الرئيسية */}
          <circle
            cx="60"
            cy="55"
            r="20"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          
          {/* أقسام كرة القدم - الشكل الخماسي المركزي */}
          <path
            d="M60,35 L75,45 L70,65 L50,65 L45,45 Z"
            fill="#E8E2B7"
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          
          {/* الأقسام الجانبية */}
          <path
            d="M45,45 L50,65 L42,60 L38,50 Z"
            fill="#E8E2B7"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <path
            d="M75,45 L70,65 L78,60 L82,50 Z"
            fill="#E8E2B7"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          
          {/* النص "SOCCER" */}
          <text
            x="60"
            y="82"
            textAnchor="middle"
            fill="#E8E2B7"
            fontSize="7"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            letterSpacing="1px"
          >
            SOCCER
          </text>
          
          {/* النص "HUNTERS" */}
          <text
            x="60"
            y="95"
            textAnchor="middle"
            fill="#22C55E"
            fontSize="10"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            letterSpacing="1px"
          >
            HUNTERS
          </text>
          
          {/* قاعدة الدرع المثلثية */}
          <path
            d="M45,100 L75,100 L60,110 Z"
            fill="#15803D"
            stroke="#14532D"
            strokeWidth="1"
          />
        </svg>
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