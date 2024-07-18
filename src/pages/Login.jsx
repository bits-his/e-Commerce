import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
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
            navigate('/admin');
        }
        else if (formData.userId === 'buyer') {
            navigate('/buyer');
        }
        else {
            navigate('/user');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="user">User ID</Form.Label>
            <Form.Control
                type="text"
                id="user"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
            />
            <Form.Label htmlFor="pass">Password</Form.Label>
            <Form.Control
                type="password"
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button type="submit">Login</Button>
        </Form>
    );
}

export default LoginForm;
