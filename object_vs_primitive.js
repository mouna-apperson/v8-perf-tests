"use strict";

var source_array = (function(){
  var rv = [];
  for(var i = 0; i !== 100; ++i){
    rv.push(i + Math.pow(2, 30));
  }
  return rv;
})();

(function(source_array){
  function o(n){
    this.n = n;
  }
  o.prototype.foo = function(){return this.n;};
  var results = [];
  var start = Date.now();
  for(var i = 0; i !== 1000000; ++i){
    var arr = [], j;
    for(j = 0; j !== source_array.length; ++j){
      arr.push(new o(source_array[j]));
    }
    var sum = 0;
    for(j = 0; j !== arr.length; ++j){
      sum += arr[j].n;
    }
    results.push(sum);
  }
  var end = Date.now();
  console.log('Objects', end - start);
  return results;
})(source_array);

(function(source_array){
  function o(n){
    this.n = n;
  }
  o.prototype.foo = function(){return this.n;};
  var results = [];
  var start = Date.now();
  for(var i = 0; i !== 1000000; ++i){
    var arr = [], j;
    for(j = 0; j !== source_array.length; ++j){
      arr.push(new o(source_array[j]));
    }
    var sum = 0;
    for(j = 0; j !== arr.length; ++j){
      sum += arr[j].foo();
    }
    results.push(sum);
  }
  var end = Date.now();
  console.log('Objects via prototype', end - start);
  return results;
})(source_array);

(function(source_array){
  var results = [];
  var start = Date.now();
  for(var i = 0; i !== 1000000; ++i){
    var arr = [], j;
    for(j = 0; j !== source_array.length; ++j){
      arr.push({n: source_array[j]});
    }
    var sum = 0;
    for(j = 0; j !== arr.length; ++j){
      sum += arr[j].n;
    }
    results.push(sum);
  }
  var end = Date.now();
  console.log('Object literals', end - start);
  return results;
})(source_array);

(function(source_array){
  var results = [];
  var start = Date.now();
  for(var i = 0; i !== 1000000; ++i){
    var arr = [], j;
    for(j = 0; j !== source_array.length; ++j){
      arr.push(source_array[j]);
    }
    var sum = 0;
    for(j = 0; j !== arr.length; ++j){
      sum += arr[j];
    }
    results.push(sum);
  }
  var end = Date.now();
  console.log('Primitives', end - start);
  return results;
})(source_array);

