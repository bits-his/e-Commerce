import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Registration.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Registration() {
  const [formData, setFormData] = useState({
    userId: "",
    emailId: "",
    password: "",
    confirmPassword: ""
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions based on formData
    console.log("Form submitted with:", formData);

    if (formData.userId === "admin") {
      toast.success("Admin logged in");
      navigate("/admin-dashboard");
    } else if (formData.userId === "buyer") {
      toast.success("Buyer logged in");
      navigate("/user-dashboard");
    } else {
      toast.error("User not found");
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
        height: "100vh",
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
          className="w-100 mb-3"
          onClick={handleGoogleSignUp}
        >
          <i className="fab fa-google mr-2"></i> Sign up with Google
        </Button>
        <div className="d-flex align-items-center mb-1">
          <hr className="flex-grow-1"/>
          <span className="px-2">or</span>
          <hr className="flex-grow-1"/>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFullName">
            <Form.Label htmlFor="user">Full Name</Form.Label>
            <div className="input-group mb-1">
              <Form.Control
                type="text"
                id="user"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="form-control-with-icon"
              />
              <div className="input-icon">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label htmlFor="email">Email</Form.Label>
            <div className="input-group mb-1">
              <Form.Control
                type="email"
                id="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="form-control-with-icon"
              />
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label htmlFor="pass">Password</Form.Label>
            <div className="input-group mb-1">
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control-with-icon"
              />
              <div className="input-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="input-icon-right" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                {passwordVisible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label htmlFor="confirm-pass">Confirm Password</Form.Label>
            <div className="input-group mb-1">
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                id="confirm-pass"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control-with-icon"
              />
              <div className="input-icon">
                <i className="fas fa-lock"></i>
              </div>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 btn-primary">
            Register <i className="fas fa-sign-in-alt"></i>
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
