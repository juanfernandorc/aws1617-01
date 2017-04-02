var express = require("express");
var bodyParser = require("body-parser");
var dataStore = require("nedb");
var path = require("path");
var dbFileName = path.join(__dirname, "projects.json");

var db = new dataStore({filename: dbFileName,autoload: true});

var port = (process.env.PORT || 3000);
var app = express();
var baseAPI = "/api/v1";

//var projects = [];

app.use(bodyParser.json());

//Projects

app.get(baseAPI + "/projects", (request,response) => {
    //var projects;
    db.find({}, (err, projects) => {
        response.send(projects);
    });
    console.log("GET projects");
    });
    
app.post(baseAPI + "/projects", (request,response) => {
    var project = request.body;
    //projects.push(project);
    db.insert(project);
    response.sendStatus(201);
    console.log("POST /projects");
    });
    
app.delete(baseAPI + "/projects", (request,response) => {
    projects = [];
    response.sendStatus(200);
    console.log("DELETE /projects");
    });
    
//Project

app.get(baseAPI + "/projects/:id", (request,response) => {
    var id = request.params.id;
    
     var project = projects.filter((project) => {
        return (project.id == id);
    })[0];
    
    if (project)
        response.send(project);
    else 
        response.sendStatus(400);
        
    console.log("GET /projects/" + id);
    });
    
app.put(baseAPI + "/projects/:id", (request,response) => {
    var id = request.params.id;
    var updatedProject = request.body;
    
    projects = projects.map((project) => {
        if (project.id == id) {
        return updatedProject;
        }
        else { 
        return project;
        }
    }
    );
    
    response.sendStatus(200);
    console.log("UPDATE /projects/" + id);
    });
    
app.delete(baseAPI + "/projects/:id", (request,response) => {
    var id = request.params.id;
    projects = projects.filter((project) => {
        return (project.id != id);
    });
    response.sendStatus(200);
    console.log("DELETE /project/" + id);
    });
    



app.listen(port, () => {console.log("Server up and running!");});

