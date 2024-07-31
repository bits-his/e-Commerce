import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, Container } from 'react-bootstrap';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const LineChart = () => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels: labels,
    datasets: [{
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the dataset label
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
      }
    }
  };

  const cardStyle = {
    height: '400px', // Adjust the height as needed
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // marginTop: '30px'
  };

  const h2Style = {
    textAlign: 'center',
    // marginBottom: '20px'
  };

  const cardBodyStyle = {
    padding: '10px'
  };

  return (
    <div className="">
      <Card style={cardStyle}>
        <Card.Body style={cardBodyStyle}>
          <h2 style={h2Style}>Sales Data</h2>
          <Line data={data} options={options} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default LineChart;
