// src/components/EditableProfile.jsx
import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditableProfile = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: 'My Store',
    logo: 'logo-url',
    banner: 'banner-url',
    email: 'contact@mystore.com',
    phone: '123-456-7890',
    address: '123 Store St, City, Country',
    registrationNumber: '123456789',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(storeInfo);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData(storeInfo);
  };

  const handleSaveClick = () => {
    setStoreInfo(editData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 'bold', color: '#333' }}>Store Profile</h2>
      <div style={{ marginBottom: '1.5rem' }}>
        <FormGroup style={{ marginBottom: '1rem' }}>
          <Label for="name" style={{ fontWeight: 'bold' }}>Store Name</Label>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>{storeInfo.name}</p>
        </FormGroup>
        <FormGroup style={{ marginBottom: '1rem' }}>
          <Label for="logo" style={{ fontWeight: 'bold' }}>Store Logo</Label>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>{storeInfo.logo}</p>
        </FormGroup>
        <FormGroup style={{ marginBottom: '1rem' }}>
          <Label for="banner" style={{ fontWeight: 'bold' }}>Store Banner</Label>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>{storeInfo.banner}</p>
        </FormGroup>
        <FormGroup style={{ marginBottom: '1rem' }}>
          <Label for="email" style={{ fontWeight: 'bold' }}>Email</Label>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>{storeInfo.email}</p>
        </FormGroup>
        <FormGroup style={{ marginBottom: '1rem' }}>
          <Label for="phone" style={{ fontWeight: 'bold' }}>Phone</Label>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>{storeInfo.phone}</p>
        </FormGroup>
        <FormGroup style={{ marginBottom: '1rem' }}>
          <Label for="address" style={{ fontWeight: 'bold' }}>Address</Label>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>{storeInfo.address}</p>
        </FormGroup>
        <FormGroup style={{ marginBottom: '1rem' }}>
          <Label for="registrationNumber" style={{ fontWeight: 'bold' }}>Registration Number</Label>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>{storeInfo.registrationNumber}</p>
        </FormGroup>
        <Button color="primary" onClick={handleEditClick} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold' }}>Edit</Button>
      </div>

      <Modal isOpen={isEditing} toggle={handleCancelClick} style={{ maxWidth: '600px', margin: '1.5rem auto' }}>
        <ModalHeader toggle={handleCancelClick} style={{ backgroundColor: '#007bff', color: '#fff' }}>Edit Store Profile</ModalHeader>
        <ModalBody style={{ padding: '2rem' }}>
          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <Label for="name" style={{ fontWeight: 'bold' }}>Store Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={editData.name}
              onChange={handleChange}
              style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <Label for="logo" style={{ fontWeight: 'bold' }}>Store Logo</Label>
            <Input
              type="text"
              name="logo"
              id="logo"
              value={editData.logo}
              onChange={handleChange}
              style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <Label for="banner" style={{ fontWeight: 'bold' }}>Store Banner</Label>
            <Input
              type="text"
              name="banner"
              id="banner"
              value={editData.banner}
              onChange={handleChange}
              style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <Label for="email" style={{ fontWeight: 'bold' }}>Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={editData.email}
              onChange={handleChange}
              style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <Label for="phone" style={{ fontWeight: 'bold' }}>Phone</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={editData.phone}
              onChange={handleChange}
              style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <Label for="address" style={{ fontWeight: 'bold' }}>Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={editData.address}
              onChange={handleChange}
              style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '1.5rem' }}>
            <Label for="registrationNumber" style={{ fontWeight: 'bold' }}>Registration Number</Label>
            <Input
              type="text"
              name="registrationNumber"
              id="registrationNumber"
              value={editData.registrationNumber}
              onChange={handleChange}
              style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ justifyContent: 'center' }}>
          <Button color="primary" onClick={handleSaveClick} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold' }}>Save</Button>
          <Button color="secondary" onClick={handleCancelClick} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold' }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditableProfile;
