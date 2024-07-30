// src/components/BubbleChart.jsx
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Bubble } from 'react-chartjs-2';
import 'chart.js/auto';
import LineChart from './linechart'; 

const BubbleChart = () => {
  const data = {
    datasets: [{
      label: 'Sales Data',
      data: [
        { x: 10, y: 20, r: 10 },
        { x: 30, y: 40, r: 20 },
        { x: 50, y: 60, r: 15 }
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)', 
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false 
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { xLabel, yLabel, dataset } = tooltipItem;
            return `Sales: ${dataset.data[tooltipItem.dataIndex].r} units at ${xLabel}, ${yLabel}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sales Value'
        },
        beginAtZero: true
      },
      y: {
        title: {
          display: true,
          text: 'Profit'
        },
        beginAtZero: true
      }
    }
  };

  const cardStyle = {
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
   
  };

  const chartContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  };

  const chartStyle = {
    flex: 1,
    marginRight: '0.5rem',
    height: '250px' // Adjust height as needed
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  };

  return (
    <Card style={cardStyle} >
      <CardBody>
        <CardTitle tag="h5" style={titleStyle}>Sales and Performance</CardTitle>
        <div style={chartContainerStyle}>
          <div style={chartStyle}>
            <Bubble data={data} options={options} />
          </div>
          <div style={chartStyle}>
            <LineChart />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BubbleChart;
