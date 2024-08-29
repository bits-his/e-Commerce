import React, { useState } from "react";
import "../../Styles/Customers.css";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Search, Pencil, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Customers(args) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customers = [
    {
      id: 1,
      name: "ayomide",
      email: "AyoMide@example.com",
      phone: "(555) 555-5555",
      lga: "Fagge",
      state: "Kano",
    },
    {
      id: 2,
      name: "Abba Boss",
      email: "abbaboss@example.com",
      phone: "(555) 555-1234",
      lga: "Gezawa",
      state: "Kano",
    },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
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

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[92vh]">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Customers</CardTitle>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Email
                  </TableHead>
                  <TableHead className="text-center">Phone</TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    LGA
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    State
                  </TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="6" className="text-center">
                      No order
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {customer.email}
                      </TableCell>
                      <TableCell className="text-center">
                        {customer.phone}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {customer.lga}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {customer.state}
                      </TableCell>
                      <TableCell>
                        <div className="justify-center items-center gap-2 md:flex sm:flex">
                          <Button
                            variant="warning"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleView(customer)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="success"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleEditButtonClick(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Modal isOpen={isModalOpen} toggle={handleCloseModal} {...args}>
          <ModalHeader toggle={handleCloseModal}>Customer Details</ModalHeader>
          <ModalBody>
            {selectedCustomer && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCustomer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedCustomer.phone}
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </>
  );
}
