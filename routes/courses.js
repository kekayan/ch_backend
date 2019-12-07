const _=require('lodash');
const {Course}=require('../models/course');
const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth')

router.get('/',auth,async(req,res)=>{
    const course=await Course.find(req.query).limit(10);
    if (!course) res.status(404).send("Course Not Found")
    res.status(200).send(course)
});


module.exports=router;