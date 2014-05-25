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

###Disadvantages
* orchestrating multiple concurrent tasks becomes very hard
* mountains of woe (pyramid of doom)

##Slide 4

![mountain of woe](./images/mountainofwoe.png)

(nuff said...)

 