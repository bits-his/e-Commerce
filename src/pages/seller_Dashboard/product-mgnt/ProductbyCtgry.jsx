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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useQuery, { _delete, _get, _put, separator } from "@/utils/Helper";
import { ArrowLeft, Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultImg from "@/utils/Helper";
import toast from "react-hot-toast";

const ProductbyCtgry = () => {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [available, setAvailable] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  let userDetails = localStorage.getItem("@@toke_$$_45598");
  const cat_id = useQuery().get("category");
  const getProduct = () => {
    _get(
      `api/get-product-by-ctgry_id?ctgry_id=${cat_id}`,
      (resp) => {
        setProducts(resp.response[0]);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
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

  const handleEditButtonClick = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDeleteProduct = (product_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      _delete(
        `api/products/${product_id}`,
        (res) => {
          setProducts(
            products.filter((product) => product.product_id !== product_id)
          );
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

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    setAvailable(
      products?.filter((product) => product.prod_status === "Available")
    );
  }, [products]);

  useEffect(() => {
    setOutOfStock(
      products?.filter((product) => product.prod_status === "Out of Stock")
    );
  }, [products]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <Button
          variant="color1"
          size="sm"
          className="h-8 gap-1"
          onClick={goBack}
        >
          <ArrowLeft /> Back
        </Button>
        <div className="flex items-center pt-3">
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
            {/* {JSON.stringify(products)} */}
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      In stock
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan="6" className="text-center">
                        No product(s)
                      </TableCell>
                    </TableRow>
                  ) : (
                    products?.map((product, idx) => (
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
                          ) : product.prod_status === "Out of Stock" ? (
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
                              onClick={() => handleEditButtonClick(product)}
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
              <div className="text-xs text-muted-foreground">pagnation</div>
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
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                      In stock
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {available?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan="6" className="text-center">
                        No product(s)
                      </TableCell>
                    </TableRow>
                  ) : (
                    available?.map((product, idx) => (
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
                          ) : product.prod_status === "Out of Stock" ? (
                            <Badge variant="color2">
                              {product.prod_status}
                            </Badge>
                          ) : null}
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
                              onClick={() => handleEditButtonClick(product)}
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
              <div className="text-xs text-muted-foreground">pagnation</div>
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
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="hidden md:table-cell text-center">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell text-center">
                        In stock
                      </TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outOfStock?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan="6" className="text-center">
                          No product(s)
                        </TableCell>
                      </TableRow>
                    ) : (
                      outOfStock?.map((product, idx) => (
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
                          <TableCell className="font-medium whitespace-nowrap">
                            {product.name}
                          </TableCell>
                          <TableCell className="text-center whitespace-nowrap">
                            {product.prod_status === "Available" ? (
                              <Badge variant="color3">
                                {product.prod_status}
                              </Badge>
                            ) : product.prod_status === "Out of Stock" ? (
                              <Badge variant="color2">
                                {product.prod_status}
                              </Badge>
                            ) : null}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-end whitespace-nowrap">
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
                                onClick={() => handleEditButtonClick(product)}
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
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">pagnation</div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ProductbyCtgry;
