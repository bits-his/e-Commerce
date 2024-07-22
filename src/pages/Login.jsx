import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function Login() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
    const togglePasswordVisibility = ()=>{
        setPasswordVisible (!passwordVisible);
    }
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
            Login
          </h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label htmlFor="user">User ID</Form.Label>
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
          <Form.Group controlId="passwordId">
            <Form.Label htmlFor="pass">Password</Form.Label>
            <div className="input-group mb-3">
              <div className="input-group-prepend ">
                <span className="input-group-text">
                  <i className="fas fa-lock icon"></i>
                </span>
              </div>
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="input-group-append">
              <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                {passwordVisible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
              </span>
                </div>
            </div>
            <Link
              to="/forgot-password"
              className="ml-auto text-decoration-none text-dark d-flex"
              style={{ justifyContent: "end" }}
            >
              Forgot your password?
            </Link>
          </Form.Group>
          <Form.Group controlId="formRemember" className="mb-3">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 btn-primary">
            Log In
          </Button>
          <div className="d-flex pt-2" style={{ justifyContent: "center" }}>
            <h6>
              Dont have an account ?{" "}
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
