import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  variant?: Variant;
} & ComponentProps<"button">;

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        variantStyles(variant),
        "rounded-md p-2 cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
    />
  );
};

// Gets buttons styles
function variantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-blue-500 hover:bg-blue-600";
    case "secondary":
      return "bg-zinc-700 text-zinc-400 hover:bg-zinc-600";
    case "ghost":
      return "bg-transparent text-red-800 hover:text-red-400";
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }
}
