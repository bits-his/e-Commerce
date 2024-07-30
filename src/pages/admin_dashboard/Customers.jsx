import React, { useState } from 'react';
import '../../Styles/Customers.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function Customers(args) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customers = [
    { id: 'cr42537', name: 'ayomide', email: 'AyoMide@example.com', phone: '(555) 555-5555' },
    { id: 'cr78590', name: 'Abba Boss', email: 'abbaboss@example.com', phone: '(555) 555-1234' },
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

  const navigate = useNavigate();

  const handleRowClick = () => {
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
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {filteredCustomers.map((customer, index) => (
                <tr key={index} 
                  onClick={handleRowClick}
                >
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <button className="view-button" onClick={() => handleView(customer)}>
                      View
                    </button>
                    <button className="edit-button">
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
        </div>
      </div>
    </>
  );
}
