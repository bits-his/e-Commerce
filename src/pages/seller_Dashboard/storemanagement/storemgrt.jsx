import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row, Container } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './store.css';

const ShopRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: '',
    shopAddress: '',
    email: '',
    phone: '',
    description: '',
    businessRegNumber: '',
    logo: null,
    banner: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDropLogo = (acceptedFiles) => {
    setFormData({ ...formData, logo: acceptedFiles[0] });
  };

  const onDropBanner = (acceptedFiles) => {
    setFormData({ ...formData, banner: acceptedFiles[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);

    // Show success toast
    toast.success('Shop registration successful!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const { getRootProps: getRootLogoProps, getInputProps: getInputLogoProps } = useDropzone({
    onDrop: onDropLogo,
    accept: 'image/*',
  });

  const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
    onDrop: onDropBanner,
    accept: 'image/*',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3>Step 1: Basic Information</h3>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="shopName">Shop Name</Label>
                  <Input
                    type="text"
                    name="shopName"
                    id="shopName"
                    placeholder="Enter shop name"
                    value={formData.shopName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="shopAddress">Shop Address</Label>
                  <Input
                    type="text"
                    name="shopAddress"
                    id="shopAddress"
                    placeholder="Enter shop address"
                    value={formData.shopAddress}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button className="primary" onClick={nextStep}>Next</Button>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Step 2: Shop Details</h3>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Enter shop description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="businessRegNumber">Business Registration Number</Label>
                  <Input
                    type="text"
                    name="businessRegNumber"
                    id="businessRegNumber"
                    placeholder="Enter business registration number"
                    value={formData.businessRegNumber}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button className="secondary" onClick={prevStep}>Back</Button>
            <Button className="primary" onClick={nextStep}>Next</Button>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Step 3: Upload Images</h3>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="logo">Shop Logo</Label>
                  <div {...getRootLogoProps()} className="dropzone">
                    <input {...getInputLogoProps()} />
                    {formData.logo ? (
                      <p>{formData.logo.name}</p>
                    ) : (
                      <p>Drag 'n' drop a logo here, or click to select one</p>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="banner">Shop Banner</Label>
                  <div {...getRootBannerProps()} className="dropzone">
                    <input {...getInputBannerProps()} />
                    {formData.banner ? (
                      <p>{formData.banner.name}</p>
                    ) : (
                      <p>Drag 'n' drop a banner here, or click to select one</p>
                    )}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Button className="secondary" onClick={prevStep}>Back</Button>
            <Button className="primary" onClick={handleSubmit}>Submit</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Form className="shop-registration-form">
        {renderStep()}
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ShopRegistrationForm;
