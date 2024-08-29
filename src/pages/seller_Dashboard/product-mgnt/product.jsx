import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  ChevronLeft,
  Upload,
  Search,
  Pencil,
  Trash2,
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import toast from "react-hot-toast";
import img from "./placeholder.svg";
import { _get, _post, _put, _delete, separator } from "../../../utils/Helper";


export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    _get(
      "api/get-products",
      (resp) => {
        setProducts(resp.result[0]);
        setLoading(false);
        // console.log(resp.result[0])
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, []);

  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_description: "",
    product_category: "",
    product_subcategory: "",
    product_price: 0,
    product_quantity: 0,
    product_status: "",
  });

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
  

  const handleAddProduct = async (e) => {
    e.preventDefault();

    setLoading(true);
    // setProducts([...products, newProduct]);
    const obj = { ...newProduct };

    _post(
      "api/products",
      obj,
      (res) => {
        setLoading(false);
        toast.success("New product added");
        setShowForm(false);
      },

      (err) => {
        setLoading(false);
        toast.error("An error occurred!");
        console.log(err);
      }
    );
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
        const updatedProducts = products.map((product) =>
          product.id === currentProduct.id ? res.result[0] : product,
          console.log(res.result)
        );
        setProducts(updatedProducts);
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

  const filteredProducts = products.filter(
    (product) => product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                      size="sm"
                      onClick={editMode ? handleEditProduct : handleAddProduct}
                    >
                      Save Product
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
                            <Label htmlFor="product_name">Name</Label>
                            <Input
                              id="product_name"
                              type="text"
                              className="w-full"
                              placeholder="Gamer Gear Pro Controller"
                              value={editMode ? currentProduct?.product_name : newProduct.product_name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="product_description">Description</Label>
                            <Textarea
                              id="product_description"
                              placeholder="Lorem ipsum."
                              className="min-h-32"
                              value={
                                editMode ? currentProduct?.product_description : newProduct.product_description
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
                            <Label htmlFor="product_category">Category</Label>
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
                                <SelectItem value="clothing">
                                  Clothing
                                </SelectItem>
                                <SelectItem value="electronics">
                                  Electronics
                                </SelectItem>
                                <SelectItem value="accessories">
                                  Accessories
                                </SelectItem>
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
                                <SelectItem value="t-shirts">
                                  T-Shirts
                                </SelectItem>
                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                <SelectItem value="sweatshirts">
                                  Sweatshirts
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-1">
                      <CardHeader>
                        <CardTitle>Stock</CardTitle>
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
                                <Label htmlFor="product_quantity" className="sr-only">
                                  Stock
                                </Label>
                                <Input
                                  id="product_quantity"
                                  type="number"
                                  value={
                                    editMode ? currentProduct?.product_quantity : newProduct.product_quantity
                                  }
                                  onChange={handleInputChange}
                                />
                              </TableCell>
                              <TableCell>
                                <Label htmlFor="product_price" className="sr-only">
                                  Price
                                </Label>
                                <Input
                                  id="product_price"
                                  type="number"
                                  value={
                                    editMode ? parseFloat(currentProduct?.product_price).toFixed(2) : newProduct.product_price
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
                            <Label htmlFor="product_status">Status</Label>
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
                        <CardTitle>Product Images</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <img
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={img}
                            width="300"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <button>
                              <img
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                src={img}
                                width="84"
                              />
                            </button>
                            <button>
                              <img
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                src={img}
                                width="84"
                              />
                            </button>
                            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                              <Upload className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">Upload</span>
                            </button>
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
                    size="sm"
                    onClick={editMode ? handleEditProduct : handleAddProduct}
                  >
                    Save Product
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
                    <div className="relative ml-auto flex-1 md:grow-0">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[200px] lg:w-[300px]"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
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
                                    src={img}
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
