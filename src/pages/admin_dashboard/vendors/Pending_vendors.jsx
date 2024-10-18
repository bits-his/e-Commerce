import React, { useState, useEffect } from "react";
import "../../../Styles/Customers.css";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
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
// import { toast } from "react-toastify";
import { _post } from "@/utils/Helper";
import { _delete } from "@/utils/Helper";
import Email from "./Email";
import toast from "react-hot-toast";

export default function Pending_customer({ args, id }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [p_customers, setP_customers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingById, setLoadingById] = useState(null);

  const get_customers = () => {
    setLoading(true);
    _get(
      "api/getusersbystatus",
      (response) => {
        if (response.success) {
          setP_customers(response.results);
          setLoading(false);
        } else {
          alert("Error on getting users");
          setLoading(false);
        }
      },
      (error) => {
        alert("Error on getting users");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    get_customers();
  }, []);

  const handlechangestatus = (id, status, email, username, shopname) => {
    setLoadingById(id);
    const obj = {
      id,
      status,
      email,
      username,
      shopname
    };

    _post(
      "api/updatestatus",
      obj,
      (res) => {
        setLoadingById(null);
        if (res.success) {
          toast.success("vendor status updated");
          get_customers();
        } else {
          toast.error("Error updating vendor status");
        }
      },
      (err) => {
        setLoadingById(null);
        toast.error("An error occurred while updating status");
        console.error(err);
      }
    );
  };

  const handledeleteusers = (id) => {
    if (window.confirm("Are you sure you want to reject this user request?")) {
      _delete(
        `api/deleterejectuser?id=${id}`,
        { id },
        (res) => {
          if (res.success) {
            toast.success("User rejected successfully");
            get_customers();
            window.location.reload();
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
                  <TableHead className="">Phone</TableHead>
                  <TableHead className="hidden md:table-cell ">Role</TableHead>
                  <TableHead className="hidden md:table-cell ">
                    Status
                  </TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan="7" className="text-center">
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="7" className="text-center">
                      No Vendor found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{customer.username}</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell className="">{customer.shopcontact}</TableCell>
                      <TableCell className="hidden md:table-cell ">
                        {customer.role}
                      </TableCell>
                      <TableCell className="hidden md:table-cell ">
                        {customer.status}
                      </TableCell>
                      <TableCell>
                        <div className="justify-center items-center gap-2 md:flex sm:flex">
                          <Button
                            variant="color3"
                            size="sm"
                            className=" w-90 p-2"
                            onClick={() => handleView(customer)}
                          >
                            View
                          </Button>
                          <Button
                            variant="color1"
                            size="sm"
                            className="w-90 p-2"
                            onClick={() =>
                              handlechangestatus(customer.id, "approved", customer.email, customer.username, customer.shopname)
                            }
                            disabled={loadingById === customer.id}
                          >
                            {loadingById === customer.id ? <><Spinner size="sm"/></>:<>Approve</>}
                          </Button>
                          <Button
                            variant="color2"
                            size="sm"
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
          <ModalHeader toggle={handleCloseModal}>Vendor Details</ModalHeader>
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
