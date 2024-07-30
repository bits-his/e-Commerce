import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Chart from 'react-apexcharts'; // Example chart library\
import './dashboard.css'

const SalesSummary = () => {
  const [data, setData] = useState({ sales: [], revenue: [], profit: [] });

  useEffect(() => {
  
    fetch('/api/sales-summary')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const chartOptions = {
   
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Total Sales</CardTitle>
          <CardText>{data.sales.reduce((acc, item) => acc + item.amount, 0)}</CardText>
        </CardBody>
      </Card>
      <Chart options={chartOptions} series={data.sales} type="line" height={300} />
    </div>
  );
};

export default SalesSummary;
