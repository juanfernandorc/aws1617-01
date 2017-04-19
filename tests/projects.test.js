"use strict";

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var dbProjects = require("../projects.js");

describe('Projects', function() {
    beforeEach(function(done) {
        
        dbProjects.connectDb((err) => {
            if (err) {
                return done(err);
            }

        dbProjects.removeAll(function(err) {
            if (err) {
                return done(err);
            }
            
            dbProjects.add([{
                id: "1",
                titulo: "Proyecto 1",
                resumen: "Resumen proyecto 1",
                objetivo: "Objetivo proyecto 1",
                universidad: "Universidad de Sevilla",
                grupo: "G11",
                investigador: "Antonio Perez",
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
            }], done);
            
            
            
        });
    });
    
    describe('#allProjects()', function() {
        it('should return all Projects', function(done) {
            dbProjects.allProjects((err, res) => {
                if (err) {
                    return done(err);
                }
                
                expect(res).to.have.lengthOf(1);
                //expect(res).to.contain.an.item.with.property('id', '1');
                expect(res).to.contain.an.item.with.property('id', '2');
                done();
            });
        });
    });
    });
    
    describe('#remove()', function() {
        it('should remove the element', function(done) {
            dbProjects.remove('1', (err) => {
                if (err) {
                    return done(err);
                }
                
                dbProjects.allProjects((err,res) => {
                    if (err) {
                        return done(err);
                    }
                    
                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('id', '1');
                    done();
                });
            });
        });
    });
});