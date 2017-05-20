"use strict";

var MongoClient = require('mongodb').MongoClient;
var proj;
//var invest;


var DBProjects = function() {};

DBProjects.prototype.connectDb = function(callback) {
    
    //MongoClient.connect("mongodb://aws1617-01:aws1617-01@ds027165.mlab.com:27165/aws1617-01", function(err, database) {
    //MongoClient.connect("mongodb://127.0.0.1:27017/aws", function(err, database) {
    
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err) {
            callback(err);
        }
        
        proj = database.collection('projects');
        
        callback(err, database);
    });
};


DBProjects.prototype.allProjects = function(callback) {
    return proj.find({}).toArray(callback);
};

DBProjects.prototype.add = function(project, callback) {
    return proj.insert(project, callback);
};

DBProjects.prototype.removeAll = function(callback) {
    return proj.remove({},{ multi: true},callback);
};

DBProjects.prototype.get = function(id, callback) {
    return proj.find({id:id}).toArray(callback);
};

DBProjects.prototype.getProjectbyUniversity = function(id_university, callback) {
    return proj.find({universidad:id_university}).toArray(callback);
};

DBProjects.prototype.getProjectbyGroup = function(id_grupo, callback) {
    return proj.find({grupo:id_grupo}).toArray(callback);
};

DBProjects.prototype.remove = function(id, callback) {
    return proj.remove({id:id},{ multi: true}, callback);
};

DBProjects.prototype.update = function(id, updatedProject, callback) {
    return proj.update({id:id},updatedProject,{}, callback);
};

module.exports = new DBProjects();