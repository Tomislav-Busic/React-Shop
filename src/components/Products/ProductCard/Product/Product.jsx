import React, { useState, useEffect } from 'react';
import './Product.scss';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleImageSlider from "react-simple-image-slider";
import { Link } from 'react-router-dom';

const Product = () => {
    const [ product, setProduct ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [toggle, setToggle] = useState(true);
    const [toggleChart, setToggleChart] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [number, setNumber] = useState(0);
    const [toggleChartMess, setToggleChartMess] = useState(true);

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
                setToggleChartMess(false)
            })
        }
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
                    variant={ toggleChart ? 'warning' : 'secondary' }
                    onClick={() => setToggleChart(!toggleChart)} 
                    >
                        { toggleChart ? 'Add to chart' : 'Close' }
                </Button>
                <br />

                { !toggleChart && 
                <div className='add-chart'>

                    <h2>Quantity</h2>
                    <br />

                    <div className='quantity' >
                        <Button 
                            className='m-2' 
                            onClick={handleDecrement}
                            >
                                -
                        </Button>
                        <h3>{ number }</h3>
                        <Button 
                            className='m-2' 
                            onClick={handleIncrement}
                            >
                                +
                        </Button>
                    </div>

                    <h3 style={{textAlign: 'center'}}>${ quantity }</h3>
                    <br/>

                    <Button 
                        variant='warning' 
                        onClick={handleConfirm}
                    >
                        Add
                    </Button>
                </div> 
                }

                { !toggleChartMess &&
                    <div className='card'>
                            <Card  >
                                <Card.Body>
                                    <Card.Title>
                                        Congratulations, you have successfully added the { product.title } to the cart.
                                    </Card.Title>

                                    <Button 
                                          className='m-2'  
                                          variant="primary" 
                                          onClick={() => setToggleChartMess(true)}
                                          >
                                            Close
                                    </Button>

                                    <Link>
                                        <Button
                                            variant='success'    
                                        >
                                            Go to chart
                                        </Button>
                                    </Link>

                                </Card.Body>
                            </Card>
                    </div>
                }
            </>
        }
    </div>
  )
}

export default Product;