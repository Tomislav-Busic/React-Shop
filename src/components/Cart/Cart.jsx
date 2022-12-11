import React, { useState, useEffect } from 'react';
import './Cart.scss';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState([]);

  const fetchCartData = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://638267ff9842ca8d3ca87c97.mockapi.io/shop');
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
  }

  const handleDelete = (id) => {
        axios.delete(`https://638267ff9842ca8d3ca87c97.mockapi.io/shop/${id}`)
             .then(() => {
              window.location.reload(false);
             })
  }

 

  useEffect(() => {
    fetchCartData();
  }, [])
  


  

  return (
    <div className='cart'>
        { loading && <h1>Loading...</h1> }

        { !loading &&
          <div className='cart'>
            <h1>Cart</h1>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              {
                data.length > 0 ?
                data.map((product) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                        <td>
                          <Button
                            variant='danger'
                            onClick={() => handleDelete(product.id)}
                          >
                              Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  )
                }) :
                <tbody>
                  <tr>
                    <td>#</td>
                    <td>Not found any</td>
                    <td>product in the Cart.</td>
                    <td>Go find something!</td>
                    <td>
                      <Link to='/products'>
                        <Button
                          variant='success'
                        >Go to products</Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              }
            </Table>
            <br />
            <div className='total'>
              <h3>Total ${ data.reduce((total, item)=>total+(item.price+item.quantity),0) }</h3>
              <Button
                variant='warning'
                className='m-3'
              >
                Buy
              </Button>
            </div>
          </div>
        }
    </div>
  )
}

export default Cart;
