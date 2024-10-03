import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
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
import { _get, _put, globalColor } from "@/utils/Helper";
import { Badge, Check, Search, Ban } from "lucide-react"; // Added Ban for Cancel button
import { Input } from "@/components/ui/input";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const VendorOrderView = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingOrderId, setLoadingOrderId] = useState(null); // for spinner when an action is pending
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const location = useLocation();
  const order = location.state?.order;
  const userDetails = localStorage.getItem("@@toke_$$_45598");

  // Fetch all orders associated with the shop
  const getAllOrders = () => {
    setFetching(true);
    _get(
      `api/getshoporders?shop_id=${parseInt(userDetails)}`,
      (resp) => {
        setOrders(resp.results);
        setFetching(false);
      },
      (err) => {
        setError(err);
        setFetching(false);
      }
    );
  };

  // Handle order validation (status updates)
  const handleValidateOrder = (id, status) => {
    setLoadingOrderId(id);

    const obj = { id, status };

    _put(
      "api/aproveorder", // Approve order or update status
      obj,
      (res) => {
        setLoadingOrderId(null);
        if (res.success) {
          toast.success(`Order ${status} successfully`);
          getAllOrders(); // Refetch orders after update
        } else {
          toast.error("Error updating order status");
        }
      },
      (err) => {
        setLoadingOrderId(null);
        toast.error("An error occurred while updating status");
      }
    );
  };

  // On initial load, fetch all orders
  useEffect(() => {
    getAllOrders();
  }, []);

  // Filter and categorize orders by their status
  useEffect(() => {
    setCompleted(orders?.filter((order) => order.status === "Approved"));
    setPending(orders?.filter((order) => order.status === "Pending"));
  }, [orders]);

  // Search functionality to filter the orders
  const filteredOrders = orders?.filter((order) =>
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCompleted = completed.filter(
    (order) =>
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPending = pending.filter(
    (order) =>
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate()

   const goBack = () => {
    navigate(-1);
  };

  if (!order) {
    return <div>No order details found.</div>;
  }

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[92vh]">
        <div>
        <Button
          onClick={goBack}
            className="mb-3 d-flex align-items-center"
            style={{backgroundColor: 'rgba(255,255,255'}}
        >
          <FaArrowLeft className="me-2" />
          Back
          </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex-items-center justify-between">
              <CardTitle>Order Details</CardTitle>
            </div>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search name..."
                className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableCell>{order.customer_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableCell>{order ? order.username : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableCell>{order ? order.email : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Phone</TableHead>
                <TableCell>{order ? order.phone : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableCell className="hidden md:table-cell">
                  {order ? order.address : "N/A"}
                </TableCell>
              </TableRow>
            </Table>

            <CardHeader>
              <CardTitle>Ordered Items</CardTitle>
            </CardHeader>

            <div className="relative w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Order date</TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                        <TableCell>{order.order_no}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell className="text-center">
                          {order.status === "Pending" ? (
                            <Button
                              variant="color1"
                              size="sm"
                              onClick={() =>
                                handleValidateOrder(order.id, "Approved")
                              }
                              disabled={loadingOrderId === order.id}
                            >
                              {loadingOrderId === order.id ? (
                                <Spinner size="sm" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </Button>
                          ) : order.status === "Approved" ? (
                            <Button
                              variant="color2"
                              size="sm"
                              onClick={() =>
                                handleValidateOrder(order.id, "Canceled")
                              }
                              disabled={loadingOrderId === order.id}
                            >
                              {loadingOrderId === order.id ? (
                                <Spinner size="sm" />
                              ) : (
                                <Ban className="w-4 h-4" />
                              )}
                            </Button>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="6" className="text-center">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VendorOrderView;
