import React, { useState, useEffect } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import { FaArrowUp, FaPlusCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { _get } from "@/utils/Helper";

const InventoryItem = (props) => {
  return (
    <Col lg={4} md={6} sm={6} xs={12} className="d-flex px-md-2 px-sm-3 py-2">
      <div className="card w-100 p-2 mb-0">
        <div className="d-flex align-items-start justify-content-between mb-3 mt-0">
          <div className="d-flex align-items-center">
            <div
              className="rounded bg-dark"
              style={{ padding: "2.4rem" }}
            ></div>
            <div className="d-flex flex-column ms-2">
              <div className="d-flex flex-column mb-2">
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    overflowX: "auto",
                  }}
                >
                  Brand name
                </span>
                <i style={{ fontSize: "0.8rem", overflowX: "auto" }}>name</i>
              </div>

              <small className="fw-bold">#124.43</small>
            </div>
          </div>
          <div className="p-1 btn btn-outline-secondary rounded d-flex align-item-center">
            <BsThreeDots />
          </div>
        </div>
        <div className="d-flex flex-column mb-3 mt-0">
          <small
            className="mb-0"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Summary
          </small>
          <small>
            This is the summary of the product in this card that tells about the
            item.
          </small>
        </div>
        <div className="d-flex flex-column mb-3 mt-0 border border-1 rounded py-2 px-3">
          <div
            style={{ fontSize: "12px" }}
            className="d-flex justify-content-between align-items-center"
          >
            <small>sales</small>
            <div className="d-flex align-items-center ">
              <FaArrowUp className="me-1 text-warning" />
              <i>123</i>
            </div>
          </div>
          <hr class="border border-dark border-1 opacity-25 my-1" />
          <div
            style={{ fontSize: "12px" }}
            className="d-flex justify-content-between align-items-center"
          >
            <small>Remaining product</small>
            <div className="d-flex align-items-center ">
              <i>456</i>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    _get(
      `api/getallproducts`,
      (res) => {
        setInventory(res.result[0]);
        console.log(inventory)
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, []);

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
        {inventory.map((item)=>
          <InventoryItem props={item}/>
        )
        }</Row>
    </Container>
  );
}
