import { ElementType, InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps {
  className?: string;
  PrefixIcon?: ElementType;
}

const Input = forwardRef(
  (
    {
      className = "",
      PrefixIcon,
      ...rest
    }: InputHTMLAttributes<HTMLInputElement> & IProps,
    ref: Ref<HTMLInputElement>
  ) => {
    if (PrefixIcon) {
      return (
        <div className="flex items-center border border-gray-300 shadow-lg focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 rounded-lg bg-transparent">
          <span className="px-3 text-gray-500 flex items-center ">
            <PrefixIcon size={20} className={"text-primary"} />
          </span>
          <input
            ref={ref}
            className={`text-black flex-1 text-md w-full bg-transparent py-2 focus:outline-none ${className}`}
            {...rest}
          />
        </div>
      );
    } else {
      return (
        <input
          ref={ref}
          className={`text-black  text-md w-full bg-transparent border-[1px] border-gray-300 shadow-lg rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${className}`}
          {...rest}
        />
      );
    }
  }
);

export default Input;
