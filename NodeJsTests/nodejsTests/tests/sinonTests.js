

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon');

describe('sinon test', function () {

    var student, schedule;

    beforeEach(function() {
        student = {
            dropClass: function(classId, cb) {
                cb();
            }
        };

        schedule = {
            dropClass: function() {

            }
        };
    });

    describe('student.dropClass', function() {

        it('should call callback', function() {

            var spy = sinon.spy();
            student.dropClass(1, spy);
            spy.called.be.true;
        });
    });
});