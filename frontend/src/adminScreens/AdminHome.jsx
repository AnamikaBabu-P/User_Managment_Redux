import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/adminAuthSlice';
import { useAdminLogoutMutation } from '../slices/adminApiSlice';
import {toast} from 'react-toastify';

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useAdminLogoutMutation();

  const goToUserList = () => {
    navigate('/admin/user-list');
  };

  const logoutHandler =async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/admin-login')
    } catch (error) {
      console.log(error);
      
    }
   
  }

  return (
    <Container 
      className="mt-5" 
      style={{
        backgroundColor: '#333', 
        color: '#fff', 
        borderRadius: '10px', 
        padding: '20px' 
      }}
    >
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 style={{ color: '#ccc' }}>Welcome Admin</h1> 
          <p className="lead mt-3" style={{ color: '#bbb' }}>
            Manage the application efficiently from here. Navigate to user list to view and manage users.
          </p>
          <Button 
            variant="dark" 
            size="lg" 
            onClick={goToUserList}
            className="mt-4"
            style={{ backgroundColor: '#555', borderColor: '#666' }} 
          >
            Go to User List
          </Button>

          <Button 
            variant="danger" 
            size="lg" 
            onClick={logoutHandler}
            className="mt-4"
            style={{ marginLeft: '10px' }} 
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
