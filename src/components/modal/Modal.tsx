import { useEffect } from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};
function Modal(props: ModalProps) {
  const { children, onClose, title } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="p-4 fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-gray-800 bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-md shadow-lg p-4 max-w-2xl w-full">
        {children}
      </div>
    </div>
  );
}

const withOpenModal = (WrappedComponent: React.ComponentType<any>) => {
  return function (props: ModalProps) {
    const { isOpen } = props;
    return isOpen ? <WrappedComponent {...props} /> : <></>;
  };
};

export default withOpenModal(Modal);
