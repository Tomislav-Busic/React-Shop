import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <Navbar bg="primary" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={ Link } to="/">Categories</Nav.Link>
            <Nav.Link as={ Link } to="/products">Products</Nav.Link>
            <Nav.Link as={ Link } to="/cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;