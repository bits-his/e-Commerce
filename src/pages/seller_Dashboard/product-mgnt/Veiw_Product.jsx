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
import { _get, separator } from "@/utils/Helper";
import { Eye, Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Veiw_Product = ({
  searchQuery,
  setSearchQuery,
  setEditMode,
  setShowForm,
  products,
  defaultImg,
  handleDeleteProduct,
  handleEditButtonClick,
  available,
  outOfStock,
  loading,
}) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    product.product_name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const handleViewClick = (ctgry) => {
    // alert(JSON.stringify(ctgry.ctgry_id));
    let cat_id = ctgry.ctgry_id;
    navigate(`product_by_category?category=${cat_id}`, { state: { ctgry } });
    // toggleModal();
  };

  return (
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
        <Tabs>
          <TabsContent>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Products </CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              {/* {JSON.stringify(categories)} */}
              <CardContent style={{ overflow: "auto" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
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
                              className="h-7 w-10"
                              onClick={() => handleViewClick(ctgry)}
                            >
                              <Eye className="h-4 w-4" />
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
        </Tabs>{" "}
      </Tabs>
    </main>
  );
};

export default Veiw_Product;
