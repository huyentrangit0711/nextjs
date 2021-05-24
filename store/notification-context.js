import { createContext, useState, useEffect } from "react";
const NotificationContext = createContext({
  notification: null, // title, message, status
  showNotification: () => {},
  hideNotification: () => {},
});
export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "error" ||
        activeNotification.status === "success")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);
  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  const ctx = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={ctx}>
      {props.children}
    </NotificationContext.Provider>
  );
}
export default NotificationContext;
