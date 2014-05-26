var co = function(fngen) {
  /*
  next takes a instatiated generator and calls
  and a value returned from calling next on it
  gen is an instance of a generator
  yieldable is the value returned from calling gen.next()
  */
  var next = function(gen, yieldable, cb) {
    if (!yieldable.done) { //if 
      //we assume yieldable.value is a promise so we call then() to get the value
      yieldable.value.then(function(val) {
        return next(gen, gen.next(val), cb);
      }).catch(function(e) {}); //silence the promise error warning
      //we intentionally break the promise chain if there is an error
      yieldable.value.catch(function(err) {
        cb(err);
      })
    } else {
      cb(null, yieldable.value);
    }
  };

  return function(cb) {
    //instatiate the generator
    var gensym = fngen();
    //get the first yieldable
    var yieldable = gensym.next();
    if (!yieldable.done) {
      next(gensym, yieldable, cb);
    } else {
      cb(null, yieldable.value);
    }
  };
};


module.exports = co;
