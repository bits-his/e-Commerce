import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { FaClipboardList, FaCheckCircle, FaListAlt } from 'react-icons/fa';

const orderTypes = [
  { type: 'pending', title: 'Pending Orders', className: 'order-card pending', icon: <FaClipboardList /> },
  { type: 'approved', title: 'Approved Orders', className: 'order-card approved completed ', icon: <FaCheckCircle /> },
  { type: 'total', title: 'Total Orders', className: 'order-card total canceled ', icon: <FaListAlt /> },
];

const OrderSummary = () => {
  const [orderCounts, setOrderCounts] = useState({});

  useEffect(() => {
    const fetchOrderCounts = async () => {
      const responses = await Promise.all(orderTypes.map(orderType =>
        fetch(`/api/order-summary?type=${orderType.type}`)
          .then(response => response.json())
          .then(data => ({ type: orderType.type, count: data.count }))
      ));
      
      const counts = responses.reduce((acc, { type, count }) => ({
        ...acc,
        [type]: count,
      }), {});
      
      setOrderCounts(counts);
    };

    fetchOrderCounts();
  }, []);

  return (
    <>
      {orderTypes.map(({ type, title, className, icon }) => (
        <Card key={type} className={className} style={{ marginBottom: '1rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
