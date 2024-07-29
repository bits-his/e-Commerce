import React, { useState } from 'react';
import '../../Styles/Customers.css';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    { id: 'cr42537', name: 'ayomide', email: 'AyoMide@example.com', phone: '(555) 555-5555' },
    { id: 'cr78590', name: 'Abba Boss', email: 'abbaboss@example.com', phone: '(555) 555-1234' },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/admin-dashboard/customer-mgmt/customer-details`);
  };

  return (
    <>
      <div className='px-4'>
        <h1 className='customers-text mt-4'>Customers</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input me-3"
          />
          <button className="custom-button">Add customer</button>
        </div>
        <div className='table-responsive'>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input 
                    type='checkbox' 
                    className='form-check-input'
                  />
                </th>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {filteredCustomers.map((customer, index) => (
                <tr key={index} 
                  onClick={() => handleRowClick(customer.id)}
                >
                  <td>
                    <input type='checkbox' className='form-check-input' />
                  </td>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
