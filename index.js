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

var users = require("./users.js");
var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    LocalAPIKey = require('passport-localapikey').Strategy;
var cors = require('cors');

passport.use(new BasicStrategy(
    function(username, password, done) {
        users.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }
          return done(null, user);
        });
        
    }
));

passport.use(new LocalAPIKey(
  function(apikey, done) {
    users.findOne({ apikey: apikey }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }    
));

var port = (process.env.PORT || 3000);
var app = express();
var baseAPI = "/api/v1";

app.use(cors());
app.use("/",express.static(path.join(__dirname, "public")));
app.use(baseAPI + '/tests', express.static(path.join(__dirname + '/public/tests.html')));
app.use(bodyParser.json());
app.use(passport.initialize());

//Projects

    app.get(baseAPI + "/projects", 
    //passport.authenticate("basic", {session:false}),
    //passport.authenticate("localapikey", {session:false}),
        (request,response) => {
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
    
    app.get(baseAPI + "/projectsbyuniversity/:universidad", function (request, response) {
        //var id_university = parseInt(request.params.universidad);
        var id_university = request.params.universidad;
        console.log("GET /projectsbyuniversity/" + id_university);
        
        dbProjects.getProjectbyUniversity(id_university,(err,projects)=>{
            if (projects.length === 0) {
                response.sendStatus(404);
            }
            else {
                response.send(projects);  
            }
        });
        
    });
    
    app.get(baseAPI + "/projectsbygroup/:grupo", function (request, response) {
        //var id_university = parseInt(request.params.grupo);
        var id_grupo = request.params.grupo;
        console.log("GET /projectsbygroup/" + id_grupo);
        
        dbProjects.getProjectbyGroup(id_grupo,(err,projects)=>{
            if (projects.length === 0) {
                response.sendStatus(404);
            }
            else {
                response.send(projects);  
            }
        });
        
    });

    app.get(baseAPI + "/projectsbyresearcher/:investigador", function (request, response) {
        var id_researcher = request.params.investigador;
        console.log("GET /projectsbyresearcher/" + id_researcher);
        
        dbProjects.getProjectbyResearcher(id_researcher,(err,projects)=>{
            if (projects.length === 0) {
                response.sendStatus(404);
            }
            else {
                response.send(projects);  
            }
        });
        
    });
    
    app.get(baseAPI + "/projectsbyuniandgroup/:universidad"+"&"+":grupo", function (request, response) {
//    app.get(baseAPI + "/projectsbyuniandgroup", function (request, response) {
        //var id_university = parseInt(request.params.universidad);
        var id_university = request.params.universidad; // "US"; //request.params.universidad;
        var id_grupo = request.params.grupo; // "5921861c7233de0011769f0c"; //request.params.grupo;
        console.log("GET /projectsbyuniandgroup/" + id_university + "&" + id_grupo);
        
        dbProjects.getProjectbyUniGru(id_university,id_grupo,(err,projects)=>{
            if (projects.length === 0) {
                response.sendStatus(404);
            }
            else {
                response.send(projects);  
            }
        });
        
    });

    dbProjects.connectDb((err) => {
        if(err){
            console.log("Could not connect with MongoDB");
            process.exist(1);
        }
    });
    users.connectDb((err) => {
        if(err){
            console.log("Could not connect with MongoDB");
            process.exist(1);
        }
    });
    app.listen(port, () => {console.log("Server with GUI up and running!");
        
    


});
