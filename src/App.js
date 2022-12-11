import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header&&Footer/Header';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Product from './components/Products/ProductCard/Product/Product';
import Cart from './components/Cart/Cart';


function App() {

  return (
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/products' element={ <Products /> } />
          <Route path='/product' element={ <Product /> } />
          <Route path='/cart' element={ <Cart /> } />
          <Route path='*' element={ <h1>Sorry, page not found!</h1> } />
        </Routes>
      </Router>
  );
}

export default App;
