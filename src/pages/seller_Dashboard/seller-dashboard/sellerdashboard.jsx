import React from 'react';
import './dashboard.css';
import OrderSummary from './OrderSummary';
import PerformanceChart from "./PerformanceChart";


const Dashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[92vh]">
      <PerformanceChart />
      <div>
        <OrderSummary/>
      </div>
    </main>
  );
};

export default Dashboard;
