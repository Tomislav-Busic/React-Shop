import React, { useState, useEffect } from 'react';
import './Product.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
    const [ product, setProduct ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [toggle, setToggle] = useState(true);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${localStorage.getItem('proId')}`)
            console.log(response.data);
            setProduct(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProduct();
    }, [])
    

  return (
    <div className='product'>
        { loading && <h1>Loading...</h1> }

        { !loading && 
            <>  
                <div className='img-slider'>
                    <Button>prev</Button>
                    {
                        product.images.map((img) => {
                            return (
                                <img src={img} /> 
                            )
                        })
                    }
                    <Button>next</Button>  
                </div>

                <h1>{ product.title }</h1>
                <h2>${ product.price }</h2>
                <br />

                { toggle && <p> { product.description.substring(0, 50) }... </p> }
                { !toggle && <p> { product.description } </p> }
                
                <Button 
                    onClick={() => setToggle(!toggle)}
                    variant={ toggle ? 'primary' : 'secondary' }
                >
                    { toggle ? 'See more' : 'See less' }
                </Button>
            </>
        }
    </div>
  )
}

export default Product;