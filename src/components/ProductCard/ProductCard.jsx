import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = (props) => {
  return (
    <div>
        <Card className='card' >
            <Card.Img className='image' variant="top" src={ props.product.images[0] } />
            <Card.Body>
            <Card.Title>{ props.product.title }</Card.Title>
            <Card.Title>${ props.product.price }</Card.Title>
                <Button 
                      variant="primary" 
                      >
                        See More
                </Button>
            </Card.Body>
        </Card>
    </div>
  );
}

export default ProductCard;