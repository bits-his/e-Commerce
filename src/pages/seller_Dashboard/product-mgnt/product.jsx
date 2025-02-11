/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  _get,
  _post,
  _put,
  _delete,
  server_url,
} from "../../../utils/Helper";
import defaultImg from "../../../assets/No-Image-Placeholder.jpg";
import imageCompression from "browser-image-compression";
import Veiw_Product from "./Veiw_Product";
import Add_Update_Product from "./Add_Update_Product";

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
      products.filter((product) => product.prod_status === "Available")
    )
      // [products];
  }, [products]);

  useEffect(() => {
    setOutOfStock(
      products.filter((product) => product.prod_status === "Out of Stock")
    )
      // [products];
  }, [products]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          {/* ==============add and update prodeuct================ */}
          {showForm ? (
            <Add_Update_Product
              handleAddProduct={handleAddProduct}
              handleBackButtonClick={handleBackButtonClick}
              handleChange={handleChange}
              handleDiscard={handleDiscard}
              handleEditProduct={handleEditProduct}
              handleImageChange={handleImageChange}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              editMode={editMode}
              Loading={Loading}
              currentProduct={currentProduct}
              newProduct={newProduct}
              categories={categories}
              subCategories={subCategories}
              shoesSize={shoesSize}
              showSizeInputchange={showSizeInputchange}
              options={options}
              selectedCheckboxes={selectedCheckboxes}
              capsSize={capsSize}
              prod_images={prod_images}
              removeImage={removeImage}
              showSizeInput={showSizeInput}
             />
          ) : (
            // ======================================================products view=================================================================
              <Veiw_Product
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setEditMode={setEditMode}
                setShowForm={setShowForm}
                products={products}
                defaultImg={defaultImg}
                handleDeleteProduct={handleDeleteProduct}
                handleEditButtonClick={handleEditButtonClick}
                available={available}
                outOfStock={outOfStock}
                loading={Loading}
              />
          )}
        </div>
      </div>
    </>
  );
}
