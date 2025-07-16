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
        src="/images/soccer-hunters-logo.svg"
        alt="Soccer Hunters Logo"
        className="h-10 w-10 object-contain"
        onError={(e) => {
          // في حالة عدم وجود الصورة، استخدم بديل بسيط
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = target.parentElement!.innerHTML + `
            <div class="h-10 w-10 bg-green-600 text-white rounded-full flex items-center justify-center">
              <span class="text-xs font-bold">SH</span>
            </div>
          `;
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