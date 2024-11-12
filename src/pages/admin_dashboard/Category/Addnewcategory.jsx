import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import {
  Badge,
  ChevronLeft,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { _get, _post, globalColor, server_url } from "@/utils/Helper";
import { Button } from "@/components/ui/button";
import defaultImg from "../../../assets/No-Image-Placeholder.jpg";
import { useNavigate } from "react-router-dom";
// import { TabsContent } from '@/components/ui/tabs'
import "./category.css";

const Addnewcategory = () => {
  const [editMode, setEditMode] = useState(false);
  const [category_image, setCategory_image] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);

  const initialProductState = {
    category_name: "",
    category_image: [],
    };
    
    const [category, setCategory] = useState(initialProductState);
    
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (editMode) {
      setCurrentProduct((prevData) => ({
        ...prevData,
        [id]: value, // Updates the field by its ID (e.g., product_size)
      }));
    } else {
      setCategory((prevData) => ({
        ...prevData,
        [id]: value, // Updates the field by its ID (e.g., product_size)
      }));
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + category_image.length > 20) {
      toast.error("You can only upload up to 20 images.");
      return;
    }

    setCategory_image((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (indexToRemove, isExisting) => {
    if (isExisting) {
      // Handle removal of existing images in edit mode
      setCurrentProduct((prevProduct) => ({
        ...prevProduct,
        category_image: prevProduct.category_image.filter(
          (_, idx) => idx !== indexToRemove
        ),
      }));
    } else {
      // Handle removal of newly added images
      setCategory_image((prevImages) =>
        prevImages.filter((_, idx) => idx !== indexToRemove)
      );
    }
    };
    

    const resetForm = () => {
      setCategory(initialProductState);
      setCategory_image([]);
    };


  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!category.category_name || category.category_name.trim() === "") {
      toast.error("Please write the category name.");
      return;
      }         
      
      const formData = new FormData();

      formData.append("category_name",category.category_name)

      setLoading(true);
      
      category_image.forEach((file, index) => {
    formData.append(`category_image`, file);
  });
       
      fetch(`${server_url}/api/createcategories`, {
      method: "POST",
      body: formData,
    })
      .then((raw) => raw.json())
      .then((res) => {
          setLoading(false)
          toast.success("New Category added");
        console.log(formData);
        resetForm();
      })
      .catch((err) => {
        toast.error("An error occurred!");
        console.log(err);
      });
      
    //   setLoading(false);
    //   setCategory(initialProductState);
    //   setSubCategory("");
    //   setSubCategories([]);
    //   setCategory_image([]);
    //   navigate(-1);
    //   toast.success("New category added");  
    
      
  };
  const handleDiscard = () => {
    navigate(-1);
    toast.success("Discarded!");
  };
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleAddVariant = () => {
    if (!subCategory.trim()) {
      toast.error("Sub-Category name is required");
      return;
    }

    if (editingVariantIndex !== null) {
      const updatedVariants = [...subCategories];
      updatedVariants[editingVariantIndex] = subCategory;
      setSubCategories(updatedVariants);
      setEditingVariantIndex(null);
    } else {
      setSubCategories([...subCategories, subCategory]);
    }
    setSubCategory("");
  };

  const handleDeleteVariant = (index) => {
    const updatedVariants = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedVariants);
  };

  const handleEditVariant = (index) => {
    setSubCategory(subCategories[index]);
    setEditingVariantIndex(index);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 py-4">
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
            onClick={handleAddProduct}
            disabled={Loading}
          >
            {Loading ? (
              <>
                <Spinner className="h-4 w-4" />
              </>
            ) : (
              <>Save Category</>
            )}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Create New Category</CardTitle>
              <CardDescription> Signifies the required fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid">
                  <Label htmlFor="category_name">
                    <span className="text-danger">* </span>Category Name
                  </Label>
                  <Input
                    id="category_name"
                    type="text"
                    className="w-full"
                    placeholder="Gamer Gear Pro Controller"
                    value={category.category_name}
                    onChange={handleInputChange}
                  />
                </div>
                {/* <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle style={{ fontSize: "18px" }}>
                      Sub Category(
                      <span style={{ fontSize: "13px" }}>Optional</span>)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="row">
                      <div className="col-md-6">
                        <Label htmlFor="sub_category_name">
                          <span className="text-danger">* </span>Sub-Category
                          Name
                        </Label>
                        <Input
                          id="sub_category_name"
                          type="text"
                          className="w-full"
                          placeholder="Gamer sub category"
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 d-flex justify-content-end align-items-end">
                        <Button
                          size="sm"
                          variant="color1"
                          onClick={handleAddVariant}
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          {editingVariantIndex !== null
                            ? "Update Variant"
                            : "Add Variant"}
                        </Button>
                      </div>
                    </div>

                    <Table className="mt-3">
                      <TableHeader>
                        <TableRow>
                          <TableHead>S/N</TableHead>
                          <TableHead>Sub-Category Name</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subCategories.map((variant, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{variant}</TableCell>
                            <TableCell>
                              <Button
                                variant="color1"
                                size="icon"
                                className="me-2"
                                onClick={() => handleEditVariant(index)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="color1"
                                size="icon"
                                onClick={() => handleDeleteVariant(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card> */}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
              <CardTitle>
                <span className="text-danger">* </span>Category Default Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 gap-2">
                  {category_image.map((image, idx) => (
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
                  {category_image.length < 20 && (
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
    </div>
  );
};

export default Addnewcategory;
