var koa     = require('koa');
var Promise = require('bluebird');
var parse   = require('co-body');
var router  = require('koa-route');
var _       = require('lodash');
var path    = require('path');
var staticServer = require('koa-static');
var fs      = Promise.promisifyAll(require('fs'));
var shen = require('shen');

var todos = [];

users = {
  'root':'rootpass'
};

//gets us unique ids
var counter = (function() {
  var count = 0;
  return function() {
    count++;
    return count;
  };
})();


var app = koa();

var authorizer = shen.dispatch(function *(paths) {
    console.log(this.request.query.user)
    if (!_.isUndefined(users[this.request.query.user]) && (users[this.request.query.user] === this.request.query.password)) {
      return yield paths.pass;
    } else {
      return yield paths.fail;
    }
  }, {
    pass: function *(next) {
      console.log('successfully authorized');
      yield next;
    },
    fail: function *() {
      this.status = 400;
      this.body = JSON.stringify({
        message: 'authentication error'
      });
      return new Error('authentication error');
    }
  });

//serve up the public directory where we have all the assets
app.use(staticServer(path.join(__dirname, 'public')));

app.use(router.post('/todos', shen.cascade(authorizer, function *() {
  /*
    yield lets us pass asynchronous functions that return promises or thunks
    It will freeze the middleware till its resolved and pass it back in.
  */
  var todo = (yield parse.json(this));
  todo.id = counter();
  todos.push(todo);
  this.body = JSON.stringify(todos);
})));

app.use(router.get('/todos',  function *() {
  this.body = JSON.stringify(todos);
}));

app.use(router.delete('/todos/:id', shen.cascade(authorizer, function *(id) {
  todos = _(todos).reject(function(todo) {
    console.log('what? ', todo, id );
    return todo.id === parseInt(id, 10);
  }, this);
  this.body = JSON.stringify(todos.sort(function(a, b) { return a - b;}));
})));

app.listen(process.env.PORT || 3000);
console.log('listening on port ' + (process.env.PORT || 3000));



