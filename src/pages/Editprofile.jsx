import React from 'react';
import { Form, Button } from "react-bootstrap";

export default function EditProfile() {
  return (
    <Form className='input-group d-block'>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group controlId="formDateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
      <Form.Group controlId="formGender">
        <Form.Label>Gender</Form.Label>
        <Form.Check type="radio" label="Male" name="gender" id="male" />
        <Form.Check type="radio" label="Female" name="gender" id="female" />
      </Form.Group>
      <Form.Group controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="Enter phone number" />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-3'>
        Save Changes
      </Button>
    </Form>
  );
}
