import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import { useDispatch, useSelector} from 'react-redux';
import FormContainer from "../components/FormContainer";
import { useAdminLoginMutation } from "../slices/adminApiSlice";
import { setAdminCredentials } from "../slices/adminAuthSlice";
import { toast } from 'react-toastify'
import Loader from "../components/Loader";

const AdminLogin = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [adminLogin, { isLoading }] = useAdminLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);
 

    const submitHandler= async(e)=>{
        
        e.preventDefault();
        try {
            const res = await adminLogin({ email, password}).unwrap();
            dispatch(setAdminCredentials({...res}));
            console.log('login response',res);
            
            if(res){
                navigate('/admin-home');
            }
            
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
        
    };
    return (
        
          <FormContainer>
            <h1 style={{ color: '#fff', marginLeft:'120px' }}>Admin Sign In</h1>
    
            <Form onSubmit={submitHandler}>
              <Form.Group className='my-2' controlId='email'>
                <Form.Label style={{ color: '#fff' }}>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: '#f1f1f1',
                    color: '#000',
                    borderColor: '#444',
                  }}
                ></Form.Control>
              </Form.Group>
    
              <Form.Group className='my-2' controlId='password'>
                <Form.Label style={{ color: '#fff' }}>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: '#f1f1f1',
                    color: '#000',
                    borderColor: '#444',
                  }}
                ></Form.Control>
              </Form.Group>
    
              {isLoading && <Loader />}
    
              <Button
                type='submit'
                variant='primary'
                className='mt-3'
                style={{
                  backgroundColor: '#4b4b4b',
                  borderColor: '#666',
                  color: '#fff',
                }}
              >
                Sign In
              </Button>
            </Form>
          </FormContainer>
        
      );
}

export default AdminLogin
