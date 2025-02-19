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
import { Textarea } from "@/components/ui/textarea";
import { _get, _put, separator } from "@/utils/Helper";
import { ChevronLeft, PlusCircle, Upload, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Spinner } from "reactstrap";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [prod_images, setprod_images] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showSizeInputchange, setShowSizeInputchange] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const options = ["S", "M", "L", "XL", "XXL", "XXXL", "Free Size"];
  const shoesSize = ["38", "39", "40", "41", "42", "43", "44", "45"];
  const capsSize = ["20", "21", "22", "23", "24"];

  // const fetchProductmain = () => {
  //   setLoading(true);
  //   _get(
  //     `api/products/${productId}`,
  //     (resp) => {
  //       setCurrentProduct(resp.result[0]);
  //       setLoading(false);
  //     },
  //     (err) => {
  //       toast.error("Failed to fetch product details.");
  //       setLoading(false);
  //       console.error(err);
  //     }
  //   );
  // };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = () => {
    _get(
      `api/productsbyid/${productId}`,
      (resp) => {
        // alert(JSON.stringify(resp));
        setCurrentProduct(resp.result || {});
        setprod_images(resp.result.prod_images || []);
      },
      (err) => {
        toast.error("Failed to fetch product details.");
        console.error(err);
      }
    );
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // alert(JSON.stringify(currentProduct?.map((product) => product)));

  const fetchCategories = () => {
    _get(
      "api/categories",
      {},
      (resp) => {
        setCategories(resp.results);
      },
      (err) => {
        toast.error("Failed to fetch categories.");
        console.error(err);
      }
    );
  };

  const handleInputChange = (e, productId) => {
    const { name, value } = e.target;
    setCurrentProduct((prevData) =>
      currentProduct.map((product) =>
        product.id === productId ? { ...product, [name]: value } : product
      )
    );
    //   ...prevData,

    //   [name]: value,
    // }));
  };

  const handleSelectChange = (id, value) => {
    setCurrentProduct((prevData) =>
      prevData.map((product) =>
        product.id === productId ? { ...product, [id]: value } : product
      )
    );
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
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          };
          return await imageCompression(file, options);
        } catch (error) {
          console.error("Image compression error:", error);
          toast.error("Failed to compress one or more images.");
          return null;
        }
      })
    );

    const validCompressedImages = compressedImages.filter(
      (image) => image !== null
    );
    setprod_images((prevImages) => [...prevImages, ...validCompressedImages]);
  };

  const removeImage = (indexToRemove) => {
    setprod_images((prevImages) =>
      prevImages.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleEditProduct = () => {
    const obj = { ...currentProduct, prod_images };

    console.log("Data being sent:", obj);

    _put(
      `api/editproducts/${productId}`,
      obj,
      (res) => {
        toast.success("Product updated successfully");
        navigate("/seller-dashboard/product-mgmt/product");
      },
      (err) => {
        toast.error("Failed to update product");
        console.error(err);
      }
    );
  };

  const handleDiscard = () => {
    navigate("/products");
    toast.success("Discarded!");
  };

  // alert(productId);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => navigate("/products")}
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
              onClick={handleEditProduct}
              disabled={Loading}
            >
              {Loading ? (
                <>
                  <Spinner className="h-4 w-4" />
                </>
              ) : (
                <>Update Product</>
              )}
            </Button>
          </div>
        </div>
        {/* {JSON.stringify(currentProduct.map((product) => product))} */}
        {currentProduct &&
          currentProduct?.map((product) => (
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      "<small className="text-danger">*</small>" Signifies the
                      required fields
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="product_name">
                          <span className="text-danger">* </span>Name
                        </Label>
                        {/* {JSON.stringify(product)} */}
                        <Input
                          id="prod_name"
                          type="text"
                          className="w-full"
                          placeholder="Gamer Gear Pro Controller"
                          name="name"
                          value={product?.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="product_description">
                          <span className="text-danger">* </span>Description
                        </Label>
                        <Textarea
                          id="prod_des"
                          placeholder="Description about product"
                          className="min-h-32"
                          name="description"
                          value={product?.description}
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
                          value={currentProduct?.ctgry_id}
                        >
                          <SelectTrigger
                            id="ctgry_id"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category, idx) => (
                              <SelectItem key={idx} value={category.ctgry_id}>
                                {category.ctgry_name}
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
                            handleSelectChange("sub_ctgry_id", value)
                          }
                          value={currentProduct?.sub_ctgry_id}
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
                      {(currentProduct?.sub_ctgry_id === "Yard" ||
                        currentProduct?.sub_ctgry_id === "Materials" ||
                        currentProduct?.sub_ctgry_id === "Shadda" ||
                        currentProduct?.sub_ctgry_id === "Men_Lace") && (
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
                                <SelectItem value="Others">Others</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id="prod_size"
                              type="text"
                              value={currentProduct?.prod_size}
                              placeholder="Enter your measurement"
                              onChange={handleInputChange}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <Row className="m-0 p-0">
                      {(currentProduct?.sub_ctgry_id === "Singlet" ||
                        currentProduct?.sub_ctgry_id === "Under Wears" ||
                        currentProduct?.sub_ctgry_id === "Kid Close" ||
                        currentProduct?.sub_ctgry_id === "Abaya") && (
                        <Col md={12}>
                          <Label>Product Size</Label>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "15px",
                            }}
                          >
                            {options.map((option) => (
                              <div key={option}>
                                <input
                                  type="checkbox"
                                  id={option}
                                  name={option}
                                  checked={selectedCheckboxes.includes(option)}
                                  onChange={(e) => {
                                    const { name, checked } = e.target;
                                    setSelectedCheckboxes((prev) =>
                                      checked
                                        ? [...prev, name]
                                        : prev.filter((item) => item !== name)
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={option}
                                  style={{ marginLeft: "3px" }}
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Col>
                      )}
                      {currentProduct?.sub_ctgry_id === "Shoes" && (
                        <Col md={12}>
                          <Label>Product Size</Label>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "13px",
                            }}
                          >
                            {shoesSize.map((option) => (
                              <div key={option}>
                                <input
                                  type="checkbox"
                                  id={option}
                                  name={option}
                                  checked={selectedCheckboxes.includes(option)}
                                  onChange={(e) => {
                                    const { name, checked } = e.target;
                                    setSelectedCheckboxes((prev) =>
                                      checked
                                        ? [...prev, name]
                                        : prev.filter((item) => item !== name)
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={option}
                                  style={{ marginLeft: "3px" }}
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Col>
                      )}
                      {currentProduct?.sub_ctgry_id === "Caps" && (
                        <Col md={12}>
                          <Label>Product Size</Label>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "20px",
                            }}
                          >
                            {capsSize.map((option) => (
                              <div key={option}>
                                <input
                                  type="checkbox"
                                  id={option}
                                  name={option}
                                  checked={selectedCheckboxes.includes(option)}
                                  onChange={(e) => {
                                    const { name, checked } = e.target;
                                    setSelectedCheckboxes((prev) =>
                                      checked
                                        ? [...prev, name]
                                        : prev.filter((item) => item !== name)
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={option}
                                  style={{ marginLeft: "3px" }}
                                >
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
                            <Label htmlFor="product_quantity" className="mb-2">
                              <span className="text-danger">* </span>
                            </Label>
                            <Input
                              id="prod_qty"
                              type="number"
                              name="qty"
                              value={product?.qty}
                              onChange={handleInputChange}
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="qty_des" className="mb-2">
                              <span className="text-danger">* </span>
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("qty_des", value)
                              }
                              value={product?.qty_description}
                            >
                              <SelectTrigger
                                id="qty_des"
                                aria-label="Quantity Description"
                              >
                                <SelectValue placeholder="Qty Description" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yard">Yard</SelectItem>
                                <SelectItem value="pieces">Pieces</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Label
                              htmlFor="product_price"
                              className="d-flex justify-content-between mb-2"
                            >
                              <span className="text-destructive">* </span>
                              <span>{separator(product?.price)}</span>
                            </Label>
                            <Input
                              id="prod_price"
                              type="number"
                              name="price"
                              value={product?.price}
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
                          name="prod_status"
                          onValueChange={(value) =>
                            handleSelectChange("prod_status", value)
                          }
                          value={product?.prod_status}
                        >
                          <SelectTrigger
                            id="prod_status"
                            name="prod_status"
                            aria-label="Select status"
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent name="prod_status">
                            <SelectItem value="Available">Available</SelectItem>
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
          ))}
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" onClick={handleDiscard}>
            Discard
          </Button>
          <Button
            variant="color1"
            size="sm"
            onClick={handleEditProduct}
            disabled={Loading}
          >
            {Loading ? (
              <>
                <Spinner className="h-4 w-4" />
              </>
            ) : (
              <>Update Product</>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default EditProduct;
