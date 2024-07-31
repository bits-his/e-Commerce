import React, { useState } from 'react';
import '../../Styles/Customers.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function Customers(args) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customers = [
    { id: 'cr42537', name: 'ayomide', email: 'AyoMide@example.com', phone: '(555) 555-5555', lga: 'Fagge', state: 'Kano' },
    { id: 'cr78590', name: 'Abba Boss', email: 'abbaboss@example.com', phone: '(555) 555-1234', lga: 'Gezawa', state: 'Kano' },
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
      <div className='container pt-2'>
        <div className="d-flex justify-content-between align-items-end mt-md-4 mt-sm-3 mb-3">
          <div className="d-flex flex-column">
            <h1 className="customers-text">Customers</h1>
            <small>Home {'>'} Customers</small>
          </div>
          <div className="search-container mb-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input me-3"
            />
          </div>
        </div>
        <div className='card px-2 pb-4'>
          <div className='table-responsive'>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>LGA</th>
                  <th>State</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.lga}</td>
                    <td>{customer.state}</td>
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
      </div>
    </>
  );
}
