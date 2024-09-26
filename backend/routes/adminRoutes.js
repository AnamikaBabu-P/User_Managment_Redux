import express from 'express';
const adminRouter = express.Router();


import { authAdmin } from '../controllers/adminController.js';

adminRouter.post('/admin-login',authAdmin);


export default adminRouter;