import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const SuccessMessage = (props) => {
  return (
            <Card 
                style={ { width: '25rem' } } 
                className='card' >
                <Button 
                    variant='danger'
                    className='close-btn'
                    onClick={props.handleClose}
                    >X</Button>
                <Card.Body style={ { padding: '5rem 2rem' } }>
                    <Card.Title style={{ textAlign: 'center' }}>
                        Congratulations, you have successfully added the 
                        {' ' + props.number + ' ' +  props.product.title + ' ' } 
                        to the cart.
                    </Card.Title>
                    <Link to='/products'>
                        <Button 
                              className='m-2'  
                              variant="primary" 
                              onClick={props.handleClose}
                              >
                                See other products
                        </Button>
                    </Link>
                    <Link to='/cart'>
                        <Button
                            variant='success' 
                            onClick={props.handleClose}   
                        >
                            Go to chart
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
   
  )
}

export default SuccessMessage