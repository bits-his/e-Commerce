import React, { useState } from 'react';
import { Form, Button, Modal } from "react-bootstrap";
import profile from "../assets/profile.png";
import "../Styles/Profile.css";
import Editprofile from './Editprofile';

function Profile() {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "Admin Name",
    dateOfBirth: "2022-01-20",
    gender: "male",
    phoneNumber: "+90-123456789",
    email: "abcd1234@email.com",
    password: "******"
  });

  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='profile-container'>
      <h5>Personal Information</h5>
      <div className='profile-card'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <img src={profile} className="profile" alt="Profile" />
            <div className='mb-3'>
              <Button variant="link" className='p-0'>
                <i className="fa fa-edit" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
          <Button variant="link" className='p-0' onClick={toggle}>
            <i className="fa fa-edit" aria-hidden="true"></i> Edit Profile Information
          </Button>
        </div>
        <Form className='mt-3 input-group d-block'>
          <Form.Group controlId="formName" className='col-md-3'>
            <Form.Label className='label'>Name</Form.Label>
            <Form.Control type="text" value={formData.name} readOnly />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth" className='col-md-3'>
            <Form.Label className='label'>Date Of Birth</Form.Label>
            <Form.Control type="date" value={formData.dateOfBirth} readOnly />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label className='label'>Gender</Form.Label>
            <div className='d-flex'>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                id="male"
                checked={formData.gender === "male"}
                readOnly
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                id="female"
                checked={formData.gender === "female"}
                readOnly
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className='col-md-3'>
            <Form.Label className='label'>Phone Number</Form.Label>
            <div className='d-flex align-items-center'>
              <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria flag" width="20" />
              <Form.Control type="text" value={formData.phoneNumber} className='ml-2' readOnly />
            </div>
          </Form.Group>
          <Form.Group controlId="formEmail" className='col-md-3'>
            <Form.Label className='label'>Email</Form.Label>
            <Form.Control type="email" value={formData.email} readOnly />
          </Form.Group>
          <Form.Group controlId="formPassword" className='col-md-3'>
            <Form.Label className='label'>Password</Form.Label>
            <Form.Control type="password" value={formData.password} readOnly />
          </Form.Group>
        </Form>
      </div>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFormName">
              <Form.Label className='label'>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormDateOfBirth">
              <Form.Label className='label'>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormGender">
              <Form.Label className='label'>Gender</Form.Label>
              <div className='d-flex'>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  id="male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  id="female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="editFormPhoneNumber">
              <Form.Label className='label'>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormEmail">
              <Form.Label className='label'>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="editFormPassword">
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="primary" onClick={toggle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
