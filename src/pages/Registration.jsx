import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../Styles/Registration.css';


function Registration() {
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform actions based on formData
        console.log('Form submitted with:', formData);

        if (formData.userId === 'admin') {
            toast.success('Admin logged in');
            navigate('/admin-dashboard');
        }
        else if (formData.userId === 'buyer') {
            toast.success('buyer logged in');
            navigate('/user-dashboard');
        }
        else {
            toast.error('user not found');
        }
    };

    return (
        <div className='d-flex' style={{justifyContent:"center", alignItems:"center", height:"100vh"}}>
            <div className='register'>
            <h2>Registration</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="user">First Name</Form.Label>
                <Form.Control
                    type="text"
                    id="fname"
                    name="fnameId"
                    required
                    value={formData.userId}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="pass">Last Name</Form.Label>
                <Form.Control
                    type="text"
                    id="lname"
                    name="lnameId"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="pass">Email</Form.Label>
                <Form.Control
                    type="email"
                    id="email"
                    name="emailId"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="pass">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="pass"
                    name="passId"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="pass">Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    id="pass"
                    name="passId"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <div className='d-flex' style={{justifyContent:"center"}}>
                    <Button variant='primary' type='submit' className='btn-primary'>Register</Button>
                </div>
                <div className='d-flex pt-2' style={{justifyContent:"center"}}>
                    <h6>Already have an account ? <NavLink to= '/' className='text-decoration-none text-dark'>Login Here</NavLink> </h6>
                </div>
            </Form>
        </div>
        </div>
    );
}

export default Registration
