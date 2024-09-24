import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';


const Hero = () => {

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className='py-5' style={{ backgroundColor: '#2e2e2e'}}>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card w-75' style={{ backgroundColor: '#1c1c1c', borderColor: '#444' }}>
          {userInfo ? (
            <>
            <h1 className='text-center mb-4' style={{ color: '#f1f1f1' }}>Welcome, {userInfo.name}</h1>
              <p className='text-center mb-4' style={{ color: '#d6d6d6' }}>
                Here you can view and update your profile information.
              </p>
            </>
          ):(
            <>
          <h1 className='text-center mb-4' style={{ color: '#f1f1f1' }}>User Management System</h1>
          <p className='text-center mb-4' style={{ color: '#d6d6d6' }}>
            Manage users with ease, assign roles, and handle authentication seamlessly.
          </p>
             <div className='d-flex'>
            <LinkContainer to='/login'>
              <Button variant='dark' className='me-3' style={{ backgroundColor: '#3b3b3b', borderColor: '#555', color: '#f1f1f1' }}>
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Button variant='dark' style={{ backgroundColor: '#4b4b4b', borderColor: '#666', color: '#f1f1f1' }}>
                Sign Up
              </Button>
            </LinkContainer>
          </div>
            </>
          )}
         
        </Card>
      </Container>
    </div>
  )
};



export default Hero