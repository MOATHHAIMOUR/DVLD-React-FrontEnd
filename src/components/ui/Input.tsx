import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps {
  className?: string; // Optional if you want to allow for missing className
}

const Input = forwardRef(
  (
    { className, ...rest }: InputHTMLAttributes<HTMLInputElement> & IProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className={`border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 text-md w-full bg-transparent ${className}`}
        {...rest}
      />
    );
  }
);

export default Input;
