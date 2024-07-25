import React from 'react';
import '../../Styles/Customers.css'

export default function Customers() {
  return (
    <>
      <div className='customer-button'>
        <div>
          <h1 className='customers-text'>Customers</h1>
        </div>
        <div>
          <button className="custom-button">Export</button>
          <button className="custom-button">Import</button>
          <button className="custom-button">Add customers</button>
        </div>
      </div>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ayomide</td>
            <td>Ayo Mide@example.com</td>
            <td>(555) 555-5555</td>
          </tr>
          <tr>
            <td>Abba Boss</td>
            <td>abbaboss@example.com</td>
            <td>(555) 555-1234</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
