import React, { useState } from 'react';
import profileImage from './profile-image.jpg'; // Import your profile image

function Profile() {
  // Example state for user data
  const [userData] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    fullName: 'John Doe',
    address: '123 Main St, City, Country',
    phone: '123-456-7890',
    orders: [
      { id: 1, date: '2024-07-20', total: 50.0 },
      { id: 2, date: '2024-07-18', total: 120.0 }
    ],
    settings: {
      emailNotifications: true,
      smsNotifications: false
    }
  });

  // Function to toggle email notifications
  const toggleEmailNotifications = () => {
    // Simulated logic for toggling email notifications
  };

  // Function to toggle SMS notifications
  const toggleSMSNotifications = () => {
    // Simulated logic for toggling SMS notifications
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{userData.fullName}</h2>
          <p>@{userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Address: {userData.address}</p>
        </div>
      </div>

      <div className="order-history">
        <h3>Order History</h3>
        <ul>
          {userData.orders.map(order => (
            <li key={order.id}>
              Order ID: {order.id} - Date: {order.date} - Total: ${order.total}
            </li>
          ))}
        </ul>
      </div>

      <div className="settings">
        <h3>Settings</h3>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={userData.settings.emailNotifications} onChange={toggleEmailNotifications} />
            Receive email notifications
          </label>
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={userData.settings.smsNotifications} onChange={toggleSMSNotifications} />
            Receive SMS notifications
          </label>
        </div>
      </div>
    </div>
  );
}

export default Profile;
