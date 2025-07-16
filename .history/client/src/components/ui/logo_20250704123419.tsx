import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  showText?: boolean;
}

export function Logo({ className, variant = "default", showText = true }: LogoProps) {
  const fillColor = variant === "white" ? "#ffffff" : "#156A39"; // Green color from our theme

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
        {/* Background circle */}
        <circle cx="60" cy="60" r="60" fill="#E6F4EA" />
        
        {/* Soccer player silhouette */}
        <path
          d="M40 75C40 75 38 67 45 62C52 57 55 53 55 45C55 37 60 35 65 35C70 35 75 40 75 45C75 50 70 55 70 62C70 69 75 72 80 75C85 78 85 85 85 85"
          stroke={fillColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Soccer ball */}
        <circle cx="50" cy="85" r="12" fill="white" stroke={fillColor} strokeWidth="2" />
        <path
          d="M45 78L55 92M42 85H58M50 78V92"
          stroke={fillColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Hunter's crosshair/target */}
        <circle cx="65" cy="50" r="15" stroke="#FF5722" strokeWidth="2" strokeDasharray="2 2" />
        <circle cx="65" cy="50" r="2" fill="#FF5722" />
        <path
          d="M65 35V40M65 60V65M50 50H55M75 50H80"
          stroke="#FF5722"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      
      {showText && (
        <div className={cn("flex flex-col", variant === "white" ? "text-white" : "text-primary")}>
          <span className="text-xl font-bold leading-none tracking-tight">Soccer Hunter</span>
          <span className="text-xs font-medium">منصة تسويق لاعبين ومدربين كرة القدم</span>
        </div>
      )}
    </div>
  );
}