import React from 'react'
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
import { _get } from '@/utils/Helper';

const Product_category = () => {

  const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
    
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

    //  const handleInputChange = (e) => {
    //    const { id, value } = e.target;

    //    if (editMode) {
    //      setCurrentProduct((prevData) => ({
    //        ...prevData,
    //        [id]: value, // Updates the field by its ID (e.g., product_size)
    //      }));
    //    } else {
    //      setNewProduct((prevData) => ({
    //        ...prevData,
    //        [id]: value, // Updates the field by its ID (e.g., product_size)
    //      }));
    //    }
    //  };

    const handleSelectChange = (id, value) => {
      // Update the product state depending on editMode
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

      // Check if the category and subcategory meet the conditions to show the size input
      if (
        id === "product_subcategory" &&
        value === "Yard" &&
        newProduct.product_category === "Fabric"
      ) {
        setShowSizeInput(true); // Show the size input if category is Shoes and subcategory is Timber
      } else if (id === "product_category" && value !== "Fabric") {
        setShowSizeInput(false); // Hide the size input if the category is not Shoes
      } else {
        setShowSizeInput(false); // Hide the size input for other cases
      }
    };

  return (
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
                    <SelectItem key={idx} value={subCategory.type_name}>
                      {subCategory.type_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {showSizeInput && (
              <div className="grid gap-3">
                <Label htmlFor="product_size">Size</Label>
                <Input
                  id="product_size" // Make sure the input's id matches the key in your state
                  type="text"
                  value={
                    editMode
                      ? currentProduct?.product_size
                      : newProduct.product_size
                  } // Match with state
                  placeholder="Enter size"
                  onChange={handleInputChange} // Correct input handler
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
  );
}

export default Product_category