import { CardContent } from '@/components/ui/card'
import React from 'react'
import { CardHeader, CardTitle, Card } from 'react-bootstrap'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

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
   <div className='row'>
   <FormGroup className="col-md-6">
    <Label for="category">
      Add Product
    </Label>
    <Input
      id="category"
      name="category"
      // className=" rounded-lg bg-background  sm:w-[100px] md:w-[200px] lg:w-[300px]"
      placeholder="Add the product here"
      type="text"
    />
  </FormGroup>
  <FormGroup className="col-md-6">
    <Label for="category">
      Add Product Category
    </Label>
    <Input
      id="category"
      name="category"
      // className="rounded-lg bg-background  sm:w-[100px] md:w-[200px] lg:w-[300px]"
      placeholder="Add the product category here"
      type="text"
    />
  </FormGroup>
   </div>
   <Button>Add Product</Button>
    </Form>
    
   </div>
      </CardContent>
    </Card>
   </>
  )
}

export default Category