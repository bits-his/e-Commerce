import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../storemanagement/Storeprofile.css";

const products = [
  {
    img: "https://via.placeholder.com/150",
    title: "GoPro Camera Black",
    price: "$379.00"
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Speaker for Music",
    price: "$250.00"
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Samsung Smartwatch",
    price: "$375.00"
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Apple iPhone 12",
    price: "$879.00"
  }
];

function Storeprofile() {
  return (
    <Container className='mt-3'>
      <Card className='m-0'>
        <div className='d-flex justify-content-between p-3'>
          <h5>Seller Profile</h5>
          <Button className='btn-primary'>Edit Profile</Button>
        </div>
        <Card.Header className='bg-warning' style={{ height: "6rem" }}>
          <div className='d-flex align-items-center h-100'>
            <img src="https://via.placeholder.com/150" alt="Seller Logo" className='me-3' style={{ height: "5rem" }} />
            <div>
              <h6 className='mb-0'>Shop Name</h6>
              <p className='mb-0'>2001 Fashion Ave, Eldorado, California 90210</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className='text-center'>
              <h6 className='mb-0'>234</h6>
              <small className='text-muted'>Sales</small>
            </Col>
            <Col className='text-center'>
              <h6 className='mb-0'>$2380</h6>
              <small className='text-muted'>Revenue</small>
            </Col>
            <Col className='text-center'>
              <h6 className='mb-0'>Contacts</h6>
              <small className='text-muted'>Marquez Javis Bell</small>
              <small className='text-muted'>+1 123 456 7890</small>
            </Col>
            <Col className='text-center'>
              <h6 className='mb-0'>Address</h6>
              <small className='text-muted'>2001 Fashion Ave</small>
              <small className='text-muted'>Eldorado, California 90210</small>
            </Col>
            <Col className='text-center'>
              <img src="https://via.placeholder.com/100" alt="Map" className='img-fluid' />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h5 className='mt-4'>Products</h5>
      <Row>
        {products.map((product, index) => (
          <Col key={index} md={3}>
            <Card className='mb-4'>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Storeprofile;
