import React, { useState } from 'react';
import { Form, Button, Modal } from "react-bootstrap";
import profile from "../assets/profile.png";
import "../Styles/Profile.css";
import Editprofile from './Editprofile';

 function Profile() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
            <Form.Control type="text" value="Admin Name" readOnly />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth" className='col-md-3'>
            <Form.Label className='label'>Date Of Birth</Form.Label>
            <Form.Control type="date" value="2022-01-20" />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label className='label'>Gender</Form.Label>
            <div className='d-flex'>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                id="male"
                checked
                readOnly
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                id="female"
                readOnly
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className='col-md-3'>
            <Form.Label className='label'>Phone Number</Form.Label>
            <div className='d-flex align-items-center'>
              <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria flag" width="20" />
              <Form.Control type="text" value="+90-123456789" className='ml-2' readOnly />
            </div>
          </Form.Group>
          <Form.Group controlId="formEmail" className='col-md-3'>
            <Form.Label className='label'>Email</Form.Label>
            <Form.Control type="email" value="abcd1234@email.com" readOnly />
          </Form.Group>
        </Form>
      </div>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Editprofile />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;