var express = require("express");
var bodyParser = require("body-parser");
var port = (process.env.PORT || 3000);
var app = express();

var baseAPI = "/api/v1";

var projects = [{id:"1", titulo:"Proyecto 1", resumen:"Resumen proyecto 1", objetivo:"Objetivo proyecto 1", universidad:"Universidad de Sevilla", grupo:"G11", investigador:"Pepe Sanchez", presupuesto:"11000"},
                {id:"2", titulo:"Proyecto 2", resumen:"Resumen proyecto 2", objetivo:"Objetivo proyecto 2", universidad:"Universidad de Cadiz", grupo:"G22", investigador:"Antonio Ramirez", presupuesto:"12000"}
];

app.use(bodyParser.json());

//Projects

app.get(baseAPI + "/projects", (request,response) => {
    response.send(projects);
    console.log("GET projects");
    });
    
app.post(baseAPI + "/projects", (request,response) => {
    var project = request.body;
    projects.push(project);
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

