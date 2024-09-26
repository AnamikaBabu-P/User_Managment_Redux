import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import PrivateRoute from './components/PrivateRoute.jsx';
import AdminPrivateRoute from './components/adminPrivateRoute.jsx';

import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

import AdminLogin from './adminScreens/adminLogin.jsx';
import AdminHome from './adminScreens/adminHome.jsx';
import UserList from './adminScreens/UserList.jsx';
import UserEdit from './adminScreens/UserEdit.jsx';
import CreateUser from './adminScreens/CreateUser.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index= {true} path='/' element= {<HomeScreen/>}/>
      <Route path='/login' element= {<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>

      <Route path='/admin-login' element={<AdminLogin/>}/>

      {/*private routes*/}
      <Route path='' element = {<PrivateRoute/>}>
      <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>
      
      <Route path='' element = {<AdminPrivateRoute/>}>
      <Route path='/admin-home' element={<AdminHome/>}/>
      <Route path='/user-list' element={<UserList/>}/>
      <Route path='/user-data/:id' element={<UserEdit/>}/>
      <Route path='/create-user' element={<CreateUser/>}/>
      </Route>

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router = {router} />
    </StrictMode>
  </Provider>
);
