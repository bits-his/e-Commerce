import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Spinner,
} from "reactstrap";
import { FaEye } from "react-icons/fa";
import OrdersChart from "../seller_Dashboard/orders/OrdersChart";
import "react-toastify/dist/ReactToastify.css";
import SatisfiedChart from "../seller_Dashboard/orders/SatisfiedChart";
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
import { Button } from "@/components/ui/button";
import { _get, globalColor } from "@/utils/Helper";
import "../style.css";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const getAllOrders = () => {
    setFetching(true);
    _get(
      "api/getorders",
      (resp) => {
        setOrders(resp.results);

        console.log(resp.results);
        setFetching(false);
      },
      (err) => {
        setError(err);
        setFetching(false);
      }
    );
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const filteredOrders = orders?.filter(
    (order) =>
      order.product?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      order.status?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    setCompleted(orders?.filter((order) => order.status === "Completed")),
      [orders];
  });
  const sortedComplete = completed?.filter(
    (complete) =>
      complete.product?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      complete.status.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    setPending(orders?.filter((order) => order.status === "Pending")), [orders];
  });
  const sortedPending = pending?.filter(
    (pend) =>
      pend.product?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      pend.status.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  const navigate = useNavigate();

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    navigate("orders-view", { state: { order } }); // Redirects to the detailed view
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
      {/* {JSON.stringify(orders)} */}
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
            {/* {JSON.stringify(orders)} */}
            <CardContent>
              <div className="relative w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell text-center">
                        Order date
                      </TableHead>
                      <TableHead className="">Email</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      {/* <TableHead className="hidden md:table-cell text-center">
                      Total
                    </TableHead> */}
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fetching ? (
                      <TableRow>
                        <TableCell colSpan="7" className="text-center">
                          <Spinner />
                        </TableCell>
                      </TableRow>
                    ) : filteredOrders?.length > 0 ? (
                      filteredOrders?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.customer_id}</TableCell>
                          <TableCell>{order.username}</TableCell>
                          <TableCell className="hidden md:table-cell text-center">
                            {order.createdAt
                              ?.slice(0, 10)
                              ?.split("-")
                              ?.reverse()
                              ?.join("-")}
                          </TableCell>
                          <TableHead className="">{order.email}</TableHead>
                          <TableCell className="text-center">
                            {order.status === "Completed" ? (
                              <Badge variant="color3">{order.status}</Badge>
                            ) : order.status === "Pending" ? (
                              <Badge variant="color1">{order.status}</Badge>
                            ) : (
                              <Badge variant="color2">{order.status}</Badge>
                            )}
                          </TableCell>
                          {/* <TableCell className="hidden md:table-cell text-center">
                          {order.total}
                        </TableCell> */}
                          <TableCell>
                            <Button
                              style={{ background: globalColor.colors1 }}
                              variant="color3"
                              size="sm"
                              onClick={() => handleViewClick(order)}
                            >
                              <FaEye />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="6" className="text-center">
                          No order
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
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
                    {/* <TableHead className="hidden md:table-cell text-center">
                      Total
                    </TableHead> */}
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fetching ? (
                    <TableRow>
                      <TableCell colSpan="7" className="text-center">
                        <Spinner />
                      </TableCell>
                    </TableRow>
                  ) : sortedComplete?.length > 0 ? (
                    sortedComplete?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="hidden md:table-cell text-center">
                          {
                            order.createdAt
                            // // .slice(0, 10)
                            // .split("-")
                            // .reverse()
                            // .join("-")
                          }
                        </TableCell>
                        <TableHead className="text-center">
                          {order.shop_id}
                        </TableHead>
                        <TableCell className="text-center">
                          {order.status === "Completed" ? (
                            <Badge variant="color3">{order.status}</Badge>
                          ) : order.status === "Pending" ? (
                            <Badge variant="color1">{order.status}</Badge>
                          ) : (
                            <Badge variant="color2">{order.status}</Badge>
                          )}
                        </TableCell>
                        {/* <TableCell className="hidden md:table-cell text-center">
                          {order.total}
                        </TableCell> */}
                        <TableCell>
                          <Button
                            variant="color3"
                            size="sm"
                            onClick={() => handleViewClick(order)}
                          >
                            <FaEye />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="6" className="text-center">
                        No order
                      </TableCell>
                    </TableRow>
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
                    {fetching ? (
                      <TableRow>
                        <TableCell colSpan="7" className="text-center">
                          <Spinner />
                        </TableCell>
                      </TableRow>
                    ) : sortedPending?.length === 0 ? (
                      sortedPending?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell className="hidden md:table-cell text-center">
                            {
                              order.createdAt
                              // .slice(0, 10)
                              // .split("-")
                              // .reverse()
                              // .join("-")
                            }
                          </TableCell>
                          <TableHead className="text-center">
                            {order.shop_id}
                          </TableHead>
                          <TableCell className="text-center">
                            {order.status === "Completed" ? (
                              <Badge variant="color3">{order.status}</Badge>
                            ) : order.status === "Pending" ? (
                              <Badge variant="color1">{order.status}</Badge>
                            ) : (
                              <Badge variant="color2">{order.status}</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              style={{ background: globalColor.colors1 }}
                              variant="color3"
                              size="sm"
                              onClick={() => handleViewClick(order)} // This triggers the view action when clicked
                            >
                              <FaEye />{" "}
                              {/* Eye icon used for viewing details */}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="6" className="text-center">
                          No order
                        </TableCell>
                      </TableRow>
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
              {
                selectedOrder.createdAt
                // .slice(0, 10)
                // .split("-")
                // .reverse()
                // .join("-")
              }
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Order ID:</strong> {selectedOrder.order_no}
            </p>
            <p>
              <strong>Delivery ID:</strong> {selectedOrder.delivery_no}
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

export default AllOrders;
