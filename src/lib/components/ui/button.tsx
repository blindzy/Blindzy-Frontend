import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-md transition outline-none rounded-full shrink-0 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary:
          "bg-[--primary] text-[--white] hover:bg-transparent hover:text-[--Black] border border-[--primary] hover:border-[--Black]",
        outline:
          "border border-[--white] bg-transparent text-[--white] hover:bg-[--primary] hover:border-[--primary]",
        outline_white:
          "border border-[--white] bg-transparent text-[--white] hover:bg-[--white] hover:border-[--white] hover:text-[--Black]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        light:
          "bg-[--white] text-[--Black] hover:text-[--white] hover:bg-[--primary] border border-[--Black] hover:border-[--white] rounded-full shrink-0",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        smallest: "py-3 px-6 text-sm",
        small: "xl:py-[0.625vw] py-3 xl:px-[0.833vw] px-4",
        large: "xl:py-[0.833vw] py-4 xl:px-[1.667vw] px-8",
        lg: "xl:size-[2.083vw] size-[40px] rounded-[10px] text-[18px]",
        xl: "xl:size-[2.917vw] sm:size-[3.987vw] size-[9.091vw] rounded-[10px] text-[18px]",
        xxl: "xl:size-[4.167vw] sm:size-[6.25vw] size-[12.727vw] rounded-[10px] sm:text-[24px] text-[18px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
