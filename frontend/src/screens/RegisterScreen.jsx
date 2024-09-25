import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector} from 'react-redux';
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify'
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";


const RegisterScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage ] = useState(null);
    const [imagePreview, setImagePreview ] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
    },[navigate, userInfo]);

    const submitHandler= async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not macth');
        } else{
            try {
                const formData = new FormData();
                formData.append('name',name);
                formData.append('email',email);
                formData.append('password',password);
                formData.append('image',image);

                const res = await register(formData).unwrap();
                console.log(res,'rreeeeeeeeessssssssssss');
                
                dispatch(setCredentials({...res}));
                navigate('/');
            } catch (err) {
                console.log(err);
                
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if(file){
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <FormContainer>
      <h1 style={{ color: '#fff', marginLeft:'200px' }}>Sign Up</h1>

      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
            <Form.Label style={{ color: '#fff' }}>Name </Form.Label>
            <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={ (e) =>setName(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
            <Form.Label style={{ color: '#fff' }}>Email Address</Form.Label>
            <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={ (e) =>setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
            <Form.Label style={{ color: '#fff' }}>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={ (e) =>setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label style={{ color: '#fff' }}>Confirm Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={ (e) =>setConfirmPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='image'>
                    <Form.Label style={{ color: '#fff' }}>Upload Image</Form.Label>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div style={{ marginTop: '10px' }}>
                            <img
                                src={imagePreview}
                                alt='Preview'
                                style={{ maxWidth: '100px', maxHeight: 'auto', borderRadius: '8px', marginTop: '10px' }}
                            />
                        </div>
                    )}
                </Form.Group>


        {isLoading && <Loader/>}

        <Button type='submit' variant='primary' className='mt-3' style={{
                  backgroundColor: '#4b4b4b',
                  borderColor: '#666',
                  color: '#fff',
                }}>
            Sign Up
        </Button>

        <Row className='py-3'>
            <Col style={{ color: '#fff' }}>
                Already have an account? <Link to='/login' style={{ color: '#fff' }}>Login</Link>
            </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen;
