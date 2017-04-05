"use strict";

var DataStore = require("nedb");
var path = require("path");
var dbFileName = path.join(__dirname, "projects.json");

var db = new DataStore({filename: dbFileName,autoload: true});

var DBProjects = function() {};

DBProjects.prototype.allProjects = function(callback) {
    return db.find({}, callback);
};

DBProjects.prototype.add = function(project, callback) {
    return db.insert(project, callback);
};

DBProjects.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

DBProjects.prototype.get = function(id, callback) {
    return db.find({id:id}, callback);
};

DBProjects.prototype.remove = function(id, callback) {
    return db.remove({id:id},{ multi: true}, callback);
};

DBProjects.prototype.update = function(id, updatedProject, callback) {
    return db.update({id:id},updatedProject,{}, callback);
};

module.exports = new DBProjects();