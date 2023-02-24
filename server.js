require("dotenv").config();
const mongoose =require("mongoose");
const express = require('express');
const todoLib = require("./backend/Lib/todoLib");
const todoModel = require("./backend/models/todoModel");
const app = express();
const port = process.env.PORT || 3000;
const options = {
	extensions:['htm','html','css','js','ico','jpg','jpeg','png','svg','pdf'],
	index:['index.html'],
}
app.use(express.static("frontend",options));
app.use(express.json());

app.get("/", function(req, res){
	res.sendFile(__dirname+"/frontend/html/index.html");
});

app.get("/api/todos", function(req, res){
	// res.json([
    //     {name:"todo1",isCompleted:true},
    //     {name:"todo2",isCompleted:false},
    //     {name:"todo3",isCompleted:true}
    // ]);
    todoLib.getAllTodos(function(err,todos){
        if(err)
        {
            res.json({status:"error",message: err ,data: null});
        }
        else{
            res.json({status: "success",data: todos});
        }
    });
});

app.post("/api/todos", function(req,res){
    const todo = req.body;
    todoLib.createTodo(todo,function(err,dbtodo){
        if(err)
        {
            res.json({status:"error",message: err ,data: null});
        }
        else{
            res.json({status: "success",data: dbtodo});
        }
    });
})

app.put("/api/todos/:todoid",function(req,res){
    const todo = req.body;
    const todoid = req.params.todoid;
    todoLib.updateTodoById(todoid,todo,function(err,dbtodo){
        if(err)
        {
            res.json({status:"error",message: err ,data: null})
        }
        else{
            res.json({status: "success",data: dbtodo});
        }
    });
})

app.delete("/api/todos/:todoid",function(req,res){
    const todoid = req.params.todoid;
    todoLib.deleteTodoById(todoid,function(err,dbtodo){
        if(err)
        {
            res.json({status:"error",message: err ,data: null})
        }
        else{
            res.json({status: "success",data: dbtodo});
        }
    });
});

mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("db connected");
        app.listen(port, function(){
            console.log("Server running on http://localhost:"+port);
            console.log(`Server running on http://localhost:${port}`);
        });        
    }
});