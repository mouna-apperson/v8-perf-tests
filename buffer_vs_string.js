"use strict";

var test_buffer = (function(){
  var d = new Buffer(256);
  for(var i = 0; i !== 256; ++i){
    d[i] = i;
  }
  return d;
})();

var test_string = test_buffer.toString('ucs2');

var test_buffer_x10 = (function(){
  var d = new Buffer(2560);
  for(var i = 0; i !== 2560; ++i){
    d[i] = i;
  }
  return d;
})();

var test_string_x10 = test_buffer_x10.toString('ucs2');

(function(){
  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = new Array(128);
    for(var i = 0; i !== 256; i += 2){
      d[i >> 1] = String.fromCharCode(i + ((i + 1) << 8));
    }
    var c = d.join('');
  }
  var end = Date.now();
  console.log('create String from 128 2-byte pieces joined', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = new Array(128);
    for(var i = 0; i !== 256; i += 2){
      d[i >> 1] = (i + ((i + 1) << 8));
    }
    var c = String.fromCharCode.apply(undefined, d);
  }
  var end = Date.now();
  console.log('create String from 128 2-byte passed to String.fromCharCode.apply', end - start);
})();

(function(){
  var f_source = '(function(i){ return String.fromCharCode('+(function(){
    var term = new Array(128);
    for(var i = 0; i !== 256; i += 2){
      term[i >> 1] = '('+(i)+' + i + (('+(i + 1)+' + i) << 8))';
    }
    return term;
  }()).join(',')+');})';
  var f = eval(f_source);

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var c = f(0);
  }
  var end = Date.now();
  console.log('create String from custom generated function that uses 128 arguments to String.fromCharCode', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = new Buffer(256);
    for(var i = 0; i !== 256; ++i){
      d[i] = i;
    }
    var c = d.toString('ucs2');
  }
  var end = Date.now();
  console.log('create String by building a 256 byte buffer then converting it with toString("ucs2")', end - start);
})();

(function(){
  var c = test_buffer;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = c.toString("ucs2");
  }
  var end = Date.now();
  console.log('convert buffer[256] to String with toString("ucs2")', end - start);
})();

(function(){
  var c = test_string;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = new Buffer(c, "ucs2");
  }
  var end = Date.now();
  console.log('create buffer[256] from String with new Buffer(..., "ucs2")', end - start);
})();

(function(){
  var c = test_buffer_x10;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = c.toString("ucs2");
  }
  var end = Date.now();
  console.log('convert buffer[2560] to String with toString("ucs2")', end - start);
})();

(function(){
  var c = test_string_x10;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = new Buffer(c, "ucs2");
  }
  var end = Date.now();
  console.log('create buffer[2560] from String with new Buffer(..., "ucs2")', end - start);
})();

(function(){
  var c = test_string_x10;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var d = new Buffer(2560);
    d.write(c, 0, 2560, 'ucs2');
  }
  var end = Date.now();
  console.log('create buffer[2560] with new Buffer(2560) and write(c, 0, 2560, "ucs2")', end - start);
})();

(function(){
  var c = test_string;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var t = 0;
    for(var i = 0; i !== 128; ++i){
      var d = c.charCodeAt(i);
      t += (d & 255) + (d >> 8);
    }
  }
  var end = Date.now();
  console.log('Sum all bytes of a string 128 2-byte chars long', end - start);
})();

(function(){
  var c = test_buffer;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var t = 0;
    for(var i = 0; i !== 256; ++i){
      t += c[i];
    }
  }
  var end = Date.now();
  console.log('Sum all bytes of a buffer 256 bytes long', end - start);
})();

(function(){
  var c = test_string_x10;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var t = 0;
    for(var i = 0; i !== 1280; ++i){
      var d = c.charCodeAt(i);
      t += (d & 255) + (d >> 8);
    }
  }
  var end = Date.now();
  console.log('Sum all bytes of a string 1280 2-byte chars long', end - start);
})();

(function(){
  var c = test_buffer_x10;

  var start = Date.now();
  for(var j = 0; j !== 100000; ++j){
    var t = 0;
    for(var i = 0; i !== 2560; ++i){
      t += c[i];
    }
  }
  var end = Date.now();
  console.log('Sum all bytes of a buffer 2560 bytes long', end - start);
})();


