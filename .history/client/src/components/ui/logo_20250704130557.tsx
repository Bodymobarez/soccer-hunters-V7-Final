import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  showText?: boolean;
}

export function Logo({ className, variant = "default", showText = true }: LogoProps) {
  const fillColor = variant === "white" ? "#ffffff" : "#16A34A"; // Green color matching the new design
  const accentColor = variant === "white" ? "#f3f4f6" : "#D4D4AA"; // Beige accent color

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
      >
        {/* الدرع الخارجي - إطار بيج */}
        <path
          d="M15,25 L105,25 Q115,25 115,35 L115,65 Q115,95 60,115 Q5,95 5,65 L5,35 Q5,25 15,25 Z"
          fill={accentColor}
          stroke={variant === "white" ? "#e5e7eb" : "#B8B894"}
          strokeWidth="2"
        />
        
        {/* الدرع الداخلي الأخضر */}
        <path
          d="M20,30 L100,30 Q110,30 110,40 L110,65 Q110,90 60,110 Q10,90 10,65 L10,40 Q10,30 20,30 Z"
          fill={variant === "white" ? "#ffffff" : "#22C55E"}
          stroke={fillColor}
          strokeWidth="2"
        />
        
        {/* الدرع الداخلي الأخضر الداكن */}
        <path
          d="M25,35 L95,35 Q105,35 105,45 L105,65 Q105,85 60,105 Q15,85 15,65 L15,45 Q15,35 25,35 Z"
          fill={fillColor}
          stroke={variant === "white" ? "#d1d5db" : "#15803D"}
          strokeWidth="1"
        />
        
        {/* أوراق النخيل اليسرى */}
        <path
          d="M25,45 Q30,35 35,40 Q40,45 35,50 Q30,55 25,50 Q20,45 25,40"
          fill={variant === "white" ? "#f9fafb" : "#FFFFFF"}
          stroke={variant === "white" ? "#e5e7eb" : "#F3F4F6"}
          strokeWidth="1"
        />
        <path
          d="M30,50 Q35,40 40,45 Q45,50 40,55 Q35,60 30,55 Q25,50 30,45"
          fill={variant === "white" ? "#f9fafb" : "#FFFFFF"}
          stroke={variant === "white" ? "#e5e7eb" : "#F3F4F6"}
          strokeWidth="1"
        />
        
        {/* أوراق النخيل اليمنى */}
        <path
          d="M95,45 Q90,35 85,40 Q80,45 85,50 Q90,55 95,50 Q100,45 95,40"
          fill={variant === "white" ? "#f9fafb" : "#FFFFFF"}
          stroke={variant === "white" ? "#e5e7eb" : "#F3F4F6"}
          strokeWidth="1"
        />
        <path
          d="M90,50 Q85,40 80,45 Q75,50 80,55 Q85,60 90,55 Q95,50 90,45"
          fill={variant === "white" ? "#f9fafb" : "#FFFFFF"}
          stroke={variant === "white" ? "#e5e7eb" : "#F3F4F6"}
          strokeWidth="1"
        />
        
        {/* كرة القدم */}
        <circle
          cx="60"
          cy="55"
          r="18"
          fill={variant === "white" ? "#ffffff" : "#FFFFFF"}
          stroke={variant === "white" ? "#d1d5db" : "#E5E7EB"}
          strokeWidth="2"
        />
        
        {/* أقسام كرة القدم */}
        <path
          d="M60,37 L75,47 L69,68 L51,68 L45,47 Z"
          fill={accentColor}
          stroke={variant === "white" ? "#9ca3af" : "#9CA3AF"}
          strokeWidth="1"
        />
        <path
          d="M45,47 L51,68 L45,62 L42,52 Z"
          fill={accentColor}
          stroke={variant === "white" ? "#9ca3af" : "#9CA3AF"}
          strokeWidth="1"
        />
        <path
          d="M75,47 L69,68 L75,62 L78,52 Z"
          fill={accentColor}
          stroke={variant === "white" ? "#9ca3af" : "#9CA3AF"}
          strokeWidth="1"
        />
      </svg>
      
      {showText && (
        <div className={cn("flex flex-col", variant === "white" ? "text-white" : "text-primary")}>
          <span className="text-xl font-bold leading-none tracking-tight">Soccer Hunters</span>
          <span className="text-xs font-medium">منصة تسويق لاعبين ومدربين كرة القدم</span>
        </div>
      )}
    </div>
  );
}