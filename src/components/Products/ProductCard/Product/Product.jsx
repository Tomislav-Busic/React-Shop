import React, { useState, useEffect } from 'react';
import './Product.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleImageSlider from "react-simple-image-slider";
import SuccessMessage from './SuccessMessage/SuccessMessage';
import AddToCart from './AddToCart/AddToCart';

const Product = () => {
    const [ product, setProduct ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [toggle, setToggle] = useState(true);
    const [toggleChart, setToggleChart] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [number, setNumber] = useState(0);
    const [toggleChartMess, setToggleChartMess] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

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

    useEffect(() => {
        if ( quantity <= 0 ) {
            return setQuantity(0);
        } 
    }, [quantity])

    useEffect(() => {
        if ( number <= 0 ) {
            return setNumber(0);
        } 
    }, [number])
    
    const handleDecrement = () => {
        setQuantity(quantity - product.price);
        setNumber(number -1);
    }

    const handleIncrement = () => {
        setQuantity(quantity + product.price)
        setNumber(number +1);
    }

    const handleConfirm = () => {
        if ( number > 0 ) {
            axios.post('https://638267ff9842ca8d3ca87c97.mockapi.io/shop', {
            name: product.name,
            quantity: number,
            price: quantity
            }).then(() => {
                setToggleChart(true)
                setIsDisabled(true)
            }).then(() => {
                setToggleChartMess(false)
            })
        } 
    }

    const handleClose = () => {
        setToggleChartMess(true);
        setIsDisabled(false);
        setNumber(0);
        setQuantity(0);
    }

  return (
    <div className='product'>
        { loading && <h1>Loading...</h1> }

        { !loading && 
            <>  
                
                <SimpleImageSlider
                    width={  396 }
                    height={  396 }
                    images={product.images}
                    showBullets={true}
                    showNavs={true}
                />
                <br />

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
                <br />

                <Button 
                    disabled={ isDisabled ? true : false }
                    variant={ toggleChart ? 'warning' : 'secondary' }
                    onClick={() => setToggleChart(!toggleChart)} 
                    >
                        { toggleChart ? 'Add to chart' : 'Close' }
                </Button>
                <br />

                { !toggleChart && 
                    <AddToCart
                        product={product}
                        quantity={quantity}
                        number={number}
                        handleDecrement={handleDecrement}
                        handleIncrement={handleIncrement}
                        handleConfirm={handleConfirm}
                    />
                }

                { !toggleChartMess &&
                    <SuccessMessage 
                        product={product}
                        number={number}
                        handleClose={handleClose}
                    />
                }
            </>
        }
    </div>
  )
}

export default Product;