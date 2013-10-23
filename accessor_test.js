"use strict";

(function(){
  var start = Date.now();
  var v = {a: 1, b: 2, c: 3};
  for(var i = 0; i !== 10000000; ++i){
    v.a = (v.b - v.c) & 0xffffffff;
    v.b = (v.a - v.c) & 0xffffffff;
    v.c = (v.a - v.b) & 0xffffffff;
    v.a = (v.c - v.b) & 0xffffffff;
    v.b = (v.c - v.a) & 0xffffffff;
    v.c = (v.b - v.a) & 0xffffffff;
  }
  var end = Date.now();
  console.log('Object Literal', end - start);
})();

(function(){
  var start = Date.now();
  var v = Object.create(null);
  v.a = 1;
  v.b = 2;
  v.c = 3;
  for(var i = 0; i !== 10000000; ++i){
    v.a = (v.b - v.c) & 0xffffffff;
    v.b = (v.a - v.c) & 0xffffffff;
    v.c = (v.a - v.b) & 0xffffffff;
    v.a = (v.c - v.b) & 0xffffffff;
    v.b = (v.c - v.a) & 0xffffffff;
    v.c = (v.b - v.a) & 0xffffffff;
  }
  var end = Date.now();
  console.log('Explicitly set properties with no object base', end - start);
})();

(function(){
  var start = Date.now();
  var v = {};
  v.a = 1;
  v.b = 2;
  v.c = 3;
  for(var i = 0; i !== 10000000; ++i){
    v.a = (v.b - v.c) & 0xffffffff;
    v.b = (v.a - v.c) & 0xffffffff;
    v.c = (v.a - v.b) & 0xffffffff;
    v.a = (v.c - v.b) & 0xffffffff;
    v.b = (v.c - v.a) & 0xffffffff;
    v.c = (v.b - v.a) & 0xffffffff;
  }
  var end = Date.now();
  console.log('Explicitly set properties with object base', end - start);
})();

(function(){
  var start = Date.now();
  var v = {};

  Object.defineProperty(v, "a", {
    value : 1,
    writable : true,
    enumerable : true,  
    configurable : true
  });

  Object.defineProperty(v, "b", {
    value : 2,
    writable : true,
    enumerable : true,  
    configurable : true
  });

  Object.defineProperty(v, "c", {
    value : 3,
    writable : true,
    enumerable : true,  
    configurable : true
  });

  for(var i = 0; i !== 10000000; ++i){
    v.a = (v.b - v.c) & 0xffffffff;
    v.b = (v.a - v.c) & 0xffffffff;
    v.c = (v.a - v.b) & 0xffffffff;
    v.a = (v.c - v.b) & 0xffffffff;
    v.b = (v.c - v.a) & 0xffffffff;
    v.c = (v.b - v.a) & 0xffffffff;
  }
  var end = Date.now();
  console.log('With defineProperty', end - start);
})();

(function(){
  var start = Date.now();
  var v = new (require('./binary.node').SimpleObject);
  v.a = 1;
  v.b = 2;
  v.c = 3;
  for(var i = 0; i !== 10000000; ++i){
    v.a = (v.b - v.c) & 0xffffffff;
    v.b = (v.a - v.c) & 0xffffffff;
    v.c = (v.a - v.b) & 0xffffffff;
    v.a = (v.c - v.b) & 0xffffffff;
    v.b = (v.c - v.a) & 0xffffffff;
    v.c = (v.b - v.a) & 0xffffffff;
  }
  var end = Date.now();
  console.log('Using Accessors from C++', end - start);
})();

(function(){
  var start = Date.now();
  var v = new (require('./binary.node').SimpleObjectInterceptor);
  v.a = 1;
  v.b = 2;
  v.c = 3;
  for(var i = 0; i !== 10000000; ++i){
    v.a = (v.b - v.c) & 0xffffffff;
    v.b = (v.a - v.c) & 0xffffffff;
    v.c = (v.a - v.b) & 0xffffffff;
    v.a = (v.c - v.b) & 0xffffffff;
    v.b = (v.c - v.a) & 0xffffffff;
    v.c = (v.b - v.a) & 0xffffffff;
  }
  var end = Date.now();
  console.log('Using Interceptors from C++', end - start);
})();

(function(){
  var start = Date.now();
  var v = new (require('./binary.node').SimpleObject);
  v.do_test();
  var end = Date.now();
  console.log('Using C++', end - start);
})();

