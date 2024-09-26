import express from 'express';
const adminRouter = express.Router();


import { authAdmin,
        viewUser,
        userData,
        updateUser,
        createUser,
        deleteUser
 } from '../controllers/adminController.js';

adminRouter.post('/admin-login',authAdmin);
adminRouter.get('/user-list',viewUser);
adminRouter.get('/user-data/:id',userData);
adminRouter.put('/update-user',updateUser);
adminRouter.post('/create-user',createUser);
adminRouter.post('/delete-user/:id',deleteUser);


export default adminRouter;