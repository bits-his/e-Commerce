import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import OrderSummary from './OrderSummary';
import TrafficAndEngagement from './TrafficAndEngagement';
import './dashboard.css';
import Chart from './chart'
const Dashboard = () => {
  return (
    <Container fluid>
    
      <Row>
        <Col md="4">
          <OrderSummary type="pending" />
        </Col>
        <Col md="4">
          <OrderSummary type="completed" />
        </Col>
        <Col md="4">
          <OrderSummary type="canceled" />
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <Chart />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
