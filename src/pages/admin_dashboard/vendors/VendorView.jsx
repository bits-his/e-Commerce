import React, { useState } from "react";
import "../../../Styles/Customers.css";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PerformanceChart from "@/pages/seller_Dashboard/seller-dashboard/PerformanceChart";

const VendorView = () => {
  const location = useLocation();
  const { customer } = location.state || {}; // Access customer details from the state

  // State variables for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // Function to handle modal toggle
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Function to handle the warn action
  const handleWarnClick = () => {
    if (customer) {
      const message = `Dear ${customer.username}, this is a warning message for :\n`;
      setWarningMessage(message); // Set the pre-filled warning message
    }
    toggleModal();
  };

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[92vh]">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <div className="flex-items-center justify-between">
              <CardTitle>Vendors Details</CardTitle>
            </div>
          </CardHeader>
          {customer ? (
            <CardContent>
              <Table>
                {/* <TableHeader> */}
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableCell>{customer.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableCell>{customer ? customer.username : "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableCell>{customer ? customer.email : "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Phone</TableHead>
                  <TableCell>
                    {customer ? customer.shopcontact : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="hidden md:table-cell">
                    Shop Name
                  </TableHead>
                  <TableCell className="hidden md:table-cell">
                    {customer ? customer.shopname : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="hidden md:table-cell">
                    Shop Address
                  </TableHead>
                  <TableCell className="hidden md:table-cell">
                    {customer ? customer.shopaddress : "N/A"}
                  </TableCell>
                </TableRow>
              </Table>
              <CardHeader>
                <div className="flex-items-center justify-between py-4">
                  <CardTitle>Performance</CardTitle>
                </div>
                <PerformanceChart />
              </CardHeader>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignSelf: "end",
                  justifyContent: "flex-end",
                }}
                className="my-4"
              >
                <Button onClick={handleWarnClick}>Warn</Button>
                <Button>Suspend</Button>
              </div>
            </CardContent>
          ) : (
            <p>No customer details available.</p>
          )}
        </Card>

        {/* Modal for warning message */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Warning Message</ModalHeader>
          <ModalBody>
            {/* <p>Dear {customer.username} this is a  wanned for the following mistakes you made: </p> */}
            <textarea
              rows="5"
              placeholder="Enter your warning message here..."
              value={warningMessage}
              onChange={(e) => setWarningMessage(e.target.value)}
              className="w-full border rounded p-2"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={toggleModal}>
              Send
            </Button>
          </ModalFooter>
        </Modal>
      </main>
    </div>
  );
};

export default VendorView;
