const express=require('express')
const app=express();
const mongoose=require('mongoose');
const config=require('config');
const users=require('./routes/users');
const auth=require('./routes/auth');
const courses=require('./routes/courses');


if(!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: Jwt Private key is not defined");
    process.exit(1);
}

mongoose.connect('mongodb+srv://dbUser:5XEXLBN48cS1Wilh@cluster0-tttbt.mongodb.net/coursehunt?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{console.log("connection to database established")})
.catch(err=>{console.error(err)})

app.use(express.json());
app.use('/api/users',users)
app.use('/api/auth',auth)
app.use('/api/courses',courses)


app.get('/',(req,res)=>{

    res.send("Hello world");
});



const port=3000;
app.listen(port,()=>{console.log(`listening to port ${port}`)});