import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Chart from 'react-apexcharts';
import './dashboard.css';

const TrafficAndEngagement = () => {
  const [data, setData] = useState({ traffic: [], engagement: [] });

  useEffect(() => {
   
    fetch('/api/traffic-engagement')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const trafficChartOptions = {
    chart: {
      id: 'traffic-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.traffic.map(item => item.date),
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColors: '#007bff',
      strokeWidth: 2,
    },
    colors: ['#007bff'],
    grid: {
      borderColor: '#e7e7e7',
    },
  };

  const engagementChartOptions = {
    chart: {
      id: 'engagement-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.engagement.map(item => item.product),
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    colors: ['#28a745'],
    grid: {
      borderColor: '#e7e7e7',
    },
  };

  return (
    <div>
      <Card className="traffic-card">
        <CardBody>
          <CardTitle>Website Traffic</CardTitle>
          <Chart options={trafficChartOptions} series={[{ name: 'Traffic', data: data.traffic.map(item => item.visitors) }]} type="line" height={300} />
        </CardBody>
      </Card>
      <Card className="engagement-card">
        <CardBody>
          <CardTitle>Product Engagement</CardTitle>
          <Chart options={engagementChartOptions} series={[{ name: 'Engagement', data: data.engagement.map(item => item.engagement) }]} type="bar" height={300} />
        </CardBody>
      </Card>
    </div>
  );
};

export default TrafficAndEngagement;
