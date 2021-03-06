
'use strict';

var chai = require('chai'),
expect = chai.expect,
sinon = require('sinon');

chai.should();


describe('sinon tests', function () {
    var student, schedule;
    
    beforeEach(function () {
        student = {
            dropClass: function (classId, cb) {
                
                // do stuff
                cb();
            }
        }
    });
    
    describe('student.dropClass', function() {
        it('should call the callback', function () {
            
            var spy = sinon.spy();
            
            student.dropClass(1 , spy);
            spy.called.should.be.true;
        });
        
        it('should call the callback .and log the console', function () {
            
            function onClassDropped() {
                console.log('onClassDropped was called');
            }
            
            var spy = sinon.spy(onClassDropped);
            
            student.dropClass(1, spy);
            spy.called.should.be.true;
        });
    });
});