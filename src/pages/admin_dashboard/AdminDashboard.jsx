import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button
} from "reactstrap";
import { FaShoppingBag, FaArrowUp, FaCalendarTimes } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const SalesAndOrder = () => {
  return (
    <Col lg={4} md={12} className="d-flex flex-column px-md-2 px-sm-3 py-2">
      <div className="card mb-0 px-2 pt-3 pb-4">
        <div className="d-flex justify-content-between align-items-center pb-3">
          Total Orders
          <BsThreeDotsVertical />
        </div>
        <div className="">
          <div className="d-flex align-items-center justify-content-between">
            <span className="d-flex align-items-center">
              <b
                className="p-2 rounded bg-primary text-white d-flex align-items-center me-2"
                style={{ width: "30px" }}
              >
                <FaShoppingBag />
              </b>
              <b>#125.500</b>
            </span>
            <span className="d-flex align-items-center">
              <FaArrowUp />
              <i>30.21%</i>
            </span>
          </div>
          <div className="text-end">
            <small>Compared to Jun 2024</small>
          </div>
        </div>
      </div>
    </Col>
  );
};

const Seller = ()=>{
  return(
    <div className="d-flex align-items-center justify-content-between mb-3 mt-0 px-2">
      <div className="d-flex align-items-center">
        <div className="p-4 rounded bg-dark"></div>
        <div className="d-flex flex-column ms-2">
          <span>Seller name</span>
          <small>#124.43</small>
        </div>
      </div>
      <div className="d-flex flex-column">
        <b>#124.43</b>
        <small>999 sales</small>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-end pb-3">
          <div className="d-flex flex-column">
            <h1 className="text-">Dashboard</h1>
            <small>Home {'>'} Dashboard</small>
          </div>
          
          <Button variant="dark-outline" className="d-flex align-items-center p-1" onClick={console.log("clicked")}>
            <FaCalendarTimes className="me-1"/> Select Date Range
          </Button>
        </div>
        <Row>
          <SalesAndOrder/>
          <SalesAndOrder/>
          <SalesAndOrder/>
        </Row>
        <Row>
          <Col lg={7} md={12} className="p-2">
            <div className="card">1</div>
          </Col>
          <Col lg={5} md={12} className="p-2">
            <div className="card px-2 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <b>Best Sellers</b>
                <BsThreeDotsVertical />
              </div>
              <hr class="border border-dark border-1 opacity-50 mt-3 mb-2"/>
              <Seller />
              <Seller />
              <Seller />
            </div>
          </Col>
        </Row>
        <Row className="px-md-2 px-sm-3">
          <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <b>Best Sellers</b>
              <BsThreeDotsVertical />
            </div>

            <hr class="border border-dark border-1 opacity-50 mt-3 mb-2"/>

            <div className='table-responsive'>
              <table className="table table-hover mt-2">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}
