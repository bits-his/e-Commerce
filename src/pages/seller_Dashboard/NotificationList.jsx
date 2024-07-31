// NotificationList.js
import React, { useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { FaTimes } from 'react-icons/fa';

const NotificationList = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    // Auto remove notifications after 5 seconds
    const timer = setInterval(() => {
      if (notifications.length > 0) {
        removeNotification(notifications[0].id);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications, removeNotification]);

  return (
    <div className="notification-list">
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          {notification.message}
          <button className="close-btn" onClick={() => removeNotification(notification.id)}>
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
