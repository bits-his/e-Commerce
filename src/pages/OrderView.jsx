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
import { Badge, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import "./style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [approved, setApproved] = useState([]);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const location = useLocation();
  const order = location.state?.order;
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const getAllOrders = () => {
    setFetching(true);
    _get(
      `api/gerordersbycustomerid?customer_id=${order.customer_id}`,
      (resp) => {
        setOrders(resp.results);
        console.log(orders);
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

  // const getTodayDate = () => {
  //   const today = new Date();
  //   return today.toISOString().split("T")[0];
  // };
  // // Filter orders for today's date
  // const filterTodayOrders = (ordersList) => {
  //   const todayDate = getTodayDate();
  //   return ordersList.filter(
  //     (order) => order.createdAt.slice(0, 10) === todayDate
  //   );
  // };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getDateNDaysAgo = (n) => {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().split("T")[0];
  };

  // Filter orders from the last 3 days
  const filterRecentOrders = (ordersList) => {
    const todayDate = getTodayDate();
    const threeDaysAgoDate = getDateNDaysAgo(3);

    return ordersList.filter(
      (order) =>
        order.createdAt.slice(0, 10) >= threeDaysAgoDate &&
        order.createdAt.slice(0, 10) <= todayDate
    );
  };

  const filteredOrders = (orderList, isAll = false) => {
    const baseList = isAll ? orderList : filterRecentOrders(orderList);
    return baseList.filter(
      (order) =>
        order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    setCompleted(orders.filter((order) => order.status === "Completed"));
    setPending(orders.filter((order) => order.status === "Pending"));
    setApproved(orders.filter((order) => order.status === "Approved"));
    setDelivered(orders.filter((order) => order.status === "Delivered"));
  }, [orders]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  if (!order) {
    return <div>No order details found.</div>;
  }

  const [activeTab, setActiveTab] = useState(false); // Track the active tab

  const handleButtonClick = () => {
    alert("Button in approved tab clicked!");
    console.log("Button in approved tab clicked!");
    // Add your button logic here
  };

  const handleTabChange = () => {
    setActiveTab(!activeTab);
  };

  const handleValidateOrder = (id, status) => {
    setLoadingOrderId(id);
    const obj = { id, status };

    _put(
      "api/aproveorder",
      obj,
      (res) => {
        setLoadingOrderId(null);
        if (res.success) {
          toast.success(`Order ${status} successfully`);
          getAllOrders();
        } else {
          toast.error("Error updating order status");
        }
      },
      (err) => {
        setLoadingOrderId(null);
        console.log(err);
        toast.error("An error occurred while updating status");
      }
    );
  };

  // Handle bulk order validation
 const handleBulkOrder = () => {
  if (selectedOrders.length === 0) {
    toast.error("Please select at least one order to update");
    return;
  }

  // Filter the selected orders to include only those in the 'Approved' tab
  const approvedOrders = selectedOrders.filter((id) => {
    const order = orders.find((order) => order.id === id);
    return order && order.status === "Approved"; // Check if the order is in the 'Approved' tab
  });

  if (approvedOrders.length === 0) {
    toast.error("No approved orders selected for delivery");
    return;
  }

  approvedOrders.forEach((id) => handleValidateOrder(id, "Delivered"));
  setSelectedOrders([]);
  setSelectAll(false);
};


  // Handle order selection
  const handleSelectOrder = (id) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((orderId) => orderId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Handle select all orders
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[92vh]">
        <div>
          <Button
            onClick={goBack}
            className=" d-flex align-items-center back-btn"
            style={{ backgroundColor: "#542b2b" }}
          >
            <FaArrowLeft className="me-2" />
            Back
          </Button>
        </div>

        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader className="">
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

          {/* {JSON.stringify(orders)} */}
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
              {/* <TableRow>
                  <TableHead className="hidden md:table-cell">
                    Shop Name
                  </TableHead>
                  <TableCell className="hidden md:table-cell">
                    {order ? order.shopname : "N/A"}
                  </TableCell>
                </TableRow> */}
              <TableRow>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableCell className="hidden md:table-cell">
                  {order ? order.address : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="">Delivery Address</TableHead>
                <TableCell className="">
                  {order ? order.delivery_address : "N/A"}
                </TableCell>
              </TableRow>
            </Table>
            <CardHeader className=""></CardHeader>
            {fetching ? (
              <div className="flex justify-center items-center py-8">
                <Spinner />
              </div>
            ) : (
              <Tabs defaultValue="pending">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    <TabsTrigger value="complete">Completed</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all">
                  {filteredOrders(orders, true).length > 0 ? (
                    <TableSection
                      orders={filteredOrders(orders, true)}
                      title="All Orders"
                    />
                  ) : (
                    <Card className="text-center p-4">
                      <p className="text-center text-muted">
                        There are no orders.
                      </p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="complete">
                  {filteredOrders(completed).length > 0 ? (
                    <TableSection
                      orders={filteredOrders(completed)}
                      title="Completed Orders"
                    />
                  ) : (
                    <Card className="text-center p-4">
                      <p className="text-center text-muted">
                        There are no completed orders.
                      </p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="approved">
                  {filteredOrders(approved).length > 0 ? (
                    <TableSection
                      orders={filteredOrders(approved)}
                      title="Approved Orders"
                      activeTab={handleTabChange}
                      handleValidateOrder={handleValidateOrder  }
                      handleBulkOrder={handleBulkOrder}
                      handleSelectAll={handleSelectAll}
                      selectAll={selectAll}
                      selectedOrders={selectedOrders}
                      handleSelectOrder={handleSelectOrder}
                    />
                  ) : (
                    <Card className="text-center p-4">
                      <p className="text-center text-muted">
                        There are no approved orders.
                      </p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="pending">
                  {filteredOrders(pending).length > 0 ? (
                    <TableSection
                      orders={filteredOrders(pending)}
                      title="Pending Orders"
                    />
                  ) : (
                    <Card className="text-center p-4">
                      <p className="text-center text-muted">
                        There are no pending orders.
                      </p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="delivered">
                  {filteredOrders(delivered).length > 0 ? (
                    <TableSection
                      orders={filteredOrders(delivered)}
                      title="Delivered Orders"
                    />
                  ) : (
                    <Card className="text-center p-4">
                      <p className="text-center text-muted">
                        There are no delivered orders.
                      </p>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const TableSection = ({
  orders,
  title,
  searchQuery,
  setSearchQuery,
  activeTab,
  handleButtonClick,
  handleValidateOrder,
  handleBulkOrder,
  handleSelectAll,
  selectAll = false,
  selectedOrders = [],
  handleSelectOrder,
}) => (
  <div>
    <CardHeader>
      <div className="flex items-center">
        <CardTitle>{title}</CardTitle>

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
    {activeTab ? (
      <Button
        variant="color1"
        size="sm"
        className="h-8 gap-1"
        onClick={handleBulkOrder}
      >
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Deliver Selected
        </span>
      </Button>
    ) : null}
    <div className="relative w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {activeTab ? (
              <TableHeader>
                <Input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: 20,
                    marginTop: 15,
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </TableHeader>
            ) : null}
            <TableHead className="hidden sm:table-cell">Image</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Shop ID</TableHead>
            {activeTab ? (
              <TableHead className="text-center w-[50px]">Action</TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {activeTab ? (
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
              ) : null}
              <TableCell>
                <img
                  src={order.order_image}
                  alt={order.product}
                  className="aspect-square rounded-md object-cover"
                  width="64"
                  height="64"
                />
              </TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
              <TableCell>{order.order_no}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="text-center">{order.shop_id}</TableCell>

              {activeTab ? (
                <TableCell>
                  <Button
                    variant="color1"
                    size="sm"
                    onClick={() => handleValidateOrder(order.id, "Delivered")}
                  >
                    Deliver
                  </Button>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default OrderView;
