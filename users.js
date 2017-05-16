'use strict';

var MongoClient = require('mongodb').MongoClient;
var db;

var User = function(params) {
    this.username = params.username;
    this.email = params.email;
    this.password = params.password;
};

User.prototype.validPassword = function(password) {
    return this.password == password;
};

var Users = function () {};

Users.prototype.connectDb = function(callback) {
    //MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
    MongoClient.connect("mongodb://aws1617-01:aws1617-01@ds027165.mlab.com:27165/aws1617-01", function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.collection('users');
        
        callback(err, database);
    });
};

Users.prototype.allUsers = function(callback) {
    return db.find({}).toArray(callback);
};

Users.prototype.findOne = function(user, callback) {
    return db.findOne(user, function(err, item) {
        if (err) {
            callback(err);
        } else {
            if (item && item != null) {
                callback(err, new User(item));
            } else {
                callback(err, null);
            }
        }
    });
};

Users.prototype.add = function(user, callback) {
    return db.insert(user, callback);
};

Users.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Users.prototype.get = function(name, callback) {
    return db.find({name:name}).toArray(callback);
};

Users.prototype.remove = function(name, callback) {
    return db.remove({name:name},{ multi: true}, callback);
};

Users.prototype.update = function(name, updatedUser, callback) {
    return db.update({name:name},updatedUser,{}, callback);
};

module.exports = new Users();