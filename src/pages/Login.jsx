import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with:", formData);

    if (formData.userId === "admin") {
      toast.success(`${formData.userId} logged in`);
      navigate("/admin-dashboard");
    } else if (formData.userId === "seller") {
      toast.success(`${formData.userId} logged in`);
      navigate("/seller-dashboard");
    } else {
      toast.error("user not found");
    }
  };

  const handleGoogleSignIn = () => {
    // Your logic for Google Sign-In
    console.log("Google Sign-In clicked");
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
      <div className="login">
        <div>
          <h2 className="d-flex" style={{ justifyContent: "center" }}>
            Login
          </h2>
        </div>
        <Button 
          
          className="w-100 mb-3"
          onClick={handleGoogleSignIn}
        >
          <i className="fab fa-google mr-2"></i> Sign in with Google
        </Button>
        <div className="d-flex align-items-center mb-3">
          <hr className="flex-grow-1"/>
          <span className="px-2">or</span>
          <hr className="flex-grow-1"/>
        </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
            <Form.Label htmlFor="user">Email</Form.Label>
            <div className="input-group mb-3">
              <Form.Control
                type="text"
                id="user"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="form-control-with-icon"
              />
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="passwordId">
            <Form.Label htmlFor="pass">Password</Form.Label>
            <div className="input-group mb-3">
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

                  
            <Form.Group controlId="formRemember" className="mb-3 d-flex justify-content-between align-items-center">
              <Form.Check type="checkbox" label="Remember me" />
              <Link
                to="/forgot-password"
                className="text-decoration-none text-dark"
              >
                Forgot your password?
              </Link>
            </Form.Group>

           
            
          </Form.Group>
          

          <Button variant="primary" type="submit" className="w-100 btn-primary">
           Log In <i className="fas fa-sign-in-alt "></i>
          </Button>
          <div className="d-flex pt-2" style={{ justifyContent: "center" }}>
            <h6>
              Don't have an account?{" "}
              <Link to="register" className="text-decoration-none text-dark">
                Register Now
              </Link>{" "}
            </h6>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
