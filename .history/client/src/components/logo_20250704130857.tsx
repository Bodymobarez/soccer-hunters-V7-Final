import React from "react";
import { cn } from "@/lib/utils";
import { useSimpleTranslate } from "@/hooks/use-simple-translate";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

/**
 * لوجو موقع السوكر هانتر - الصورة الأصلية
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
        {/* استخدام الصورة الأصلية للوجو */}
        <img
          src="/images/soccer-hunters-logo.png"
          alt="Soccer Hunters Logo"
          className={cn("object-contain", getSizeClass())}
          onError={(e) => {
            // في حالة عدم وجود الصورة، استخدم SVG بسيط
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `
              <div class="bg-green-600 text-white rounded-full flex items-center justify-center ${getSizeClass()}">
                <span class="text-xs font-bold">SH</span>
              </div>
            `;
          }}
        />
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