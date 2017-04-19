"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
/*
var DataStore = require("nedb");
var dbFileName = path.join(__dirname, "projects.json");
var db = new DataStore({filename: dbFileName,autoload: true});
*/
var dbProjects = require(path.join(__dirname, "projects.js"));

/*
db.insert([{
        id: "1",
        titulo: "Proyecto 1",
        resumen: "Resumen proyecto 1",
        objetivo: "Objetivo proyecto 1",
        universidad: "Universidad de Sevilla",
        grupo: "G11",
        investigador: "Pepe Sanchez",
        presupuesto: "11000"
    }, {
        id: "2",
        titulo: "Proyecto 2",
        resumen: "Resumen proyecto 2",
        objetivo: "Objetivo proyecto 2",
        universidad: "Universidad de Cadiz",
        grupo: "G22",
        investigador: "Antonio Ramirez",
        presupuesto: "12000"
    }]);
*/

var port = (process.env.PORT || 3000);
var app = express();
var baseAPI = "/api/v1";

app.use(bodyParser.json());

app.use("/",express.static(path.join(__dirname, "public")));

//Projects

app.get(baseAPI + "/projects", (request,response) => {
    console.log("GET projects");
    //var projects;
    /*
    db.find({}, (err, projects) => {
        response.send(projects);
    });
    */
    dbProjects.allProjects((err, projects) => {
        response.send(projects);
    });
});
    
app.post(baseAPI + "/projects", (request,response) => {
    console.log("POST /projects");
    var project = request.body;
    /*
    db.insert(project);
    */
    dbProjects.add(project);
    response.sendStatus(201);
});
    
app.delete(baseAPI + "/projects", (request,response) => {
    console.log("DELETE /projects");
    /*
    db.remove({},{multi: true},(err,numRemoved) => {
        console.log("Projects deleted:" + numRemoved);
        response.sendStatus(200);
    });
    */
    dbProjects.removeAll((err,numRemoved) => {
        console.log("Projects deleted:" + numRemoved);
        response.sendStatus(200);
    });
});
    
//Project

app.get(baseAPI + "/projects/:id", (request,response) => {
    var id = request.params.id;
    console.log("GET /projects/" + id);
    
    /*
    db.find({id:id},(err,projects)=>{
        if (projects.length === 0) {
            response.sendStatus(404);
        }
        else {
            response.send(projects);  
        }
    });
    */
    dbProjects.get(id,(err,projects)=>{
        if (projects.length === 0) {
            response.sendStatus(404);
        }
        else {
            response.send(projects);  
        }
    });
    
    });
    
app.put(baseAPI + "/projects/:id", (request,response) => {
    var id = request.params.id;
    console.log("UPDATE /projects/" + id);
    var updatedProject = request.body;
    /*
    db.update({id:id},updatedProject,{},(err,numUpdates) => {
        console.log("Projects updated:"+numUpdates);
        if (numUpdates === 0) {
            response.sendStatus(404);    
        }
        else {
            response.sendStatus(200);    
        }
    });
    */
    dbProjects.update(id,updatedProject, (err,numUpdates) => {
        console.log("Projects updated:"+numUpdates);
        if (numUpdates === 0) {
            response.sendStatus(404);    
        }
        else {
            response.sendStatus(200);    
        }
    });
    
    
    });
    
app.delete(baseAPI + "/projects/:id", (request,response) => {
    var id = request.params.id;
    console.log("DELETE /projects/" + id);
    /*
    db.remove({id:id},{ multi: true},(err,numRemoved)=>{
        console.log("Projects removed:"+numRemoved);
        response.sendStatus(200);    
    });
    */
    
    dbProjects.remove(id,(err,numRemoved)=>{
        console.log("Projects removed:"+numRemoved);
        response.sendStatus(200);    
    });
    
    });
    
    dbProjects.connectDb((err) => {
        if(err){
            console.log("Could not connect with MongoDB");
            process.exist(1);
        }
        app.listen(port, () => {console.log("Server with GUI up and running!");
        
    });


});
