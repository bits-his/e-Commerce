import React, { useState } from 'react';
import '../../Styles/Customers.css';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    { name: 'ayomide', email: 'AyoMide@example.com', phone: '(555) 555-5555' },
    { name: 'Abba Boss', email: 'abbaboss@example.com', phone: '(555) 555-1234' },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
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
          {filteredCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
