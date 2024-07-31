import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { FaClipboardList, FaCheckCircle, FaListAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const orderTypes = [
  { type: 'pending', title: 'Pending Orders', className: 'order-card pending', icon: <FaClipboardList /> },
  { type: 'approved', title: 'Approved Orders', className: 'order-card approved', icon: <FaCheckCircle /> },
  { type: 'total', title: 'Total Orders', className: 'order-card total', icon: <FaListAlt /> },
];

const OrderSummary = () => {
  const [orderCounts, setOrderCounts] = useState({});
  const navigate = useNavigate(); // Initialize navigate for navigation

  useEffect(() => {
    // Set static counts for the cards
    const counts = {
      pending: 2,
      approved: 2,
      total: 5,
    };

    setOrderCounts(counts);
  }, []);

  const handleCardClick = (type) => {
    navigate(`/seller-dashboard/orders/${type}`); // Navigate to the specific order type page
  };

  return (
    <>
      {orderTypes.map(({ type, title, className, icon }) => (
        <Card
          key={type}
          className={className}
          style={{ marginBottom: '1rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          onClick={() => handleCardClick(type)} // Handle card click
        >
          <CardBody style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '1rem', fontSize: '1.5rem', color: '#007bff' }}>{icon}</div>
            <div>
              <CardTitle style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>{title}</CardTitle>
              <CardText style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#555' }}>{orderCounts[type] || 0}</CardText>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default OrderSummary;
