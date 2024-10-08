import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";  // Import Redux hooks
import { login } from "../redux/action/authAction";  // Import login action
import { Spinner } from "reactstrap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Select loading state from Redux store
  const { loading } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Dispatch the login action (which handles API call)
    dispatch(login(email, password, navigate));
  };

  const handleGoogleSignIn = () => {
    toast.error("Can't login with Google now");
  };

  return (
    <>
      <main className="flex flex-1 flex-col justify-center items-center gap-4 py-4 md:gap-8 md:p-8 min-h-[100vh] background-icon">
        <Card className="mx-auto min-w-[20rem]">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sample@example.com"
                  required
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>

                <div className="mt-2 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <Input
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {passwordVisible ? (
                      <i className="fas fa-eye h-5 w-5 text-gray-400"></i>
                    ) : (
                      <i className="fas fa-eye-slash h-5 w-5 text-gray-400"></i>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full btn login-btn"
                onClick={handleLogin}
                disabled={loading}
                style={{backgroundColor: "#a52a2a"}}
              >
                {loading ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  <b className="text-white">Login</b>
                )}
              </button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default Login;