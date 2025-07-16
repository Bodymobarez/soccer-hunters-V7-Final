import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

/**
 * لوجو موقع السوكر هانتر - الصورة الأصلية من public/Soccer.png
 */
export const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  withText = true,
}) => {
  const { t } = useTranslation();
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
    <div
      className={cn(
        "relative flex items-center justify-center soccer-field-gradient rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20",
        getSizeClass(),
      )}
    >
      <div className="text-white text-center relative">
        <div className="text-lg font-bold animate-pulse">⚽</div>
        <div className="text-xs font-bold leading-none absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white/20 px-1 rounded text-[8px]">
          SH
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative p-2 rounded-xl hover:shadow-lg transition-all duration-300",
          getSizeClass(),
        )}
      >
        {!imageError ? (
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F736a29cbb4df45b5aa76031004ac481f%2Fd95af2937bd5478b99a5a89228284f2d?format=webp&width=800"
            alt="Soccer Hunters Logo"
            className={cn(
              "object-contain rounded-lg drop-shadow-md",
              getSizeClass(),
            )}
            style={{
              imageRendering: "crisp-edges",
              filter: "brightness(1.1) contrast(1.1)",
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <FallbackLogo />
        )}
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent font-bold text-xl tracking-tight hover:scale-105 transition-transform duration-300 drop-shadow-sm">
            Soccer Hunters
          </span>
          <span className="text-xs bg-gradient-to-r from-secondary/80 to-accent/80 bg-clip-text text-transparent font-medium -mt-1">
            {t("tagline")}
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
