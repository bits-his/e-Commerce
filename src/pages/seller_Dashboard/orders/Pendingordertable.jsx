import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
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
      setOrders(staticOrders);
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) => order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    toggleModal();
  };

  return (
    <Container fluid  className="min-h-[92vh]">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <div className="flex items-center">
            <CardTitle>Pending Orders</CardTitle>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Order date
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Total
                </TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="6" className="text-center">
                    No order
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      {order.orderDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.status === "Completed" ? (
                        <Badge variant="success">{order.status}</Badge>
                      ) : order.status === "Pending" ? (
                        <Badge variant="warning">{order.status}</Badge>
                      ) : (
                        <Badge variant="destructive">{order.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      {order.total}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="warning"
                        onClick={() => handleViewClick(order)}
                      >
                        <FaEye />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
