import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector} from 'react-redux';
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify'
import Loader from "../components/Loader";
import { useCreateUserMutation } from "../slices/adminApiSlice";
import { setCredentials } from "../slices/authSlice";


const RegisterScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage ] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [createUser, { isLoading }] = useCreateUserMutation();
    
    const previewFile = async(e)=>{
        const file = e.target.files[0]
        setFileToBase(file)
      }
      const setFileToBase = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
          setImage(reader.result)
        }
      }

    const submitHandler= async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not macth');
        } else{
            try {

                const res = await createUser({name, email, password, image}).unwrap();
                
                dispatch(setCredentials({...res}));
                
                    navigate('/admin/user-list');
                  
            } catch (err) {
                console.log(err);
                
                toast.error(err?.data?.message || err.error);
            }
        }
    }


  return (
    <FormContainer>
      <h1 style={{ color: '#fff', marginLeft:'200px' }}>Create User</h1>

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

        <Form.Group className="my-2" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name='image'
            onChange = {previewFile}
          ></Form.Control>
          {image && <img src={image} height='200' alt="Image preview" /> }
        </Form.Group>


        {isLoading && <Loader/>}

        <Button type='submit' variant='primary' className='mt-3' style={{
                  backgroundColor: '#4b4b4b',
                  borderColor: '#666',
                  color: '#fff',
                }}>
            Create
        </Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen;
