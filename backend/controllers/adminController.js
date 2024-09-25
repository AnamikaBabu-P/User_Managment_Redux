import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

const authAdmin = asyncHandler(async (req,res) =>{
    const {email, password} = req.body;

    const admin = await User.findOne({email});

    if(admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        res.status(200).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

export {
    authAdmin
}