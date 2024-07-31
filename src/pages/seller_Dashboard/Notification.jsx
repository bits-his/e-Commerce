// Notification.js
import React from 'react';
import './Notification.css'; // Add custom styles for the notifications

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Notification;
