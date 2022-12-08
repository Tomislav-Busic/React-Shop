import React, { useState, useEffect } from 'react';
import './Products.scss';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const Products = () => {
    const [categoryID, setCategoryID] = useState(localStorage.getItem('id'));
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);


    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryID}/products`);
            console.log(response.data);
            setProducts(response.data);
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, []);

  return (
    <div className='products'>
        <h1>Products</h1>
        <br />

        <div className='cards-container'>
            { loading && <h1>Loading...</h1> }

            { !loading &&
                products.map((product) => {
                    return (
                        <Card className='card' >
                            <Card.Img className='image' variant="top" src={ product.images[0] } />
                            <Card.Body>
                              <Card.Title>{ product.title }</Card.Title>
                                <Button 
                                      variant="primary" 
                                      >
                                        See More
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Products;