"use strict";

var loop_overhead;
(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
  }
  var end = Date.now();
  loop_overhead = end - start;
  console.log('loop overhead', loop_overhead);
})();

var loop_new_empty_array_overhead;
(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [];
  }
  var end = Date.now();
  loop_new_empty_array_overhead = end - start;
  console.log('loop new empty array overhead', loop_new_empty_array_overhead);
})();

var loop_new_array10_overhead;
(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
  }
  var end = Date.now();
  loop_new_array10_overhead = end - start;
  console.log('loop new array[10] overhead', loop_new_array10_overhead);
})();

var loop_new_array50_overhead;
(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
  }
  var end = Date.now();
  loop_new_array50_overhead = end - start;
  console.log('loop new array[50] overhead', loop_new_array50_overhead);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    var b = a.slice(0);
  }
  var end = Date.now();
  console.log('array[10].slice(0)', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    var b = a.slice(0);
  }
  var end = Date.now();
  console.log('array[50].slice(0)', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    a.push(11);
  }
  var end = Date.now();
  console.log('array[10].push(11)', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    a.push(11);
  }
  var end = Date.now();
  console.log('array[50].push(11)', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    a.unshift(11);
  }
  var end = Date.now();
  console.log('array[10].unshift(11)', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    a.unshift(11);
  }
  var end = Date.now();
  console.log('array[50].unshift(11)', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    a.splice(1,1);
  }
  var end = Date.now();
  console.log('array[10].splice(1,1)', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    a.splice(1,1);
  }
  var end = Date.now();
  console.log('array[50].splice(1,1)', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    var b = new Array(a.length - 1);
    for(i = 0; i !== 3; ++i){
      b[i] = a[i];
    }
    for(i = 4; i !== a.length; ++i){
      b[i-1] = a[i];
    }
  }
  var end = Date.now();
  console.log('array[10] manual remove item version #1', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    var b = new Array(a.length - 1);
    for(i = 0; i !== 3; ++i){
      b[i] = a[i];
    }
    for(i = 4; i !== a.length; ++i){
      b[i-1] = a[i];
    }
  }
  var end = Date.now();
  console.log('array[50] manual remove item version #1', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    var b = [];
    for(i = 0; i !== 3; ++i){
      b.push(a[i]);
    }
    for(i = 4; i !== a.length; ++i){
      b.push(a[i]);
    }
  }
  var end = Date.now();
  console.log('array[10] manual remove item version #2', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    var b = [];
    for(i = 0; i !== 3; ++i){
      b.push(a[i]);
    }
    for(i = 4; i !== a.length; ++i){
      b.push(a[i]);
    }
  }
  var end = Date.now();
  console.log('array[50] manual remove item version #2', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    var b = new Array(a.length - 1);
    for(i = 0;; ++i){
      var d = a[i];
      if(d === 3) break;
      b[i] = d;
    }
    ++i;
    for(; i !== a.length; ++i){
      b[i-1] = a[i];
    }
  }
  var end = Date.now();
  console.log('array[10] manual remove item by value', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,64,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    var b = new Array(a.length - 1);
    for(i = 0;; ++i){
      var d = a[i];
      if(d === 64) break;
      b[i] = d;
    }
    ++i;
    for(; i !== a.length; ++i){
      b[i-1] = a[i];
    }
  }
  var end = Date.now();
  console.log('array[50] manual remove item by value', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    for(i = 0;; ++i){
      if(a[i] === 3) break;
    }
  }
  var end = Date.now();
  console.log('array[10] find 3rd item by value', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,64,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    for(i = 0;; ++i){
      if(a[i] === 64) break;
    }
  }
  var end = Date.now();
  console.log('array[50] find 26th item by value', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10];
    var i = a.indexOf(3);
  }
  var end = Date.now();
  console.log('array[10] indexOf find 3rd item by value', end - start);
})();

(function(){
  var start = Date.now();
  var i;
  for(var j = 0; j !== 10000000; ++j){
    var a = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,64,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    var i = a.indexOf(64);
  }
  var end = Date.now();
  console.log('array[50] indexOf find 26th item by value', end - start);
})();

