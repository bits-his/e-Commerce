import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../storemanagement/Storeprofile.css";
import pic1 from "../storemanagement/pics/pic1.jpg";
import pic2 from "../storemanagement/pics/pic2.jpg";
import pic3 from "../storemanagement/pics/pic3.jpg";
import pic4 from "../storemanagement/pics/pic4.jpg";
import logo from "../storemanagement/pics/brand.jpg";


const products = [
  {
    img:  pic1,
    title: "Home Decoring Flower",
    price: "\u20A6 379.00"
  },
  {
    img: pic2,
    title: "Lotion",
    price: "\u20A6 250.00"
  },
  {
    img: pic3,
    title: "Side Chair",
    price: "\u20A6 375.00"
  },
  {
    img: pic4,
    title: "Apple m 3",
    price: "\u20A6 879.00"
  },
  {
    img:  pic1,
    title: "Home Decor",
    price: "\u20A6 379.00"
  },
  {
    img: pic2,
    title: "Lotion",
    price: "\u20A6 250.00"
  },
  {
    img: pic3,
    title: "Side Chair",
    price: "\u20A6 375.00"
  },
  {
    img: pic4,
    title: "Apple m 3",
    price: "\u20A6 879.00"
  }
];

function Storeprofile() {
  return (
    <Container className='mt-3'>
      <Card className='m-0'>
        <div className='d-flex justify-content-between p-3'>
          <h5>Seller Profile</h5>
          <Button className='btn-primary'>Add Product</Button>
        </div>
        <Card.Header className='warning' style={{ height: "6rem" }}>
          <div className='d-flex align-items-center h-100'>
            <img src={logo} alt="Seller Logo" className='me-3' style={{ height: "5rem" }} />
            <div>
              <h6 className='mb-0'>Shop Name</h6>
              <p className='mb-0'>Shop Address</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          
          <Row>
            <Col>
            <Card className='p-3' style={{height:"10rem", width:"15rem"}}>
            <Col className='text-left'>
              <h5 className='mb-0'>Sale</h5>
              <h2>234</h2>
            </Col>
            <Col className='text-left'>
              <h5 className='mb-0'>Revenue</h5>
              <h2>2380</h2>
            </Col>
            </Card>
            </Col>
            <Col>
              <h4 className='mb-0'>Contacts</h4>
              <small className='text-muted'>Marquez Javis Bell</small> <br></br>
              <small className='text-muted'>+1 123 456 7890</small>
            </Col>
            <Col>
              <h4 className='mb-0'>Address</h4>
              <small className='text-muted'>2001 Fashion Ave</small> <br></br>
              <small className='text-muted'>Eldorado, California 90210</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h5 className='mt-4'>Products</h5>
      <Row>
        {products.map((product, index) => (
          <Col key={index} md={3}>
            <Card className='mb-4 product'>
              <Card.Img variant="top" className='imgtag' src={product.img} />
              <Card.Body >
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
