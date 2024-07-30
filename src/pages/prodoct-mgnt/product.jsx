import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Table
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaSearch, FaSort, FaCog, FaPlusCircle, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import './product.css';

const ProductsPage = () => {
  const [modal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  const toggle = () => setModal(!modal);

  const handleImageChange = (acceptedFiles) => {
    if (acceptedFiles.length + images.length <= 4) {
      setImages([...images, ...acceptedFiles]);
    } else {
      alert('You can only upload up to 4 images.');
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: "New Product",
      category: "Category",
      price: "$100",
      quantity: 1
    };

    setProducts([...products, newProduct]);
    setModal(false);
  };

  const handleEditProduct = () => {
    const updatedProducts = products.map(product =>
      product.id === currentProduct.id
        ? { ...currentProduct, name: "Updated Product" } // Update with actual form values
        : product
    );

    setProducts(updatedProducts);
    setModal(false);
    setEditMode(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEditButtonClick = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setModal(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageChange,
    accept: 'image/*',
    maxFiles: 4 - images.length
  });

  const loadOptions = async (inputValue) => {
    const response = await axios.get(`https://api.example.com/categories?query=${inputValue}`);
    return response.data.map((category) => ({
      label: category.name,
      value: category.id
    }));
  };

  return (
    <Container fluid className="my-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-light">
          <Row className="first-container">
            <Col>
              <h1 className="card-title">Products</h1>
            </Col>
            <Col className="text-right">
              <button className="icon-button" disabled>
                <FaSearch />
              </button>
              <button className="icon-button ml-2" disabled>
                <FaSort />
              </button>
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
                  <Button color="primary" onClick={() => { setEditMode(false); toggle(); }}>
                    <FaPlus className="text-light" />
                  </Button>
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
              <Button color="primary" onClick={() => { setEditMode(false); toggle(); }} className="text-white py-2 px-1">
                <FaPlus /> Add product
              </Button>
              <Button color="secondary" className="ml-2">
                <FaCog /> Manage products
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3 className="mb-4">Product List</h3>
              <Table striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <Button color="warning" onClick={() => handleEditButtonClick(product)} className="mr-2">
                          <FaEdit />
                        </Button>
                        <Button color="danger" onClick={() => handleDeleteProduct(product.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{editMode ? 'Edit Product' : 'Add Product'}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6">
              <Label for="productImages">Upload Images (up to 4)</Label>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag & drop some files here, or click to select files</p>
                <Button color="secondary">
                  <FaPlusCircle /> Add Images
                </Button>
              </div>
              <Row className="mt-2">
                {images.map((image, index) => (
                  <Col key={index} xs="6" className="mb-2 position-relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`product-${index}`}
                      className="img-thumbnail"
                    />
                    <Button
                      close
                      className="position-absolute"
                      style={{ top: 0, right: 0 }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTimes />
                    </Button>
                  </Col>
                ))}
                {images.length < 4 && (
                  <Col xs="6" className="mb-2 d-flex align-items-center justify-content-center">
                    <div {...getRootProps({ className: 'dropzone add-more' })}>
                      <input {...getInputProps()} />
                      <FaPlusCircle size="2em" />
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
            <Col md="6">
              <Form>
                <FormGroup>
                  <Label for="productName">Product Name</Label>
                  <Input type="text" name="name" id="productName" placeholder="Enter product name" defaultValue={editMode ? currentProduct.name : ''} />
                </FormGroup>
                <FormGroup>
                  <Label for="productDescription">Description</Label>
                  <Input type="textarea" name="description" id="productDescription" placeholder="Enter product description" defaultValue={editMode ? currentProduct.description : ''} />
                </FormGroup>
                <FormGroup>
                  <Label for="productCategory">Category</Label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    id="productCategory"
                    defaultValue={editMode ? { label: currentProduct.category, value: currentProduct.categoryId } : null}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="productPrice">Price</Label>
                  <Input type="number" name="price" id="productPrice" placeholder="Enter product price" defaultValue={editMode ? currentProduct.price : ''} />
                </FormGroup>
                <FormGroup>
                  <Label for="productQuantity">Quantity</Label>
                  <div className="quantity-container">
                    <button className="quantity-button">-</button>
                    <Input type="number" name="quantity" id="productQuantity" className="quantity-input" defaultValue={editMode ? currentProduct.quantity : ''} />
                    <button className="quantity-button">+</button>
                  </div>
                </FormGroup>
                <Row className="mt-4">
                  <Col>
                    <Button color="primary" onClick={editMode ? handleEditProduct : handleAddProduct} className="w-100">
                      {editMode ? 'Save Changes' : 'Create Product'}
                    </Button>
                  </Col>
                  <Col>
                    <Button color="danger" onClick={handleAddProduct} className="w-100">Create & Add New</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default ProductsPage;
