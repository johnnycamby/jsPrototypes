

'use strict';

var chai = require('chai')
, expect = chai.expect;

// chai express
chai.should();

describe('number tests', function () {
    
    function isEven(number) {    
    return number % 2 === 0;
}

describe('isEven', function (params) {
    
    it('should return true when number is even', function () {
        isEven(4).should.be.true;
    });
    
    it('should return false when number is odd', function () {
        expect(isEven(5)).to.be.false;
        //isEven(5).should.be.false;
    });
 });
 
 function add(n1 , n2) {
     
     return n1 + n2;
     
 }
 
//  describe('add without setup/teardown', function () {
 // xdescribe('add without setup/teardown', function () {
    describe.only('add without setup/teardown', function () {    
     
     var number;
     
     beforeEach(function () {
         number = 5;
     });
     
     afterEach(function () {
         
     });
     
     
     it('should be ten when adding 5 to 5' , function () {
         number = add(number, 5);
         number.should.equal(10);
     });
     
    //  it.skip('should be 12 when adding 7 to 5', function() {
    //      add(number, 7).should.equal(12);
    //  });  
    
    xit('should be 12 when adding 7 to 5', function() {
         add(number, 7).should.equal(12);
     });     
 });
});

