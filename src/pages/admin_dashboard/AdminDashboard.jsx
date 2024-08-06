import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
import Adminchart from './adminchart'
import "../admin_dashboard/Admindashboard.css";


const SalesAndOrder = () => {
  return (
    <Col lg={4} md={12} className="d-flex flex-column px-md-2 px-sm-3 py-2">
      <div className="card mb-0 px-2 pt-3 pb-4 cardstyle">
        <div className="d-flex justify-content-between align-items-center pb-3">
          Total 
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
            <span className="d-flex align-items-center progress">
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
  const cardStyle = {
    height: '400px', 
    display: 'flex',
    flexDirection: 'column',
    paddingTop:'30px',
    paddingBottom:'30px',
   
    justifyContent: 'center'
  };

  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-start pb-3">
          <div className="d-flex flex-column">
            <h1 className="">Dashboard</h1>
            <small>Home {'>'} Dashboard</small>
          </div>
          
          <Button variant="dark-outline" className="d-flex align-items-center p-1 mt-3" onClick={console.log("clicked")}>
            <FaCalendarTimes className="me-1"/> Select Date Range
          </Button>
        </div>
        <Row className="mb-2">
          <SalesAndOrder/>
          <SalesAndOrder/>
          <SalesAndOrder/>
        </Row>
        <Row className="align-items-center mb-0">
          <Col lg={7} md={12} className="p-2">
            <div className="" style={cardStyle}><Adminchart/></div>
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
                    <th><input type="checkbox" className="form-check-input p-0" /></th>
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
                    <td><input type="checkbox" className="form-check-input p-0" /></td>
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
