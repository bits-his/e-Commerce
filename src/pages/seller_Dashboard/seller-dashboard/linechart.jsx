// src/components/LineChart.jsx
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Monthly Sales',
      data: [10, 20, 15, 30, 25, 35, 40],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      fill: true
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Sales: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Sales'
        },
        beginAtZero: true
      }
    }
  };

  const cardStyle = {
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem'
  };

  const chartContainerStyle = {
    position: 'relative',
    height: '250px' // Reduce the height of the chart
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  };

  return (
    <Card style={cardStyle}>
      <CardBody>
        <CardTitle tag="h5" style={titleStyle}>Monthly Sales</CardTitle>
        <div style={chartContainerStyle}>
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default LineChart;
