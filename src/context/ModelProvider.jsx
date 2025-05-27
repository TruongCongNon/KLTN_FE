import { createContext, useContext, useEffect, useState } from "react";
import AlertPage from "../components/Alert/AlertPage";
import Notification from "../components/Notification/Notification.jsx";
import CountButton from "../components/countButton/countButton.jsx";

const ModelContext = createContext();

export function ModelProvider({ children }) {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, data: null });
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: null,
  });
  const [notificationConfig, setNotificationConfig] = useState({
    key: 0,
    message: "",
    type: "",
    isVisible: false
  })

  const showNotification = ({ message, type }) => {
    setNotificationConfig((prev) => ({
      key: prev.key + 1, // Tăng key để Notification render lại
      message,
      type,
      isVisible: true,
    }));

    setTimeout(() => {
      setNotificationConfig((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, 1000);
  };
  const showModal = (data) => {
    setModalConfig({ isOpen: true, data });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, data: null });
  };


  const showAlert = ({ isOpen, title, description, onConfirm }) => {
    setAlertConfig({
      isOpen: true,
      title: title || "Thông báo",
      description: description || "Bạn có chắc chắn muốn thực hiện hành động này?",
      onConfirm: onConfirm || (() => { }),
    });
  };

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModelContext.Provider value={{ modalConfig, showModal, closeModal, showAlert, closeAlert, showNotification }}>
      {children}
      <AlertPage {...alertConfig} onClose={closeAlert} />
      <Notification
        key={notificationConfig.key} // bắt buộc component mount lại
        message={notificationConfig.message}
        type={notificationConfig.type}
        isVisible={notificationConfig.isVisible}
      />
      {modalConfig.isOpen && <CountButton{...modalConfig.data} />}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  return useContext(ModelContext);
}

export default ModelProvider;
