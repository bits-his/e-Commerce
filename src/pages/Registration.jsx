import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Registration.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { InputGroupText, Spinner } from "reactstrap";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function Registration() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    shopname: "",
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

    if (formData.password === formData.confirmPassword) {
      setLoading(true);
      const obj = { ...formData };

      _post(
        "api/users/create",
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
    } else {
      toast.error("Password input does not match!");
    }
  };

  const handleGoogleSignUp = () => {
    toast.error("Can't sign up with google now");
  };

  return (
    <main className="flex flex-1 flex-col justify-center items-center gap-4 py-4 md:gap-8 md:p-8 bg-light min-h-[100vh]">
      <Tabs defaultValue="vendor" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vendor">Vendor</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="vendor">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Vendor sign Up
              </CardTitle>
              <CardDescription>Enter your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">
                    Shop details
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enter shop details bellow
                  </p>
                </div>
                <hr className="border-2" style={{ marginTop: "-1rem", marginBottom: "-1rem" }} />

                <div className="grid gap-2">
                  <Label htmlFor="email">Shop name</Label>
                  <Input
                    id="shop-name"
                    placeholder="Phisherman's accessories"
                    value={formData.shopname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mide@example.com"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="mt-2 flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>

                  <div className="mt-2 flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <Input
                        id="confirmPassword"
                        type={passwordVisible ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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

                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={Loading}
                >
                  {Loading ? (
                    <Spinner className="h-5 w-5" />
                  ) : (
                    <b className="text-white">Register</b>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignUp}
                >
                  Sign up with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/" className="underline">
                  Login Here
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default Registration;
