import { Spinner } from "react-bootstrap";

import React from 'react'

const Loader = () => {
  return (
    <Spinner
    animation = "border"
    role = "status"
    style = {{
      widht: '100px',
      height: '200px',
      margin: 'auto',
      display: 'block'
    }}></Spinner>
  )
}

export default Loader
