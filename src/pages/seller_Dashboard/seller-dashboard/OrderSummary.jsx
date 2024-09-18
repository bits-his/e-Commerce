import React, { useState, useEffect } from "react";
import { CardBody, CardText } from "reactstrap";
import { FaClipboardList, FaCheckCircle, FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DollarSign, TableOfContents, Loader, PackageCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const navigate = useNavigate(); // Initialize navigate for navigation

  useEffect(() => {
    // Set static counts for the cards
    const counts = {
      total: 5,
      approved: 2,
      pending: 2,
    };

    setOrderCounts(counts);
  }, []);

  const handleCardClick = (type) => {
    navigate(`/seller-dashboard/orders/${type}`); // Navigate to the specific order type page
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
