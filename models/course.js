const Joi=require('joi');
const mongoose=require('mongoose');
const config=require('config');
const jwt=require('jsonwebtoken')


// mongodb schema
const courseSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024

    },
    author:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    created:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    updated:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lessons:{
        type: Array,
        required: true,
    },
    lesson_names:{
        type: Array,
        required: true,
    },
    url:{
        type: String,
        required: true,
        minlength: 5,
    },

});

// create course model class 
const Course=mongoose.model('courses',courseSchema);


exports.Course=Course;
