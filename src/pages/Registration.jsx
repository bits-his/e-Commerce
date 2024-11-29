import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/Registration.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Spinner } from "reactstrap";

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
import { Textarea } from "@/components/ui/textarea";
import { _post, globalColor } from "../utils/Helper";
import { Eye, EyeOff } from "lucide-react";

function Registration() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    role: "vendor",
    password: "",
    confirmPassword: "",
    shopname: "",
    shopaddress: "",
    shopcontact: "",
  });

  //checking the active tab
  // const [activeTab, setActiveTab] = useState("vendor");
  // const handleTabChange =(value) =>{
  //   setActiveTab(value);
  // }

  const [Loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleTabChange = (newRole) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: newRole,
    }));
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

    if (formData.role === "vendor") {
      if (
        !formData.shopname ||
        !formData.shopaddress ||
        !formData.shopcontact ||
        !formData.email
      ) {
        toast.error("Please fill in the shop details");
        return;
      }

      if (!formData.firstname || !formData.lastname || !formData.username) {
        toast.error("Please fill in the shop owner details");
        return;
      }
      if (!formData.password || !formData.confirmPassword) {
        toast.error("Please fill your password");
        return;
      }
      if (formData.password === formData.confirmPassword) {
        setLoading(true);
        const obj = { ...formData };
        delete obj.confirmPassword;

        _post(
          "api/users/create",
          obj,
          (res) => {
            setLoading(false);
            if (res.success) {
              toast.success("Created Successfully, await admin approval");
              navigate("/");
            } else {
              console.log(res);
              toast.error(res.message);
            }
          }

          // (err) => {
          //   setLoading(false);
          //   toast.error("An error occurred!");
          //   console.log(err);
          // }
        );
      } else {
        toast.error("Password input does not match!");
      }
    } else {
      if (
        !formData.firstname ||
        !formData.lastname ||
        !formData.username ||
        !formData.email
      ) {
        toast.error("Please fill in the your details");
        return;
      }
      if (!formData.password || !formData.confirmPassword) {
        toast.error("please fill your password");
      }
      if (formData.password === formData.confirmPassword) {
        setLoading(true);
        const obj = { ...formData };
        delete obj.confirmPassword;

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
    }
  };

  const handleGoogleSignUp = () => {
    toast.error("Can't sign up with google now");
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <main
      className="flex flex-1 flex-col justify-center items-center gap-4 py-4 md:gap-8 md:p-8 min-h-[100vh] background-icon"
      style={{ backgroundColor: globalColor.grpcolor3 }}
    >
      <Tabs
        defaultValue="vendor"
        className="w-[400px]"
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full ">
          <TabsTrigger value="vendor">Vendor Registration</TabsTrigger>
        </TabsList>
        <TabsContent value="vendor">
          <Card>
            <CardContent className="space-y-2 pt-0">
              <div className="grid gap-4 ">
                {step === 1 && (
                  <div>
                    <CardHeader>
                      <CardTitle className="text-xl text-center">
                        Shop details
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <hr className="p-2" style={{ marginTop: "-1rem" }} />
                    <div className="">
                      <Label htmlFor="shopname">Shop name</Label>
                      <Input
                        id="shopname"
                        name="shopname"
                        placeholder="Shop name"
                        value={formData.shopname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="shopcontact">Shop contact</Label>
                      <Input
                        id="shopcontact"
                        name="shopcontact"
                        type="number"
                        placeholder="07012345678"
                        value={formData.shopcontact}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="shopaddress">Shop address</Label>
                      <Textarea
                        id="shopaddress"
                        name="shopaddress"
                        placeholder="Shop address"
                        value={formData.shopaddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="mide@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        type="submit"
                        style={{ backgroundColor: globalColor.grpcolor1 }}
                        onClick={handleNext}
                        className="p-2 px-4 border-0 rounded text-light w-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <CardHeader>
                      <CardTitle className="text-xl text-center">
                        Shop owner details
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <hr className="p-2" style={{ marginTop: "-1rem" }} />
                    <div className="">
                      <Label htmlFor="firstname">First name</Label>
                      <Input
                        id="firstname"
                        name="firstname"
                        // placeholder="Abubakar"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="lastname">Last name</Label>
                      <Input
                        id="lastname"
                        name="lastname"
                        // placeholder="Abdulmalik"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        // placeholder="user"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
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
                          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 d-flex justify-content-center align-items-center"
                        >
                          {passwordVisible ? (
                            <Eye />
                          ) : (
                            <EyeOff />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="">
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
                          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 d-flex justify-content-center align-items-center"
                        >
                          {passwordVisible ? (
                            <Eye />
                          ) : (
                            <EyeOff />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2 pt-3">
                      <button
                        type="submit"
                        style={{ backgroundColor: globalColor.grpcolor1 }}
                        className="p-2 px-4 btn border-0 rounded text-light w-40"
                        onClick={handlePrevious}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-40 btn p-2"
                        onClick={handleSubmit}
                        disabled={Loading}
                        style={{ backgroundColor: "#a52a2a" }}
                      >
                        {Loading ? (
                          <Spinner className="h-5 w-5" />
                        ) : (
                          <b className="text-white">Register</b>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignUp}
                >
                  Sign up with Google
                </Button> */}
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

        {/* <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Admin sign-up</CardTitle>
              <CardDescription>fill in the required fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      placeholder="John"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder="Doe"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="user"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="mide@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="">
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

                <div className="">
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
        </TabsContent> */}
      </Tabs>
    </main>
  );
}

export default Registration;
