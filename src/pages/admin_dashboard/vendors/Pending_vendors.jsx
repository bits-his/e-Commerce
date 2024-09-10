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
import { toast } from "react-toastify";
import { _post } from "@/utils/Helper";
import { _delete } from "@/utils/Helper";
import Email from "./Email"

export default function Pending_customer({ args, id }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [p_customers, setP_customers] = useState([])

    const get_customers = () => {
        _get(
            "api/getusersbystatus",
            (response) => {
                if (response.success) {
                    setP_customers(response.results)
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

    const handlechangestatus = (id, status) => {

        const obj = {
            id,
            status,
        };

        _post(
            "api/updatestatus",
            obj,
            (res) => {
                if (res.success) {
                    toast.success("venue updated successfully");
                    get_customers();
                } else { 
                    toast.error("Error updating venue status");
                }
            },
            (err) => {
                setLoading(false);
                toast.error("An error occurred while updating status");
                console.error(err);
            }
        );
    };

  const handledeleteusers = (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    _delete(
      `api/deleterejectuser?id=${id}`,
      { id },
      (response) => {
        if (response.success) {
          toast.success("User deleted successfully");;  // Refresh the list after deletion
          window.location.reload();  
          get_customers()// Refresh the page after deletion
        }
      },
      (err) => {
        toast.error("An error occurred while deleting the user");
        console.error(err);
      }
    );
  }
};






    const filteredCustomers = p_customers.filter(
        (customer) =>
            customer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                <CardTitle>Pending Vendors</CardTitle>
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
                {/* {JSON.stringify(filteredCustomers)} */}
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell ">
                      Email
                    </TableHead>
                    <TableHead className="">Phone</TableHead>
                    <TableHead className="hidden md:table-cell ">
                      Role
                    </TableHead>
                    <TableHead className="hidden md:table-cell ">
                      Status
                    </TableHead>
                    <TableHead className="text-center">Action</TableHead>
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
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.username}</TableCell>
                        <TableCell className="hidden md:table-cell ">
                          {customer.email}
                        </TableCell>
                        <TableCell className="">
                          {customer.shopcontact}
                        </TableCell>
                        <TableCell className="hidden md:table-cell ">
                          {customer.role}
                        </TableCell>
                        <TableCell className="hidden md:table-cell ">
                          {customer.status}
                        </TableCell>
                        <TableCell>
                          <div className="justify-center items-center gap-2 md:flex sm:flex">
                            <Button
                              variant="warning"
                              size="icon"
                              className=" w-90 p-2"
                              onClick={() => handleView(customer)}
                            >
                              View
                            </Button>
                            <Button
                              variant="success"
                              size="icon"
                              className="w-90 p-2"
                              onClick={() =>
                                handlechangestatus(customer.id, "approved")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="w-90 p-2"
                              onClick={() => handledeleteusers(customer.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {/* <Email /> */}
            </CardContent>
          </Card>

          <Modal isOpen={isModalOpen} toggle={handleCloseModal} {...args}>
            <ModalHeader toggle={handleCloseModal}>
              Customer Details
            </ModalHeader>
            <ModalBody>
              {selectedCustomer && (
                <div>
                  <p>
                    <strong>User Name:</strong> {selectedCustomer.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCustomer.email}
                  </p>
                  <p>
                    <strong>Shop Contact:</strong> {selectedCustomer.shopcontact}
                  </p>
                  <p>
                    <strong>Shop Name:</strong> {selectedCustomer.shopname}
                  </p>
                  <p>
                    <strong>Shop Address:</strong> {selectedCustomer.shopaddress}
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