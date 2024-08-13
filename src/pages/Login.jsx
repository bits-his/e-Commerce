import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Input, InputGroup, InputGroupText, Spinner } from "reactstrap";
import { _post } from "../utils/Helper";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    
    const obj = { email, password };
    
    _post(
      'api/users/login',
      obj,
      (res) => {
        setLoading(false);
        toast.success("Logged Successful");
        console.log(email, password);
        if (res.role === "vendor") {
          navigate("/seller-dashboard");
        } else if (res.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          toast.error("Invalid credentials");
        }
      },
      (err) => {
        setLoading(false);
        toast.error("An error occurred!");
        console.log(err);
      }
    );
  };

  const handleGoogleSignIn = () => {
    // Your logic for Google Sign-In
    toast.error("can't login with google now");
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
        <Button className="w-100" onClick={handleGoogleSignIn}>
          <i className="fab fa-google mr-2"></i> Sign in with Google
        </Button>
        <div className="d-flex align-items-center">
          <hr className="flex-grow-1"/>
          <span className="px-2">or</span>
          <hr className="flex-grow-1"/>
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label >Email</Form.Label>
           
            <InputGroup size="sm">
              <InputGroupText>
                <i className="fas fa-envelope icon"></i>
              </InputGroupText> 
              <Input
                type="text"
                id="user"
                name="userId"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="passwordId">
            <Form.Label >Password</Form.Label>
            <InputGroup className="input-group mb-1" size="sm">
             <InputGroupText >
                <i className="fas fa-lock icon"></i>
              </InputGroupText>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                id="pass"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                className="form-control-with-icon"
              />
             
              <InputGroupText  onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                {passwordVisible ? <i className="fas fa-eye icon"></i> : <i className="fas fa-eye-slash icon"></i>}
              </InputGroupText>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formRemember" className="mb-3 d-flex justify-content-between align-items-center">
            <Form.Check type="checkbox" label="Remember me" />
            <Link to="/forgot-password" className="text-decoration-none text-dark">
              Forgot your password?
            </Link>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 btn-primary">
            {Loading ? <Spinner/> : <>Log In <i className="fas fa-sign-in-alt "></i></>}
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
