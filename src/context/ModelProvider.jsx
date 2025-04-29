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
const [notificationConfig,setNotificationConfig ] = useState({
  message:"",
  type:"",
  isVisible:false
})

const showNotification = ({message,type})=>{
setNotificationConfig({message,type,isVisible:true})
setTimeout(() => setNotificationConfig((prev) => ({ ...prev, isVisible: false })), 3000);
}
  const showModal = (data) => { 
    setModalConfig({ isOpen: true, data });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, data: null });
  };


  const showAlert = ({ isOpen, title, description, onConfirm}) => {
    setAlertConfig({
      isOpen: true,
      title: title || "Thông báo", 
      description: description || "Bạn có chắc chắn muốn thực hiện hành động này?",
      onConfirm: onConfirm || (() => {}),
    });
  };

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModelContext.Provider value={{ modalConfig, showModal, closeModal, showAlert, closeAlert,showNotification  }}>
      {children}
      <AlertPage {...alertConfig} onClose={closeAlert} />
      <Notification {...notificationConfig}/>
    {modalConfig.isOpen && <CountButton{...modalConfig.data}/>}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  return useContext(ModelContext);
}

export default ModelProvider;
