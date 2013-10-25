"use strict";

function make_object(num_keys){
  var rv = {};
  for(var i = 0; i !== num_keys; ++i){
    rv['k'+i] = true;
  }
  return rv;
}

(function(){
  var o = make_object(2000);
  var start = Date.now();
  for(var i = 0; i !== 1000; ++i){
    var t = Object.keys(o);
    delete o[t[5]];
  }
  var end = Date.now();
  console.log('Read Object.keys from 2000 key object and delete the 5th key x1000', end - start);
})();

(function(){
  var o = make_object(2000);
  var start = Date.now();
  for(var i = 0; i !== 10000; ++i){
    var t = Object.keys(o);
    var new_o = {};
    for(var j = 0; j !== t.length; ++j){
      if((i+j+16) & 0x16){
        var p = t[j];
        new_o[p] = o[p];
      }
    }
  }
  var end = Date.now();
  console.log('Read Object.keys from 2000 key object and copy half of the keys to a new object x10000', end - start);
})();

(function(){
  var o = make_object(20000);
  var start = Date.now();
  for(var i = 0; i !== 1000; ++i){
    var t = Object.keys(o);
    delete o[t[5]];
  }
  var end = Date.now();
  console.log('Read Object.keys from 20000 key object and delete the 5th key x1000', end - start);
})();

(function(){
  var o = make_object(20000);
  var start = Date.now();
  for(var i = 0; i !== 1000; ++i){
    var t = Object.keys(o);
    delete o[t[5]];
    delete o[t[15]];
    delete o[t[25]];
    delete o[t[35]];
    delete o[t[45]];
    delete o[t[55]];
    delete o[t[65]];
    delete o[t[75]];
    delete o[t[85]];
    delete o[t[95]];
  }
  var end = Date.now();
  console.log('Read Object.keys from 20000 key object and delete the 10 keys x1000', end - start);
})();

(function(){
  var o = make_object(20000);
  var start = Date.now();
  for(var i = 0; i !== 1000; ++i){
    var t = Object.keys(o);
    var new_o = {};
    for(var j = 0; j !== t.length; ++j){
      if((i+j+16) & 0x16){
        var p = t[j];
        new_o[p] = o[p];
      }
    }
  }
  var end = Date.now();
  console.log('Read Object.keys from 20000 key object and copy half of the keys to a new object x1000', end - start);
})();

(function(){
  var o = make_object(200000);
  var start = Date.now();
  for(var i = 0; i !== 100; ++i){
    var t = Object.keys(o);
    delete o[t[5]];
  }
  var end = Date.now();
  console.log('Read Object.keys from 200000 key object and delete the 5th key x100', end - start);
})();

(function(){
  var o = make_object(200000);
  var start = Date.now();
  for(var i = 0; i !== 100; ++i){
    var t = Object.keys(o);
    delete o[t[5]];
    delete o[t[15]];
    delete o[t[25]];
    delete o[t[35]];
    delete o[t[45]];
    delete o[t[55]];
    delete o[t[65]];
    delete o[t[75]];
    delete o[t[85]];
    delete o[t[95]];
  }
  var end = Date.now();
  console.log('Read Object.keys from 200000 key object and delete the 10 keys x100', end - start);
})();

(function(){
  var o = make_object(200000);
  var start = Date.now();
  for(var i = 0; i !== 100; ++i){
    var t = Object.keys(o);
    var new_o = {};
    for(var j = 0; j !== t.length; ++j){
      if((i+j+16) & 0x16){
        var p = t[j];
        new_o[p] = o[p];
      }
    }
  }
  var end = Date.now();
  console.log('Read Object.keys from 200000 key object and copy half of the keys to a new object x100', end - start);
})();

