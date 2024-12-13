interface IProps {
  message: string;
  className?: string;
}

const ErrorMsg = ({ message, className }: IProps) => {
  return (
    <p
      className={`text-red-600 font-semibold text-sm flex-shrink-0 ${className}`}
    >
      {message}
    </p>
  );
};

export default ErrorMsg;
