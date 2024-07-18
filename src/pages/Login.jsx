import React from 'react'
import { Button, Form } from 'react-bootstrap'
import '../Styles/Login.css'

function Login() {
  return (
    <>
        <div className='login'>
        <h2>Login</h2>
            <Form>
                <Form.Label htmlFor="user">User ID</Form.Label>
                <Form.Control
                    type="text"
                    id="user"
                    name='userId'
                />
                <Form.Label htmlFor="pass">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="pass"
                    name='password'
                />
                <div className='btn-container'>
                <Button variant='primary' type='submit' className='btn-primary'>
                    Login
                </Button>
                </div>
                <div className='d-flex' style={{justifyContent:"center"}}>
                    <h6>Dont have an account? <span>Register Now</span> </h6>
                </div>
            </Form>
        </div>
    </>
  )
}

export default Login