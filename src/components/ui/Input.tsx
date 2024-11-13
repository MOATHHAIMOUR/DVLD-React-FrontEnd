import { ElementType, InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps {
  className?: string; // Optional if you want to allow for missing className
  PrefixIcon?: ElementType;
}

const Input = forwardRef(
  (
    {
      className,
      PrefixIcon,
      ...rest
    }: InputHTMLAttributes<HTMLInputElement> & IProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="flex items-center border-[1px] border-gray-300 shadow-lg focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 rounded-lg bg-transparent">
        {PrefixIcon && (
          <span className="pl-3 text-gray-500">
            <PrefixIcon />
          </span>
        )}
        <input
          ref={ref}
          className={`flex-1 px-3 py-2 text-md w-full bg-transparent focus:outline-none ${className}`}
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
