import React from 'react';
import './CategoryCard.scss';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const CategoryCard = (props) => {
  return (
    <div>
        <Card className='card' >
            <Card.Img className='image' variant="top" src={ props.category.image } />
            <Card.Body>
              <Card.Title>{ props.category.name }</Card.Title>
              <Link to='/products'>
                <Button 
                      variant="primary" 
                      onClick={() => props.handleId(props.category.id, props.category.name)}
                      >
                        See More
                </Button>
              </Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CategoryCard;