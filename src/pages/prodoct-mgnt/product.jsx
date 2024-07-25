import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import { FaPlus, FaSearch, FaSort, FaCog } from 'react-icons/fa'; // Import React Icons
import './product.css'; // Import the custom CSS file

const ProductsPage = () => {
  return (
    <Container fluid className="my-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-light">
          <Row>
            <Col>
              <h1 className="card-title">Products</h1>
            </Col>
            <Col className="text-right">
              <Button color="secondary" disabled>
                <FaSearch />
              </Button>
              <Button color="secondary" className="ml-2" disabled>
                <FaSort />
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="mb-4">
            <Col className='d-flex justify-content-betwee'>
              <Nav pills >
                <NavItem>
                  <NavLink active className='bg-secondary p-2 w-100 '>
                     All
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='p-2 mr-3 w-100 bg-secondary'>
                    <FaPlus className=" text-light" /> 
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>

          <Row className="my-4">
            <Col>
              <h2 className="card-subtitle">Add your products</h2>
              <p className="card-text">
                Start by stocking your store with products your customers will love.
              </p>
              <Button color="primary" href="addproduct">
                <FaPlus /> Add product
              </Button>
              <Button color="secondary" className="ml-2">
                <FaCog /> Manage products
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ProductsPage;
