import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddToCart.scss';

const AddToCart = (props) => {
  return (
    <div className='add-chart'>
        <h4>Quantity</h4>
        <h2>{ props.product.title }</h2>
        <br />
        <div className='quantity' >
            <Button 
                className='m-2' 
                onClick={props.handleDecrement}
                >
                    -
            </Button>
            <h3>{ props.number }</h3>
            <Button 
                className='m-2' 
                onClick={props.handleIncrement}
                >
                    +
            </Button>
        </div>
        <h3 style={{textAlign: 'center'}}>${ props.quantity }</h3>
        <br/>
        <Button 
            variant='warning' 
            onClick={props.handleConfirm}
        >
            Add
        </Button>
    </div>
  )
}

export default AddToCart