import React, { useState, useCallback } from 'react';
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
import { IoMdClose } from 'react-icons/io';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  
  const [imagePreview, setImagePreview] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setProduct({ ...product, image: file });
    }
  }, [product]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Product added successfully!');
    setPreviewVisible(true); // Show the preview section after successful save
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setProduct({ ...product, image: '' });
  };

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleEdit = () => {
    setPreviewVisible(false);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={12} md={12}>
          {!previewVisible ? (
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
                    <Label for="image">Image</Label>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Drag & drop an image here, or click to select one</p>
                    </div>
                    {imagePreview && (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                        <div className="remove-image" onClick={handleRemoveImage}>
                          <IoMdClose size={20} color="#dc3545" />
                        </div>
                      </div>
                    )}
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
                      <option value="">Select a category77</option>
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
                <Button className="btn-secondary mt-3 ml-2" type="button" onClick={handlePreview}>Preview Product</Button>
              </Form>
            </div>
          ) : (
            <div className="preview-section">
              <h2>Product Preview</h2>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
              <div className="product-details">
                <p><strong>Title:</strong> {product.title}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Media URL:</strong> {product.media}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Pricing:</strong> {product.pricing}</p>
                <p><strong>Margins:</strong> {product.margins}</p>
                <p><strong>Inventory:</strong> {product.inventory}</p>
                <p><strong>Shipping:</strong> {product.shipping}</p>
                <p><strong>Variants:</strong> {product.variants}</p>
                <p><strong>Status:</strong> {product.status}</p>
                <p><strong>Publishing:</strong> {product.publishing}</p>
              </div>
              <Button className="btn-secondary mt-3" onClick={handleEdit}>Edit Product</Button>
            </div>
          )}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AddProductPage;
