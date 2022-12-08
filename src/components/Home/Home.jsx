import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios';
import CategoryCard from '../CategoryCard/CategoryCard';

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
        <h1>Category</h1>
        <br />
        
        <div className='cards-container'>
            { loading && <h1>Loading...</h1> }

            { !loading && 
                data.map((category) => {
                    return (
                        <CategoryCard category={category} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home;