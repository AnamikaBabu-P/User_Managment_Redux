import express from 'express';
const adminRouter = express.Router();


import { authAdmin,
        logoutAdmin,
        viewUser,
        userData,
        updateUser,
        createUser,
        deleteUser
 } from '../controllers/adminController.js';

adminRouter.post('/admin-login',authAdmin);
adminRouter.post('/admin/logout',logoutAdmin);
adminRouter.get('/admin/user-list',viewUser);
adminRouter.get('/user-data/:id',userData);
adminRouter.put('/update-user',updateUser);
adminRouter.post('/create-user',createUser);
adminRouter.post('/delete-user/:id',deleteUser);


export default adminRouter;