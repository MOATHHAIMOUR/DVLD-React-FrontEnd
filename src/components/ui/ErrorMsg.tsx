interface IProps {
  message: string;
}

const ErrorMsg = ({ message }: IProps) => {
  return <p className="text-red-600 text-sm flex-shrink-0">{message}</p>;
};

export default ErrorMsg;
