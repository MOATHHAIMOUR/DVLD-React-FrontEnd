import { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { tailwindCMerge } from "../../utils";

const buttonVariants = cva(
  "inline-flex items-center rounded-md font-semibold",
  {
    variants: {
      variant: {
        primary: "bg-white dark:bg-black",
        outline: "",
      },
      size: {
        base: "px-4 text-base",
        xs: "px-2 text-xs",
      },
      fullWidth: {
        true: "w-full justify-center",
      },
    },

    defaultVariants: {
      variant: "outline",
    },
  }
);

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  error?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

const Button = ({
  isLoading,
  className,
  children,
  type,
  error,
  size,
  fullWidth,
  disabled,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} ${
        error || isLoading || disabled ? "cursor-not-allowed" : ""
      }  flex items-center justify-center ${tailwindCMerge(
        buttonVariants({
          variant,
          size,
          fullWidth,
        })
      )}`}
      {...props}
      disabled={isLoading || error || disabled}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {children}
    </button>
  );
};

export default Button;
