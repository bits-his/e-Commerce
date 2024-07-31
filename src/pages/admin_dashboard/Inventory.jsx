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
        <div className="d-flex align-items-start justify-content-between mb-3 mt-0">
          <div className="d-flex align-items-center">
            <div className="rounded bg-dark" style={{padding: '2.4rem'}}></div>
            <div className="d-flex flex-column ms-2">
                <div className="d-flex flex-column mb-2">
                    <span style={{fontSize: '1rem', fontWeight: '600', overflowX: 'auto'}}>Seller name</span>
                    <i style={{fontSize: '0.8rem', overflowX: 'auto'}}>Seller name</i>
                </div>
              
                <small className="fw-bold">#124.43</small>
            </div>
          </div>
          <div className="p-1 btn btn-outline-secondary rounded d-flex align-item-center">
            <BsThreeDots />
          </div>
        </div>
        <div className="d-flex flex-column mb-3 mt-0">
            <small className="mb-0" style={{fontSize: '1rem', fontWeight: '600'}}>wdefrgt</small>
            <small>ynh 99 9eho v;;fdkvn; kkh i hd ioh  opjo o   oj oid </small>
        </div>
        <div className="d-flex flex-column mb-3 mt-0 border border-1 rounded p-2">
            
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
