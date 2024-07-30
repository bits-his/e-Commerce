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
        <Col md="12" className='d-flex justify-content-between'>
          <OrderSummary type="pending" />
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
