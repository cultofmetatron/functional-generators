Functional Programming with Generators
=======================================

decks to go with my talk on programming with generators

##Slide 1

###Introduction to generators

1. New ecmascript 6 feature
2. New addition to the javascript language for handling concurrency
3. great for writing syncronous(looking) co-routines that are synchronous

##Slide 2

###The evolution of node concurrency

####In the beggining there was node style

```
var fs = require('fs');
fs.readFile('./somefile.dat', 'utf8', function(err, contents) {
  if (err) { throw err; }
  else {
  	console.log(contents);
  }
  
})

```

##Slide 3

###Advantages

* Simple
* Fast

##Slide 4

###Disadvantages
#### Orchestrating multiple concurrent tasks becomes very hard
	
if for c = C(A(), B()), A and or B are asynchronous functions, how do you 
make sure c is not run until both A and B resolve?

```
A(function(err, a) {
  B(function(err, b) {
  	C(a, b, function(c) {
  	  //c is available here
  	  console.log(c);
  	});
  });
});

```
This can very quickly spiral out of control...

![mountain of woe](./images/mountainofwoe.png)

(nuff said...)

##Slide 5

###Enter Promises

* much more fine grained
* functions immediatly return a "promise" that can be used to get the result of an asynchronous computation
* thes promises can be chained together to make asynchronous control flows read synchronously

```
var Promise = require('bluebird');
//assuming A, B and C are now promise yielding functions
return Promise.all([A(), B()]).spread(function(a, b) {
  return C(a, b);
})
.then(function(c) {
  console.log(c);
})
.catch(function(err) {
  console.log(err.message, err.stack);
});

```

##Slide 6
* much better!!
* code scales to handle any number of asynchronous dependencies
* 

 