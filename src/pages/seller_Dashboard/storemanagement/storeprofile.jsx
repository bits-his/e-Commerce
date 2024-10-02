import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../storemanagement/Storeprofile.css";
import pic1 from "../storemanagement/pics/pic1.jpg";
import pic2 from "../storemanagement/pics/pic2.jpg";
import pic3 from "../storemanagement/pics/pic3.jpg";
import pic4 from "../storemanagement/pics/pic4.jpg";
import logo from "../storemanagement/pics/brand.jpg";
import { Alert, Input } from "reactstrap";
import { globalColor, _get, separator } from "@/utils/Helper";
import { Search } from "lucide-react";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
let userDetails = localStorage.getItem("@@toke_$$_45598");

// const products = [
//   {
//     img: pic1,
//     title: "Home Decor",
//     price: "\u20A6 379.00"
//   },
//   {
//     img: pic2,
//     title: "Lotion",
//     price: "\u20A6 250.00"
//   },
//   {
//     img: pic3,
//     title: "Side Chair",
//     price: "\u20A6 375.00"
//   },
//   {
//     img: pic4,
//     title: "Apple m 3",
//     price: "\u20A6 879.00"
//   },
//   {
//     img: pic1,
//     title: "Home Decor",
//     price: "\u20A6 379.00"
//   },
//   {
//     img: pic2,
//     title: "Lotion",
//     price: "\u20A6 250.00"
//   },
//   {
//     img: pic3,
//     title: "Side Chair",
//     price: "\u20A6 375.00"
//   },
//   {
//     img: pic4,
//     title: "Apple m 3",
//     price: "\u20A6 879.00"
//   }
// ];

const Storeprofile = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState({
    shopName: "Shop Name",
    shopAddress: "Shop Address",
    contactName: "Marquez Javis Bell",
    contactPhone: "+1 123 456 7890",
    shopStreet: "2001 Fashion Ave",
    shopCity: "Eldorado, California 90210",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProduct = () => {
    setLoading(true)
    _get(
      `api/get-products?shop_id=${parseInt(userDetails)}`,
      (resp) => {
        setProducts(resp.result[0]);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated profile details
    handleClose();
  };

  return (
    <Container className="mt-3">
      <Card className="m-0">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h5>Shop Profile</h5>
          <Button className="btn2 btn-primary me-0" onClick={handleShow}>
            Edit Profile
          </Button>
        </div>
        <Card.Header className="warning" style={{ height: "6rem" }}>
          <div className="d-flex align-items-center h-100">
            <img
              src={logo}
              alt="Seller Logo"
              className="me-3"
              style={{ height: "5rem" }}
            />
            <div>
              <h6 className="mb-0">{profile.shopName}</h6>
              <p className="mb-0">{profile.shopAddress}</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card className="p-3" style={{ height: "10rem", width: "15rem" }}>
                <Col className="text-left">
                  <h5 className="mb-0">Sale</h5>
                  <h2>234</h2>
                </Col>
                <Col className="text-left">
                  <h5 className="mb-0">Revenue</h5>
                  <h2>2380</h2>
                </Col>
              </Card>
            </Col>
            <Col>
              <h4 className="mb-0">Contacts</h4>
              <small className="text-muted">{profile.contactName}</small> <br />
              <small className="text-muted">{profile.contactPhone}</small>
            </Col>
            <Col>
              <h4 className="mb-0">Address</h4>
              <small className="text-muted">{profile.shopStreet}</small> <br />
              <small className="text-muted">{profile.shopCity}</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h5 className="fw-bold" style={{fontSize: '20px'}}>Products</h5>
        <div className="relative ml-auto flex-1 md:grow-0 hidden md:inline">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[150px] lg:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      
      <Row>
        {loading ? (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 row-cols-xl-6 g-3">
            {skeleton.map((index) => (
              <div className="px-2" key={index}>
                <div className="shadow rounded p-0">
                  <div className="ratio ratio-1x1 bg-light overflow-hidden rounded-top">
                    <Skeleton className="h-100 w-100" />
                  </div>
                  <div className="px-2">
                    <Skeleton className="my-3 w-75" />
                    <Skeleton className="ps-2 w-50" />
                    <Skeleton className="mt-1 w-50" height={10} />
                    <Skeleton className="my-2 w-25" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts?.length > 0 ? (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 row-cols-xl-6 g-3 mt-0">
            {filteredProducts?.map((item, idx) => (
              <div
                key={idx}
                className="text-decoration-none"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="shadow rounded">
                  <div className="ratio ratio-1x1 bg-light overflow-hidden rounded-top">
                    <img
                      alt={item.product_name}
                      src={item.image_urls.split(",")[0]}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <h5 className="mt-3 mb-3 ps-2 fw-large text-dark">
                    {item.product_name.charAt(0).toUpperCase() +
                      item.product_name.slice(1)}
                  </h5>
                  <div className="mt-2 ps-2 d-flex flex-column">
                    <div className="d-flex rating">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <FaStar
                          key={rating}
                          className={`text-warning`}
                          style={{
                            height: "20px",
                            width: "20px",
                            flexShrink: 0,
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-1 mb-0 small text-muted">10 reviews</p>
                  </div>
                  <p className="mt-2 pb-3 ps-2 fw-medium text-muted small">
                    ₦{separator(item.product_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert
            style={{
              backgroundColor: globalColor.color3,
              borderColor: globalColor.color3,
              color: globalColor.color2,
            }}
          >
            {message}
          </Alert>
        )}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type="text"
                name="shopName"
                value={profile.shopName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Shop Address</Form.Label>
              <Form.Control
                type="text"
                name="shopAddress"
                value={profile.shopAddress}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                type="text"
                name="contactName"
                value={profile.contactName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="text"
                name="contactPhone"
                value={profile.contactPhone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="shopStreet"
                value={profile.shopStreet}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="shopCity"
                value={profile.shopCity}
                onChange={handleChange}
              />
            </Form.Group>
            <Button className="btn2" variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Storeprofile;
