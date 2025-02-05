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
import { separator } from "@/utils/Helper";
import { Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import React from "react";

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
}) => {
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
                            <Badge variant="destructive">Out of Stock</Badge>
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
                            <Badge variant="destructive">Out of Stock</Badge>
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
      </Tabs>
    </main>
  );
};

export default Veiw_Product;
