import { CardContent } from '@/components/ui/card'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import { CardHeader, CardTitle, Card, CardBody } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { Form, FormGroup, Label, Input, Button, Table} from 'reactstrap'

function Category() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');
  const [customeProduct, setCustomeProduct] = useState(false);

//method for adding product
  const addProduct =()=> {
    //validating 
    if(!product.trim() || !category.trim()) {
      toast.error("Both fields are required");
      return;
    }
    setError('');

   if (editingIndex !== null){
    const updatedProducts = [...products];
    updatedProducts[editingIndex] = {product, category};
    setProducts(updatedProducts);
    setEditingIndex(null);
  
    
   }
   else{
    setProducts([...products, {product, category}]);
   }
    setProduct('');
    setCategory('');
    console.log(products)

    if (customeProduct) {
      setCustomeProduct(false); // Switch back to select dropdown
    }
    
  };
 //method for deleting product
    
 const deleteProduct = (index) => {
  const updatedProducts = products.filter((_, i) => i !==index);
  setProducts (updatedProducts);
  console.log(products)
};
//method for editing product
const  editProduct = (index) =>{
  const productToEdit = products[index];
    setProduct(productToEdit.product);
    setCategory(productToEdit.category);
    setEditingIndex(index);
    console.log(products)
  
}

//method for rendering select and input fields

const toInput=(e) =>{
  const value = e.target.value;
  if(value === 'Others'){
    setCustomeProduct(true); 
    setProduct('');
    }
    else {
      setCustomeProduct(false);
      setProduct(value);
    }
};

  const handlesave = () => {

  }
  return (
   <>
    <Card >
      <CardHeader>
        <CardTitle>Add product Category</CardTitle>
      </CardHeader>
      <CardBody className='shadow mt-4'>
    
   <div className=" items-center">
   <Form>
   <div className='row'>
   <FormGroup className="col-md-6 mt-3">
    <Label for="category">
      Add Category
    </Label>   
   { !customeProduct?(
     <Input 
     id="product"
     name="product"
      type="select"
     // className=" rounded-lg bg-background  sm:w-[100px] md:w-[200px] lg:w-[300px]"
     value={product}
     onChange={toInput}
    //  onChange={(e) => setProduct(e.target.value)}
    >
     <option  selected >Select Category </option>
          <option>
            Cloth
          </option>
          <option>
            Phone
          </option>
          <option>
            Food
          </option>
          <option>
            Others
          </option>
    
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
   )
    
  
   }
   
  </FormGroup>
  <FormGroup className="col-md-6 mt-3">
    <Label for="category">
      Add Sub-Category
    </Label>
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
  <div className='text-center mt-4'>
  <Button onClick={addProduct}>Add Product</Button>
  </div>
    </Form>
    
    <Table striped className='mt-3'>
  <thead>
  <tr>
    <th>S/N</th>
    <th>Category</th>
    <th>Sub-Category</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    {products.map((prod, index) =>(
      <tr key={index}>
        <th scope='row'>{index + 1}</th>
        <td>{prod.product}</td>
        <td>{prod.category}</td>
        <td>
          <Button color='primary' size='sm' className="me-2" onClick={() =>editProduct(index)} >Edit</Button>
          <Button color='danger' size='sm'  onClick={()=> deleteProduct(index)}> Delete </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
<div className='text-center mt-4'>
  <Button onClick={handlesave} >Save Product</Button>  
  </div>
   </div>
   
      </CardBody>
    </Card>
   </>
  )
}

export default Category