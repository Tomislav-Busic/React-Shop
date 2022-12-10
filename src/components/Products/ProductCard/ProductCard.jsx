import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.scss';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
  const [changeImg, setChangeImg] = useState(props.product.images[0])

  return (
    <div>
        <Card className='card' >
            <Card.Img className='image' variant="top" src={ changeImg } />
            <Card.Body>
              { props.product.images.map((img) => {
                
                return (
                  <img className='img' src={img} onClick={() => setChangeImg(img)} />
                )
              }) }
              <Card.Title>{ props.product.title }</Card.Title>
              <Card.Title>${ props.product.price }</Card.Title>
                  <Link to="/product">
                    <Button 
                          onClick={() => props.productId(props.product.id)}
                          variant="primary" 
                          >
                            See More
                    </Button>
                  </Link>
            </Card.Body>
        </Card>
    </div>
  );
}

export default ProductCard;