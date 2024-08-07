import React, { useState } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

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
    <div>
      <h2>Store Profile</h2>
      <div>
        <FormGroup>
          <Label for="name">Store Name</Label>
          {isEditing ? (
            <Input
              type="text"
              name="name"
              id="name"
              value={editData.name}
              onChange={handleChange}
            />
          ) : (
            <p>{storeInfo.name}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="logo">Store Logo</Label>
          {isEditing ? (
            <Input
              type="text"
              name="logo"
              id="logo"
              value={editData.logo}
              onChange={handleChange}
            />
          ) : (
            <p>{storeInfo.logo}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="banner">Store Banner</Label>
          {isEditing ? (
            <Input
              type="text"
              name="banner"
              id="banner"
              value={editData.banner}
              onChange={handleChange}
            />
          ) : (
            <p>{storeInfo.banner}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          {isEditing ? (
            <Input
              type="email"
              name="email"
              id="email"
              value={editData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{storeInfo.email}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          {isEditing ? (
            <Input
              type="text"
              name="phone"
              id="phone"
              value={editData.phone}
              onChange={handleChange}
            />
          ) : (
            <p>{storeInfo.phone}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          {isEditing ? (
            <Input
              type="text"
              name="address"
              id="address"
              value={editData.address}
              onChange={handleChange}
            />
          ) : (
            <p>{storeInfo.address}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="registrationNumber">Registration Number</Label>
          {isEditing ? (
            <Input
              type="text"
              name="registrationNumber"
              id="registrationNumber"
              value={editData.registrationNumber}
              onChange={handleChange}
            />
          ) : (
            <p>{storeInfo.registrationNumber}</p>
          )}
        </FormGroup>
        {isEditing ? (
          <div>
            <Button color="primary" onClick={handleSaveClick}>Save</Button>
            <Button color="secondary" onClick={handleCancelClick}>Cancel</Button>
          </div>
        ) : (
          <Button color="primary" onClick={handleEditClick}>Edit</Button>
        )}
      </div>
    </div>
  );
};

export default EditableProfile;
