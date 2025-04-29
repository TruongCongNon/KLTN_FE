import React, { useEffect, useState } from "react";

const Notification = ({ message, type, isVisible }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 300); 
    }
  }, [isVisible]);

  let bgColor = "";
  let textColor = "";

  if (type === "success") {
    bgColor = "bg-green-100 border-green-400";
    textColor = "text-green-700";
  } else if (type === "warning") {
    bgColor = "bg-yellow-100 border-yellow-400";
    textColor = "text-yellow-700";
  } else {
    bgColor = "bg-red-100 border-red-400";
    textColor = "text-red-700";
  }

  return (
    <div className="fixed top-20 sm:right-20 right-2 z-[60]">
      {show && (
        <div
          className={`w-96 px-4 py-3 rounded shadow-md border ${bgColor} ${textColor} transition-all duration-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          role="alert"
        >
          <strong className="font-bold">{message}</strong>
        </div>
      )}
    </div>
  );
};

export default Notification;
