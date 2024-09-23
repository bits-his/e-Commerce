import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Spinner } from "reactstrap";
import { _post } from "../utils/Helper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
 
    const obj = { email, password }; 
 
    _post( 
      "api/users/login", 
      obj, 
      (res) => { 
        setLoading(false); 
        // alert(JSON.stringify(res.userDetails)) 
        let data = res?.userDetails.id 
        localStorage.setItem("@@toke_$$_45598",JSON.stringify(data)) 
        if (res.role === "vendor") { 
          toast.success("Logged Successful"); 
          navigate("/seller-dashboard"); 
        } else if (res.role === "admin") { 
          toast.success("Logged Successful"); 
          navigate("/admin-dashboard"); 
        } else { 
          toast.error("User not found"); 
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
    toast.error("can't login with google now");
  };

  return (
    <>
      <main className="flex flex-1 flex-col justify-center items-center gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[100vh] login-bg">
        <Card className="mx-auto min-w-[23rem]">
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
                  <Link
                    to="/"
                    className="ml-auto inline-block text-sm underline"
                  >
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
                      className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                disabled={Loading}
                style={{backgroundColor: "#a52a2a"}}
              >
                {Loading ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  <b className="text-white">Login</b>
                )}
              </button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
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
