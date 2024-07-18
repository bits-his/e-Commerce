import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

function Login() {
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
        <div className='container d-flex justify-content-center align-items-center login-body'>
            <div className='login'>
                <h2>Login</h2>
                
                <Form onSubmit={handleSubmit}>
                    <div className=''>
                        <Form.Label htmlFor="user">User ID</Form.Label>
                        <Form.Control
                            type="text"
                            id="user"
                            name="userId"
                            required
                            value={formData.userId}
                            onChange={handleChange}
                        />
                        <Form.Label htmlFor="pass">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="pass"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className='d-flex' style={{justifyContent:"center"}}>
                            <Button variant='primary' type='submit' className='btn-primary'>Login</Button>
                        </div>
                        <div className='d-flex pt-2' style={{justifyContent:"center"}}>
                            <h6>Dont have an account ? <Link to= 'register' className='text-decoration-none text-dark'>Register Now</Link> </h6>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login