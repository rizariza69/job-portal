import { useEffect } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Notification({
  message,
  onClose,
  position = "bottom-left",
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getPositionClass = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-5 left-5";
      case "bottom-right":
        return "bottom-5 right-5";
      case "top-left":
        return "top-5 left-5";
      default:
        return "top-5 right-5";
    }
  };

  return (
    <div
      className={`fixed ${getPositionClass()} bg-white border border-gray-200 rounded-lg shadow-lg flex items-center px-4 py-3 w-[280px] md:w-[320px] animate-fade-in`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center flex-grow">
        <CheckCircleIcon className="w-5 h-5 text-teal-500 mr-2" />
        <span className="text-sm text-gray-800">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
