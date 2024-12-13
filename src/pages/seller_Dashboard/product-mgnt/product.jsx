/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  ChevronLeft,
  Upload,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import img from "./placeholder.svg";
import {
  _get,
  _post,
  _put,
  _delete,
  separator,
  server_url,
} from "../../../utils/Helper";
import { Col, Row, Spinner } from "reactstrap";
import defaultImg from "../../../assets/No-Image-Placeholder.jpg";
import imageCompression from "browser-image-compression";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [prod_images, setprod_images] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [available, setAvailable] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  let userDetails = localStorage.getItem("@@toke_$$_45598");
  const [showSizeInput, setShowSizeInput] = useState(false);
  const [showSizeInputchange, setShowSizeInputchange] = useState(false);
  const [query_type, setQuery_type] = useState();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const navigate = useNavigate();

  const initialProductState = {
    prod_name: "",
    prod_des: "",
    category_id: "",
    sub_category_id: "",
    prod_price: null,
    prod_qty: null,
    qty_des: "",
    prod_status: "Available",
    prod_images: prod_images,
    prod_size: "",
    query_type: "insert_product",
    upload_type: "base64",
    // prod_images : prod_images,
  };

  const [newProduct, setNewProduct] = useState(initialProductState);

  const options = ["S", "M", "L", "XL", "XXL", "XXXL", "Free Size"];
  const shoesSize = ["38", "39", "40", "41", "42", "43", "44", "45"];
  const capsSize = ["20", "21", "22", "23", "24"];


  const resetForm = () => {
    setNewProduct(initialProductState);
    setprod_images([]);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;

    setSelectedCheckboxes((prev) => {
      const ischecked = checked ? [...prev, name] : prev.filter((item) => item !== name);
      handleSizeChange(ischecked.join(", "))
      return ischecked;
    })

  }

  const handleSizeChange = (size) => {
    setNewProduct((prevData) => ({
      ...prevData, prod_size: size
    }))
  }

  const getProduct = () => {
    _get(
      `api/get-products?shop_id="${userDetails.slice(1, -1)}"`,
      (resp) => {
        setProducts(resp.result[0]);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getCategories = () => {
    _get(
      "api/categories",
      (resp) => {
        setCategories(resp.results[0]);
      },
      (err) => {
        setError(err);
      }
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getSubCategories = () => {
    const category = newProduct.ctgry_id;
    // alert(category);
    _get(
      `api/subcategories?category=${category}`,
      (resp) => {
        setSubCategories(resp.results[0]);
      },
      (err) => {
        setError(err);
      }
    );
  };

  useEffect(() => {
    console.log(newProduct.ctgry_id, "jhaglkfdjh;kJHSDFKLJASHDFKJSD");
    if (newProduct.ctgry_id) {
      getSubCategories();
    }
  }, [newProduct.ctgry_id]);

  const handleInputChange = (e) => {

    const { id, value } = e.target;
    console.log(value, "id value");

    if (editMode) {
      setCurrentProduct((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else {
      setNewProduct((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSelectChange = (id, value) => {
    // Update the product state depending on editMode
    console.log(value, "id value");

    if (editMode) {
      setCurrentProduct((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else {
      setNewProduct((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
    // alert(categories.ctgry_name)
    if (
      id === "sub_ctgry_id" &&
      (value === "Yard" ||
        value === "Materials" ||
        value === "Shadda" ||
        value === "Men_Lace") &&
      newProduct.ctgry_name === "Fabric"
    ) {
      setShowSizeInput(true);
    } else if (
      value !== "Yard" &&
      value !== "Materials" &&
      value !== "Shadda" &&
      value !== "Men_Lace"
    ) {
      setShowSizeInput(false);
    }

    if (id === "prod_size" && value === "Others") {
      setShowSizeInputchange(true);
    } else if (
      id === "sub_ctgry_id" &&
      value !== "Yard" &&
      value !== "Materials" &&
      value !== "Shadda" &&
      value !== "Men_Lace"
    ) {
      setShowSizeInput(false);
    } else {
      setShowSizeInputchange(false);
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length + prod_images.length > 20) {
      toast.error("You can only upload up to 20 images.");
      return;
    }

    const compressedImages = await Promise.all(
      files.map(async (file) => {
        try {
          const options = {
            maxSizeMB: 1, // Maximum file size in MB
            maxWidthOrHeight: 1024, // Maximum width or height
            useWebWorker: true, // Use web worker for faster compression
          };
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        } catch (error) {
          console.error("Image compression error:", error);
          toast.error("Failed to compress one or more images.");
          return null;
        }
      })
    );

    // Filter out any failed compressions (null values)
    const validCompressedImages = compressedImages.filter((image) => image !== null);

    setprod_images((prevImages) => [...prevImages, ...validCompressedImages]);
  };

  // const removeImage = (indexToRemove) => {
  //   setprod_images((prevImages) =>
  //     prevImages.filter((_, idx) => idx !== indexToRemove)
  //   );
  // };
  const removeImage = (indexToRemove, isExisting) => {
    if (isExisting) {
      // Handle removal of existing images in edit mode
      setCurrentProduct((prevProduct) => ({
        ...prevProduct,
        prod_images: prevProduct.prod_images.filter(
          (_, idx) => idx !== indexToRemove
        ),
      }));
    } else {
      // Handle removal of newly added images
      setprod_images((prevImages) =>
        prevImages.filter((_, idx) => idx !== indexToRemove)
      );
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log(newProduct, "newProduct from form");

    // Validate required fields
    if (
      !newProduct.prod_name ||
      newProduct.prod_name.trim() === "" ||
      !newProduct.prod_des ||
      newProduct.prod_des.trim() === ""
    ) {
      toast.error("Please fill in the product details.");
      return;
    }

    if (!newProduct.ctgry_id || newProduct.ctgry_id.trim() === "") {
      toast.error("Please select the product category.");
      return;
    }

    if (!newProduct.prod_qty || newProduct.prod_qty.trim() === "") {
      toast.error("Please indicate the number of items available in stock.");
      return;
    }

    if (!newProduct.prod_price || newProduct.prod_price.trim() === "") {
      toast.error("Please indicate the price of the item.");
      return;
    }

    if (!newProduct.prod_status || newProduct.prod_status.trim() === "") {
      toast.error("Please indicate the status of the product.");
      return;
    }

    // Prepare for submission
    setQuery_type("insert_product");
    setLoading(true);
    const formData = new FormData();

    // Add product fields to formData
    Object.keys(newProduct).forEach((key) => {
      if (newProduct[key]) {
        formData.append(key, newProduct[key]);
      }
    });

    // Append images directly
    if (prod_images && prod_images.length > 0) {
      prod_images.forEach((image) => {
        formData.append("images", image); // Ensure 'images' is the key that Multer expects
      });
    }

    formData.append("shop_id", userDetails.slice(1, -1));
    console.log(formData, "formdata from form");
    // Submit the form
    fetch(`${server_url}/api/products-category-new`, {
      method: "POST",
      body: formData,
    })
      .then((raw) => raw.json())
      .then((res) => {
        if (res.success) {
          setLoading(false);
          getProduct();
          toast.success("New product added");
          console.log(formData);
          console.log(res, "res from server insert");
          setShowForm(false);
          resetForm();
        } else {
          setLoading(false);
          toast.error("An error occurred while adding the product!");
          console.log(res, "res from server insert");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occurred!");
        console.log(err);
      });
  };

  const handleEditButtonClick = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setShowForm(true);
  };

  const handleEditProduct = () => {
    const obj = { ...currentProduct };

    _put(
      `api/products/${currentProduct.id}`,
      obj,
      (res) => {
        const updatedProducts = products.map(
          (product) =>
            product.id === currentProduct.id ? res.success : product,
          console.log(res)
        );
        setProducts(updatedProducts);
        console.log(updatedProducts);
        navigate(0);
        setShowForm(false);
        setEditMode(false);
        toast.success("Product updated successfully");
      },
      (err) => {
        toast.error("Failed to update product");
        console.error(err);
      }
    );
  };

  const handleDeleteProduct = (product_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      _delete(
        `api/products/${product_id}`,
        (res) => {
          setProducts(products.filter((product) => product.product_id !== product_id));
          toast.success("Product deleted successfully");
          console.log(res, "res from server");
        },
        (err) => {
          toast.error("An error occurred while deleting the product");
          console.log(err);
        }
      );
    }
  };

  const handleBackButtonClick = () => {
    setShowForm(false);
    setEditMode(false);
    setCurrentProduct(null);
  };

  const handleDiscard = () => {
    setShowForm(false);
    setEditMode(false);
    setCurrentProduct(null);
    toast.success("Discarded!");
  };

  useEffect(() => {
    setAvailable(
      products.filter((product) => product.product_status === "available")
    ),
      [products];
  });

  useEffect(() => {
    setOutOfStock(
      products.filter((product) => product.product_status === "out of stock")
    ),
      [products];
  });

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          {/* ==============add and update prodeuct================ */}
          {showForm ? (
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleBackButtonClick}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>

                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm" onClick={handleDiscard}>
                      Discard
                    </Button>
                    <Button
                      variant="color1"
                      size="sm"
                      onClick={editMode ? handleEditProduct : handleAddProduct}
                      disabled={Loading}
                    >
                      {Loading ? (
                        <>
                          <Spinner className="h-4 w-4" />
                        </>
                      ) : (
                        <>{editMode ? "Update Product" : "Save Product"}</>
                      )}
                    </Button>
                  </div>
                </div>
                {/* =====================add product====================== */}
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                          "<small className="text-danger">*</small>" Signifies
                          the required fields
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="product_name">
                              <span className="text-danger">* </span>Name
                            </Label>
                            <Input
                              id="prod_name"
                              type="text"
                              className="w-full"
                              placeholder="Gamer Gear Pro Controller"
                              value={
                                editMode
                                  ? currentProduct?.prod_name
                                  : newProduct.prod_name
                              }
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="product_description">
                              {" "}
                              <span className="text-danger">* </span>
                              Description
                            </Label>
                            <Textarea
                              id="prod_des"
                              placeholder="Description about product"
                              className="min-h-32"
                              value={
                                editMode
                                  ? currentProduct?.prod_des
                                  : newProduct.prod_des
                              }
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Product Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 sm:grid-cols-3">
                          <div className="grid gap-3">
                            <Label htmlFor="product_category">
                              <span className="text-danger">* </span>Category
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("ctgry_id", value)
                              }
                              value={
                                editMode
                                  ? currentProduct?.ctgry_id
                                  : newProduct.category_id
                              }
                            >
                              <SelectTrigger
                                id="ctgry_id"
                                aria-label="Select category"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category, idx) => (
                                  <SelectItem
                                    key={idx}
                                    value={category.ctgry_id}
                                  >
                                    {category.ctgry_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {/* {JSON.stringify(categories.map((item)=>item.ctgry_name))} */}
                          <div className="grid gap-3">
                            <Label htmlFor="product_subcategory">
                              Subcategory (optional)
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("sub_ctgry_id", value)
                              }
                              value={
                                editMode
                                  ? currentProduct?.sub_ctgry_id
                                  : newProduct.sub_ctgry_id
                              }
                            >
                              <SelectTrigger
                                id="sub_ctgry_id"
                                aria-label="Select subcategory"
                              >
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                              <SelectContent>
                                {subCategories.map((subCategory, idx) => (
                                  <SelectItem
                                    key={idx}
                                    value={subCategory.sub_ctgry_name}
                                  >
                                    {subCategory.sub_ctgry_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {/* {JSON.stringify(newProduct.sub_ctgry_id)} */}
                          {(newProduct.sub_ctgry_id === "Yard" ||
                            newProduct.sub_ctgry_id === "Materials" ||
                            newProduct.sub_ctgry_id === "Shadda" ||
                            newProduct.sub_ctgry_id === "Men_Lace") && (
                              <div className="grid gap-3">
                                <Label htmlFor="prod_size">Measurement</Label>
                                {!showSizeInputchange ? (
                                  <Select
                                    onValueChange={(value) =>
                                      handleSelectChange("prod_size", value)
                                    }
                                  >
                                    <SelectTrigger
                                      id="prod_size"
                                      aria-label="Select size"
                                    >
                                      <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Per 1 Yard">
                                        Per 1 Yard
                                      </SelectItem>
                                      <SelectItem value="Per 3 Yard">
                                        Per 3 Yard
                                      </SelectItem>
                                      <SelectItem value="Per 5 Yard">
                                        Per 5 Yard
                                      </SelectItem>
                                      <SelectItem value="Others">
                                        Others
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input
                                    id="prod_size"
                                    type="text"
                                    value={
                                      editMode
                                        ? currentProduct?.prod_size
                                        : newProduct.prod_size
                                    }
                                    placeholder="Enter your measurement"
                                    onChange={handleInputChange}
                                  />
                                )}
                              </div>
                            )}
                        </div>
                        <Row className="m-0 p-0">
                          {(
                            newProduct.sub_ctgry_id === "Singlet" ||
                            newProduct.sub_ctgry_id === "Under Wears" ||
                            newProduct.sub_ctgry_id === "Kid Close" ||
                            newProduct.sub_ctgry_id === "Abaya"
                          ) && (
                              <Col md={12}>
                                <Label>Product Size</Label>
                                <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                                  {options.map((option) => (
                                    <div key={option}>
                                      <input
                                        type="checkbox"
                                        id={option}
                                        name={option}
                                        checked={selectedCheckboxes.includes(
                                          option
                                        )}
                                        onChange={handleChange}
                                      />
                                      <label htmlFor={option} style={{ marginLeft: "3px" }}>
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Col>
                            )}
                          {(
                            newProduct.sub_ctgry_id === "Shoes"
                          ) && (
                              <Col md={12}>
                                <Label>Product Size</Label>
                                <div style={{ display: "flex", flexDirection: "row", gap: "13px" }}>
                                  {shoesSize.map((option) => (
                                    <div key={option}>
                                      <input
                                        type="checkbox"
                                        id={option}
                                        name={option}
                                        checked={selectedCheckboxes.includes(
                                          option
                                        )}
                                        onChange={handleChange}
                                      />
                                      <label htmlFor={option} style={{ marginLeft: "3px" }}>
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Col>
                            )}

                          {(
                            newProduct.sub_ctgry_id === "Caps"
                          ) && (
                              <Col md={12}>
                                <Label>Product Size</Label>
                                <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                                  {capsSize.map((option) => (
                                    <div key={option}>
                                      <input
                                        type="checkbox"
                                        id={option}
                                        name={option}
                                        checked={selectedCheckboxes.includes(
                                          option
                                        )}
                                        onChange={handleChange}
                                      />
                                      <label htmlFor={option} style={{ marginLeft: "3px" }}>
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Col>
                            )}
                        </Row>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-1">
                      <CardHeader>
                        <CardTitle>
                          <span className="text-danger">* </span>Stock
                        </CardTitle>
                        <CardDescription>Quantity of product</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item Quantity</TableHead>
                              <TableHead>Quantity Description</TableHead>
                              <TableHead>Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Label
                                  htmlFor="product_quantity"
                                  className="mb-2"
                                >
                                  <span className="text-danger">* </span>
                                </Label>
                                <Input
                                  id="prod_qty"
                                  type="number"
                                  value={
                                    editMode
                                      ? currentProduct?.prod_qty
                                      : newProduct.prod_qty
                                  }
                                  onChange={handleInputChange}
                                />
                              </TableCell>
                              <TableCell>
                                <Label
                                  htmlFor="qty_des"
                                  className="mb-2"
                                >
                                  <span className="text-danger">* </span>
                                </Label>
                                <Select
                                  onValueChange={(value) =>
                                    handleSelectChange("qty_des", value)
                                  }
                                  value={newProduct.qty_des}
                                >
                                  <SelectTrigger
                                    id="qty_des"
                                    aria-label="Quantity Description"
                                  >
                                    <SelectValue placeholder="Qty Description" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="yard">
                                      Yard
                                    </SelectItem>
                                    <SelectItem value="pieces">
                                      Pieces
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Label
                                  htmlFor="product_price"
                                  className="d-flex justify-content-between mb-2"
                                >
                                  <span className="text-destructive">* </span>
                                  <span>
                                    {editMode
                                      ? separator(currentProduct?.prod_price)
                                      : separator(newProduct.prod_price)}
                                  </span>
                                </Label>
                                <Input
                                  id="prod_price"
                                  type="number"
                                  value={
                                    editMode
                                      ? currentProduct?.prod_price
                                      : newProduct.prod_price
                                  }
                                  onChange={handleInputChange}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="justify-center border-t p-4">
                        <Button size="sm" variant="ghost" className="gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Variant
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Product Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="product_status">
                              <span className="text-danger">* </span>Status
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("prod_status", value)
                              }
                              value={
                                editMode
                                  ? currentProduct?.prod_status
                                  : newProduct.prod_status
                              }
                            >
                              <SelectTrigger
                                id="prod_status"
                                aria-label="Select status"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Available">
                                  Available
                                </SelectItem>
                                <SelectItem value="Out of Stock">
                                  Out of stock
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>
                          <span className="text-danger">* </span>Product Images
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 gap-2">
                            {prod_images.map((image, idx) => (
                              <div
                                key={idx}
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                <img
                                  key={idx}
                                  alt={`Product image ${idx + 1}`}
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="84"
                                  src={URL.createObjectURL(image)}
                                  width="84"
                                />
                                <button
                                  onClick={() => removeImage(idx)}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    background: "#a52a2a",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    width: "20px",
                                    height: "20px",
                                    textAlign: "center",
                                    fontSize: "14px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            {prod_images.length < 20 && (
                              <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <input
                                  type="file"
                                  multiple
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm" onClick={handleDiscard}>
                    Discard
                  </Button>
                  <Button
                    variant="color1"
                    size="sm"
                    onClick={editMode ? handleEditProduct : handleAddProduct}
                    disabled={Loading}
                  >
                    {Loading ? (
                      <>
                        <Spinner className="h-4 w-4" />
                      </>
                    ) : (
                      <>Save Product</>
                    )}
                  </Button>
                </div>
              </div>
            </main>
          ) : (
            // ======================================================products view=================================================================
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="avaliable">Available</TabsTrigger>
                    <TabsTrigger value="out-of-stock">Out of stock</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="relative ml-auto flex-1 md:grow-0 hidden md:inline">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[150px] lg:w-[300px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="color1"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => {
                        setEditMode(false);
                        setShowForm(true);
                      }}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                      </span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="all">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Products </CardTitle>
                      {/* {JSON.stringify(products)} */}
                      <CardDescription>
                        Manage your products and view their sales performance.
                      </CardDescription>
                    </CardHeader>
                    {/* {JSON.stringify(userDetails.slice(1, -1))} */}
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                              Price
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                              In stock
                            </TableHead>
                            <TableHead className="text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan="6" className="text-center">
                                No product(s)
                              </TableCell>
                            </TableRow>
                          ) : (
                            products.map((product, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="hidden sm:table-cell p-2">
                                  <img
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={
                                      product.image_urls
                                        ? product.image_urls?.split(",")[0]
                                        : defaultImg
                                    }
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {product.name}
                                </TableCell>
                                <TableCell className="text-center">
                                  {product.prod_status === "Available" ? (
                                    <Badge variant="color3">
                                      {product.prod_status}
                                    </Badge>
                                  ) : product.prod_status ===
                                    "Out of Stock" ? (
                                    <Badge variant="color2">
                                      {product.prod_status}
                                    </Badge>
                                  ) : null}

                                  {/* {product.product_status === "available" ? (
                                    <Badge variant="color3">
                                      {product.product_status}
                                    </Badge>
                                  ) : (null
                                    // <Badge variant="color2">Out of Stock</Badge>
                                  )} */}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-end">
                                  {separator(product.price)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-center">
                                  {product.qty}
                                </TableCell>
                                <TableCell className="p-2">
                                  <div className="justify-center items-center gap-2 md:flex sm:flex">
                                    <Button
                                      variant="warning"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() =>
                                        handleEditButtonClick(product)
                                      }
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() =>
                                        handleDeleteProduct(product.product_id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <div className="text-xs text-muted-foreground">
                        pagnation
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="avaliable">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Products</CardTitle>
                      <CardDescription>
                        Manage your products and view their sales performance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                              Price
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                              In stock
                            </TableHead>
                            <TableHead className="text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {available.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan="6" className="text-center">
                                No product(s)
                              </TableCell>
                            </TableRow>
                          ) : (
                            available.map((product, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="hidden sm:table-cell p-2">
                                  <img
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.prod_images.split(",")[0]}
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {product.product_name}
                                </TableCell>
                                <TableCell className="text-center">
                                  {product.product_status === "available" ? (
                                    <Badge variant="outline">
                                      {product.product_status}
                                    </Badge>
                                  ) : (
                                    <Badge variant="destructive">
                                      Out of Stock
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-end">
                                  {separator(product.product_price)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-center">
                                  {product.product_quantity}
                                </TableCell>
                                <TableCell className="p-2">
                                  <div className="justify-center items-center gap-2 md:flex sm:flex">
                                    <Button
                                      variant="warning"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() =>
                                        handleEditButtonClick(product)
                                      }
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <div className="text-xs text-muted-foreground">
                        pagnation
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="out-of-stock">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Products</CardTitle>
                      <CardDescription>
                        Manage your products and view their sales performance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                              Price
                            </TableHead>
                            <TableHead className="hidden md:table-cell text-center">
                              In stock
                            </TableHead>
                            <TableHead className="text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {outOfStock.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan="6" className="text-center">
                                No product(s)
                              </TableCell>
                            </TableRow>
                          ) : (
                            outOfStock.map((product, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="hidden sm:table-cell p-2">
                                  <img
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.prod_images.split(",")[0]}
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {product.product_name}
                                </TableCell>
                                <TableCell className="text-center">
                                  {product.product_status === "available" ? (
                                    <Badge variant="outline">
                                      {product.product_status}
                                    </Badge>
                                  ) : (
                                    <Badge variant="destructive">
                                      Out of Stock
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-end">
                                  {separator(product.product_price)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-center">
                                  {product.product_quantity}
                                </TableCell>
                                <TableCell className="p-2">
                                  <div className="justify-center items-center gap-2 md:flex sm:flex">
                                    <Button
                                      variant="warning"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() =>
                                        handleEditButtonClick(product)
                                      }
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <div className="text-xs text-muted-foreground">
                        pagnation
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          )}
        </div>
      </div>
    </>
  );
}
