console.log("hello from js");

//when js runs
//get all todos from server and display in page using dom manipulation

document.getElementById("loader").style.display = "block";

fetch("/api/todos")
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    //hide the loader
    document.getElementById("loader").style.display="none";
});

//add an attribute - to html,document.documentElement
//data-bs-theme"-->"light"

//change moon to sun
// <i class = "fas fa-sun fa-lg fa-fw"></i>
var light=true;
function setTheme(){
    if(light){
        document.documentElement.setAttribute("data-bs-theme","dark");
        document.getElementById("themeButton").innerHTML='<i class=" fas fa-sun fa-lg fa-fw"></i>'
    }
    else{
        document.documentElement.setAttribute("data-bs-theme","light");
        document.getElementById("themeButton").innerHTML='<i class=" fas fa-moon fa-lg fa-fw"></i>'
    }
    light=!light;
}