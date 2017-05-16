"use strict";

var MongoClient = require('mongodb').MongoClient;
var db;


var DBProjects = function() {};

DBProjects.prototype.connectDb = function(callback) {
    MongoClient.connect("mongodb://aws1617-01:aws1617-01@ds027165.mlab.com:27165/aws1617-01", function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.collection('projects');
        
        callback(err, database);
    });
};


DBProjects.prototype.allProjects = function(callback) {
    return db.find({}).toArray(callback);
};

DBProjects.prototype.add = function(project, callback) {
    return db.insert(project, callback);
};

DBProjects.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

DBProjects.prototype.get = function(id, callback) {
    return db.find({id:id}).toArray(callback);
};

DBProjects.prototype.remove = function(id, callback) {
    return db.remove({id:id},{ multi: true}, callback);
};

DBProjects.prototype.update = function(id, updatedProject, callback) {
    return db.update({id:id},updatedProject,{}, callback);
};

module.exports = new DBProjects();