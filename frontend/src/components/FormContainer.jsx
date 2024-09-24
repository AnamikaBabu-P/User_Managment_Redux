import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container style={{ backgroundColor: '#000000', padding: '30px', borderRadius: '8px' }}>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5' style={{ backgroundColor: '#2e2e2e', padding: '30px', borderRadius: '8px' }} >
        {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
