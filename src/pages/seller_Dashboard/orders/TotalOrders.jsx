import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Spinner,
} from "reactstrap";
import { FaBan, FaCheck, FaEye } from "react-icons/fa";
import OrdersChart from "./OrdersChart";
import "react-toastify/dist/ReactToastify.css";
import SatisfiedChart from "./SatisfiedChart";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { _get, _post, _put } from "@/utils/Helper";
import toast from "react-hot-toast";
import "../../style.css"

const TotalOrders = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [error, setError] = useState(null);

  const userDetails = localStorage.getItem("@@toke_$$_45598");

  // Fetch all orders
  const getAllOrders = () => {
    _get(
      `api/gerordersbyshopid?shop_id=${parseInt(userDetails)}`,
      (resp) => setOrders(resp.results),
      (err) => setError(err)
    );
  };

  // Approve order function
  const handleValidateOrder = (id, status) => {
    setLoadingOrderId(id); 

    const obj = { id, status };

    _put(
      "api/aproveorder",
      obj,
      (res) => {
        setLoadingOrderId(null);
        if (res.success) {
          toast.success("Order updated successfully");
          getAllOrders();
        } else {
          toast.error("Error updating order status");
        }
      },
      (err) => {
        setLoadingOrderId(null);
        toast.error("An error occurred while updating status");
        console.error(err);
      }
    );
  };

  useEffect(() => {
    getAllOrders();
  }, []);


  const filteredOrders = orders.filter((order) =>
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCompleted(orders.filter((order) => order.status === "Approved"));
    setPending(orders.filter((order) => order.status === "Pending"));
  }, [orders]);

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

  const toggleModal = () => setModal(!modal);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    toggleModal();
  };


  return (
    <Container fluid>
      <div className="row">
        <Col lg={7} md={12}>
          <OrdersChart />
        </Col>
        <Col lg={5} className="hidden lg:block p-3">
          <SatisfiedChart />
        </Col>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <div className="flex items-center">
                <CardTitle>Total Orders</CardTitle>
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
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                {/* {JSON.stringify(orders)} */}
                <TableHeader>
                  <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Order date
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Order Number
                    </TableHead>
                    <TableHead className="text-center">Shop ID</TableHead>
                    <TableHead className="text-center">Status</TableHead>
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
                    filteredOrders?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="hidden md:table-cell text-center">
                          {order.createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </TableCell>
                        <TableHead className="text-center">
                          {order.order_no}
                        </TableHead>
                        <TableHead className="text-center">
                          {order.shop_id}
                        </TableHead>
                        <TableCell className="text-center">
                          {order.status === "Approved" ? (
                            <Badge variant="success">{order.status}</Badge>
                          ) : order.status === "Pending" ? (
                            <Badge variant="warning">{order.status}</Badge>
                          ) : (
                            <Badge variant="destructive">{order.status}</Badge>
                          )}
                        </TableCell>
                        {/* <TableCell className="hidden md:table-cell text-center">
                          {order.total}
                        </TableCell> */}
                        <TableCell className="d-flex justify-content-center">
                          <Button
                            color="warning"
                            className="me-lg-1"
                            onClick={() => handleViewClick(order)}
                          >
                            <FaEye />
                          </Button>
                          {order.status === "Pending" ? (
                            <Button
                              color="success"
                              className="me-lg-1"
                              onClick={() =>
                                handleValidateOrder(order.id, "Approved")
                              }
                              disabled={loadingOrderId === order.id}
                            >
                              {loadingOrderId === order.id ? (
                                <Spinner size="sm" />
                              ) : (
                                <FaCheck />
                              )}
                            </Button>
                          ) : order.status === "Approved" ? (
                            <Button
                              color="danger"
                              className="me-lg-1"
                              onClick={() =>
                                handleValidateOrder(order.id, "Cancelled")
                              }
                              disabled={loadingOrderId === order.id}
                            >
                              {loadingOrderId === order.id ? (
                                <Spinner size="sm" />
                              ) : (
                                <FaBan />
                              )}
                            </Button>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Completed">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <div className="flex items-center">
                <CardTitle>Approved Orders</CardTitle>
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
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Order date
                    </TableHead>
                    <TableHead className="text-center">Shop ID</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCompleted.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan="6" className="text-center">
                        No order
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedCompleted.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="hidden md:table-cell text-center">
                          {order.createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </TableCell>
                        <TableHead className="text-center">
                          {order.shop_id}
                        </TableHead>
                        <TableCell className="text-center">
                          {order.status === "Approved" ? (
                            <Badge variant="success">{order.status}</Badge>
                          ) : order.status === "Pending" ? (
                            <Badge variant="warning">{order.status}</Badge>
                          ) : (
                            <Badge variant="destructive">{order.status}</Badge>
                          )}
                        </TableCell>
                        {/* <TableCell className="hidden md:table-cell text-center">
                          {order.total}
                        </TableCell> */}
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
        </TabsContent>
        <TabsContent value="pending">
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell text-center">
                        Order date
                      </TableHead>
                      <TableHead className="text-center">Shop ID</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPending.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan="6" className="text-center">
                          No order
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedPending?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell className="hidden md:table-cell text-center">
                            {order.createdAt
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("-")}
                          </TableCell>
                          <TableHead className="text-center">
                            {order.shop_id}
                          </TableHead>
                          <TableCell className="text-center">
                            {order.status === "Completed" ? (
                              <Badge variant="success">{order.status}</Badge>
                            ) : order.status === "Pending" ? (
                              <Badge variant="warning">{order.status}</Badge>
                            ) : (
                              <Badge variant="destructive">
                                {order.status}
                              </Badge>
                            )}
                          </TableCell>
                          {/* <TableCell className="hidden md:table-cell text-center">
                            {order.total}
                          </TableCell> */}
                          <TableCell className="d-flex justify-content-center">
                            <Button
                              color="warning"
                              className="me-lg-1"
                              onClick={() => handleViewClick(order)}
                            >
                              <FaEye />
                            </Button>
                            <Button
                              color="success"
                              className="me-lg-1"
                              onClick={() =>
                                handleValidateOrder(order.id, "Approved")
                              }
                              disabled={loadingOrderId === order.id}
                            >
                              {loadingOrderId === order.id ? (
                                <Spinner size="sm" />
                              ) : (
                                <FaCheck />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedOrder && (
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Order Details</ModalHeader>
          <ModalBody>
            <p>
              <strong>ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder.product}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {selectedOrder.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Order ID:</strong>{" "}
              {selectedOrder.order_no.replace(/\//g, "")}
            </p>
            <p>
              <strong>Delivery ID:</strong>{" "}
              {selectedOrder.delivery_no.replace(/\//g, "")}
            </p>
            <p>
              <strong>Image Ordered</strong>{" "}
              <div class="modal-image">
                <img src={selectedOrder.order_image} alt="" />
              </div>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default TotalOrders;
