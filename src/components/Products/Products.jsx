import React, { useState, useEffect } from 'react';
import './Products.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from '../ProductCard/ProductCard';
import Filters from '../Filters/Filters';

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

    const handlePrice = (value) => {
        const newPrices = [...products];
        if ( value === 'lower') {
            setProducts(newPrices.sort((a,b) => a.price - b.price));
        } else {
            setProducts(newPrices.sort((a,b) => b.price - a.price));
        }
    }

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
        <Filters setSearchName={setSearchName} handlePrice={handlePrice} />
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
                        <ProductCard product={product} />
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