import { ReactNode, useRef } from "react";

interface IProps {
  children: ReactNode;
  title?: string;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, children, title, onClose }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  function HandleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // close Modal if the event occur outside the Modal
    if (ref.current && !ref.current?.contains(e.target as Node)) {
      onClose();
    }
  }

  if (!isOpen) return null;
  return (
    <div
      onClick={(e) => HandleClose(e)}
      className="fixed inset-0 z-0 h-screen w-screen backdrop-blur-sm "
    >
      <div
        ref={ref}
        className="p-6 bg-white rounded-lg border-2 border-black shadow-lg max-w-md mx-auto text-center absolute z-40 left-[58%] top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-2xl font-semibold mb-4 text-red-700">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
