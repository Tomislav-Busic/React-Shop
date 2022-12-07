import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.scss';
import axios from 'axios';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    const fetchingData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
            console.log(response.data);
            setData(response.data);
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchingData();
    }, [])

  return (
    <div className='home'>
        <h1>Home</h1>
        <br />
        
        <div className='cards-container'>
            { loading && <h1>Loading...</h1> }

            { !loading && 
                data.map((product) => {
                    return (
                        <Card style={{ width: '18rem', margin: '1rem' }}>
                            <Card.Img variant="top" src={ product.image } />
                            <Card.Body>
                              <Card.Title>{ product.name }</Card.Title>
                              <Button variant="primary">See More</Button>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home;