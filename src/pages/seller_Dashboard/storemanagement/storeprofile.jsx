import React, { useState } from 'react';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../storemanagement/Storeprofile.css";
import pic1 from "../storemanagement/pics/pic1.jpg";
import pic2 from "../storemanagement/pics/pic2.jpg";
import pic3 from "../storemanagement/pics/pic3.jpg";
import pic4 from "../storemanagement/pics/pic4.jpg";
import logo from "../storemanagement/pics/brand.jpg";

const products = [
  {
    img: pic1,
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
  },
  {
    img: pic1,
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

const Storeprofile = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({
    shopName: "Shop Name",
    shopAddress: "Shop Address",
    contactName: "Marquez Javis Bell",
    contactPhone: "+1 123 456 7890",
    shopStreet: "2001 Fashion Ave",
    shopCity: "Eldorado, California 90210"
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated profile details
    handleClose();
  };

  return (
    <Container className='mt-3'>
      <Card className='m-0'>
        <div className='d-flex justify-content-between p-3'>
          <h5>Seller Profile</h5>
          <Button className=' btn btn-primary' onClick={handleShow}>Edit Profile</Button>
        </div>
        <Card.Header className='warning' style={{ height: "6rem" }}>
          <div className='d-flex align-items-center h-100'>
            <img src={logo} alt="Seller Logo" className='me-3' style={{ height: "5rem" }} />
            <div>
              <h6 className='mb-0'>{profile.shopName}</h6>
              <p className='mb-0'>{profile.shopAddress}</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card className='p-3' style={{ height: "10rem", width: "15rem" }}>
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
              <small className='text-muted'>{profile.contactName}</small> <br />
              <small className='text-muted'>{profile.contactPhone}</small>
            </Col>
            <Col>
              <h4 className='mb-0'>Address</h4>
              <small className='text-muted'>{profile.shopStreet}</small> <br />
              <small className='text-muted'>{profile.shopCity}</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h5 className='mt-4'>Products</h5>
      <Row>
        {products.map((product, index) => (
          <Col key={index} md={3}>
            <Card className='mb-4'>
              <Card.Img variant="top" className='imgtag' src={product.img} />
              <Card.Body className='product'>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Shop Name</Form.Label>
              <Form.Control type="text" name="shopName" value={profile.shopName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Shop Address</Form.Label>
              <Form.Control type="text" name="shopAddress" value={profile.shopAddress} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Contact Name</Form.Label>
              <Form.Control type="text" name="contactName" value={profile.contactName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control type="text" name="contactPhone" value={profile.contactPhone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Street</Form.Label>
              <Form.Control type="text" name="shopStreet" value={profile.shopStreet} onChange={handleChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="shopCity" value={profile.shopCity} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Storeprofile;
