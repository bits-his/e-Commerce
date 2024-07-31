import React from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import {
  FaShoppingBag,
  FaArrowUp,
  FaCalendarTimes,
  FaPlusCircle,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const InventoryItem = () => {
  return (
    <Col lg={4} md={12} className="d-flex px-md-2 px-sm-3 py-2">
      <div className="card w-100 p-2">
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <div className="p-4 rounded bg-dark"></div>
            <div className="d-flex flex-column ms-2">
              <span>Seller name</span>
              <small>#124.43</small>
            </div>
          </div>
          <div className="p-1 btn btn-outline-secondary rounded d-flex align-item-center">
            <BsThreeDots />
          </div>
        </div>
        
      </div>
    </Col>
  );
};

export default function Inventory() {
  return (
    <Container fluid className="px-3">
      <div className="d-flex justify-content-between align-items-end pb-3">
        <div className="d-flex flex-column">
          <h1 className="fw-bold">Inventory</h1>
          <small>
            Home {">"} Report {">"} Inventory
          </small>
        </div>

        <Button
          variant="dark"
          className="d-flex align-items-center p-1 mb-1"
          onClick={console.log("clicked")}
        >
          <FaPlusCircle className="me-2" />
          <small>Add new product</small>
        </Button>
      </div>
      <Row>
        <InventoryItem />
      </Row>
    </Container>
  );
}
