import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector} from 'react-redux';
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify'
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUserDataMutation } from "../slices/adminApiSlice";
import { useEditUserMutation } from "../slices/adminApiSlice";


const UserEdit = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [findUser] = useUserDataMutation();
    const [updateProfile, { isLoading }] = useEditUserMutation();

    const {id} = useParams();

    const previewFile = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
      };
      
      const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(reader.result);
        };
      };

    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await findUser(id);
        setName(data.name);
        setEmail(data.email);
        setImage(data.image?.url);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [findUser, id]);


    const submitHandler= async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not macth');
        } else{
           try {
            const res = await updateProfile({
              _id:id,
              name,
              email,
              password,
              image
            }).unwrap();
            navigate('/user-list')
            toast.success('Profile updated');
           } catch (err) {
            toast.error(err?.data?.message || err.error)
           }
        }
    }
  return (
    <FormContainer>
      <h1 style={{ color: '#fff', marginLeft:'150px' }}>Update User</h1>

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
          <Form.Control type="file" name="image" onChange={previewFile}></Form.Control>
          {image && <img src={image} value={image} height="200" alt="Image preview" className="mt-3" />}
        </Form.Group>

        {isLoading && <Loader/>}

        <Button type='submit' variant='primary' className='mt-3' style={{
                  backgroundColor: '#4b4b4b',
                  borderColor: '#666',
                  color: '#fff',
                }}>
            Update
        </Button>

      </Form>
    </FormContainer>
  )
}

export default UserEdit;
