import React, { useState } from 'react';
import '../../Styles/Customers.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Customers(args) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customers = [
    { name: 'ayomide', email: 'AyoMide@example.com', phone: '(555) 555-5555' },
    { name: 'Abba Boss', email: 'abbaboss@example.com', phone: '(555) 555-1234' },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <>
      <div className='customer-button'>
        <div>
          <h1 className='customers-text'>Customers</h1>
        </div>
        <div>
          <button className="custom-button">Export</button>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button 
                  className="view-button"
                  onClick={() => handleView(customer)}
                >
                  View
                </button>
                <button 
                  className="edit-button"
                  
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} toggle={handleCloseModal} {...args}>
        <ModalHeader toggle={handleCloseModal}>Customer Details</ModalHeader>
        <ModalBody>
          {selectedCustomer && (
            <div>
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
