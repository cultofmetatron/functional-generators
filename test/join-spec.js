var mocha = require('mocha');
var should = require('should');
var path   = require('path');
var co = require('co');
var join = require('../lib/join.js');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

describe('join', function() {
  
  it('should join two generators', function(done) {
    co(join(function*(next) {
      return yield next;
    }, function *() {
      return yield fs.readFileAsync(path.join(__dirname, 'foo.dat'), 'utf8');
    }))(function(err, val) {
      val.should.equal('hello world!\n');
      done();
    });
  
  
  })


});



