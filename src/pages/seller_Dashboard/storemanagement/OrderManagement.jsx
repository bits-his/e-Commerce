import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { FaDollarSign, FaShoppingCart, FaClock } from 'react-icons/fa';

const VendorDashboardCards = () => {
  return (
    <div className="vendor-dashboard-cards">
      <Card className="total-sales-card">
        <CardBody>
          <CardTitle tag="h5">
            <FaDollarSign /> Total Sales
          </CardTitle>
          <CardText>$12,345</CardText>
          <CardText>Total revenue generated from sales.</CardText>
        </CardBody>
      </Card>
      <Card className="total-orders-card">
        <CardBody>
          <CardTitle tag="h5">
            <FaShoppingCart /> Total Orders
          </CardTitle>
          <CardText>789 Orders</CardText>
          <CardText>Total number of orders received.</CardText>
        </CardBody>
      </Card>
      <Card className="pending-orders-card">
        <CardBody>
          <CardTitle tag="h5">
            <FaClock /> Pending Orders
          </CardTitle>
          <CardText>45 Orders</CardText>
          <CardText>Number of orders that are yet to be processed.</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default VendorDashboardCards;
