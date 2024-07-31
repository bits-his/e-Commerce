import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { FaShoppingBag, FaArrowUp, FaCalendarTimes, FaPlusCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Inventory() {
  return (
    <Container fluid>
        <div className="d-flex justify-content-between align-items-end pb-3">
          <div className="d-flex flex-column">
            <h1 className="fw-bold">Dashboard</h1>
            <small>Home {'>'} Dashboard</small>
          </div>
          
          <Button variant="dark" className="d-flex align-items-center p-1 mb-1" onClick={console.log("clicked")}>
            <FaPlusCircle className="me-2"/> 
            <small>Add new product</small>
          </Button>
        </div>
    </Container>
  )
}
