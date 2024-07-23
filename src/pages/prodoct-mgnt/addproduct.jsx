import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
Input,
  Button,
  FormText
} from 'reactstrap';
import './addProduct.css'; // Import custom CSS for styling

const AddProductPage = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    media: '',
    image: '',
    category: '',
    pricing: '',
    margins: '',
    inventory: '',
    shipping: '',
    variants: '',
    status: '',
    publishing: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
  };

  return (
    <Container className="">
      <Row className="justify-content-center">
        <Col lg={12} md={12}>
          <div className="form-container">
            <h1 className="text-center mb-4">Add New Product</h1>
            <Form onSubmit={handleSubmit}>
              <div className="flex-container">
                <FormGroup className="form-group-card">
                  <Label for="title">Product Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={product.title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    required
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="media">Media URL</Label>
                  <Input
                    type="text"
                    name="media"
                    id="media"
                    value={product.media}
                    onChange={handleChange}
                    placeholder="Enter media URL"
                  />
                  <FormText color="muted">
                    Link to media related to the product (e.g., video, external link).
                  </FormText>
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="image">Image URL</Label>
                  <Input
                    type="text"
                    name="image"
                    id="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="category">Category</Label>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                  </Input>
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="pricing">Pricing</Label>
                  <Input
                    type="text"
                    name="pricing"
                    id="pricing"
                    value={product.pricing}
                    onChange={handleChange}
                    placeholder="Enter pricing details"
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="margins">Margins</Label>
                  <Input
                    type="text"
                    name="margins"
                    id="margins"
                    value={product.margins}
                    onChange={handleChange}
                    placeholder="Enter margins"
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="inventory">Inventory</Label>
                  <Input
                    type="number"
                    name="inventory"
                    id="inventory"
                    value={product.inventory}
                    onChange={handleChange}
                    placeholder="Enter inventory count"
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="shipping">Shipping</Label>
                  <Input
                    type="text"
                    name="shipping"
                    id="shipping"
                    value={product.shipping}
                    onChange={handleChange}
                    placeholder="Enter shipping details"
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="variants">Variants</Label>
                  <Input
                    type="text"
                    name="variants"
                    id="variants"
                    value={product.variants}
                    onChange={handleChange}
                    placeholder="Enter product variants"
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="status">Status</Label>
                  <Input
                    type="text"
                    name="status"
                    id="status"
                    value={product.status}
                    onChange={handleChange}
                    placeholder="Enter product status"
                  />
                </FormGroup>
                <FormGroup className="form-group-card">
                  <Label for="publishing">Publishing</Label>
                  <Input
                    type="text"
                    name="publishing"
                    id="publishing"
                    value={product.publishing}
                    onChange={handleChange}
                    placeholder="Enter publishing details"
                  />
                </FormGroup>
              </div>
              <Button className="btn-primary mt-3" type="submit">Save Product</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductPage;
