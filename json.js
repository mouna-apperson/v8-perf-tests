"use strict";

function json_encode(value){
  var start = Date.now();
  for(var j = 0; j !== 1000000; ++j){
    var encoded = JSON.stringify(value);
  }
  var end = Date.now();
  var delta = end - start;
  var delta_per_char = Math.floor(delta / encoded.length);
  console.log('JSON encode', encoded, delta, '| per char: ', delta_per_char);
}

function json_decode(encoded){
  var start = Date.now();
  for(var j = 0; j !== 1000000; ++j){
    var value = JSON.parse(encoded);
  }
  var end = Date.now();
  var delta = end - start;
  var delta_per_char = Math.floor(delta / encoded.length);
  console.log('JSON decode', encoded, delta, '| per char: ', delta_per_char);
}

function json_decode_with_eval(encoded){
  var start = Date.now();
  for(var j = 0; j !== 1000000; ++j){
    var value = eval(encoded);
  }
  var end = Date.now();
  var delta = end - start;
  var delta_per_char = Math.floor(delta / encoded.length);
 console.log('JSON decode (with eval)', encoded, delta, '| per char: ', delta_per_char);
}

[
  5,
  100000,
  -100,
  52.7,
  "hello",
  [1,2,3,4,5,6,7],
  ["a", "b", "c", "d", "e"],
  [[],[],[]],
  null,
  [1,"a",[],null],
  [{a:1,b:2},{a:3,b:4},{a:5,b:6}],
  [{a:1,b:2},{c:3,d:4},{e:5,f:6}],
  {a:1,b:2,c:3,d:4,e:5,f:6},
  {a:1,b:{},c:3,d:null,e:"a",f:6,g:{}},
  {},
  []
].forEach(function(v){
  json_encode(v);
  json_decode(JSON.stringify(v));
  json_decode_with_eval((function(a){ if(a[0] === '{') return ('('+a+')'); else return a; })(JSON.stringify(v)));
});

