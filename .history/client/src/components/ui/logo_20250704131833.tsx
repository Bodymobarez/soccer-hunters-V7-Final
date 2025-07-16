import { cn } from "@/lib/utils";
import { useState } from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  showText?: boolean;
}

export function Logo({ className, variant = "default", showText = true }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  // لوجو احتياطي
  const FallbackLogo = () => (
    <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-lg">
      <div className="text-white text-center">
        <div className="text-xs font-bold">⚽</div>
        <div className="text-[6px] font-bold leading-none">SH</div>
      </div>
    </div>
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {!imageError ? (
        <img
          src="/soccer.png"
          alt="Soccer Hunters Logo"
          className="h-10 w-10 object-contain"
          style={{ 
            imageRendering: 'crisp-edges'
          }}
          onError={() => setImageError(true)}
        />
      ) : (
        <FallbackLogo />
      )}
      
      {showText && (
        <div className={cn("flex flex-col", variant === "white" ? "text-white" : "text-primary")}>
          <span className="text-xl font-bold leading-none tracking-tight">Soccer Hunters</span>
          <span className="text-xs font-medium">منصة تسويق لاعبين ومدربين كرة القدم</span>
        </div>
      )}
    </div>
  );
}