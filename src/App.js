import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header&&Footer/Header';
import Home from './components/Home/Home';
import Products from './components/Products/Products';



function App() {

  return (
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/products' element={ <Products /> } />
        </Routes>
      </Router>
  );
}

export default App;
