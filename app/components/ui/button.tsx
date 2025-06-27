import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:brightness-110 hover:scale-[1.03] transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-button hover:shadow-[0_0_6px_rgba(50,119,245,0.3)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-launchlayer-accent text-white hover:bg-launchlayer-accent/90 shadow-button hover:shadow-[0_0_6px_rgba(50,119,245,0.3)]",
        mint: "bg-launchlayer-mint text-white hover:bg-launchlayer-mint/90 shadow-button hover:shadow-[0_0_6px_rgba(99,206,198,0.3)]",
        violet: "bg-launchlayer-violet text-white hover:bg-launchlayer-violet/90 shadow-violet hover:shadow-[0_0_6px_rgba(167,139,250,0.3)]",
        step: "rounded-full px-4 py-2 font-medium",
        stepActive: "rounded-full px-4 py-2 bg-launchlayer-accent text-white font-medium",
        stepCompleted: "rounded-full px-4 py-2 bg-launchlayer-violet text-white font-medium",
        stepInactive: "rounded-full px-4 py-2 border border-gray-600 text-gray-400 font-medium",
        back: "border border-launchlayer-mint text-launchlayer-mint hover:bg-launchlayer-mint/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        wide: "h-11 px-10 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants }; 