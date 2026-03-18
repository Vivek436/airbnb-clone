import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const CustomToast = ({ message, type }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl shadow-lg text-white ${bgColor} min-w-[280px] animate-slideIn`}
    >
      <span className="text-sm font-medium">{message}</span>

      <IoClose
        className="cursor-pointer text-xl hover:scale-110 transition"
        onClick={() => toast.dismiss()}
      />
    </div>
  );
};

export const showSuccess = (message) => {
  toast.custom((t) => <CustomToast message={message} type="success" />);
};

export const showError = (message) => {
  toast.custom((t) => <CustomToast message={message} type="error" />);
};

export const showInfo = (message) => {
  toast.custom((t) => <CustomToast message={message} type="info" />);
};
