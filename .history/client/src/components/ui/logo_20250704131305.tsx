import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  showText?: boolean;
}

export function Logo({ className, variant = "default", showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src="/images/soccer-hunters-logo.png"
        alt="Soccer Hunters Logo"
        className="h-10 w-10 object-contain"
        style={{ 
          imageRendering: 'crisp-edges'
        }}
      />
      
      {showText && (
        <div className={cn("flex flex-col", variant === "white" ? "text-white" : "text-primary")}>
          <span className="text-xl font-bold leading-none tracking-tight">Soccer Hunters</span>
          <span className="text-xs font-medium">منصة تسويق لاعبين ومدربين كرة القدم</span>
        </div>
      )}
    </div>
  );
}