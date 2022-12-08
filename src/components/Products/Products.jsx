import React, { useState, useEffect } from 'react';
import './Products.scss';
import axios from 'axios';
import { Card, Button, InputGroup, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const Products = () => {
    const [categoryId, setCategoryId] = useState(localStorage.getItem('id'));
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [searchName, setSearchName] = useState('');

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
            console.log(response.data);
            setProducts(response.data);
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    const fetchingCategory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
            console.log(response.data);
            setCategory(response.data);
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
        fetchingCategory();
    }, [categoryId]);

  return (
    <div className='products'>
        <h1>Products</h1>
        <br />

        <div className='cards-container'>
        { loading && <h1>Loading...</h1> } 

        { !loading && category.map((choice) => {
                return (
                    <Button 
                    className='m-2'
                    onClick={() => setCategoryId(choice.id)}
                    >
                        {choice.name}
                    </Button>
                );
            })
        }
        </div>

        <br />
        <InputGroup className="mb-3">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder='Search by Name'
              onChange={(e) => setSearchName(e.target.value)}
            />
        </InputGroup>
        <br />

        <div className='cards-container'>
            { loading && <h1>Loading...</h1> }

            { products.length > 0 ?
                !loading &&
                products.filter((product) => 
                    product.title.toLowerCase().includes(searchName) ||
                    product.title.includes(searchName)
                ).map((product) => {
                    return (
                        <Card className='card' >
                            <Card.Img className='image' variant="top" src={ product.images[0] } />
                            <Card.Body>
                            <Card.Title>{ product.title }</Card.Title>
                            <Card.Title>${ product.price }</Card.Title>
                                <Button 
                                      variant="primary" 
                                      >
                                        See More
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                }) :
                <h1 style={{ textAlign: 'center' }}>
                    Sorry this type of Products was not found! Please try another Category :)
                </h1>
            }
        </div>
    </div>
  )
}

export default Products;