import React, { useState, useEffect } from "react";
import "../../../Styles/Customers.css";
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
import { _get } from "@/utils/Helper";
import { customerstatus } from "@/utils/Cusromer";
import { FaEllipsisH } from "react-icons/fa";

export default function Pending_customer(args) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [p_customers, setP_customers] = useState([])

  const get_customers = () => {
    _get(
      "api/getcutomers",
      (response) => {
        if (response.success) {
          setP_customers(response.results)
          console.log(p_customers)
        } else {
          alert("Error on getting users")
        }
      },
      (error) => {
        alert("Error on getting users")
      }
    )
  }

  useEffect(() => {
    get_customers();
  }, []);

  const filteredCustomers = p_customers.filter(
  (customer) =>
    (customer.fullname && customer.fullname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.phone && customer.phone.includes(searchQuery))
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
                  <TableHead className="hidden md:table-cell ">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  {/* <TableHead className="hidden md:table-cell ">Shop Name</TableHead> */}
                  <TableHead className="hidden md:table-cell ">Address</TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="7" className="text-center">
                      No customers found
                                        </TableCell>
                  </TableRow>
                ) : (
                    filteredCustomers.map((customer,index) => (
                      <TableRow key={customer.id}>
                        <TableCell><div>{index + 1}</div></TableCell>
                        <TableCell>{customer.username}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {customer.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {customer.phone}
                        </TableCell>
                        <TableCell className="hidden md:table-cell ">
                          {customer.address}
                        </TableCell>
                        {/* <TableCell className="hidden md:table-cell ">
                          {customer.shopaddress}
                        </TableCell> */}
                        <TableCell>
                          <div className="justify-center items-center gap-2 md:flex sm:flex cursor-   pointer">
                            <FaEllipsisH />
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
                <p><strong>Name:</strong> {selectedCustomer.username}</p>
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
      </main>
    </>
  );
}
