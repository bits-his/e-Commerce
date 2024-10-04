import React, { useState, useEffect } from "react";
import { CardBody, CardText } from "reactstrap";
import { FaClipboardList, FaCheckCircle, FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  TableOfContents,
  Loader,
  PackageCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { _get } from "@/utils/Helper";

const orderTypes = [
  {
    type: "total",
    title: "Total Orders",
    icon: <TableOfContents className="h-4 w-4 text-muted-foreground" />,
    description: "",
  },
  {
    type: "approved",
    title: "Approved Orders",
    icon: <PackageCheck className="h-4 w-4 text-muted-foreground" />,
    description: "",
  },
  {
    type: "pending",
    title: "Pending Orders",
    icon: <Loader className="h-4 w-4 text-muted-foreground" />,
    description: "",
  },
];

const OrderSummary = () => {
  const [orderCounts, setOrderCounts] = useState({});
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userDetails = localStorage.getItem("@@toke_$$_45598");

  const getAllOrders = () => {
    setLoading(true);
    _get(
      `api/gerordersbyshopid?shop_id=${parseInt(userDetails)}`,
      (resp) => {
        setOrders(resp.results);
        setLoading(false);
        console.log(orders);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    const totalOrders = orders?.length;
    const approvedOrders = orders?.filter(
      (order) => order.status === "Approved"
    )?.length;
    const pendingOrders = orders?.filter(
      (order) => order.status === "Pending"
    )?.length;

    const counts = {
      total: totalOrders,
      approved: approvedOrders,
      pending: pendingOrders,
    };

    setOrderCounts(counts);
  }, [orders]);

  const handleCardClick = (type) => {
    navigate(`/seller-dashboard/orders/total`); // Navigate to the specific order type page
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {orderTypes.map(({ type, title, icon, description }) => (
          <Card
            x-chunk="dashboard-01-chunk-0"
            key={type}
            onClick={() => handleCardClick(type)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderCounts[type] || 0}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default OrderSummary;
