//require modules
const express = require('express')
const morgan = require('morgan')
const storyRoutes =require('./routes/storyRoutes');
const methodOverride = require('method-override');
const {getCollection}=require('./models/story');
const mongoose = require('mongoose')
//create app
const app=express();

//configure app
let url ='mongodb://localhost:27017/mana'
const port=3000;
const host='localhost';
app.set('view engine','ejs');

mongoose.connect(url).then(
    ()=>app.listen(port,host,()=>{console.log('server running on port',port)})
).catch(err=>console.log(err.messgae));
// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use('/stories',storyRoutes);
//set up routes
app.get('/',(req,res)=>{
    res.render('index');
});

app.use((req,res,next)=>{
    let err =new Error('The server cannot locate '+req.url);
    res.status=404;
    next(err);
});

app.use((err,req,res,next)=>{
if(!err.status){
    err.status=500;
    err.messgae=('internal server error');
}
    res.status=err.status;
    res.render('error',{error:err});
});

