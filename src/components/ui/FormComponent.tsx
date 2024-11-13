import { ReactNode, FormHTMLAttributes } from "react";

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string; // Optional if you want to make it optional
}

const FormComponent = ({ children, className, ...rest }: IProps) => {
  return (
    <form className={className} {...rest}>
      {children}
    </form>
  );
};

export default FormComponent;
