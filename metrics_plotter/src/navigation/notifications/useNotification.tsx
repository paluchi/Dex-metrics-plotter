import React, { useState, useEffect } from "react";

import Card from "../../components/card/Card";

import "./styles/Notification.css";

type IUseNotifications = () => [
  Notifications: () => JSX.Element,
  toggle: (action?: boolean | undefined) => void
];

const useNotification: IUseNotifications = () => {
  const Notifications = () => {
    return (
      <aside
        id={"navigation_notifications"}
        className={"notificationsContainer"}
      >
        notifications
      </aside>
    );
  };

  const toggle = (action?: boolean) => {
    switch (action) {
      case true:
        document
          .getElementById("navigation_notifications")!
          .classList.add("NotificationsActive");
        break;
      case false:
        document
          .getElementById("navigation_notifications")!
          .classList.remove("NotificationsActive");

        break;

      default:
        document
          .getElementById("navigation_notifications")!
          .classList.toggle("NotificationsActive");
        break;
    }
  };

  return [Notifications, toggle];
};

export default useNotification;
