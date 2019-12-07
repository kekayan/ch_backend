const Joi=require('joi');
const mongoose=require('mongoose');
const config=require('config');
const jwt=require('jsonwebtoken')


// mongodb schema
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50

    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique:true

    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024

    },

});

userSchema.methods.generateAuthtoken=function(){
    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token;
}

// create user model class 
const User=mongoose.model('User',userSchema);

// validate user object 
function validateUser(user){
    // validation schema
    const schema={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(user,schema);
}


exports.User=User;
exports.validate=validateUser;
