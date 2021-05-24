import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import MainHeader from "./main-header";

function Layout(props) {
  const ctx = useContext(NotificationContext);
  const { notification } = ctx;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
    </Fragment>
  );
}

export default Layout;
