import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Registration.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function Login() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

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
    // Perform actions based on formData
    console.log("Form submitted with:", formData);

    if (formData.userId === "admin") {
      toast.success("Admin logged in");
      navigate("/admin-dashboard");
    } else if (formData.userId === "buyer") {
      toast.success("buyer logged in");
      navigate("/user-dashboard");
    } else {
      toast.error("user not found");
    }
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
            Registration
          </h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label htmlFor="user">Full Name</Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <Form.Control
                type="text"
                id="user"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label htmlFor="user">Email</Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <Form.Control
                type="email"
                id="email"
                name="emailId"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label htmlFor="user">Password</Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <Form.Control
                type="password"
                id="pass"
                name="password"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="passwordId">
            <Form.Label htmlFor="pass">Confirm Password</Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-lock icon"></i>
                </span>
              </div>
              <Form.Control
                type="password"
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 btn-primary">
            Register
          </Button>
          <div className="d-flex pt-2" style={{ justifyContent: "center" }}>
            <h6>
              Already have an account ?{" "}
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

export default Login;
