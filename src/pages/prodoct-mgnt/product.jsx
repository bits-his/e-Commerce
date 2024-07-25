import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
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
            <Col className='d-flex justify-content-between'>
              <Nav pills>
                <NavItem>
                  <NavLink
                    to="/all"
                    className={({ isActive }) => 
                      `p-2 w-100 ${isActive ? 'bg-secondary text-light' : ''}`
                    }
                  >
                    All
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/addproduct"
                    className={({ isActive }) => 
                      `p-2 mr-3 w-100 ${isActive ? 'bg-secondary text-light' : ''}`
                    }
                  >
                    <FaPlus className="text-light" />
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
              <NavLink
                className='btn btn-primary add-product text-white py-2 px-1'
                to="addproduct"
              >
                <FaPlus /> Add product
              </NavLink>
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
