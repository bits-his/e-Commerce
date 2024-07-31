import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch pending orders from the API
    const fetchOrders = async () => {
      // Example static data, replace with actual API call if needed
      const staticOrders = [
        {
          id: '1',
          customer: 'Bashir',
          orderDate: '2024-07-01',
          status: 'Pending',
          total: '₦2000',
          details: 'Order details for Bashir',
        },
        {
          id: '2',
          customer: 'Ayo',
          orderDate: '2024-07-04',
          status: 'Pending',
          total: '₦2500',
          details: 'Order details for Ayo',
        },
      ];

      // Replace staticOrders with response data if fetching from API
      // const response = await fetch('/api/orders?type=pending');
      // const data = await response.json();
      setOrders(staticOrders);
    };

    fetchOrders();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    toggleModal();
  };

  return (
    <Container fluid>
      <h2>Pending Orders</h2>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
              <td>
                <Button color="warning" onClick={() => handleViewClick(order)}>
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedOrder && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Order Details</ModalHeader>
          <ModalBody>
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total:</strong> {selectedOrder.total}</p>
            <p><strong>Details:</strong> {selectedOrder.details}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default PendingOrders;
