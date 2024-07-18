import React from 'react'
import { Form } from 'react-bootstrap'

function Login() {
  return (
    <>
        <div>
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
            </Form>
        </div>
    </>
  )
}

export default Login