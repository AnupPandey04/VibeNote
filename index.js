const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const { v4: uuidv4 } = require('uuid');     // to give unique id to each post
uuidv4(); 
var methodOverride = require('method-override'); // to override the method of the request

//Middleware
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));


//Posts
let posts=[
    {
        id : uuidv4(),
        username : "ansh",
        content : "Learning new stuff"
    },
    {
        id : uuidv4(),
        username : "anup",
        content : "Coding is fun",
    },
    {
        id : uuidv4(),
        username : "alok",
        content : "Lets build something",
    }];



//Routes
app.get('/post',(req,res)=>{
    res.render('index.ejs',{posts});
});

app.get('/post/new',(req,res)=>{
    res.render('new.ejs');
});

app.post('/posts',(req,res)=>{
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/post");
});

app.get('/post/:id',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    res.render('show.ejs',{post});
});

app.patch('/post/:id',(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>p.id===id);
    post.content=newContent;
    console.log(post);
    res.redirect("/post");
});

app.get('/post/:id/edit',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    res.render('edit.ejs',{post});
});

app.delete('/post/:id',(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>p.id!==id);
    res.redirect("/post");
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});