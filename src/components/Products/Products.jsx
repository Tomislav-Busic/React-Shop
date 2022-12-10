import React, { useState, useEffect } from 'react';
import './Products.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from './ProductCard/ProductCard';
import Filters from './Filters/Filters';

const Products = () => {
    const [categoryId, setCategoryId] = useState(localStorage.getItem('id'));
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [categoryName, setCategoryName] = useState(localStorage.getItem('name'));
    

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products');
            console.log(response.data);
            setProducts(response.data);
            setAllProducts(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }

    const getProductsById = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }

    const fetchingCategory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
            console.log(response.data);
            setCategory(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }
    
   

    useEffect(() => {
        getProductsById();
        if ( categoryId === null ) {
            getAllProducts();
        }
    }, [categoryId]);

    useEffect(() => {
        fetchingCategory();
        getProductsById();
        if ( categoryId === null ) {
            getAllProducts();
        }
    }, []);
    
    const displayAllProducts = () => {
        setCategoryId(null);
        setProducts(allProducts);
        setCategoryName('All products');
    }
    

    const handlePrice = (value) => {
        const newPrices = [...products];
        if ( value === 'lower') {
            setProducts(newPrices.sort((a,b) => a.price - b.price));
        } else if ( value === 'higher' ) {
            setProducts(newPrices.sort((a,b) => b.price - a.price));
        } else {
            setProducts(newPrices);
        }
    }

  return (
    <div className='products'>
        <h1>{categoryName === '' ? 'All products' : categoryName}</h1>
        <br />

        <div className='cards-container'>

            <Button 
                onClick={displayAllProducts}
                >
                    All products
            </Button>

            { loading && <h1>Loading...</h1> } 

            { !loading && category.map((choice) => {
                    return (
                        <>
                            <Button 
                        className='m-2'
                        onClick={() => {
                            return (
                                setCategoryId(choice.id), 
                                setCategoryName(choice.name)
                            )
                        }}
                        >
                            {choice.name}
                        </Button>
                        </>
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