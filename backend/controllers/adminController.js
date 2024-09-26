import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'

const authAdmin = asyncHandler(async (req,res) =>{
    const {email, password} = req.body;
    
    if(email === process.env.ADMIN_EMAIL && 
        password === process.env.ADMIN_PASSWORD) {
            const admin = await User.findOne({email});
            generateToken(res, admin._id);
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email
            });
        
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    
});

 const viewUser = asyncHandler(async(req,res)=>{
    const userDetails =await User.find()
    res.json(userDetails)
 });

 const userData = asyncHandler(async(req,res)=>{
    const {id} = req.params
   console.log(id,'iiiiiiiiiiiii');
   
});

const updateUser = asyncHandler(async(req,res)=>{
     
});

const deleteUser = asyncHandler(async (req, res) => {
    console.log("jjjjjjjjjjj");
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(201).json("deletedUser");
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

const createUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;

    const image = {
        public_id: req.file.cloudinary_public_id,
        url: req.file.cloudinary_url};
    
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    
    const user = await User.create({
        name,
        email,
        password,
        image
    });

    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

export {
    authAdmin,
    viewUser,
    userData,
    updateUser,
    createUser,
    deleteUser
}