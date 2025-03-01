import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Spinner from "@components/_shared/Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        danger: "border-transparent bg-red-600 hover:bg-red-400 text-white",
        success:
          "border-transparent bg-green-500 hover:bg-green-400 text-black",
        default: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-white text-primary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
        ghost: "text-gray-900 hover:text-black",
        link: "text-primary underline-offset-4 hover:underline",
        input:
          "shadow-sm w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300  disabled:bg-gray-100 ",
      },
      size: {
        default: "px-[20px] py-[10px]",
        pill: "px-5 py-2.5 rounded-full",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface LoaderButtonProps extends ButtonProps {
  loading: boolean;
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
  }
);

const LoaderButton = React.forwardRef<HTMLButtonElement, LoaderButtonProps>(
  (
    { className, variant, size, loading, children, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        {loading &&
        <Spinner className="hover:text-primary mr-2" />
        }
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, LoaderButton };
