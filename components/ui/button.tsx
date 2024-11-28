import * as React from "react";
import { Button as RadixButton } from "@radix-ui/themes";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof RadixButton> {
  variant?: "solid" | "soft" | "outline" | "ghost";
  size?: "1" | "2" | "3" | "4";
}

const Button = React.forwardRef<
  React.ElementRef<typeof RadixButton>,
  ButtonProps
>(({ className, variant = "solid", size = "2", ...props }, ref) => (
  <RadixButton
    ref={ref}
    variant={variant}
    size={size}
    className={cn(
      "transition-colors focus-visible:outline-none focus-visible:ring-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));

Button.displayName = "Button";

export { Button };
