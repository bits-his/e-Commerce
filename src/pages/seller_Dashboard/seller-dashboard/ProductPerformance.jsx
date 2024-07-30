import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import './dashboard.css'

const ProductPerformance = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
   
    fetch('/api/product-performance')
      .then(response => response.json())
      .then(data => {
        setTopProducts(data.topProducts);
        setTopCategories(data.topCategories);
      });
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Top Selling Products</CardTitle>
          <ListGroup>
            {topProducts.map((product, index) => (
              <ListGroupItem key={index}>{product.name} - {product.sales} units</ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Top Categories</CardTitle>
          <ListGroup>
            {topCategories.map((category, index) => (
              <ListGroupItem key={index}>{category.name} - {category.sales} units</ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductPerformance;
