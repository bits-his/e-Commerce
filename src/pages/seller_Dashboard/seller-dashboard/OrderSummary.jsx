import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const orderTypes = [
  { type: 'pending', title: 'Pending Orders', className: 'order-card pending' },

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
      {orderTypes.map(({ type, title, className }) => (
        <Card key={type} className={className}>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardText>{orderCounts[type] || 0}</CardText>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default OrderSummary;
