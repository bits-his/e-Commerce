import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { CardHeader, CardTitle, Card } from "react-bootstrap";
import { Form, FormGroup, Label, Input, Button, Table } from "reactstrap";

function Category() {
  // State to store the current input and the list of categories
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  // Handler for adding the new category to the list
  const handleAddCategory = () => {
    if (category.trim()) {
      setCategoryList((prevList) => [...prevList, category]);
      setCategory(""); // Clear input after adding
    }
  };

  // Handler for deleting a category from the list
  const handleDeleteCategory = (indexToDelete) => {
    setCategoryList((prevList) =>
      prevList.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Product Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="items-center">
            <Form>
              <FormGroup className="formgroup" >
                <Label for="category">Add Product Category</Label>
                <Input
                  id="category"
                  name="category"
                  className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[200px] lg:w-[300px]"
                  placeholder="Add the product category here"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} // Handle input change
                />
              </FormGroup>
              <Button color="primary" onClick={handleAddCategory}>
               + Add Category 
              </Button>
            </Form>

            {/* Display the list of categories in a table */}
            {categoryList.length > 0 && (
              <Table striped className="mt-4">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList.map((cat, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{cat}</td>
                      <td>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleDeleteCategory(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Category;
