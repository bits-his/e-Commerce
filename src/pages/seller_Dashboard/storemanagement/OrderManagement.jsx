import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Table } from 'reactstrap';

// Define order types and their corresponding display titles and class names
const orderTypes = [
  { type: 'pending', title: 'Pending Orders', className: 'order-card pending' },
  { type: 'completed', title: 'Completed Orders', className: 'order-card completed' },
  { type: 'canceled', title: 'Canceled Orders', className: 'order-card canceled' },
];

const OrderSummary = () => {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const responses = await Promise.all(
          orderTypes.map(orderType =>
            fetch(`/api/order-summary?type=${orderType.type}`)
              .then(response => response.json())
              .then(data => ({ type: orderType.type, orders: data.orders })) // Expecting an array of orders
          )
        );
        
        const data = responses.reduce((acc, { type, orders }) => ({
          ...acc,
          [type]: orders,
        }), {});
        
        setOrderData(data);
      } catch (err) {
        setError('Failed to fetch order data.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {orderTypes.map(({ type, title, className }) => (
        <Card key={type} className={className} style={{ marginBottom: '20px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            {orderData[type] && orderData[type].length > 0 ? (
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData[type].map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <Button color="info" size="sm">View</Button>{' '}
                        <Button color="warning" size="sm">Edit</Button>{' '}
                        <Button color="danger" size="sm">Delete</Button>
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
