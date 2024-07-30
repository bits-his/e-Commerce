import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Table } from 'reactstrap';

// Define static order data for different types
const orderData = {
  pending: [
    { id: '1', customerName: 'John Doe', date: '2024-07-29', total: 29.99 },
    { id: '2', customerName: 'Jane Smith', date: '2024-07-28', total: 49.99 },
  ],
  completed: [
    { id: '3', customerName: 'Alice Johnson', date: '2024-07-25', total: 19.99 },
  ],
  canceled: [
    { id: '4', customerName: 'Bob Brown', date: '2024-07-22', total: 39.99 },
  ],
};

// Define order types with titles and class names
const orderTypes = [
  { type: 'pending', title: 'Pending Orders', className: 'order-card pending' },
  { type: 'completed', title: 'Completed Orders', className: 'order-card completed' },
  { type: 'canceled', title: 'Canceled Orders', className: 'order-card canceled' },
];

const OrderSummary = () => {
  const [orderCounts] = useState(orderData); // Use static order data

  const handleView = (id) => {
    alert(`Viewing details for order ID: ${id}`);
    // Implement view logic here
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete order ID: ${id}?`)) {
      alert(`Deleting order ID: ${id}`);
      // Implement delete logic here
    }
  };

  return (
    <>
      {orderTypes.map(({ type, title, className }) => (
        <Card key={type} className={className} style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <CardBody>
            <CardTitle style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</CardTitle>
            {orderCounts[type] && orderCounts[type].length > 0 ? (
              <Table striped responsive>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Order ID</th>
                    <th style={{ textAlign: 'left' }}>Customer Name</th>
                    <th style={{ textAlign: 'left' }}>Date</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderCounts[type].map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'right' }}>${order.total.toFixed(2)}</td>
                      <td>
                        <Button color="info" size="sm" onClick={() => handleView(order.id)}>View</Button>{' '}
                        <Button color="warning" size="sm">Edit</Button>{' '}
                        <Button color="danger" size="sm" onClick={() => handleDelete(order.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <CardText>No orders found.</CardText>
            )}
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default OrderSummary;
