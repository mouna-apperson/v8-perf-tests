"use strict";

(function(){
  var start = Date.now();
  var v = new Array(8192);
  for(var i = 0; i !== 8192; ++i){
    v[i] = i;
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      v[8191 ^ i] = v[i];
    }
  }
  var end = Date.now();
  console.log('new Array', end - start);
})();

(function(){
  var start = Date.now();
  var v = [];
  for(var i = 0; i !== 8192; ++i){
    v.push(i);
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      v[8191 ^ i] = v[i];
    }
  }
  var end = Date.now();
  console.log('[]', end - start);
})();

(function(){
  var start = Date.now();
  var v = new Buffer(4*8192);
  for(var i = 0; i !== 8192; ++i){
    v.writeInt32LE(i, 4*i, true);
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      v.writeInt32LE(v.readInt32LE(4*(8191 ^ i), true), 4*i, true);
    }
  }
  var end = Date.now();
  console.log('Buffer writeInt32LE & readInt32LE', end - start);
})();

(function(){
  var start = Date.now();
  var v = new Buffer(4*8192);
  for(var i = 0; i !== 8192; ++i){
    v.writeInt32LE(i, 4*i, true);
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      v.copy(v, 4*(8191 ^ i), 4*i, 4*(i+1));
    }
  }
  var end = Date.now();
  console.log('Buffer copy', end - start);
})();

(function(){
  var start = Date.now();
  var v = new Buffer(4*8192);
  for(var i = 0; i !== 8192; ++i){
    v.writeInt32LE(i, 4*i, true);
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      var k = 4*(8191 ^ i);
      var l = 4*i;
      v[k] = v[l];
      v[k+1] = v[l+1];
      v[k+2] = v[l+2];
      v[k+3] = v[l+3];
    }
  }
  var end = Date.now();
  console.log('Buffer bytewise copy', end - start);
})();

(function(){
  var start = Date.now();
  var v = new Buffer(4*8192);
  for(var i = 0; i !== 8192; ++i){
    v.writeInt32LE(i, 4*i, true);
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      var k = 4*(8191 ^ i);
      var l = 4*i;
      var m = v[k] + (v[k+1] >> 8) + (v[k+2] >> 16) + (v[k+3] >> 24);
      v[l] = m & 255;
      v[l+1] = (m << 8) & 255;
      v[l+2] = (m << 16) & 255;
      v[l+3] = (m << 24) & 255;
    }
  }
  var end = Date.now();
  console.log('Buffer bytewise convert to int and then store', end - start);
})();

(function(){
  var start = Date.now();
  var v = new Uint32Array(4*8192);
  for(var i = 0; i !== 8192; ++i){
    v[i] = i;
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      v[8191 ^ i] = v[i];
    }
  }
  var end = Date.now();
  console.log('new Uint32Array', end - start);
})();

(function(){
  var start = Date.now();
  var v = new require('./binary.node').ArrayBuffer(8192);
  for(var i = 0; i !== 8192; ++i){
    v[i] = i;
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      v[8191 ^ i] = v[i];
    }
  }
  var end = Date.now();
  console.log('Binary SetIndexedPropertiesToExternalArrayData', end - start);
})();

(function(){
  var start = Date.now();
  var v = new require('./binary.node').InterceptorArray(8192);
  for(var i = 0; i !== 8192; ++i){
    v[i] = i;
  }
  for(var j = 0; j !== 2500; ++j){
    for(var i = 0; i !== 8192; ++i){
      v[8191 ^ i] = v[i];
    }
  }
  var end = Date.now();
  console.log('Binary SetIndexedPropertyHandler', end - start);
})();

(function(){
  var start = Date.now();
  var v = new require('./binary.node').ArrayBuffer(8192);
  v.do_test();
  var end = Date.now();
  console.log('Binary C++', end - start);
})();

