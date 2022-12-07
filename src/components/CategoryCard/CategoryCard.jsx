import React from 'react';
import './CategoryCard.scss';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryCard = (props) => {
  return (
    <div>
        <Card className='card'>
            <Card.Img className='image' variant="top" src={ props.product.image } />
            <Card.Body>
              <Card.Title>{ props.product.name }</Card.Title>
              <Button variant="primary">See More</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CategoryCard;