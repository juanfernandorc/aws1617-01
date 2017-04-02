var express = require("express");
var bodyParser = require("body-parser");
var port = (process.env.PORT || 3000);
var app = express();

var baseAPI = "/api/v1";

var projects = [{id:"1", titulo:"Proyecto 1", resumen:"Resumen proyecto 1", objetivo:"Objetivo proyecto 1", universidad:"Universidad de Sevilla", grupo:"G11", investigador:"Pepe Sanchez", presupuesto:"11000"},
                {id:"2", titulo:"Proyecto 2", resumen:"Resumen proyecto 2", objetivo:"Objetivo proyecto 2", universidad:"Universidad de Cadiz", grupo:"G22", investigador:"Antonio Ramirez", presupuesto:"12000"}
];

app.use(bodyParser.json());

app.get(baseAPI + "/projects", (request,response) => {
    response.send(projects);
    console.log("New GET projects");
    });
    
app.post(baseAPI + "/projects", (request,response) => {
    var project = request.body;
    projects.push(project);
    response.sendStatus(201);
    console.log("New POST /projects");
    });

app.listen(port, () => {console.log("Server up and running!");});

