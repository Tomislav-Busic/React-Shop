import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    
    const fetchingData = async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
            console.log(response.data);
            setData(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchingData();
    }, [])

  return (
    <div className='home'>
        <h1>Home</h1>
        <br />
        
    </div>
  )
}

export default Home;