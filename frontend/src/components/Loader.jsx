import { Spinner } from "react-bootstrap";
import React from 'react';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '50px', 
        height: '50px', 
        margin: 'auto',
        display: 'block',
        color: 'white' 
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
