import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Form, FormGroup, Label, Input, Table } from "reactstrap";
import { Badge, Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { _get, globalColor } from "@/utils/Helper";
import defaultImg from "../../../assets/No-Image-Placeholder.jpg";
// import { TabsContent } from '@/components/ui/tabs'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Category({}) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const [customeProduct, setCustomeProduct] = useState(false);
  // ========================================================================
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  //method for adding product
  const addProduct = () => {
    //validating
    if (!product.trim() || !category.trim()) {
      toast.error("Both fields are required");
      return;
    }
    setError("");

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = { product, category };
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, { product, category }]);
    }
    setProduct("");
    setCategory("");
    console.log(products);

    if (customeProduct) {
      setCustomeProduct(false); // Switch back to select dropdown
    }
  };
  //method for deleting product

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    console.log(products);
  };
  //method for editing product
  const editProduct = (index) => {
    const productToEdit = products[index];
    setProduct(productToEdit.product);
    setCategory(productToEdit.category);
    setEditingIndex(index);
    console.log(products);
  };

  //method for rendering select and input fields

  const toInput = (e) => {
    const value = e.target.value;
    if (value === "Others") {
      setCustomeProduct(true);
      setProduct("");
    } else {
      setCustomeProduct(false);
      setProduct(value);
    }
  };

  const handlesave = () => {};
  // const [products, setProducts] = useState([]);
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

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4">
        <div className="d-flex justify-content-between w-100">
          <div
            style={{ outline: "1px solid #a52a2a" }}
            className="d-flex justify-content-center align-items-center rounded p-0"
          >
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[150px] lg:w-[300px]"
              style={{ borderRadius: "10px 0 10px 0 10px" }}
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button variant="color1" className="p-2">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {/* <div className="relative ml-auto flex-1 md:grow-0 hidden md:inline">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[150px] lg:w-[300px]"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
          <Button
            variant="color1"
            size="sm"
            className="h-8 gap-1"
            onClick={() => {
              navigate("add_category");
              // setEditMode(false);
              // setShowForm(true);
            }}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add new categoty
            </span>
          </Button>
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          {/* <Card className=""> */}
          {/* <CardTitle className="mt-5 mx-3">Add product Category</CardTitle> */}
          {/* {JSON.stringify(categories)} */}
          <Tabs>
            <TabsContent>
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products Categories</CardTitle>
                  <CardDescription>
                    Manage your products categories and view their sales
                    performance.
                  </CardDescription>
                </CardHeader>
                {/* {JSON.stringify(userDetails.slice(1, -1))} */}
                <CardContent style={{ overflow: "auto" }}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Default Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((ctgry, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="sm:table-cell p-2">
                            <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={
                                ctgry.ctgry_image_urls
                                  ? ctgry.ctgry_image_urls.split(",")[0]
                                  : defaultImg
                              }
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {ctgry.ctgry_name}
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
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">pagnation</div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {/* <CardBody className="mx-3 shadow-lg mt-4 rounded-lg">
          <div className=" items-center">
            <Form>
              <div className="row">
                <FormGroup className="col-md-6 mt-3">
                  <Label for="category">Add Category</Label>
                  {!customeProduct ? (
                    <Input
                      id="product"
                      name="product"
                      type="select"
                      // className=" rounded-lg bg-background  sm:w-[100px] md:w-[200px] lg:w-[300px]"
                      value={product}
                      onChange={toInput}
                      //  onChange={(e) => setProduct(e.target.value)}
                    >
                      <option selected>Select Category </option>
                      <option>Cloth</option>
                      <option>Phone</option>
                      <option>Food</option>
                      <option>Others</option>
                    </Input>
                  ) : (
                    <Input
                      id="product"
                      name="product"
                      placeholder="Enter your product category"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)} // Update product state with custom input
                      type="text"
                    />
                  )}
                </FormGroup>
                <FormGroup className="col-md-6 mt-3">
                  <Label for="category">Add Sub-Category</Label>
                  <Input
                    id="category"
                    name="category"
                    type="text"
                    // className="rounded-lg bg-background  sm:w-[100px] md:w-[200px] lg:w-[300px]"
                    placeholder="Add the product category here"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className="text-center mt-4">
                <Button onClick={addProduct}>Add Product</Button>
              </div>
            </Form>

            <Table striped className="mt-3">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Category</th>
                  <th>Sub-Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{prod.product}</td>
                    <td>{prod.category}</td>
                    <td>
                   <Button
                        color='warning'
                        size="icon"
                        className="me-2"
                        onClick={() => editProduct(index)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        color='danger'
                        
                        size="icon"
                        onClick={() => deleteProduct(index)}
                      >
                        {" "}
                        {" "}
                        <Trash2 className= "h-4 w-4"/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-4">
              <Button onClick={handlesave}>Save Product</Button>
            </div>
          </div>
        </CardBody> */}
          {/* </Card> */}
        </div>
      </div>
    </>
  );
}

export default Category;
