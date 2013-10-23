"use strict";

(function(){
  var start = Date.now();
  var rand_array = (function(){ var rv = []; for(var i = 0; i !== 4096; ++i) rv.push(Math.random()); return rv;})();
  for(var j = 0; j !== 10000000; ++j){
    var c = rand_array[j & 4095];
    var d = rand_array[j & 1023];
  }
  var end = Date.now();
  console.log('read overhead', end - start);
})();

(function(){
  var start = Date.now();
  var rand_array = (function(){ var rv = []; for(var i = 0; i !== 4096; ++i) rv.push(Math.random()); return rv;})();
  for(var j = 0; j !== 10000000; ++j){
    var c = rand_array[j & 4095];
    var d = rand_array[j & 1023];
    var r = c * d;
  }
  var end = Date.now();
  console.log('multiply', end - start);
})();

(function(){
  var start = Date.now();
  var rand_array = (function(){ var rv = []; for(var i = 0; i !== 4096; ++i) rv.push(Math.random()); return rv;})();
  for(var j = 0; j !== 10000000; ++j){
    var c = rand_array[j & 4095];
    var d = rand_array[j & 1023];
    var r = c / d;
  }
  var end = Date.now();
  console.log('divide', end - start);
})();

(function(){
  var start = Date.now();
  var rand_array = (function(){ var rv = []; for(var i = 0; i !== 4096; ++i) rv.push(16 * Math.random()); return rv;})();
  for(var j = 0; j !== 10000000; ++j){
    var c = rand_array[j & 4095];
    var d = rand_array[j & 1023];
    var r = Math.pow(c,d);
  }
  var end = Date.now();
  console.log('power', end - start);
})();


