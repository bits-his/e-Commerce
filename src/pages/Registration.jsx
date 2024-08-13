import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Registration.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Input, InputGroupText, Spinner } from "reactstrap";

function Registration() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    role: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });
  const [Loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword){
      setLoading(true);
      const obj = { ...formData };
      
      _post(
        'api/users/create',
        obj,
        (res) => {
          setLoading(false);
          toast.success("Created Successfully");
          navigate("/");
        },
        
        (err) => {
          setLoading(false);
          toast.error("An error occurred!");
          console.log(err);
        }
      );
    }
    else {
      toast.error("Password input does not match!");
    }
  };

  const handleGoogleSignUp = () => {
    // Your logic for Google Sign-Up
    console.log("Google Sign-Up clicked");
  };

  return (
    <div
      className="d-flex"
      style={{
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        backgroundColor: "#d3d3d3",
      }}
    >
      <div className="register">
        <div>
          <h2 className="d-flex" style={{ justifyContent: "center" }}>
            Registration
          </h2>
        </div>
        <Button 
          className="w-100 mb-1"
          onClick={handleGoogleSignUp}
        >
          <i className="fab fa-google mr-2"></i> Sign up with Google
        </Button>
        <div className="d-flex align-items-center">
          <hr className="flex-grow-1"/>
          <span className="px-2">or</span>
          <hr className="flex-grow-1"/>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstname">
            <Form.Label htmlFor="firstname">First Name</Form.Label>
            <InputGroup size="sm">
            <InputGroupText>
                <i className="fas fa-user icon"></i>
              </InputGroupText>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="form-control-with-icon"
              />
            
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label htmlFor="lastname">Last name</Form.Label>
            <InputGroup size="sm">
            <InputGroupText>
                <i className="fas fa-user icon"></i>
              </InputGroupText>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="form-control-with-icon"
              />
            
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label htmlFor="username">Username</Form.Label>
            <InputGroup size="sm">
            <InputGroupText>
                <i className="fas fa-user icon"></i>
              </InputGroupText>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control-with-icon"
              />
            
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label htmlFor="role">Role</Form.Label>
            <InputGroup size="sm">
            <InputGroupText>
                <i className="fas fa-user icon"></i>
              </InputGroupText>
              <Input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control-with-icon"
              />
            
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label htmlFor="email">Email</Form.Label>
            <InputGroup size="sm">
             <InputGroupText>
                <i className="fas fa-envelope icon"></i>
              </InputGroupText>
              <Input
                type="email"
                id="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="form-control-with-icon"
              />
             
            </InputGroup>
          </Form.Group>
          
          <Form.Group controlId="formPassword">
            <Form.Label htmlFor="pass">Password</Form.Label>
            <InputGroup size="sm">
             <InputGroupText>
                <i className="fas fa-lock icon"></i>
              </InputGroupText>
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control-with-icon"
              />
             
              <InputGroupText  onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                {passwordVisible ? <i className="fas fa-eye icon"></i> : <i className="fas fa-eye-slash icon"></i>}
              </InputGroupText>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label htmlFor="confirm-pass">Confirm Password</Form.Label>
            <InputGroup className="input-group mb-4"size="sm">
              <InputGroupText>
                <i className="fas fa-lock icon"></i>
              </InputGroupText>
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                id="confirm-pass"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control-with-icon"
              />
            
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={Loading} className="w-100 btn-primary">
            {Loading ? <Spinner /> : <> Register <i className="fas fa-sign-in-alt"></i> </>}
          </Button>
          <div className="d-flex pt-2" style={{ justifyContent: "center" }}>
            <h6>
              Already have an account?{" "}
              <Link to="/" className="text-decoration-none text-dark">
                Login Here
              </Link>{" "}
            </h6>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Registration;
