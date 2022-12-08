import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './Filters.scss';

const Filters = (props) => {
  return (
    <div>
        <InputGroup className="mb-3">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder='Search by Name'
              onChange={(e) => props.setSearchName(e.target.value)}
            />
        </InputGroup>
        <br />
        <Form.Select onChange={(e) => props.handlePrice(e.target.value)}>
            <option>Filter by price</option>
            <option value="lower">Lower price</option>
            <option value="higher">Higher price</option>
        </Form.Select>
    </div>
  )
}

export default Filters;