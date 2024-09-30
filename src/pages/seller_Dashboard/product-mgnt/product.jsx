import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Spinner } from "reactstrap";

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [image_urls, setImage_urls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [available, setAvailable] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  let userDetails = localStorage.getItem("@@toke_$$_45598");

  const navigate = useNavigate();

  const initialProductState = {
    product_name: "",
    product_description: "",
    product_category: "",
    product_subcategory: "",
    product_price: null,
    product_quantity: null,
    product_status: "available",
    image_urls: [],
  };

  const [newProduct, setNewProduct] = useState(initialProductState);

  const resetForm = () => {
    setNewProduct(initialProductState);
    setImage_urls([]);
  };

  const getProduct = () => {
    _get(
      `api/get-products?shop_id=${parseInt(userDetails)}`,
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
    const category = newProduct.product_category;
    _get(
      `api/categories/types?category=${category}`,
      (resp) => {
        setSubCategories(resp.results[0]);
      },
      (err) => {
        setError(err);
      }
    );
  };

  useEffect(() => {
    if (newProduct.product_category) {
      getSubCategories();
    }
  }, [newProduct.product_category]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + image_urls.length > 10) {
      toast.error("You can only upload up to 10 images.");
      return;
    }

    setImage_urls((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (indexToRemove) => {
    setImage_urls((prevImages) =>
      prevImages.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Form validation start here
    if (
      !newProduct.product_name ||
      newProduct.product_name.trim() === "" ||
      !newProduct.product_description ||
      newProduct.product_description.trim() === ""
    ) {
      toast.error("Please fill in the product details.");
      return;
    }

    if (
      !newProduct.product_category ||
      newProduct.product_category.trim() === ""
    ) {
      toast.error("Please select the product category.");
      return;
    }
    if (
      !newProduct.product_quantity ||
      newProduct.product_quantity.trim() === ""
    ) {
      toast.error("Please Indicate the number of items available in stock.");
      return;
    }
    if (!newProduct.product_price || newProduct.product_price.trim() === "") {
      toast.error("Please Indicate the price of the item.");
      return;
    }
    if (!newProduct.product_status || newProduct.product_status.trim() === "") {
      toast.error("Please Indicate status of the product.");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    Object.keys(newProduct).forEach((i) => formData.append(i, newProduct[i]));
    image_urls.forEach((image) => formData.append("images", image));
    formData.append("shop_id", parseInt(userDetails));

    fetch(`${server_url}/api/products`, {
      method: "POST",
      body: formData,
    })
      .then((raw) => raw.json())
      .then((res) => {
        setLoading(false);
        getProduct();
        toast.success("New product added");
        setShowForm(false);
        resetForm();
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

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      _delete(
        `api/products/${id}`,
        (res) => {
          setProducts(products.filter((product) => product.id !== id));
          toast.success("Product deleted successfully");
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

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                              id="product_name"
                              type="text"
                              className="w-full"
                              placeholder="Gamer Gear Pro Controller"
                              value={
                                editMode
                                  ? currentProduct?.product_name
                                  : newProduct.product_name
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
                              id="product_description"
                              placeholder="Description about product"
                              className="min-h-32"
                              value={
                                editMode
                                  ? currentProduct?.product_description
                                  : newProduct.product_description
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
                                handleSelectChange("product_category", value)
                              }
                            >
                              <SelectTrigger
                                id="product_category"
                                aria-label="Select category"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category, idx) => (
                                  <SelectItem key={idx} value={category.name}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="product_subcategory">
                              Subcategory (optional)
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("product_subcategory", value)
                              }
                            >
                              <SelectTrigger
                                id="product_subcategory"
                                aria-label="Select subcategory"
                              >
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                              <SelectContent>
                                {subCategories.map((subCategory, idx) => (
                                  <SelectItem
                                    key={idx}
                                    value={subCategory.type_name}
                                  >
                                    {subCategory.type_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
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
                              <TableHead>Stock</TableHead>
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
                                  id="product_quantity"
                                  type="number"
                                  value={
                                    editMode
                                      ? currentProduct?.product_quantity
                                      : newProduct.product_quantity
                                  }
                                  onChange={handleInputChange}
                                />
                              </TableCell>
                              <TableCell>
                                <Label
                                  htmlFor="product_price"
                                  className="d-flex justify-content-between mb-2"
                                >
                                  <span className="text-destructive">* </span>
                                  <span>
                                    {editMode
                                      ? parseFloat(
                                          separator(
                                            currentProduct?.product_price
                                          )
                                        ).toFixed(2)
                                      : separator(newProduct.product_price)}
                                  </span>
                                </Label>
                                <Input
                                  id="product_price"
                                  type="number"
                                  value={
                                    editMode
                                      ? parseFloat(
                                          currentProduct?.product_price
                                        ).toFixed(2)
                                      : newProduct.product_price
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
                                handleSelectChange("product_status", value)
                              }
                            >
                              <SelectTrigger
                                id="product_status"
                                aria-label="Select status"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="available">
                                  Available
                                </SelectItem>
                                <SelectItem value="out of stock">
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
                            {image_urls.map((image, idx) => (
                              <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
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
                                    alignItems: "center"
                                  }}
                                >
                                  <X className="w-3 h-3"/>
                                </button>
                              </div>
                            ))}
                            {image_urls.length < 10 && (
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
                          {filteredProducts.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan="6" className="text-center">
                                No product(s)
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredProducts.map((product, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="hidden sm:table-cell p-2">
                                  <img
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={product.image_urls.split(",")[0]}
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">
                                  {product.product_name}
                                </TableCell>
                                <TableCell className="text-center">
                                  {product.product_status === "available" ? (
                                    <Badge variant="color3">
                                      {product.product_status}
                                    </Badge>
                                  ) : (
                                    <Badge variant="color2">Out of Stock</Badge>
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
                                    src={product.image_urls.split(",")[0]}
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
                                    src={product.image_urls.split(",")[0]}
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
