import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import './NotificationContainer.css'; // Add custom styles for the container

const NotificationContainer = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    setNotifications([...notifications, { message, type, id: Date.now() }]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  useEffect(() => {
    // Example: Add a notification on component mount
    addNotification('Welcome to the Vendor Dashboard!', 'info');
  }, []);

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
