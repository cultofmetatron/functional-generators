

var join = function(gen1, gen2) {
  return function *() {
    return yield gen1.call(this, gen2.call(this));
  };
};



module.exports = join;
