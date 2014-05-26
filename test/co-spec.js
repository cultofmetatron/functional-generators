var mocha = require('mocha');
var should = require('should');
var path   = require('path');
var co = require('../lib/simple-co.js');
var Promise = require('bluebird');
describe("co", function() {
  it('will run a generator', function(done) {
    var fs = Promise.promisifyAll(require('fs'));
    co(function *() {
      console.log('running');
      return yield fs.readFileAsync(path.join(__dirname, 'foo.dat'), 'utf8');
    })(function(err, value) {
      console.log('shiett')
      console.log('value', value)
      value.should.equal('hello world!\n');
      done();
    })
  
  });





});
