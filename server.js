require("dotenv").config();
const mongoose =require("mongoose");
const express = require('express');
const app = express();
const port = process.env.PORT || 5555;
const options = {
	extensions:['htm','html','css','js','ico','jpg','jpeg','png','svg','pdf'],
	index:['index.html'],
}
app.use(express.static("frontend",options));

app.get("/", function(req, res){
	res.sendFile(__dirname+"/frontend/html/index.html");
});

app.get("/api/todos", function(req, res){
	res.json([
        {name:"todo1",isCompleted:true},
        {name:"todo2",isCompleted:false},
        {name:"todo3",isCompleted:true}
    ]);
});

app.listen(port, function(){
    console.log("Server running on http://localhost:"+port);
    console.log(`Server running on http://localhost:${port}`);
});
