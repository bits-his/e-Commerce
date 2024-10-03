import React, { useState,useEffect } from "react";
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
import { _get, globalColor } from "@/utils/Helper";
import { Badge, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaEye } from "react-icons/fa";

const VendorOrderView = () => {
   const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
     const location = useLocation();
  const order = location.state?.order;
  const userDetails = localStorage.getItem("@@toke_$$_45598");

  const getAllOrders = () => {
    setFetching(true);
    _get(
      `api/getshoporders?shop_id=${parseInt(userDetails)}`,
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

  const filteredOrders = orders?.filter(
    (orders) => orders.product.toLowerCase().includes(searchQuery.toLowerCase())
    // || order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCompleted(orders?.filter((orders) => orders.status === "Completed")),
      [orders];
  });
  const sortedComplete = completed?.filter(
    (complete) =>
      complete.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complete.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setPending(orders?.filter((order) => order.status === "Pending")), [orders];
  });
  const sortedPending = pending?.filter(
    (pend) =>
      pend.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pend.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!order) {
    return <div>No order details found.</div>;
  }


  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[92vh]">
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
                  <TableCell>
                    {order ? order.phone : "N/A"}
                  </TableCell>
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
                  <TableHead className="hidden md:table-cell">
                  Address
                  </TableHead>
                  <TableCell className="hidden md:table-cell">
                    {order ? order.address : "N/A"}
                  </TableCell>
                </TableRow>
            </Table>
            <CardHeader className="">
            <div className="flex-items-center justify-between">
              <CardTitle>Ordered Items</CardTitle>
            </div>
          </CardHeader>
            <div className="relative w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="">
                      Order date
                    </TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Shop ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((orders) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <img
                          src={orders.order_image}
                          alt={orders.product}
                          className="aspect-square rounded-md object-cover"
                          width="64"
                          height="64"
                        />
                        {/* {orders?.customer_id} */}
                      </TableCell>
                      <TableCell>{orders?.product}</TableCell>
                      <TableCell>{orders?.quantity}</TableCell>
                      <TableCell className="">
                        {
                          orders?.createdAt
                          .slice(0, 10)
                        }
                      </TableCell>
                      <TableCell>{orders?.order_no}</TableCell>
                      <TableCell>{orders?.status}</TableCell>
                      <TableHead className="text-center">
                        {orders?.shop_id}
                      </TableHead>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan="6" className="text-center">
                      No order
                    </TableCell>
                  </TableRow>
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
