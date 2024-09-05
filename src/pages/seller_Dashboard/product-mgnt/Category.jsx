import { CardContent } from '@/components/ui/card'
import React from 'react'
import { CardHeader, CardTitle, Card } from 'react-bootstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap'

function Category() {
  return (
   <>
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Add product Category</CardTitle>
      </CardHeader>
      <CardContent>
    
   <div className=" items-center">
   <Form>
    <FormGroup col-md={6}>
    <Label for="category">
      Add Product Category
    </Label>
    <Input
      id="category"
      name="category"
      
      placeholder="Add the product category here"
      type="text"
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleSelect">
      Select
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      className="w-full rounded-lg bg-background ps-4 sm:w-[100px] md:w-[200px] lg:w-[300px]"
      type="select"
    >
     
      <option disabled selected>Select Product category</option>
      <option>
        1
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>
    </Form>
   </div>
      </CardContent>
    </Card>
   </>
  )
}

export default Category