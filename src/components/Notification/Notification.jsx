import { BellIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const Notification = ({ message, type, isVisible, onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timeout = setTimeout(() => {
        setShow(false);
        onClose && onClose();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, message]);

  let bgColor = "";
  let iconColor = "";
  let textColor = "text-white";

  if (type === "success") {
    bgColor = "bg-green-500";
    iconColor = "text-green-600";
  } else if (type === "warning") {
    bgColor = "bg-yellow-300 text-white";
    iconColor = "text-yellow-300";
    textColor = "text-white";
  } else {
    bgColor = "bg-red-500";
    iconColor = "text-red-600";
  }

  return (
    <div className="fixed top-6 right-6 z-[999]">
      {show && (
        <div
          className={`w-full sm:w-96 flex items-center gap-4 p-4 rounded-lg shadow-lg ${bgColor} ${textColor} transition-all duration-300 animate-slide-in`}
        >
          {/* Icon trong nền tròn */}
          <div className="rounded-full border absolute -top-5 p-2 bg-white ">
            <BellIcon className={`h-5 w-5 ${iconColor} `} />
          </div>

          {/* Nội dung */}
          <div className="flex-1 font-medium text-sm sm:text-base">
            {message}
          </div>

          {/* Nút đóng */}
          <button
            onClick={() => {
              setShow(false);
              onClose && onClose();
            }}
            className="text-white hover:text-gray-200 transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
