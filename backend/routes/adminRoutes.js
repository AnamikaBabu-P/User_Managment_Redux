import express from 'express';
const adminRouter = express.Router();


import { authAdmin } from '../controllers/adminController.js';

adminRouter.post('/auth-admin',authAdmin);


export default adminRouter;