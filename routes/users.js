const _=require('lodash');
const bcrypt=require('bcrypt');
const {User, validate}=require('../models/user');
const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')

router.get('/me',auth,async(req,res)=>{
    const user=await User.findById(req.user._id).select('-password');
    res.status(200).send(user)
});

router.post('/', async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("user already registered");
    // user=new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password

    // })
    user=new User(_.pick(req.body,['name','email','password']))
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();
    const token=user.generateAuthtoken();
    res.status(201).header('x-auth-token',token).send(_.pick(user,['_id','name','email']))
});

module.exports=router;