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
                titulo: "Service Level Agreements",
                resumen: "Este proyecto consiste en la creación de acuerdos a nivel de servicio.",
                objetivo: "El objetivo principal que se marca para este proyecto es fijar el nivel acordado para la calidad de dicho servicio.",
                universidad: "1",
                grupo: "1",
                investigador: ["0000-0003-1575-406X","0000-0001-9827-1834"],
                presupuesto: "14500"
            }, {
                id: "2",
                titulo: "SOA Governance",
                resumen: "Gobernabilidad de arquitectura orientada a servicios es un concepto que se refiere a la capacidad de monitorizar y controlar a alto nivel procesos de negocio.",
                objetivo: "El principal objetivo que se ofrece con este proyecto es el monitorizar la actividad y controlar de forma que se haga a alto nivel los procesos de negocio.",
                universidad: "1",
                grupo: "1",
                investigador: ["0000-0001-9827-1834","0000-0002-8763-0819"],
                presupuesto: "22300"
            }], done);
            
            
            
        });
    });
    
    describe('#allProjects()', function() {
        it('should return all Projects', function(done) {
            dbProjects.allProjects((err, res) => {
                if (err) {
                    return done(err);
                }
                
                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('id', '1');
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